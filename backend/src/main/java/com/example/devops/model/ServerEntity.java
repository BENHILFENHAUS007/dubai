package com.example.devops.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "servers")
public class ServerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String hostname;

    @Column(name = "ip_address", nullable = false, unique = true)
    private String ipAddress;

    @Column(name = "os_name", nullable = false)
    private String osName;

    @Column(name = "os_version")
    private String osVersion;

    @Column(name = "cpu_count")
    private Integer cpuCount;

    @Column(name = "memory_gb")
    private Integer memoryGb;

    @Column(name = "cluster_name")
    private String cluster;

    @Column(name = "vm_power_state")
    private String vmPowerState;

    @Column(name = "patch_status")
    private String patchStatus;

    @Column(name = "enabled_flag", nullable = false)
    private Boolean enabledFlag = true;

    @Column(name = "patch_automation_enabled", nullable = false)
    private Boolean patchAutomationEnabled = true;

    @Column(name = "last_patch_date")
    private LocalDate lastPatchDate;

    @Column(name = "last_reboot_time")
    private Instant lastRebootTime;
}
