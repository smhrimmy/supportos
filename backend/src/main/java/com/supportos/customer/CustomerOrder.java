package com.supportos.customer;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "customer_orders")
public class CustomerOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String tenantSlug = "acme";

    @Column(nullable = false)
    private Long customerId;

    @Column(nullable = false)
    private String orderNumber;

    @Column(nullable = false)
    private BigDecimal amount;

    private String currency = "USD";

    @Column(nullable = false)
    private String status; // DELIVERED, PROCESSING, SHIPPED, REFUNDED, ON_HOLD

    private String itemSummary;

    private String trackingNumber;

    private Instant createdAt = Instant.now();

    public CustomerOrder() {}

    public CustomerOrder(String tenantSlug, Long customerId, String orderNumber, BigDecimal amount, String currency, String status, String itemSummary, String trackingNumber) {
        this.tenantSlug = tenantSlug;
        this.customerId = customerId;
        this.orderNumber = orderNumber;
        this.amount = amount;
        this.currency = currency;
        this.status = status;
        this.itemSummary = itemSummary;
        this.trackingNumber = trackingNumber;
        this.createdAt = Instant.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTenantSlug() { return tenantSlug; }
    public void setTenantSlug(String tenantSlug) { this.tenantSlug = tenantSlug; }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getItemSummary() { return itemSummary; }
    public void setItemSummary(String itemSummary) { this.itemSummary = itemSummary; }

    public String getTrackingNumber() { return trackingNumber; }
    public void setTrackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
