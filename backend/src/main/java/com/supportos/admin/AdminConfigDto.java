package com.supportos.admin;

import java.time.Instant;
import java.util.List;

public class AdminConfigDto {

    public record DispositionCategory(
            String id,
            String code,
            String label,
            String description,
            List<String> allowedCustomerTiers,
            boolean requiresMandatoryNote,
            boolean triggerFollowUpTicket,
            boolean isActive,
            String badgeColor
    ) {}

    public record CustomerTierPolicy(
            String tier, // ENTERPRISE, PRO, STANDARD, FREE
            String minAssuranceRequired,
            double maxAutonomousRefund,
            int slaTargetMinutes,
            boolean rmaFastTrack,
            boolean dedicatedAgentRequired,
            boolean allowPriorityQueueBypass
    ) {}

    public record GenesysQueueConfig(
            String id,
            String name,
            String channel,
            List<String> skillRequirements,
            int basePriority,
            double ltvMultiplier,
            int maxWaitSeconds,
            String overflowQueueName,
            int activeAgentsCount
    ) {}

    public record TelephonyPolicy(
            boolean dualChannelRecording,
            boolean pciComplianceMute,
            String sttModel,
            String ivrGreetingPrompt,
            int acwDurationSeconds,
            boolean autoWrapEnabled
    ) {}

    public record AiGuardrailConfig(
            int containmentRateTarget,
            double modelTemperature,
            double concessionCapDollar,
            double requireHumanAboveDollar,
            double sentimentAlertThreshold
    ) {}

    public record AdminConfigPayload(
            List<DispositionCategory> dispositions,
            List<CustomerTierPolicy> tierPolicies,
            List<GenesysQueueConfig> queues,
            TelephonyPolicy telephony,
            AiGuardrailConfig aiGuardrails,
            Instant lastUpdated
    ) {}
}
