from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    app_name: str = "Smart Finance Dashboard API"
    app_version: str = "0.1.0"
    debug: bool = True

    # SQLite for local development; override with DATABASE_URL in production.
    database_url: str = "sqlite:///./smart_finance.db"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
