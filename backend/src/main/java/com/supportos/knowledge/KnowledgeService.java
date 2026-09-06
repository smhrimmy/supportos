package com.supportos.knowledge;

import com.supportos.tenant.TenantContext;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class KnowledgeService {

    private final KnowledgeRepository knowledgeRepository;

    public KnowledgeService(KnowledgeRepository knowledgeRepository) {
        this.knowledgeRepository = knowledgeRepository;
    }

    public List<KnowledgeArticle> getAllArticles() {
        return knowledgeRepository.findByTenantSlugOrderByCreatedAtDesc(TenantContext.getTenant());
    }

    public Optional<KnowledgeArticle> getArticleById(Long id) {
        return knowledgeRepository.findByTenantSlugAndId(TenantContext.getTenant(), id);
    }

    public List<KnowledgeArticle> searchArticles(String query) {
        String tenant = TenantContext.getTenant();
        List<KnowledgeArticle> all = knowledgeRepository.findByTenantSlugOrderByCreatedAtDesc(tenant);
        if (query == null || query.isBlank()) {
            return all;
        }
        String q = query.toLowerCase();
        return all.stream()
                .filter(a -> a.getTitle().toLowerCase().contains(q) ||
                        a.getContent().toLowerCase().contains(q) ||
                        (a.getTags() != null && a.getTags().toLowerCase().contains(q)))
                .toList();
    }

    public KnowledgeArticle createArticle(KnowledgeArticle article) {
        article.setTenantSlug(TenantContext.getTenant());
        return knowledgeRepository.save(article);
    }

    public List<Map<String, Object>> getAiKnowledgeGaps() {
        return List.of(
                Map.of(
                        "question", "How to initiate a partial order return for bundles?",
                        "frequency", 347,
                        "trend", "+42% this week",
                        "status", "MISSING_DOCUMENTATION",
                        "suggestedTitle", "Partial Bundle Returns & Refund Policy",
                        "confidence", 94
                ),
                Map.of(
                        "question", "Resolving Android 16 login session timeouts",
                        "frequency", 218,
                        "trend", "+312% emerging spike",
                        "status", "URGENT_DRAFT_GENERATED",
                        "suggestedTitle", "Troubleshooting Android Authentication Errors",
                        "confidence", 98
                ),
                Map.of(
                        "question", "Exporting annual tax invoices in PDF format",
                        "frequency", 129,
                        "trend", "+14%",
                        "status", "RECOMMENDED",
                        "suggestedTitle", "Downloading Annual VAT & Invoicing Statements",
                        "confidence", 89
                )
        );
    }
}
