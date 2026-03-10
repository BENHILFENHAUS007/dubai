# Infra Control Center (Open-Source Internal DevOps Dashboard)

Production-oriented blueprint and starter implementation for an **air-gapped internal infrastructure control center** integrating VMware vSphere and Ansible automation.

## 1) System Architecture Diagram

```mermaid
flowchart LR
  U[Admin / Operator / Viewer] --> PWA[React PWA UI]
  PWA --> API[Spring Boot API on Tomcat]
  API --> PG[(PostgreSQL)]
  API --> SCHED[Inventory Sync Service]
  SCHED --> VS[vSphere API (read-only service account)]
  SCHED --> AF[Ansible Facts JSON / Callback]
  AF --> PLAY[Ansible Patch Playbooks]
  API --> RBAC[Role-based Access Control]
```

## 2) Backend API Structure

- `GET /api/servers` — searchable server inventory with pagination.
- `GET /api/vm-inventory` — VM sync status/result summary.
- `GET /api/patch-status` — compliance counters.
- `POST /api/sync-inventory` — trigger sync job from vSphere + Ansible facts.
- `POST /api/admin/update-server/{id}` — admin/operator metadata update.

## 3) Frontend Component Structure

- `NavBar` with top links + macOS-style dock hover animation.
- `DashboardPage` hero + animated metric cards + charts.
- `InventoryPage` filter/search/export table layout.
- `AdminPage` toggle controls and manual update UX.
- `ThemeContext` dark/light theme switching with animated transitions.

## 4) Database Schema

Core tables provided in `docs/schema.sql`:
- `servers`
- `patch_history`
- `vm_inventory`
- `clusters`
- `snapshots`

## Ansible integration
Use `ansible/server_fact_push.yml` to collect:
- hostname, IP, OS, kernel, CPU, memory, uptime context
Then push JSON to `POST /api/server-update`.

## Run backend (internal network)
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Environment variables (never commit secrets):
- `DB_URL`
- `JWT_SECRET`
- `VSPHERE_HOST`
- `VSPHERE_USERNAME`
- `VSPHERE_PASSWORD`
- `ANSIBLE_FACTS_PATH`

## Build frontend
## 5) Example Integrations

- VMware: `scripts/vsphere_sync.py` using `pyVmomi`.
- Ansible post-patch callback: `scripts/ansible_post_patch_sync.sh`.
- Sync endpoint in backend: `POST /api/sync-inventory`.

## 6) Security Notes

- Use read-only vSphere service account.
- Credentials pulled from environment variables (`VSPHERE_*`, `DB_*`).
- No credentials hardcoded in application sources.

## 7) Apache Tomcat Deployment

1. Build WAR:
   ```bash
   cd backend
   mvn clean package
   ```
2. Copy `target/infra-control-center-1.0.0.war` to `$CATALINA_BASE/webapps/`.
3. Set environment vars in `setenv.sh` or systemd unit:
   - `DB_URL`, `DB_USER`, `DB_PASSWORD`
   - `VSPHERE_HOST`, `VSPHERE_USERNAME`, `VSPHERE_PASSWORD`
   - `ANSIBLE_FACTS_PATH`
4. Restart Tomcat and verify `/actuator/health`.

## 8) PWA Setup

Already included in `frontend`:
- `manifest.webmanifest`
- `sw.js` service worker cache + offline fallback
- `offline.html`
- Responsive Tailwind layout

Build:
```bash
cd frontend
npm install
npm run build
```

## 9) Scale and Performance

Recommendations for 1000+ server scale:
- Add DB indexes on `hostname`, `ip_address`, `cluster_name`, `patch_status`.
- Cache dashboard aggregates (Redis optional for larger scale).
- Use async sync workers and batch upserts.
- Enable pagination for all table endpoints.

## 10) License

Use Apache-2.0 or MIT for free commercial use.
