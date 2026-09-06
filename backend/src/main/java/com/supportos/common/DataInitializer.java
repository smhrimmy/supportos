package com.supportos.common;

import com.supportos.customer.*;
import com.supportos.knowledge.KnowledgeArticle;
import com.supportos.knowledge.KnowledgeRepository;
import com.supportos.security.Role;
import com.supportos.security.User;
import com.supportos.security.UserRepository;
import com.supportos.tenant.Tenant;
import com.supportos.tenant.TenantRepository;
import com.supportos.ticket.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Component
public class DataInitializer implements CommandLineRunner {

    private final TenantRepository tenantRepository;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final CustomerOrderRepository orderRepository;
    private final TimelineEventRepository timelineRepository;
    private final TicketRepository ticketRepository;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final KnowledgeRepository knowledgeRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(TenantRepository tenantRepository,
                           UserRepository userRepository,
                           CustomerRepository customerRepository,
                           CustomerOrderRepository orderRepository,
                           TimelineEventRepository timelineRepository,
                           TicketRepository ticketRepository,
                           ConversationRepository conversationRepository,
                           MessageRepository messageRepository,
                           KnowledgeRepository knowledgeRepository,
                           PasswordEncoder passwordEncoder) {
        this.tenantRepository = tenantRepository;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
        this.timelineRepository = timelineRepository;
        this.ticketRepository = ticketRepository;
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
        this.knowledgeRepository = knowledgeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (tenantRepository.count() > 0) return;

        // 1. Tenants
        Tenant acme = new Tenant("acme", "Acme Global Technologies", "acme.com");
        Tenant stripeify = new Tenant("stripeify", "Stripeify Inc", "stripeify.io");
        tenantRepository.save(acme);
        tenantRepository.save(stripeify);

        // 2. Users / Agents
        String encodedPass = passwordEncoder.encode("password123");
        User admin = new User("acme", "admin@supportos.io", encodedPass, "Elena Rostova", Role.ORG_ADMIN, "Operations");
        User supervisor = new User("acme", "marcus@supportos.io", encodedPass, "Marcus Vance", Role.SUPERVISOR, "Customer Success");
        User agent = new User("acme", "sarah.agent@supportos.io", encodedPass, "Chloe Bennett", Role.AGENT, "Technical Support");
        userRepository.save(admin);
        userRepository.save(supervisor);
        userRepository.save(agent);

        // 3. Customers
        Customer sarah = new Customer(
                "acme",
                "Sarah Chen",
                "sarah.chen@apexcloud.io",
                "+1-415-892-0192",
                "Apex Cloud Innovations",
                CustomerTier.ENTERPRISE,
                88,
                BigDecimal.valueOf(8400.00)
        );
        sarah.setSentimentScore("FRUSTRATED");
        sarah.setRiskLevel("LOW");
        sarah = customerRepository.save(sarah);

        Customer david = new Customer(
                "acme",
                "David Miller",
                "david.miller@ftorbit.com",
                "+1-212-409-2219",
                "FinTech Orbit",
                CustomerTier.PRO,
                92,
                BigDecimal.valueOf(3200.00)
        );
        david = customerRepository.save(david);

        Customer liam = new Customer(
                "acme",
                "Liam O'Connor",
                "liam@dublinlog.ie",
                "+353-1-496-0123",
                "Dublin Logistics",
                CustomerTier.STANDARD,
                71,
                BigDecimal.valueOf(750.00)
        );
        liam = customerRepository.save(liam);

        Customer priya = new Customer(
                "acme",
                "Priya Sharma",
                "priya@bharatretail.in",
                "+91-98200-11223",
                "Bharat Retail Tech",
                CustomerTier.ENTERPRISE,
                95,
                BigDecimal.valueOf(14200.00)
        );
        priya = customerRepository.save(priya);

        // 4. Orders for Sarah Chen
        CustomerOrder order1 = new CustomerOrder(
                "acme", sarah.getId(), "ORD-4491", BigDecimal.valueOf(350.00), "USD", "PAID",
                "Cloud Infrastructure Enterprise Tier (Monthly Renewal)", "INV-9821"
        );
        CustomerOrder order2 = new CustomerOrder(
                "acme", sarah.getId(), "ORD-4492", BigDecimal.valueOf(350.00), "USD", "PENDING_REVERSAL",
                "Duplicate Subscription Charge (In Reversal)", "INV-9822"
        );
        CustomerOrder order3 = new CustomerOrder(
                "acme", sarah.getId(), "ORD-3910", BigDecimal.valueOf(1200.00), "USD", "DELIVERED",
                "Hardware Security Keys & Dedicated HSM Pack", "FDX-8821901"
        );
        orderRepository.save(order1);
        orderRepository.save(order2);
        orderRepository.save(order3);

        // 5. Timeline Events for Sarah Chen
        timelineRepository.save(new TimelineEvent("acme", sarah.getId(), "ORDER_PLACED", "Invoice #INV-9821 Settled ($350.00)", "Monthly enterprise renewal via Stripe", "STRIPE", "green", Instant.now().minus(2, ChronoUnit.HOURS)));
        timelineRepository.save(new TimelineEvent("acme", sarah.getId(), "WHATSAPP_CHAT", "WhatsApp Inbound from +1-415-892-0192", "Notified double charge on Visa card ending 4091", "WHATSAPP", "green", Instant.now().minus(45, ChronoUnit.MINUTES)));
        timelineRepository.save(new TimelineEvent("acme", sarah.getId(), "AI_ACTION", "AI Copilot Detected Duplicate Transaction", "Confidence: 96%. Suggested immediate refund under Policy #REF-202", "SYSTEM", "purple", Instant.now().minus(40, ChronoUnit.MINUTES)));
        timelineRepository.save(new TimelineEvent("acme", sarah.getId(), "CSAT_RATING", "Rated 5/5 ⭐ 'Flawless SLA response'", "Post-ticket survey on #TCK-998", "EMAIL", "amber", Instant.now().minus(14, ChronoUnit.DAYS)));

        // 6. Tickets
        // Ticket 1: Sarah Chen Duplicate Charge (WhatsApp)
        Ticket t1 = new Ticket(
                "acme", "TCK-1042", "Charged twice for monthly invoice #INV-9821",
                "Hi, I noticed two identical $350 debits on our corporate Visa for invoice #INV-9821 this morning. Please inspect and process a reversal as soon as possible.",
                TicketPriority.HIGH, Channel.WHATSAPP, sarah.getId(), sarah.getFullName(), sarah.getEmail(), "Billing"
        );
        t1.setStatus(TicketStatus.IN_PROGRESS);
        t1.setAssignedAgentId(supervisor.getId());
        t1.setAssignedAgentName(supervisor.getFullName());
        t1.setSentiment("FRUSTRATED");
        t1.setUrgencyScore(88);
        t1.setAiConfidence(96);
        t1.setTags("billing, duplicate, stripe, vip");
        t1.setSlaDueAt(Instant.now().plus(45, ChronoUnit.MINUTES));
        t1 = ticketRepository.save(t1);

        Conversation conv1 = conversationRepository.save(new Conversation("acme", t1.getId(), Channel.WHATSAPP));

        Message m1 = new Message("acme", t1.getId(), conv1.getId(), SenderType.CUSTOMER, sarah.getId(), "Sarah Chen",
                "Hi, I noticed two identical $350 debits on our corporate Visa for invoice #INV-9821 this morning. Please inspect and process a reversal as soon as possible.",
                false, Channel.WHATSAPP);
        m1.setSentiment("FRUSTRATED");

        Message m2 = new Message("acme", t1.getId(), conv1.getId(), SenderType.AI_BOT, null, "SupportOS Copilot",
                "🔍 Automated Telemetry Check: Located Stripe charge IDs ch_3P7x8... and ch_3P7x9... both billed at 14:02:18 UTC. Duplicate charge confirmed under Policy #REF-202.",
                true, Channel.WHATSAPP);

        Message m3 = new Message("acme", t1.getId(), conv1.getId(), SenderType.AGENT, supervisor.getId(), "Marcus Vance",
                "Hello Sarah! Marcus here. I verified the duplicate authorization right away. I've initiated an immediate refund of $350.00 back to your Visa card.",
                false, Channel.WHATSAPP);

        Message m4 = new Message("acme", t1.getId(), conv1.getId(), SenderType.CUSTOMER, sarah.getId(), "Sarah Chen",
                "Thank you Marcus! That was lightning fast. Will this reflect before end of week?",
                false, Channel.WHATSAPP);
        m4.setSentiment("POSITIVE");

        messageRepository.save(m1);
        messageRepository.save(m2);
        messageRepository.save(m3);
        messageRepository.save(m4);

        // Ticket 2: David Miller Delivery status (Email)
        Ticket t2 = new Ticket(
                "acme", "TCK-1043", "Order #ORD-3910 delivery status delayed past estimated date",
                "Our warehouse was expecting package FDX-8821901 yesterday afternoon. Tracking still shows 'In Transit'. Can we get an updated ETA?",
                TicketPriority.MEDIUM, Channel.EMAIL, david.getId(), david.getFullName(), david.getEmail(), "Shipping"
        );
        t2.setStatus(TicketStatus.ASSIGNED);
        t2.setAssignedAgentId(agent.getId());
        t2.setAssignedAgentName(agent.getFullName());
        t2.setSentiment("CONCERNED");
        t2.setUrgencyScore(65);
        t2.setAiConfidence(92);
        t2.setTags("shipping, logistics, fedex");
        t2.setSlaDueAt(Instant.now().plus(3, ChronoUnit.HOURS));
        t2 = ticketRepository.save(t2);

        Conversation conv2 = conversationRepository.save(new Conversation("acme", t2.getId(), Channel.EMAIL));
        messageRepository.save(new Message("acme", t2.getId(), conv2.getId(), SenderType.CUSTOMER, david.getId(), "David Miller",
                "Our warehouse was expecting package FDX-8821901 yesterday afternoon. Tracking still shows 'In Transit'. Can we get an updated ETA?",
                false, Channel.EMAIL));

        // Ticket 3: Liam O'Connor Android Crash (Live Chat)
        Ticket t3 = new Ticket(
                "acme", "TCK-1044", "Session crash on Android 16 login screen",
                "Multiple drivers in Dublin region report immediate app termination when entering credentials on Android 16 build 8.4.1.",
                TicketPriority.CRITICAL, Channel.LIVE_CHAT, liam.getId(), liam.getFullName(), liam.getEmail(), "Technical"
        );
        t3.setStatus(TicketStatus.NEW);
        t3.setSentiment("ANGRY");
        t3.setUrgencyScore(98);
        t3.setAiConfidence(97);
        t3.setTags("android, mobile-app, crash, incident-risk");
        t3.setSlaDueAt(Instant.now().plus(18, ChronoUnit.MINUTES));
        t3 = ticketRepository.save(t3);

        Conversation conv3 = conversationRepository.save(new Conversation("acme", t3.getId(), Channel.LIVE_CHAT));
        messageRepository.save(new Message("acme", t3.getId(), conv3.getId(), SenderType.CUSTOMER, liam.getId(), "Liam O'Connor",
                "Multiple drivers in Dublin region report immediate app termination when entering credentials on Android 16 build 8.4.1.",
                false, Channel.LIVE_CHAT));

        // Ticket 4: Priya Sharma SOC-2 Request (Web Form)
        Ticket t4 = new Ticket(
                "acme", "TCK-1045", "Requesting annual SOC-2 Type II audit report for compliance review",
                "Greetings, we are undergoing our annual vendor risk assessment and need the latest SOC-2 Type II report and penetration test executive summary.",
                TicketPriority.LOW, Channel.WEB_FORM, priya.getId(), priya.getFullName(), priya.getEmail(), "Account"
        );
        t4.setStatus(TicketStatus.NEW);
        t4.setSentiment("NEUTRAL");
        t4.setUrgencyScore(30);
        t4.setAiConfidence(99);
        t4.setTags("soc2, compliance, enterprise-nda");
        t4.setSlaDueAt(Instant.now().plus(16, ChronoUnit.HOURS));
        t4 = ticketRepository.save(t4);

        Conversation conv4 = conversationRepository.save(new Conversation("acme", t4.getId(), Channel.WEB_FORM));
        messageRepository.save(new Message("acme", t4.getId(), conv4.getId(), SenderType.CUSTOMER, priya.getId(), "Priya Sharma",
                "Greetings, we are undergoing our annual vendor risk assessment and need the latest SOC-2 Type II report and penetration test executive summary.",
                false, Channel.WEB_FORM));

        // 7. Knowledge Base Articles
        knowledgeRepository.save(new KnowledgeArticle(
                "acme",
                "Duplicate Charges & Instant Refund Protocols",
                "duplicate-charges-refund-protocol",
                "Billing",
                """
                # Duplicate Charge Handling & Refund Guidelines

                ### Summary
                When a customer reports an accidental double charge, SupportOS cross-references transaction IDs in the payment gateway (Stripe/PayPal/Razorpay).

                ### Eligibility & Criteria
                1. Transactions sharing the same customer card hash within 5 minutes of each other.
                2. Amount matches identically.
                3. First charge status is `Succeeded`, second charge status is `Authorized` or `Settled`.

                ### Permitted Actions
                - Agents have permission to issue immediate full refunds up to $1,000 without supervisor sign-off.
                - For amounts over $1,000, one-click escalation to Finance Supervisor is required.
                """,
                "billing, refund, duplicate, stripe"
        ));

        knowledgeRepository.save(new KnowledgeArticle(
                "acme",
                "Carrier Tracking Delays & Shipment Escalations",
                "carrier-tracking-delays",
                "Shipping",
                """
                # Carrier Logistics & Tracking Procedures

                ### Overview
                Standard transit windows allow 24-48 hours buffer for regional hub transfers. If tracking is static for > 48h, file an automated carrier tracer.
                """,
                "shipping, fedex, dhl, tracking"
        ));

        knowledgeRepository.save(new KnowledgeArticle(
                "acme",
                "Configuring Webhooks & Real-time Event Subscriptions",
                "configuring-webhooks-events",
                "API & Integrations",
                """
                # SupportOS Webhooks API Reference

                ### Supported Events
                - `ticket.created`
                - `ticket.updated`
                - `sla.warning`
                - `incident.detected`

                ### Signature Verification
                Compute HMAC-SHA256 over raw payload with your organization's Webhook Secret Key.
                """,
                "api, webhooks, integrations, dev"
        ));
    }
}
