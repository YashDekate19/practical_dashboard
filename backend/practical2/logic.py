import uuid
from datetime import datetime

PRODUCTS = [
    {
        "id": "prod-01",
        "name": "Gaming Laptop",
        "category": "Laptops & Computers",
        "old_price": 80000,
        "new_price": 65000,
        "discount": "20% OFF",
        "image": "gaming laptop.webp",
        "stock": 14,
        "rating": 4.9,
        "description": "High-performance Intel i7 13th Gen, RTX 4060 graphics, 16GB DDR5, 1TB NVMe SSD."
    },
    {
        "id": "prod-02",
        "name": "Premium Smartphone",
        "category": "Mobiles & Tablets",
        "old_price": 35000,
        "new_price": 27999,
        "discount": "25% OFF",
        "image": "smartPhone.jpeg",
        "stock": 25,
        "rating": 4.8,
        "description": "6.7-inch AMOLED 120Hz display, 50MP OIS camera, 5000mAh battery with 67W Turbo Charge."
    },
    {
        "id": "prod-03",
        "name": "Wireless Headphones",
        "category": "Audio & Sound",
        "old_price": 5000,
        "new_price": 2999,
        "discount": "40% OFF",
        "image": "headPhone.webp",
        "stock": 42,
        "rating": 4.7,
        "description": "Active Noise Cancellation (ANC), 40-hour battery life, deep bass 40mm dynamic drivers."
    },
    {
        "id": "prod-04",
        "name": "Smart Watch",
        "category": "Wearables",
        "old_price": 8000,
        "new_price": 4999,
        "discount": "35% OFF",
        "image": "smartWatch.webp",
        "stock": 30,
        "rating": 4.6,
        "description": "1.4-inch AMOLED dial, continuous SpO2 & Heart Rate monitoring, Bluetooth calling, 7-day battery."
    },
    {
        "id": "prod-05",
        "name": "DSLR Professional Camera",
        "category": "Cameras & Photography",
        "old_price": 55000,
        "new_price": 44999,
        "discount": "18% OFF",
        "image": "dslr.jpeg",
        "stock": 8,
        "rating": 4.9,
        "description": "24.1 MP APS-C sensor, 4K video recording, dual pixel autofocus with 18-55mm lens kit."
    },
    {
        "id": "prod-06",
        "name": "4K Ultra HD Smart TV",
        "category": "Televisions",
        "old_price": 45000,
        "new_price": 34999,
        "discount": "22% OFF",
        "image": "tv.jpeg",
        "stock": 12,
        "rating": 4.8,
        "description": "55-inch 4K HDR10+ Dolby Vision display with Dolby Atmos 30W sound and Google TV OS."
    },
    {
        "id": "prod-07",
        "name": "Mechanical RGB Keyboard",
        "category": "Computer Accessories",
        "old_price": 4500,
        "new_price": 2799,
        "discount": "38% OFF",
        "image": "keyboard.jpeg",
        "stock": 35,
        "rating": 4.7,
        "description": "Hot-swappable tactile mechanical blue switches with customizable per-key RGB backlighting."
    },
    {
        "id": "prod-08",
        "name": "Wireless Ergonomic Mouse",
        "category": "Computer Accessories",
        "old_price": 2000,
        "new_price": 1199,
        "discount": "40% OFF",
        "image": "Wmouse.jpeg",
        "stock": 50,
        "rating": 4.6,
        "description": "Dual mode 2.4GHz + Bluetooth 5.0 wireless mouse with silent clicks and 2400 adjustable DPI."
    },
    {
        "id": "prod-09",
        "name": "Gaming Console Next-Gen",
        "category": "Gaming",
        "old_price": 54990,
        "new_price": 48990,
        "discount": "11% OFF",
        "image": "console.jpg",
        "stock": 6,
        "rating": 4.9,
        "description": "True 4K 120fps gaming with custom 825GB ultra-high-speed SSD and haptic wireless controller."
    },
    {
        "id": "prod-10",
        "name": "Ultra-Slim Pro Tablet",
        "category": "Mobiles & Tablets",
        "old_price": 28000,
        "new_price": 21999,
        "discount": "21% OFF",
        "image": "tab.jpeg",
        "stock": 18,
        "rating": 4.7,
        "description": "11-inch 2K IPS display, quad stereo speakers, Stylus Pen support, and Snapdragon 870 chipset."
    },
    {
        "id": "prod-11",
        "name": "27-inch Curved Gaming Monitor",
        "category": "Laptops & Computers",
        "old_price": 22000,
        "new_price": 16499,
        "discount": "25% OFF",
        "image": "monitor.webp",
        "stock": 16,
        "rating": 4.8,
        "description": "1500R curvature, 165Hz refresh rate, 1ms response time, AMD FreeSync Premium support."
    },
    {
        "id": "prod-12",
        "name": "TWS Noise-Cancelling Earbuds",
        "category": "Audio & Sound",
        "old_price": 3999,
        "new_price": 1899,
        "discount": "52% OFF",
        "image": "earbud.jpeg",
        "stock": 60,
        "rating": 4.5,
        "description": "Environmental Noise Cancellation for calls, IPX5 water resistance, low latency gaming mode."
    },
    {
        "id": "prod-13",
        "name": "20000mAh Fast Power Bank",
        "category": "Accessories",
        "old_price": 2500,
        "new_price": 1499,
        "discount": "40% OFF",
        "image": "powerBank.jpeg",
        "stock": 45,
        "rating": 4.7,
        "description": "22.5W two-way fast charging with triple output ports (Type-C + Dual USB-A) and LED indicator."
    },
    {
        "id": "prod-14",
        "name": "Gigabit Dual-Band Wi-Fi Router",
        "category": "Networking",
        "old_price": 3200,
        "new_price": 1999,
        "discount": "37% OFF",
        "image": "router.jpeg",
        "stock": 28,
        "rating": 4.6,
        "description": "AC1200 high-speed wireless speeds with 4 high-gain antennas and beamforming technology."
    },
    {
        "id": "prod-15",
        "name": "All-in-One Wireless Ink Tank Printer",
        "category": "Laptops & Computers",
        "old_price": 16000,
        "new_price": 12999,
        "discount": "18% OFF",
        "image": "printer.webp",
        "stock": 11,
        "rating": 4.5,
        "description": "Print, Scan, Copy with low-cost ultra-high yield ink bottles and Wi-Fi Direct mobile printing."
    },
    {
        "id": "prod-16",
        "name": "Deep-Bass Bluetooth Party Speaker",
        "category": "Audio & Sound",
        "old_price": 6000,
        "new_price": 3799,
        "discount": "36% OFF",
        "image": "speaker.webp",
        "stock": 22,
        "rating": 4.7,
        "description": "24W stereo output with punchy bass radiators, multi-color LED beat sync, and IPX7 waterproofing."
    }
]

