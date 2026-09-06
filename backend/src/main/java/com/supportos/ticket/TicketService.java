package com.supportos.ticket;

import com.supportos.ai.AiGatewayService;
import com.supportos.ai.AiInsight;
import com.supportos.customer.*;
import com.supportos.tenant.TenantContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final CustomerRepository customerRepository;
    private final CustomerOrderRepository orderRepository;
    private final TimelineEventRepository timelineRepository;
    private final AiGatewayService aiGatewayService;

    public TicketService(TicketRepository ticketRepository,
                         MessageRepository messageRepository,
                         ConversationRepository conversationRepository,
                         CustomerRepository customerRepository,
                         CustomerOrderRepository orderRepository,
                         TimelineEventRepository timelineRepository,
                         AiGatewayService aiGatewayService) {
        this.ticketRepository = ticketRepository;
        this.messageRepository = messageRepository;
        this.conversationRepository = conversationRepository;
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
        this.timelineRepository = timelineRepository;
        this.aiGatewayService = aiGatewayService;
    }

    public List<Ticket> getTickets(Channel channel, TicketStatus status, TicketPriority priority) {
        String tenant = TenantContext.getTenant();
        List<Ticket> tickets = ticketRepository.findByTenantSlugOrderByCreatedAtDesc(tenant);

        return tickets.stream()
                .filter(t -> channel == null || t.getChannel() == channel)
                .filter(t -> status == null || t.getStatus() == status)
                .filter(t -> priority == null || t.getPriority() == priority)
                .toList();
    }

    public Optional<Ticket> getTicketById(Long id) {
        return ticketRepository.findByTenantSlugAndId(TenantContext.getTenant(), id);
    }

    public TicketDto.TicketDetailResponse getTicketDetail(Long id) {
        String tenant = TenantContext.getTenant();
        Ticket ticket = ticketRepository.findByTenantSlugAndId(tenant, id)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found: " + id));

        List<Message> messages = messageRepository.findByTenantSlugAndTicketIdOrderByCreatedAtAsc(tenant, id);

        Customer customer = null;
        List<CustomerOrder> orders = List.of();
        if (ticket.getCustomerId() != null) {
            customer = customerRepository.findByTenantSlugAndId(tenant, ticket.getCustomerId()).orElse(null);
            orders = orderRepository.findByTenantSlugAndCustomerIdOrderByCreatedAtDesc(tenant, ticket.getCustomerId());
        }

        return new TicketDto.TicketDetailResponse(ticket, messages, customer, orders);
    }

    @Transactional
    public Ticket createTicket(TicketDto.CreateTicketRequest request) {
        String tenant = TenantContext.getTenant();
        String ticketNumber = "TCK-" + (1000 + new Random().nextInt(9000));

        // Automatic AI Triage and Classification
        String customerTier = "STANDARD";
        if (request.getCustomerId() != null) {
            Customer cust = customerRepository.findByTenantSlugAndId(tenant, request.getCustomerId()).orElse(null);
            if (cust != null) {
                customerTier = cust.getTier().name();
            }
        }

        AiInsight aiInsight = aiGatewayService.triageTicket(request.getTitle(), request.getDescription(), customerTier);

        TicketPriority priority = request.getPriority();
        if (priority == null || priority == TicketPriority.MEDIUM) {
            try {
                priority = TicketPriority.valueOf(aiInsight.getPriority().toUpperCase());
            } catch (Exception ignored) {}
        }

        Ticket ticket = new Ticket(
                tenant,
                ticketNumber,
                request.getTitle(),
                request.getDescription(),
                priority,
                request.getChannel() != null ? request.getChannel() : Channel.EMAIL,
                request.getCustomerId(),
                request.getCustomerName(),
                request.getCustomerEmail(),
                aiInsight.getCategory()
        );

        ticket.setSentiment(aiInsight.getSentiment());
        ticket.setUrgencyScore(aiInsight.getUrgencyScore());
        ticket.setAiConfidence(aiInsight.getConfidence());
        ticket.setTags(request.getTags() != null ? request.getTags() : aiInsight.getIntent());

        // Calculate dynamic SLA based on Priority
        long slaSeconds = switch (ticket.getPriority()) {
            case CRITICAL -> 1800; // 30 mins
            case HIGH -> 7200;     // 2 hours
            case MEDIUM -> 28800;  // 8 hours
            case LOW -> 86400;     // 24 hours
        };
        ticket.setSlaDueAt(Instant.now().plusSeconds(slaSeconds));

        ticket = ticketRepository.save(ticket);

        // Create Conversation container
        Conversation conv = new Conversation(tenant, ticket.getId(), ticket.getChannel());
        conversationRepository.save(conv);

        // Create initial message
        Message initialMsg = new Message(
                tenant,
                ticket.getId(),
                conv.getId(),
                SenderType.CUSTOMER,
                ticket.getCustomerId(),
                ticket.getCustomerName() != null ? ticket.getCustomerName() : "Customer",
                ticket.getDescription(),
                false,
                ticket.getChannel()
        );
        initialMsg.setSentiment(aiInsight.getSentiment());
        messageRepository.save(initialMsg);

        // Record customer timeline event
        if (ticket.getCustomerId() != null) {
            timelineRepository.save(new TimelineEvent(
                    tenant,
                    ticket.getCustomerId(),
                    "TICKET_OPENED",
                    "Ticket Created: #" + ticket.getTicketNumber(),
                    ticket.getTitle(),
                    ticket.getChannel().name(),
                    "blue",
                    Instant.now()
            ));
        }

        return ticket;
    }

    @Transactional
    public Message addMessage(Long ticketId, TicketDto.AddMessageRequest request) {
        String tenant = TenantContext.getTenant();
        Ticket ticket = ticketRepository.findByTenantSlugAndId(tenant, ticketId)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found: " + ticketId));

        Message msg = new Message(
                tenant,
                ticket.getId(),
                null,
                request.getSenderType() != null ? request.getSenderType() : SenderType.AGENT,
                null,
                request.getSenderName() != null ? request.getSenderName() : "Support Specialist",
                request.getContent(),
                request.isInternalNote(),
                request.getChannel() != null ? request.getChannel() : ticket.getChannel()
        );

        msg = messageRepository.save(msg);

        // Update ticket status
        if (!request.isInternalNote()) {
            if (msg.getSenderType() == SenderType.AGENT || msg.getSenderType() == SenderType.AI_BOT) {
                ticket.setStatus(TicketStatus.WAITING_ON_CUSTOMER);
            } else if (msg.getSenderType() == SenderType.CUSTOMER) {
                ticket.setStatus(TicketStatus.IN_PROGRESS);
            }
        }
        ticket.setUpdatedAt(Instant.now());
        ticketRepository.save(ticket);

        return msg;
    }

    @Transactional
    public Ticket updateStatus(Long ticketId, TicketStatus newStatus) {
        Ticket ticket = ticketRepository.findByTenantSlugAndId(TenantContext.getTenant(), ticketId)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found: " + ticketId));
        ticket.setStatus(newStatus);
        ticket.setUpdatedAt(Instant.now());
        return ticketRepository.save(ticket);
    }

    @Transactional
    public Ticket assignTicket(Long ticketId, Long agentId, String agentName) {
        Ticket ticket = ticketRepository.findByTenantSlugAndId(TenantContext.getTenant(), ticketId)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found: " + ticketId));
        ticket.setAssignedAgentId(agentId);
        ticket.setAssignedAgentName(agentName);
        if (ticket.getStatus() == TicketStatus.NEW) {
            ticket.setStatus(TicketStatus.ASSIGNED);
        }
        ticket.setUpdatedAt(Instant.now());
        return ticketRepository.save(ticket);
    }

    public AiInsight getTicketCopilot(Long ticketId) {
        Ticket ticket = ticketRepository.findByTenantSlugAndId(TenantContext.getTenant(), ticketId)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found: " + ticketId));
        return aiGatewayService.triageTicket(ticket.getTitle(), ticket.getDescription(), "ENTERPRISE");
    }
}
