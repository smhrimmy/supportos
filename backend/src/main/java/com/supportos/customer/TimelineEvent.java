package com.supportos.customer;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "timeline_events")
public class TimelineEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String tenantSlug = "acme";

    @Column(nullable = false)
    private Long customerId;

    @Column(nullable = false)
    private String eventType; // ORDER_PLACED, TICKET_OPENED, WHATSAPP_CHAT, REFUND_PROCESSED, CSAT_RATING, CALL_LOG

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    private String channel; // EMAIL, WHATSAPP, WEB_CHAT, VOICE, STRIPE, SYSTEM

    private String badgeColor = "blue"; // blue, green, amber, purple, red

    private Instant occurredAt = Instant.now();

    public TimelineEvent() {}

    public TimelineEvent(String tenantSlug, Long customerId, String eventType, String title, String description, String channel, String badgeColor, Instant occurredAt) {
        this.tenantSlug = tenantSlug;
        this.customerId = customerId;
        this.eventType = eventType;
        this.title = title;
        this.description = description;
        this.channel = channel;
        this.badgeColor = badgeColor;
        this.occurredAt = occurredAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTenantSlug() { return tenantSlug; }
    public void setTenantSlug(String tenantSlug) { this.tenantSlug = tenantSlug; }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getChannel() { return channel; }
    public void setChannel(String channel) { this.channel = channel; }

    public String getBadgeColor() { return badgeColor; }
    public void setBadgeColor(String badgeColor) { this.badgeColor = badgeColor; }

    public Instant getOccurredAt() { return occurredAt; }
    public void setOccurredAt(Instant occurredAt) { this.occurredAt = occurredAt; }
}
