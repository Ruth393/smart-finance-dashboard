from decimal import Decimal

from sqlalchemy import ForeignKey, Numeric, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.app.database import Base


class Budget(Base):
    __tablename__ = "budgets"
    __table_args__ = (
        UniqueConstraint("user_id", "category_id", "year_month", name="uq_budget_user_category_month"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"), index=True)
    monthly_limit: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    year_month: Mapped[str] = mapped_column(String(7), nullable=False)

    user: Mapped["User"] = relationship(back_populates="budgets")
    category: Mapped["Category"] = relationship(back_populates="budgets")
