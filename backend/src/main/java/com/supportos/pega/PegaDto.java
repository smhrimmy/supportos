package com.supportos.pega;

import java.time.Instant;
import java.util.List;

public class PegaDto {

    public record VerifyCustomerRequest(
            Long customerId,
            String authRefId,
            String otpCode,
            String postalCode,
            String lastFourCard
    ) {}

    public record VerifyCustomerResponse(
            String status, // UNVERIFIED, PARTIALLY_VERIFIED, FULLY_AUTHENTICATED
            String authRefId,
            int assuranceScore,
            List<String> allowedActions,
            String verifiedBy,
            Instant verifiedAt
    ) {}

    public record DiagnosticCheck(
            String id,
            String name,
            String description,
            String status, // PENDING, PASS, FAIL
            String telemetrySignal,
            String remedyAction
    ) {}

    public record RmaDetails(
            String rmaNumber,
            String returnTrackingNumber,
            String replacementUnitSku,
            String courier,
            String warrantyStatus
    ) {}

    public record DiagnosticSessionResponse(
            String sessionId,
            Long ticketId,
            String productName,
            String productSku,
            String serialNumber,
            String currentStage,
            List<DiagnosticCheck> checks,
            RmaDetails rmaDetails
    ) {}

    public record SentimentTrajectoryPoint(
            String stage,
            double score,
            String label,
            String color
    ) {}

    public record AutoWrapUpRequest(
            Long ticketId,
            String transcriptText
    ) {}

    public record AutoWrapUpResponse(
            Long ticketId,
            String reasonForContact,
            List<String> diagnosticStepsTaken,
            String resolutionSummary,
            String dispositionCode,
            List<SentimentTrajectoryPoint> sentimentTrajectory,
            int sentimentShiftPercent,
            List<String> followUpActionItems,
            double estimatedCsat,
            int autoWrapConfidence,
            Instant completedAt
    ) {}

    public record ContactNoteRecord(
            String id,
            Long ticketId,
            String authorName,
            String authorRole,
            String noteType, // GENERAL, INTERNAL_CONFIDENTIAL, COACHING_WHISPER, COMPLIANCE_FLAG
            String content,
            String timestamp,
            boolean isAudited
    ) {}
}
