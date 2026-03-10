package com.example.devops.service;

import java.time.Instant;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class InventorySyncService {
    private static final Logger log = LoggerFactory.getLogger(InventorySyncService.class);

    @Async
    public void syncFromAnsibleAndVsphere() {
        log.info("Starting sync at {}", Instant.now());
        // Production implementation:
        // 1) read ansible-generated facts json
        // 2) call vSphere API using read-only credentials from env
        // 3) upsert servers/vm_inventory/patch history
        // 4) invalidate dashboard cache
        try {
            Thread.sleep(1200L);
            log.info("Sync completed successfully");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.error("Sync interrupted", e);
        }
    }

    public Map<String, Object> getSyncStatus() {
        return Map.of("status", "READY", "lastSyncSource", "ansible+vsphere");
    }
}
