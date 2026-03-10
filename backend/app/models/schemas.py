from datetime import date, datetime
from pydantic import BaseModel


class ServerUpsert(BaseModel):
    hostname: str
    ip_address: str
    os_name: str
    os_version: str | None = None
    kernel: str | None = None
    cpu_count: int | None = None
    memory_gb: int | None = None
    cluster: str | None = None
    power_state: str = 'poweredOn'
    patch_status: str = 'pending'
    enabled_flag: bool = True
    last_patch_date: date | None = None
    last_reboot_time: datetime | None = None


class ServerResponse(ServerUpsert):
    id: int

    class Config:
        from_attributes = True
