package com.supportos.pega;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pega")
@CrossOrigin(origins = "*")
public class PegaController {

    private final PegaService pegaService;

    public PegaController(PegaService pegaService) {
        this.pegaService = pegaService;
    }

    @PostMapping("/verify")
    public ResponseEntity<PegaDto.VerifyCustomerResponse> verifyCustomer(@RequestBody PegaDto.VerifyCustomerRequest req) {
        return ResponseEntity.ok(pegaService.verifyCustomer(req));
    }

    @GetMapping("/diagnostics/{ticketId}")
    public ResponseEntity<PegaDto.DiagnosticSessionResponse> getDiagnostics(@PathVariable Long ticketId) {
        return ResponseEntity.ok(pegaService.getDiagnosticSession(ticketId));
    }

    @PostMapping("/autowrap")
    public ResponseEntity<PegaDto.AutoWrapUpResponse> autoWrapUp(@RequestBody PegaDto.AutoWrapUpRequest req) {
        return ResponseEntity.ok(pegaService.processAutoWrapUp(req.ticketId(), req.transcriptText()));
    }

    @GetMapping("/notes/{ticketId}")
    public ResponseEntity<List<PegaDto.ContactNoteRecord>> getNotes(@PathVariable Long ticketId) {
        List<PegaDto.ContactNoteRecord> notes = List.of(
                new PegaDto.ContactNoteRecord(
                        "not-1",
                        ticketId,
                        "Elena Rostova",
                        "Senior Support Specialist",
                        "GENERAL",
                        "Customer confirmed duplicate charge on invoice #INV-9821. Verified payment gateway logs in Stripe.",
                        "Sep 6, 2026, 2:25 PM",
                        true
                ),
                new PegaDto.ContactNoteRecord(
                        "not-2",
                        ticketId,
                        "Marcus Vance",
                        "Support Supervisor",
                        "COACHING_WHISPER",
                        "Excellent handling of customer frustration. Proactive diagnostic check saved a future return call.",
                        "Sep 6, 2026, 2:32 PM",
                        true
                ),
                new PegaDto.ContactNoteRecord(
                        "not-3",
                        ticketId,
                        "Compliance Guardian Engine",
                        "Automated Audit Bot",
                        "COMPLIANCE_FLAG",
                        "Customer authentication passed ISO-27001 standard. RefID #AUTH-REF-8841-VIP recorded in immutable ledger.",
                        "Sep 6, 2026, 2:38 PM",
                        true
                )
        );
        return ResponseEntity.ok(notes);
    }
}
