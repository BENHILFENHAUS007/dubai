package com.example.devops.controller;

import com.example.devops.service.InventorySyncService;
import java.util.Map;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class SyncController {
    private final InventorySyncService inventorySyncService;

    public SyncController(InventorySyncService inventorySyncService) {
        this.inventorySyncService = inventorySyncService;
    }

    @PostMapping("/sync-inventory")
    @PreAuthorize("hasAnyRole('ADMIN','OPERATOR')")
    public Map<String, String> sync() {
        inventorySyncService.syncFromAnsibleAndVsphere();
        return Map.of("message", "Sync triggered");
    }

    @GetMapping("/vm-inventory")
    public Map<String, Object> vmInventory() {
        return inventorySyncService.getSyncStatus();
    }
}
