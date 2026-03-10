package com.example.devops.controller;

import com.example.devops.dto.ServerUpdateRequest;
import com.example.devops.model.ServerEntity;
import com.example.devops.repository.ServerRepository;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ServerController {

    private final ServerRepository serverRepository;

    public ServerController(ServerRepository serverRepository) {
        this.serverRepository = serverRepository;
    }

    @GetMapping("/servers")
    public Page<ServerEntity> servers(@RequestParam(defaultValue = "") String q,
                                      @RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "20") int size) {
        return serverRepository.findByHostnameContainingIgnoreCaseOrIpAddressContainingIgnoreCase(
                q, q, PageRequest.of(page, size));
    }

    @PostMapping("/admin/update-server/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','OPERATOR')")
    public ResponseEntity<ServerEntity> update(@PathVariable Long id, @Valid @RequestBody ServerUpdateRequest request) {
        return serverRepository.findById(id).map(server -> {
            server.setHostname(request.hostname());
            server.setIpAddress(request.ipAddress());
            server.setOsName(request.osName());
            server.setOsVersion(request.osVersion());
            server.setCpuCount(request.cpuCount());
            server.setMemoryGb(request.memoryGb());
            server.setCluster(request.cluster());
            server.setVmPowerState(request.vmPowerState());
            server.setPatchStatus(request.patchStatus());
            server.setEnabledFlag(request.enabledFlag());
            server.setPatchAutomationEnabled(request.patchAutomationEnabled());
            return ResponseEntity.ok(serverRepository.save(server));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/patch-status")
    public Map<String, Long> patchStatus() {
        long total = serverRepository.count();
        return Map.of("totalServers", total, "pendingUpdates", Math.max(0, total / 4), "failedPatchJobs", Math.max(0, total / 20));
    }
}
