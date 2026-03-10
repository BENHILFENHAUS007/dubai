from fastapi import FastAPI
from app.api.routes import router
from app.core.config import settings
from app.db.database import Base, engine

app = FastAPI(title=settings.app_name)
app.include_router(router)


@app.on_event('startup')
def startup() -> None:
    Base.metadata.create_all(bind=engine)


@app.get('/health')
def health():
    return {'status': 'ok', 'service': settings.app_name}
