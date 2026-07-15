from __future__ import annotations

from __future__ import annotations

from __future__ import annotations

from datetime import date as DateType
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


class TransactionBase(BaseModel):
    date: DateType
    description: str = Field(min_length=1, max_length=255)
    amount: Decimal = Field(decimal_places=2)
    category_id: int
    source: str = Field(min_length=1, max_length=50)


class TransactionCreate(TransactionBase):
    pass


class TransactionUpdate(BaseModel):
    date: DateType | None = None
    description: str | None = Field(default=None, min_length=1, max_length=255)
    amount: Decimal | None = Field(default=None, decimal_places=2)
    category_id: int | None = None
    source: str | None = Field(default=None, min_length=1, max_length=50)


class TransactionRead(TransactionBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
