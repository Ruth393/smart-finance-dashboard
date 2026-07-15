from __future__ import annotations

from __future__ import annotations

from __future__ import annotations

from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


class BudgetBase(BaseModel):
    category_id: int
    monthly_limit: Decimal = Field(decimal_places=2)
    year_month: str = Field(pattern=r"^\d{4}-\d{2}$")


class BudgetCreate(BudgetBase):
    pass


class BudgetUpdate(BaseModel):
    monthly_limit: Decimal | None = Field(default=None, decimal_places=2)


class BudgetRead(BudgetBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
