from datetime import datetime


def trigger_inventory_sync() -> dict:
    return {
        'status': 'queued',
        'message': 'Inventory sync requested from Ansible facts + vSphere.',
        'requested_at': datetime.utcnow().isoformat() + 'Z',
    }
