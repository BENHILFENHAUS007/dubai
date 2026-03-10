CREATE TABLE clusters (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  location VARCHAR(100),
  total_cpu INTEGER,
  total_memory_gb INTEGER
);

CREATE TABLE servers (
  id BIGSERIAL PRIMARY KEY,
  hostname VARCHAR(100) UNIQUE NOT NULL,
  ip_address INET UNIQUE NOT NULL,
  os_name VARCHAR(80) NOT NULL,
  os_version VARCHAR(80),
  cpu_count INTEGER,
  memory_gb INTEGER,
  cluster_name VARCHAR(100),
  vm_power_state VARCHAR(20),
  patch_status VARCHAR(20),
  enabled_flag BOOLEAN NOT NULL DEFAULT TRUE,
  patch_automation_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  last_patch_date DATE,
  last_reboot_time TIMESTAMPTZ
);

CREATE TABLE vm_inventory (
  id BIGSERIAL PRIMARY KEY,
  vm_uuid VARCHAR(100) UNIQUE NOT NULL,
  server_id BIGINT REFERENCES servers(id),
  vcenter_name VARCHAR(120),
  datacenter VARCHAR(120),
  cluster_name VARCHAR(120),
  tools_status VARCHAR(40),
  discovered_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE patch_history (
  id BIGSERIAL PRIMARY KEY,
  server_id BIGINT NOT NULL REFERENCES servers(id),
  job_id VARCHAR(80) NOT NULL,
  status VARCHAR(20) NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,
  details TEXT
);

CREATE TABLE snapshots (
  id BIGSERIAL PRIMARY KEY,
  server_id BIGINT NOT NULL REFERENCES servers(id),
  snapshot_name VARCHAR(120) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  size_gb NUMERIC(10,2),
  expires_at TIMESTAMPTZ
);
