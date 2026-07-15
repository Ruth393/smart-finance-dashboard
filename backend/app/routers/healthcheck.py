from fastapi import APIRouter

from backend.app.config import settings
from backend.app.schemas.health import HealthResponse

router = APIRouter(tags=["Health"])


@router.get("/health", response_model=HealthResponse)
def health_check() -> HealthResponse:
    """Return application health status."""
    return HealthResponse(
        status="ok",
        app_name=settings.app_name,
        version=settings.app_version,
    )
