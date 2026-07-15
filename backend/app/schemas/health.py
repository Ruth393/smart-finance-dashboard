from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    """Health-check response payload."""

    status: str = Field(..., examples=["ok"])
    app_name: str
    version: str
