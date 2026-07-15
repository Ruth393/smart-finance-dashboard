"""Auto-categorize transactions by matching keywords in the description."""

from sqlalchemy.orm import Session

from backend.app.models.category import Category

# Category name -> keywords (matched case-insensitively against description)
CATEGORY_KEYWORDS: dict[str, list[str]] = {
    "Food": [
        "supermarket",
        "shufersal",
        "rami levy",
        "victory",
        "mega",
        "grocery",
        "market",
        "food",
        "restaurant",
        "cafe",
        "bakery",
        "mcdonald",
        "wolt",
    ],
    "Transport": [
        "gas",
        "delek",
        "fuel",
        "petrol",
        "taxi",
        "uber",
        "gett",
        "bus",
        "train",
        "paz",
        "sonol",
        "ten",
        "parking",
    ],
    "Utilities": [
        "electric",
        "water",
        "gas bill",
        "internet",
        "cellcom",
        "partner",
        "hot",
        "bezeq",
    ],
    "Entertainment": [
        "netflix",
        "spotify",
        "cinema",
        "theater",
        "concert",
        "game",
    ],
}

DEFAULT_CATEGORY_NAME = "Other"


def categorize_description(description: str, categories_by_name: dict[str, Category]) -> int:
    """Return category_id by matching keywords in the transaction description."""
    normalized = description.lower()

    for category_name, keywords in CATEGORY_KEYWORDS.items():
        category = categories_by_name.get(category_name)
        if category is None:
            continue
        if any(keyword in normalized for keyword in keywords):
            return category.id

    other = categories_by_name.get(DEFAULT_CATEGORY_NAME)
    if other is None:
        raise ValueError(f"Default category '{DEFAULT_CATEGORY_NAME}' is not seeded in the database")
    return other.id


def get_categories_by_name(db: Session) -> dict[str, Category]:
    """Build a name -> Category lookup from the database."""
    categories = db.query(Category).all()
    return {category.name: category for category in categories}
