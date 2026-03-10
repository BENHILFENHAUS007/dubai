package com.example.devops.repository;

import com.example.devops.model.ServerEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServerRepository extends JpaRepository<ServerEntity, Long> {
    Page<ServerEntity> findByHostnameContainingIgnoreCaseOrIpAddressContainingIgnoreCase(
            String hostname, String ipAddress, Pageable pageable);
}
