from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.app.models.transaction import Transaction
from backend.app.schemas.transaction import TransactionCreate, TransactionUpdate


def create_transaction(db: Session, *, user_id: int, transaction_in: TransactionCreate) -> Transaction:
    transaction = Transaction(user_id=user_id, **transaction_in.model_dump())
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return transaction


def get_transaction(db: Session, transaction_id: int) -> Transaction | None:
    return db.get(Transaction, transaction_id)


def get_transactions_by_user(
    db: Session,
    user_id: int,
    *,
    skip: int = 0,
    limit: int = 100,
) -> list[Transaction]:
    stmt = (
        select(Transaction)
        .where(Transaction.user_id == user_id)
        .order_by(Transaction.date.desc(), Transaction.id.desc())
        .offset(skip)
        .limit(limit)
    )
    return list(db.scalars(stmt).all())


def update_transaction(
    db: Session,
    transaction: Transaction,
    transaction_in: TransactionUpdate,
) -> Transaction:
    update_data = transaction_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(transaction, field, value)
    db.commit()
    db.refresh(transaction)
    return transaction


def delete_transaction(db: Session, transaction: Transaction) -> None:
    db.delete(transaction)
    db.commit()
