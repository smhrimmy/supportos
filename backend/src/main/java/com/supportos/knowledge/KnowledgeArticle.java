package com.supportos.knowledge;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "knowledge_articles")
public class KnowledgeArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String tenantSlug = "acme";

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String slug;

    @Column(nullable = false)
    private String category; // Billing, Shipping, Returns, API & Integrations, Account

    @Column(nullable = false, length = 10000)
    private String content;

    private String status = "PUBLISHED"; // DRAFT, REVIEW, PUBLISHED

    private int helpfulCount = 0;
    private int viewCount = 0;

    private String tags;

    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();

    public KnowledgeArticle() {}

    public KnowledgeArticle(String tenantSlug, String title, String slug, String category, String content, String tags) {
        this.tenantSlug = tenantSlug;
        this.title = title;
        this.slug = slug;
        this.category = category;
        this.content = content;
        this.tags = tags;
        this.status = "PUBLISHED";
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTenantSlug() { return tenantSlug; }
    public void setTenantSlug(String tenantSlug) { this.tenantSlug = tenantSlug; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getHelpfulCount() { return helpfulCount; }
    public void setHelpfulCount(int helpfulCount) { this.helpfulCount = helpfulCount; }

    public int getViewCount() { return viewCount; }
    public void setViewCount(int viewCount) { this.viewCount = viewCount; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
