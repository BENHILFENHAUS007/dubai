export const servers = Array.from({ length: 53 }).map((_, i) => ({
  id: i + 1,
  hostname: `rhel-srv-${String(i + 1).padStart(3, '0')}`,
  ip: `10.20.${Math.floor((i + 10) / 255)}.${(i % 255) + 10}`,
  os: i % 3 === 0 ? 'RHEL 9.6' : i % 3 === 1 ? 'Ubuntu 22.04' : 'SLES 15',
  cpu: [2, 4, 8][i % 3],
  memory: [8, 16, 32][i % 3],
  cluster: ['CBD-PRD-A', 'CBD-PRD-B', 'CBD-DR'][i % 3],
  patch: i % 5 === 0 ? 'failed' : i % 4 === 0 ? 'pending' : 'patched',
  reboot: `2026-03-${String((i % 28) + 1).padStart(2, '0')} 02:${String(i % 59).padStart(2, '0')}`
}));
