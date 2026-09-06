package com.supportos.knowledge;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/knowledge")
public class KnowledgeController {

    private final KnowledgeService knowledgeService;

    public KnowledgeController(KnowledgeService knowledgeService) {
        this.knowledgeService = knowledgeService;
    }

    @GetMapping
    public ResponseEntity<List<KnowledgeArticle>> getAllArticles() {
        return ResponseEntity.ok(knowledgeService.getAllArticles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<KnowledgeArticle> getArticleById(@PathVariable Long id) {
        return knowledgeService.getArticleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<KnowledgeArticle>> search(@RequestParam(required = false, defaultValue = "") String q) {
        return ResponseEntity.ok(knowledgeService.searchArticles(q));
    }

    @PostMapping
    public ResponseEntity<KnowledgeArticle> createArticle(@RequestBody KnowledgeArticle article) {
        return ResponseEntity.ok(knowledgeService.createArticle(article));
    }

    @GetMapping("/gaps")
    public ResponseEntity<List<Map<String, Object>>> getKnowledgeGaps() {
        return ResponseEntity.ok(knowledgeService.getAiKnowledgeGaps());
    }
}
