CREATE TABLE clusters (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(120) UNIQUE NOT NULL,
  location VARCHAR(120),
  total_cpu INTEGER,
  total_memory_gb INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE servers (
  id BIGSERIAL PRIMARY KEY,
  hostname VARCHAR(120) UNIQUE NOT NULL,
  ip_address INET UNIQUE NOT NULL,
  os_name VARCHAR(80) NOT NULL,
  os_version VARCHAR(80),
  kernel VARCHAR(80),
  cpu_count INTEGER,
  memory_gb INTEGER,
  cluster VARCHAR(120),
  power_state VARCHAR(20),
  patch_status VARCHAR(20),
  enabled_flag BOOLEAN NOT NULL DEFAULT TRUE,
  last_patch_date DATE,
  last_reboot_time TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE vm_inventory (
  id BIGSERIAL PRIMARY KEY,
  vm_uuid VARCHAR(120) UNIQUE NOT NULL,
  vm_name VARCHAR(120),
  server_id BIGINT REFERENCES servers(id),
  cluster VARCHAR(120),
  power_state VARCHAR(20),
  guest_os VARCHAR(120),
  discovered_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE patch_history (
  id BIGSERIAL PRIMARY KEY,
  server_id BIGINT NOT NULL REFERENCES servers(id),
  patch_job_id VARCHAR(120) NOT NULL,
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

CREATE INDEX idx_servers_hostname ON servers(hostname);
CREATE INDEX idx_servers_ip ON servers(ip_address);
CREATE INDEX idx_servers_cluster ON servers(cluster);
CREATE INDEX idx_servers_patch_status ON servers(patch_status);
