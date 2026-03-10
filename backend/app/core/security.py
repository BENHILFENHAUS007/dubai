from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

security = HTTPBearer(auto_error=False)

ROLE_PERMISSIONS = {
    'Admin': {'read', 'write', 'sync', 'users'},
    'Operator': {'read', 'sync'},
    'Viewer': {'read'},
}


def get_role(credentials: HTTPAuthorizationCredentials | None = Depends(security)) -> str:
    if not credentials:
        return 'Viewer'
    token = credentials.credentials.lower()
    if token in {'admin', 'operator', 'viewer'}:
        return token.capitalize()
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid token role')


def require_permission(permission: str):
    def checker(role: str = Depends(get_role)) -> str:
        if permission not in ROLE_PERMISSIONS.get(role, set()):
            raise HTTPException(status_code=403, detail=f'{role} cannot perform {permission}')
        return role

    return checker
