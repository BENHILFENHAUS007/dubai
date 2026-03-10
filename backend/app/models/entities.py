from sqlalchemy import Boolean, Column, Date, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from app.db.database import Base


class Server(Base):
    __tablename__ = 'servers'
    id = Column(Integer, primary_key=True)
    hostname = Column(String(120), unique=True, nullable=False, index=True)
    ip_address = Column(String(45), unique=True, nullable=False, index=True)
    os_name = Column(String(80), nullable=False)
    os_version = Column(String(80))
    kernel = Column(String(80))
    cpu_count = Column(Integer)
    memory_gb = Column(Integer)
    cluster = Column(String(100), index=True)
    power_state = Column(String(20), default='poweredOn')
    patch_status = Column(String(20), default='pending', index=True)
    enabled_flag = Column(Boolean, default=True)
    last_patch_date = Column(Date)
    last_reboot_time = Column(DateTime(timezone=True))


class PatchHistory(Base):
    __tablename__ = 'patch_history'
    id = Column(Integer, primary_key=True)
    server_id = Column(Integer, ForeignKey('servers.id'), nullable=False)
    status = Column(String(20), nullable=False)
    details = Column(Text)
    created_at = Column(DateTime(timezone=True))
    server = relationship('Server')
