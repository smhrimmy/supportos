package com.supportos.admin;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class AdminConfigService {

    private final AtomicReference<AdminConfigDto.AdminConfigPayload> currentConfig = new AtomicReference<>();

    public AdminConfigService() {
        initDefaultConfig();
    }

    private void initDefaultConfig() {
        List<AdminConfigDto.DispositionCategory> dispositions = List.of(
                new AdminConfigDto.DispositionCategory(
                        "disp-1",
                        "BILLING_RESOLVED",
                        "Billing Resolved",
                        "Duplicate charges, credits or refunds executed and ledger balanced",
                        List.of("ENTERPRISE", "PRO", "STANDARD", "FREE"),
                        true,
                        false,
                        true,
                        "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                ),
                new AdminConfigDto.DispositionCategory(
                        "disp-2",
                        "PRODUCT_RMA_ISSUED",
                        "Product RMA Dispatched",
                        "Hardware defect verified via telemetry and replacement unit dispatched",
                        List.of("ENTERPRISE", "PRO"),
                        true,
                        true,
                        true,
                        "bg-amber-500/20 text-amber-300 border-amber-500/40"
                ),
                new AdminConfigDto.DispositionCategory(
                        "disp-3",
                        "VIP_CONCESSION_GRANTED",
                        "VIP Concession & Loyalty Credit",
                        "Pega NBA retention incentive applied to preserve key enterprise account",
                        List.of("ENTERPRISE"),
                        true,
                        true,
                        true,
                        "bg-purple-500/20 text-purple-300 border-purple-500/40"
                ),
                new AdminConfigDto.DispositionCategory(
                        "disp-4",
                        "TECH_CONFIG_APPLIED",
                        "Tech Config / OTA Patch Applied",
                        "Remote OTA firmware patch deployed or gateway setting adjusted",
                        List.of("ENTERPRISE", "PRO", "STANDARD"),
                        false,
                        false,
                        true,
                        "bg-sky-500/20 text-sky-300 border-sky-500/40"
                ),
                new AdminConfigDto.DispositionCategory(
                        "disp-5",
                        "DEDICATED_TAM_ESCALATION",
                        "Dedicated TAM Escalated",
                        "Case handed off to Technical Account Manager for architectural review",
                        List.of("ENTERPRISE"),
                        true,
                        true,
                        true,
                        "bg-rose-500/20 text-rose-300 border-rose-500/40"
                ),
                new AdminConfigDto.DispositionCategory(
                        "disp-6",
                        "SELF_SERVICE_FAQ_PROVIDED",
                        "Self-Service FAQ Provided",
                        "Customer guided to documentation or automated resolution flow",
                        List.of("STANDARD", "FREE"),
                        false,
                        false,
                        true,
                        "bg-slate-500/20 text-slate-300 border-slate-500/40"
                )
        );

        List<AdminConfigDto.CustomerTierPolicy> tierPolicies = List.of(
                new AdminConfigDto.CustomerTierPolicy("ENTERPRISE", "FULLY_AUTHENTICATED", 1000.0, 15, true, true, true),
                new AdminConfigDto.CustomerTierPolicy("PRO", "PARTIALLY_VERIFIED", 250.0, 60, true, false, true),
                new AdminConfigDto.CustomerTierPolicy("STANDARD", "PARTIALLY_VERIFIED", 50.0, 240, false, false, false),
                new AdminConfigDto.CustomerTierPolicy("FREE", "UNVERIFIED", 0.0, 1440, false, false, false)
        );

        List<AdminConfigDto.GenesysQueueConfig> queues = List.of(
                new AdminConfigDto.GenesysQueueConfig(
                        "q-vip-voice",
                        "Enterprise Platinum VIP Voice ACD",
                        "VOICE",
                        List.of("Senior Network Eng", "Bilingual English/Mandarin"),
                        100,
                        0.15,
                        45,
                        "General Escalations Pool",
                        8
                ),
                new AdminConfigDto.GenesysQueueConfig(
                        "q-billing",
                        "Critical Billing & Payment Dispute Swarm",
                        "WHATSAPP",
                        List.of("Stripe Ledgers", "Policy #REF-202"),
                        80,
                        0.08,
                        90,
                        "Supervisor Tier 2",
                        12
                )
        );

        AdminConfigDto.TelephonyPolicy telephony = new AdminConfigDto.TelephonyPolicy(
                true,
                true,
                "Gemini-2.5-Live-Audio",
                "Welcome to SupportOS Priority Gateway. Connecting you based on your verified SLA.",
                45,
                true
        );

        AdminConfigDto.AiGuardrailConfig aiGuardrails = new AdminConfigDto.AiGuardrailConfig(
                65,
                0.2,
                1000.0,
                350.0,
                -0.6
        );

        currentConfig.set(new AdminConfigDto.AdminConfigPayload(
                dispositions,
                tierPolicies,
                queues,
                telephony,
                aiGuardrails,
                Instant.now()
        ));
    }

    public AdminConfigDto.AdminConfigPayload getConfig() {
        return currentConfig.get();
    }

    public AdminConfigDto.AdminConfigPayload updateConfig(AdminConfigDto.AdminConfigPayload payload) {
        AdminConfigDto.AdminConfigPayload updated = new AdminConfigDto.AdminConfigPayload(
                payload.dispositions(),
                payload.tierPolicies(),
                payload.queues(),
                payload.telephony(),
                payload.aiGuardrails(),
                Instant.now()
        );
        currentConfig.set(updated);
        return updated;
    }

    public List<AdminConfigDto.DispositionCategory> getDispositionsForTier(String tier) {
        AdminConfigDto.AdminConfigPayload cfg = currentConfig.get();
        if (tier == null || tier.isBlank()) {
            return cfg.dispositions();
        }
        return cfg.dispositions().stream()
                .filter(d -> d.isActive() && d.allowedCustomerTiers().contains(tier.toUpperCase()))
                .toList();
    }
}
