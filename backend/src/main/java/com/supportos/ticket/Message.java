package com.supportos.ticket;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String tenantSlug = "acme";

    @Column(nullable = false)
    private Long ticketId;

    private Long conversationId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SenderType senderType = SenderType.CUSTOMER;

    private Long senderId;

    @Column(nullable = false)
    private String senderName;

    @Column(nullable = false, length = 8000)
    private String content;

    private boolean isInternalNote = false;

    @Enumerated(EnumType.STRING)
    private Channel channel = Channel.EMAIL;

    private String sentiment;

    private Instant createdAt = Instant.now();

    public Message() {}

    public Message(String tenantSlug, Long ticketId, Long conversationId,
                   SenderType senderType, Long senderId, String senderName,
                   String content, boolean isInternalNote, Channel channel) {
        this.tenantSlug = tenantSlug;
        this.ticketId = ticketId;
        this.conversationId = conversationId;
        this.senderType = senderType;
        this.senderId = senderId;
        this.senderName = senderName;
        this.content = content;
        this.isInternalNote = isInternalNote;
        this.channel = channel;
        this.createdAt = Instant.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTenantSlug() { return tenantSlug; }
    public void setTenantSlug(String tenantSlug) { this.tenantSlug = tenantSlug; }

    public Long getTicketId() { return ticketId; }
    public void setTicketId(Long ticketId) { this.ticketId = ticketId; }

    public Long getConversationId() { return conversationId; }
    public void setConversationId(Long conversationId) { this.conversationId = conversationId; }

    public SenderType getSenderType() { return senderType; }
    public void setSenderType(SenderType senderType) { this.senderType = senderType; }

    public Long getSenderId() { return senderId; }
    public void setSenderId(Long senderId) { this.senderId = senderId; }

    public String getSenderName() { return senderName; }
    public void setSenderName(String senderName) { this.senderName = senderName; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public boolean isInternalNote() { return isInternalNote; }
    public void setInternalNote(boolean internalNote) { isInternalNote = internalNote; }

    public Channel getChannel() { return channel; }
    public void setChannel(Channel channel) { this.channel = channel; }

    public String getSentiment() { return sentiment; }
    public void setSentiment(String sentiment) { this.sentiment = sentiment; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
