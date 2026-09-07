package com.supportos.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminConfigController {

    private final AdminConfigService adminConfigService;

    public AdminConfigController(AdminConfigService adminConfigService) {
        this.adminConfigService = adminConfigService;
    }

    @GetMapping("/config")
    public ResponseEntity<AdminConfigDto.AdminConfigPayload> getConfig() {
        return ResponseEntity.ok(adminConfigService.getConfig());
    }

    @PostMapping("/config")
    public ResponseEntity<AdminConfigDto.AdminConfigPayload> updateConfig(@RequestBody AdminConfigDto.AdminConfigPayload payload) {
        return ResponseEntity.ok(adminConfigService.updateConfig(payload));
    }

    @GetMapping("/dispositions")
    public ResponseEntity<List<AdminConfigDto.DispositionCategory>> getDispositions(
            @RequestParam(required = false) String tier
    ) {
        return ResponseEntity.ok(adminConfigService.getDispositionsForTier(tier));
    }
}
