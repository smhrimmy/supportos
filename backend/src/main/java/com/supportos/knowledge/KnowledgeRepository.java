package com.supportos.knowledge;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KnowledgeRepository extends JpaRepository<KnowledgeArticle, Long> {
    List<KnowledgeArticle> findByTenantSlugOrderByCreatedAtDesc(String tenantSlug);
    Optional<KnowledgeArticle> findByTenantSlugAndId(String tenantSlug, Long id);
    Optional<KnowledgeArticle> findByTenantSlugAndSlug(String tenantSlug, String slug);
    List<KnowledgeArticle> findByTenantSlugAndCategory(String tenantSlug, String category);
}
