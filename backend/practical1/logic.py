import uuid
from datetime import datetime

RESTAURANT_INFO = {
    "name": "Tasty Restaurant",
    "tagline": "Enjoy Fresh & Delicious Food Every Day",
    "address": "123 Main Road, Nagpur, Maharashtra, India",
    "phone": "+91 98765 43210",
    "email": "tastyrestaurant@gmail.com",
    "opening_hours": "10:00 AM - 11:00 PM (Monday - Sunday)",
    "currency": "INR",
    "currency_symbol": "₹"
}

MENU_ITEMS = [
    {
        "id": "item-01",
        "name": "Pizza",
        "category": "Main Course",
        "price": 299,
        "description": "Cheesy and Delicious hand-tossed pizza with fresh mozzarella and herbs",
        "image": "pizza.jpeg",
        "rating": 4.8,
        "is_veg": True
    },
    {
        "id": "item-02",
        "name": "Burger",
        "category": "Snacks",
        "price": 199,
        "description": "Fresh and tasty crispy veggie patty with creamy mayo and fresh lettuce",
        "image": "burger.jpeg",
        "rating": 4.7,
        "is_veg": True
    },
    {
        "id": "item-03",
        "name": "Pasta",
        "category": "Main Course",
        "price": 249,
        "description": "Italian special penne pasta in rich white and red blended aurora sauce",
        "image": "pasta.jpg",
        "rating": 4.6,
        "is_veg": True
    },
    {
        "id": "item-04",
        "name": "Sandwich",
        "category": "Snacks",
        "price": 149,
        "description": "Grilled Veg Sandwich stuffed with cucumber, tomato, paneer, and cheese",
        "image": "sandwich.jpg",
        "rating": 4.5,
        "is_veg": True
    },
    {
        "id": "item-05",
        "name": "French Fries",
        "category": "Sides",
        "price": 99,
        "description": "Crispy golden salted potato fries served with tangy tomato ketchup",
        "image": "frenchfries.jpg",
        "rating": 4.9,
        "is_veg": True
    },
    {
        "id": "item-06",
        "name": "Noodles",
        "category": "Chinese",
        "price": 179,
        "description": "Spicy Hakka Noodles tossed with crisp cabbage, bell peppers, and scallions",
        "image": "noodles.webp",
        "rating": 4.7,
        "is_veg": True
    },
    {
        "id": "item-07",
        "name": "Cold Coffee",
        "category": "Beverages",
        "price": 149,
        "description": "Loaded chocolate thick cold coffee topped with cocoa powder",
        "image": "coffee.jpg",
        "rating": 4.9,
        "is_veg": True
    },
    {
        "id": "item-08",
        "name": "Ice Cream",
        "category": "Desserts",
        "price": 120,
        "description": "Double scoop artisanal chocolate and Madagascar vanilla ice cream",
        "image": "ice cream.jpeg",
        "rating": 4.8,
        "is_veg": True
    }
]

# Memory storage for orders and reservations
ORDERS = []
RESERVATIONS = []


def get_all_menu_items(category=None):
    """Retrieve all menu items, optionally filtered by category"""
    if category:
        return [item for item in MENU_ITEMS if item["category"].lower() == category.lower()]
    return MENU_ITEMS


def get_menu_item_by_id(item_id):
    """Retrieve single item by id, code, or name"""
    if item_id is None:
        return None
    item_id_str = str(item_id).strip().lower()

    # Try numeric index formatted as item-0X
    formatted_id = None
    if item_id_str.isdigit():
        formatted_id = f"item-{int(item_id_str):02d}"

    for item in MENU_ITEMS:
        item_id_val = str(item["id"]).lower()
        if (item_id_val == item_id_str or 
            item_id_val == formatted_id or 
            item["name"].lower() == item_id_str):
            return item
    return None


def calculate_order(order_data):
    """Process customer order and calculate pricing"""
    items = order_data.get("items", [])
    if not items:
        return {"success": False, "message": "Order must contain at least one item."}

    customer_name = order_data.get("customer_name", "Guest")
    contact = order_data.get("contact", "")
    table_or_address = order_data.get("table_number") or order_data.get("delivery_address", "Table 1")

    subtotal = 0
    detailed_items = []

    for entry in items:
        item_id = entry.get("id") or entry.get("item_id")
        quantity = int(entry.get("quantity", 1))
        menu_item = get_menu_item_by_id(item_id)
        if not menu_item:
            return {"success": False, "message": f"Menu item '{item_id}' not found."}

        item_total = menu_item["price"] * quantity
        subtotal += item_total
        detailed_items.append({
            "id": menu_item["id"],
            "name": menu_item["name"],
            "price": menu_item["price"],
            "quantity": quantity,
            "total": item_total
        })

    gst = round(subtotal * 0.05, 2)  # 5% GST
    grand_total = round(subtotal + gst, 2)
    order_id = f"ORD-{uuid.uuid4().hex[:8].upper()}"

    record = {
        "order_id": order_id,
        "customer_name": customer_name,
        "contact": contact,
        "location": table_or_address,
        "items": detailed_items,
        "subtotal": subtotal,
        "gst": gst,
        "grand_total": grand_total,
        "status": "Confirmed",
        "created_at": datetime.now().isoformat()
    }
    ORDERS.append(record)

    return {
        "success": True,
        "message": "Order successfully placed!",
        "order": record
    }


def make_reservation(reservation_data):
    """Process table reservation"""
    name = reservation_data.get("name", "").strip()
    phone = reservation_data.get("phone", "").strip()
    date = reservation_data.get("date", "").strip()
    time_slot = reservation_data.get("time", "").strip()
    guests = int(reservation_data.get("guests", 2))

    if not name or not phone or not date:
        return {"success": False, "message": "Name, phone, and date are required."}

    reservation_id = f"RES-{uuid.uuid4().hex[:6].upper()}"
    record = {
        "reservation_id": reservation_id,
        "name": name,
        "phone": phone,
        "date": date,
        "time": time_slot or "7:30 PM",
        "guests": guests,
        "status": "Confirmed",
        "created_at": datetime.now().isoformat()
    }
    RESERVATIONS.append(record)

    return {
        "success": True,
        "message": f"Table reserved for {guests} guests on {date} at {record['time']}.",
        "reservation": record
    }