ORDERS_STORE = []


def get_all_products(category=None, max_price=None):
    """Retrieve catalog products, optionally filtered"""
    results = PRODUCTS
    if category:
        results = [p for p in results if category.lower() in p["category"].lower()]
    if max_price:
        try:
            val = float(max_price)
            results = [p for p in results if p["new_price"] <= val]
        except ValueError:
            pass
    return results


def get_product_by_id(product_id):
    """Find a product by its id"""
    for p in PRODUCTS:
        if p["id"] == product_id or p["name"].lower() == product_id.lower():
            return p
    return None


def get_special_offers():
    """Retrieve products that have special offers"""
    return [p for p in PRODUCTS if "OFF" in p["discount"]]


def search_products(query):
    """Search products across name, category, and description"""
    if not query:
        return PRODUCTS
    q = query.lower().strip()
    return [
        p for p in PRODUCTS
        if q in p["name"].lower() or q in p["category"].lower() or q in p["description"].lower()
    ]


def calculate_cart(cart_items, coupon=None):
    """Calculate cart pricing with tax and promotional coupons"""
    if not cart_items:
        return {"success": False, "message": "Cart is empty."}

    subtotal = 0
    items_summary = []

    for item in cart_items:
        pid = item.get("id") or item.get("product_id")
        qty = int(item.get("quantity", 1))
        product = get_product_by_id(pid)
        if not product:
            return {"success": False, "message": f"Product '{pid}' not found."}

        item_total = product["new_price"] * qty
        subtotal += item_total
        items_summary.append({
            "id": product["id"],
            "name": product["name"],
            "unit_price": product["new_price"],
            "quantity": qty,
            "total": item_total
        })

    discount_amount = 0
    applied_coupon = None
    if coupon:
        code = coupon.upper().strip()
        if code == "SUMMER50":
            discount_amount = min(500, round(subtotal * 0.10, 2))  # 10% up to 500
            applied_coupon = code
        elif code == "SHOEASY20":
            discount_amount = min(1000, round(subtotal * 0.20, 2))  # 20% up to 1000
            applied_coupon = code

    delivery_charge = 0 if subtotal > 999 else 99
    grand_total = round(subtotal - discount_amount + delivery_charge, 2)

    return {
        "success": True,
        "items": items_summary,
        "subtotal": subtotal,
        "discount": discount_amount,
        "applied_coupon": applied_coupon,
        "delivery_charge": delivery_charge,
        "grand_total": grand_total
    }


def process_checkout(checkout_data):
    """Create order and simulate checkout"""
    cart = checkout_data.get("cart", [])
    calculation = calculate_cart(cart, checkout_data.get("coupon"))
    if not calculation.get("success"):
        return calculation

    shipping = checkout_data.get("shipping_address", {})
    name = shipping.get("name", "Customer")
    phone = shipping.get("phone", "")
    address = shipping.get("address", "")

    order_id = f"SHOP-{uuid.uuid4().hex[:8].upper()}"
    record = {
        "order_id": order_id,
        "customer": {"name": name, "phone": phone, "address": address},
        "order_summary": calculation,
        "payment_method": checkout_data.get("payment_method", "Cash on Delivery"),
        "status": "Order Placed",
        "created_at": datetime.now().isoformat()
    }
    ORDERS_STORE.append(record)

    return {
        "success": True,
        "message": "Order successfully placed with ShopEasy!",
        "order_id": order_id,
        "order": record
    }
