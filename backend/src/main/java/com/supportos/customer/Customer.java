package com.supportos.customer;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String tenantSlug = "acme";

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String email;

    private String phone;

    private String company;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CustomerTier tier = CustomerTier.STANDARD;

    private int healthScore = 85; // 0 - 100

    private BigDecimal lifetimeValue = BigDecimal.valueOf(1200.00);

    private String sentimentScore = "NEUTRAL"; // POSITIVE, NEUTRAL, FRUSTRATED, ANGRY

    private String riskLevel = "LOW"; // LOW, MEDIUM, HIGH, CHURN_RISK

    private String avatarUrl;

    private Instant createdAt = Instant.now();

    public Customer() {}

    public Customer(String tenantSlug, String fullName, String email, String phone, String company, CustomerTier tier, int healthScore, BigDecimal lifetimeValue) {
        this.tenantSlug = tenantSlug;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.company = company;
        this.tier = tier;
        this.healthScore = healthScore;
        this.lifetimeValue = lifetimeValue;
        this.sentimentScore = "NEUTRAL";
        this.riskLevel = "LOW";
        this.createdAt = Instant.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTenantSlug() { return tenantSlug; }
    public void setTenantSlug(String tenantSlug) { this.tenantSlug = tenantSlug; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public CustomerTier getTier() { return tier; }
    public void setTier(CustomerTier tier) { this.tier = tier; }

    public int getHealthScore() { return healthScore; }
    public void setHealthScore(int healthScore) { this.healthScore = healthScore; }

    public BigDecimal getLifetimeValue() { return lifetimeValue; }
    public void setLifetimeValue(BigDecimal lifetimeValue) { this.lifetimeValue = lifetimeValue; }

    public String getSentimentScore() { return sentimentScore; }
    public void setSentimentScore(String sentimentScore) { this.sentimentScore = sentimentScore; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
