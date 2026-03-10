from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.core.security import require_permission
from app.db.database import get_db
from app.models.entities import Server
from app.models.schemas import ServerResponse, ServerUpsert
from app.services.inventory_sync import trigger_inventory_sync

router = APIRouter(prefix='/api', tags=['inventory'])


@router.post('/server-update', response_model=ServerResponse)
def server_update(payload: ServerUpsert, db: Session = Depends(get_db), _: str = Depends(require_permission('sync'))):
    server = db.query(Server).filter((Server.hostname == payload.hostname) | (Server.ip_address == payload.ip_address)).first()
    if not server:
        server = Server(**payload.model_dump())
        db.add(server)
    else:
        for k, v in payload.model_dump().items():
            setattr(server, k, v)
    db.commit()
    db.refresh(server)
    return server


@router.get('/servers', response_model=list[ServerResponse])
def get_servers(q: str = '', os_name: str | None = None, cluster: str | None = None, skip: int = 0, limit: int = 25, db: Session = Depends(get_db), _: str = Depends(require_permission('read'))):
    query = db.query(Server)
    if q:
        like = f'%{q}%'
        query = query.filter((Server.hostname.ilike(like)) | (Server.ip_address.ilike(like)))
    if os_name:
        query = query.filter(Server.os_name == os_name)
    if cluster:
        query = query.filter(Server.cluster == cluster)
    return query.offset(skip).limit(limit).all()


@router.get('/patch-status')
def patch_status(db: Session = Depends(get_db), _: str = Depends(require_permission('read'))):
    total = db.query(func.count(Server.id)).scalar() or 0
    patched = db.query(func.count(Server.id)).filter(Server.patch_status == 'patched').scalar() or 0
    failed = db.query(func.count(Server.id)).filter(Server.patch_status == 'failed').scalar() or 0
    pending = max(total - patched - failed, 0)
    return {'total_servers': total, 'patched_today': patched, 'pending_updates': pending, 'failed_patch_jobs': failed}


@router.get('/vm-inventory')
def vm_inventory(_: str = Depends(require_permission('read'))):
    return {'summary': {'total_vms': 148, 'powered_on': 131, 'powered_off': 17}}


@router.post('/sync-inventory')
def sync_inventory(_: str = Depends(require_permission('sync'))):
    return trigger_inventory_sync()


@router.put('/admin/update-server/{server_id}', response_model=ServerResponse)
def admin_update_server(server_id: int, payload: ServerUpsert, db: Session = Depends(get_db), _: str = Depends(require_permission('write'))):
    server = db.query(Server).filter(Server.id == server_id).first()
    if not server:
        raise HTTPException(status_code=404, detail='Server not found')
    for k, v in payload.model_dump().items():
        setattr(server, k, v)
    db.commit()
    db.refresh(server)
    return server


@router.delete('/admin/server/{server_id}')
def delete_server(server_id: int, db: Session = Depends(get_db), _: str = Depends(require_permission('write'))):
    server = db.query(Server).filter(Server.id == server_id).first()
    if not server:
        raise HTTPException(status_code=404, detail='Server not found')
    db.delete(server)
    db.commit()
    return {'deleted': True, 'server_id': server_id}
