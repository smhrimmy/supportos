package com.supportos.pega;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class PegaService {

    public PegaDto.VerifyCustomerResponse verifyCustomer(PegaDto.VerifyCustomerRequest req) {
        String refId = req.authRefId() != null && !req.authRefId().isBlank() 
                ? req.authRefId() 
                : "AUTH-REF-" + Math.abs(UUID.randomUUID().hashCode() % 10000) + "-VIP";

        boolean isOtpValid = "849201".equals(req.otpCode()) || (req.otpCode() != null && req.otpCode().length() == 6);
        boolean isKbaValid = "4242".equals(req.lastFourCard()) || (req.postalCode() != null && req.postalCode().startsWith("94"));

        if (isOtpValid || (req.authRefId() != null && req.authRefId().contains("VIP"))) {
            return new PegaDto.VerifyCustomerResponse(
                    "FULLY_AUTHENTICATED",
                    refId,
                    100,
                    List.of("ISSUE_REFUND", "DISPATCH_RMA", "RESET_SECURITY_TOKEN", "MODIFY_SUBSCRIPTION"),
                    "Pega Direct Auth Broker",
                    Instant.now()
            );
        } else if (isKbaValid) {
            return new PegaDto.VerifyCustomerResponse(
                    "PARTIALLY_VERIFIED",
                    refId,
                    65,
                    List.of("VIEW_PUBLIC_ORDERS", "VERIFY_ADDRESS"),
                    "Elena Rostova (Frontline Agent)",
                    Instant.now()
            );
        } else {
            return new PegaDto.VerifyCustomerResponse(
                    "UNVERIFIED",
                    refId,
                    25,
                    List.of("VIEW_PUBLIC_FAQ"),
                    "System Security Sentinel",
                    Instant.now()
            );
        }
    }

    public PegaDto.DiagnosticSessionResponse getDiagnosticSession(Long ticketId) {
        List<PegaDto.DiagnosticCheck> checks = List.of(
                new PegaDto.DiagnosticCheck(
                        "chk-1",
                        "Cloud Gateway Telemetry Ping",
                        "Verifies ICMP latency and round-trip handshake to edge cluster.",
                        "PASS",
                        "RTT: 18ms (Normal)",
                        null
                ),
                new PegaDto.DiagnosticCheck(
                        "chk-2",
                        "Memory Leak & Heap Saturation Test",
                        "Inspects Linux kernel slab memory buffer allocations.",
                        "FAIL",
                        "Heap: 94% (CRITICAL LEAK)",
                        "Apply hotfix patch #HOTFIX-413 or cycle buffer"
                ),
                new PegaDto.DiagnosticCheck(
                        "chk-3",
                        "ASIC Thermal & Fan RPM Probe",
                        "Monitors hardware temperature and thermal dissipation.",
                        "FAIL",
                        "Fan RPM: 0 (HARDWARE FAILURE)",
                        "Cooling fan seized. Requires RMA hardware replacement."
                )
        );

        PegaDto.RmaDetails rma = new PegaDto.RmaDetails(
                "RMA-7749-PACIFIC",
                "1Z9999999999999999",
                "RTR-EDG-400X-REV2",
                "UPS Worldwide Express",
                "ACTIVE"
        );

        return new PegaDto.DiagnosticSessionResponse(
                "DIAG-2026-" + ticketId,
                ticketId,
                "SupportOS Edge Router v4 Pro",
                "RTR-EDG-400X",
                "SN-9021-4821A",
                "DIAGNOSTICS",
                checks,
                rma
        );
    }

    public PegaDto.AutoWrapUpResponse processAutoWrapUp(Long ticketId, String transcript) {
        List<PegaDto.SentimentTrajectoryPoint> trajectory = List.of(
                new PegaDto.SentimentTrajectoryPoint("OPENING", -0.75, "Frustrated / Angry", "bg-rose-500"),
                new PegaDto.SentimentTrajectoryPoint("DISCOVERY", -0.15, "Attentive", "bg-amber-500"),
                new PegaDto.SentimentTrajectoryPoint("RESOLUTION", 0.65, "Reassured", "bg-sky-500"),
                new PegaDto.SentimentTrajectoryPoint("WRAP_UP", 0.92, "Delighted / Loyal", "bg-emerald-500")
        );

        List<String> steps = List.of(
                "Verified customer identity via Pega RefID #AUTH-REF-8841-VIP (KBA + OTP).",
                "Cross-checked Stripe billing ledger; confirmed duplicate capture on invoice #INV-9821.",
                "Ran remote hardware diagnostics; identified cooling fan failure on router SN-9021-4821A.",
                "Cited Policy #REF-202 authorizing instantaneous fee waiver and refund reversal."
        );

        List<String> actionItems = List.of(
                "Confirm refund reflection on Stripe statement in 48 hours.",
                "Monitor UPS tracking #1Z9999999999999999 delivery of replacement unit.",
                "Pega CDH automated check-in email scheduled for day 7."
        );

        return new PegaDto.AutoWrapUpResponse(
                ticketId,
                "Customer reported duplicate charge #INV-9821 ($350.00) and reported intermittent router telemetry packet loss.",
                steps,
                "Issued full $350.00 refund to original payment method. Dispatched replacement hardware via UPS Worldwide (RMA-7749-PACIFIC). Applied 15% retention loyalty discount per Pega NBA.",
                "BILLING_RESOLVED",
                trajectory,
                167,
                actionItems,
                4.9,
                96,
                Instant.now()
        );
    }
}
