"""Placeholder for feature routers.

Example:
    from fastapi import APIRouter, Depends
    from sqlalchemy.orm import Session

    from backend.app.database import get_db

    router = APIRouter(prefix="/transactions", tags=["Transactions"])


    @router.get("/")
    def list_transactions(db: Session = Depends(get_db)):
        ...
"""
