package com.example.devops.dto;

import jakarta.validation.constraints.NotBlank;

public record ServerUpdateRequest(
        @NotBlank String hostname,
        @NotBlank String ipAddress,
        @NotBlank String osName,
        String osVersion,
        Integer cpuCount,
        Integer memoryGb,
        String cluster,
        String vmPowerState,
        String patchStatus,
        Boolean enabledFlag,
        Boolean patchAutomationEnabled) {}
