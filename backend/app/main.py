from contextlib import asynccontextmanager
from collections.abc import AsyncIterator

from fastapi import FastAPI

import backend.app.models  # noqa: F401 — register ORM models before init_db()
from backend.app.config import settings
from backend.app.database import init_db
from backend.app.routers import health_router


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    """Application startup and shutdown hooks."""
    init_db()
    yield


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    debug=settings.debug,
    lifespan=lifespan,
)

app.include_router(health_router)


@app.get("/", tags=["Root"])
def root() -> dict[str, str]:
    """Root health-check endpoint."""
    return {
        "status": "ok",
        "message": f"{settings.app_name} is running",
        "version": settings.app_version,
    }
