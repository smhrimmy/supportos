package com.supportos.ai;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/ai")
public class AiController {

    private final AiGatewayService aiGatewayService;

    public AiController(AiGatewayService aiGatewayService) {
        this.aiGatewayService = aiGatewayService;
    }

    @PostMapping("/triage")
    public ResponseEntity<AiInsight> triage(@RequestBody Map<String, String> payload) {
        String title = payload.getOrDefault("title", "");
        String description = payload.getOrDefault("description", "");
        String tier = payload.getOrDefault("customerTier", "STANDARD");
        return ResponseEntity.ok(aiGatewayService.triageTicket(title, description, tier));
    }

    @PostMapping("/copilot/suggest-reply")
    public ResponseEntity<Map<String, String>> suggestReply(@RequestBody Map<String, String> payload) {
        String category = payload.getOrDefault("category", "General");
        String intent = payload.getOrDefault("intent", "Customer Inquiry");
        String tone = payload.getOrDefault("tone", "PROFESSIONAL");
        String customerName = payload.getOrDefault("customerName", "Valued Customer");
        String issueSummary = payload.getOrDefault("issueSummary", "");

        String reply = aiGatewayService.generateSmartReply(category, intent, tone, customerName, issueSummary);
        return ResponseEntity.ok(Map.of("suggestedReply", reply, "tone", tone));
    }

    @PostMapping("/rewrite-tone")
    public ResponseEntity<Map<String, String>> rewriteTone(@RequestBody Map<String, String> payload) {
        String text = payload.getOrDefault("text", "");
        String targetTone = payload.getOrDefault("targetTone", "PROFESSIONAL");

        String rewritten = aiGatewayService.rewriteWithTone(text, targetTone);
        return ResponseEntity.ok(Map.of("rewrittenText", rewritten, "tone", targetTone));
    }

    @PostMapping("/qa-audit")
    public ResponseEntity<Map<String, Object>> qaAudit(@RequestBody Map<String, Object> payload) {
        String title = (String) payload.getOrDefault("title", "Support Ticket");
        @SuppressWarnings("unchecked")
        List<String> messages = (List<String>) payload.getOrDefault("messages", List.of());

        return ResponseEntity.ok(aiGatewayService.auditConversationQa(title, messages));
    }
}
