package com.supportos.ticket;

import com.supportos.customer.Customer;
import com.supportos.customer.CustomerOrder;

import java.util.List;

public class TicketDto {

    public static class CreateTicketRequest {
        private String title;
        private String description;
        private TicketPriority priority = TicketPriority.MEDIUM;
        private Channel channel = Channel.EMAIL;
        private Long customerId;
        private String customerName;
        private String customerEmail;
        private String category = "General";
        private String tags;

        public CreateTicketRequest() {}

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public TicketPriority getPriority() { return priority; }
        public void setPriority(TicketPriority priority) { this.priority = priority; }

        public Channel getChannel() { return channel; }
        public void setChannel(Channel channel) { this.channel = channel; }

        public Long getCustomerId() { return customerId; }
        public void setCustomerId(Long customerId) { this.customerId = customerId; }

        public String getCustomerName() { return customerName; }
        public void setCustomerName(String customerName) { this.customerName = customerName; }

        public String getCustomerEmail() { return customerEmail; }
        public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }

        public String getTags() { return tags; }
        public void setTags(String tags) { this.tags = tags; }
    }

    public static class AddMessageRequest {
        private String content;
        private boolean isInternalNote = false;
        private SenderType senderType = SenderType.AGENT;
        private String senderName;
        private Channel channel = Channel.EMAIL;

        public AddMessageRequest() {}

        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }

        public boolean isInternalNote() { return isInternalNote; }
        public void setInternalNote(boolean internalNote) { isInternalNote = internalNote; }

        public SenderType getSenderType() { return senderType; }
        public void setSenderType(SenderType senderType) { this.senderType = senderType; }

        public String getSenderName() { return senderName; }
        public void setSenderName(String senderName) { this.senderName = senderName; }

        public Channel getChannel() { return channel; }
        public void setChannel(Channel channel) { this.channel = channel; }
    }

    public static class UpdateStatusRequest {
        private TicketStatus status;
        public UpdateStatusRequest() {}
        public TicketStatus getStatus() { return status; }
        public void setStatus(TicketStatus status) { this.status = status; }
    }

    public static class AssignTicketRequest {
        private Long agentId;
        private String agentName;
        public AssignTicketRequest() {}
        public Long getAgentId() { return agentId; }
        public void setAgentId(Long agentId) { this.agentId = agentId; }
        public String getAgentName() { return agentName; }
        public void setAgentName(String agentName) { this.agentName = agentName; }
    }

    public static class TicketDetailResponse {
        private Ticket ticket;
        private List<Message> messages;
        private Customer customer;
        private List<CustomerOrder> orders;

        public TicketDetailResponse(Ticket ticket, List<Message> messages, Customer customer, List<CustomerOrder> orders) {
            this.ticket = ticket;
            this.messages = messages;
            this.customer = customer;
            this.orders = orders;
        }

        public Ticket getTicket() { return ticket; }
        public List<Message> getMessages() { return messages; }
        public Customer getCustomer() { return customer; }
        public List<CustomerOrder> getOrders() { return orders; }
    }
}
