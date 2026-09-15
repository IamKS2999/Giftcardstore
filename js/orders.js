window.GCS = window.GCS || {};

GCS.getOrders = function() {
    try {
        return JSON.parse(
            localStorage.getItem("giftCardOrders")
        ) || [];
    } catch {
        return [];
    }
};

GCS.saveOrder = function(order) {
    const orders = GCS.getOrders();

    orders.unshift(order);

    localStorage.setItem(
        "giftCardOrders",
        JSON.stringify(orders)
    );
};

GCS.openOrders = function() {
    if (!GCS.isLoggedIn()) {
        GCS.openLogin();
        return;
    }

    GCS.loadOrders();

    document.getElementById("ordersOverlay").style.display = "flex";
};

GCS.closeOrders = function() {
    document.getElementById("ordersOverlay").style.display = "none";
};

GCS.loadOrders = function() {
    const container = document.getElementById("ordersList");
    const orders = GCS.getOrders();

    if (!orders.length) {
        container.innerHTML = `
            <div class="empty-orders">
                <div class="empty-orders-icon">🛍️</div>
                <h3>No orders yet</h3>
                <br>
                <p>Your completed orders will appear here.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = "";

    orders.forEach((order, index) => {
        const card = document.createElement("div");

        card.className = "order-card";

        card.innerHTML = `
            <div class="order-card-top">
                <span class="order-card-brand">
                    ${order.brand}
                </span>

                <span class="status">
                    ${order.status}
                </span>
            </div>

            <strong>
                ${order.value} Gift Card
            </strong>

            <div class="order-card-row">
                <span>Amount</span>
                <span>${order.price}</span>
            </div>

            <div class="order-card-row">
                <span>Discount</span>
                <span>${order.discount}</span>
            </div>

            <div class="order-card-row">
                <span>Order ID</span>
                <span class="order-id">${order.id}</span>
            </div>

            <div class="order-card-row">
                <span>Date</span>
                <span class="order-id">${order.date}</span>
            </div>

            <button
                class="details-button"
                onclick="GCS.viewOrder(${index})"
            >
                View Order Details
            </button>
        `;

        container.appendChild(card);
    });
};

GCS.viewOrder = function(index) {
    const orders = GCS.getOrders();
    const order = orders[index];

    if (!order) return;

    document.getElementById("detailBrand").textContent = order.brand;
    document.getElementById("detailValue").textContent = order.value;
    document.getElementById("detailPrice").textContent = order.price;
    document.getElementById("detailDiscount").textContent = order.discount;
    document.getElementById("detailId").textContent = order.id;
    document.getElementById("detailDate").textContent = order.date;

    document.getElementById("ordersOverlay").style.display = "none";
    document.getElementById("detailsOverlay").style.display = "flex";
};

GCS.closeDetails = function() {
    document.getElementById("detailsOverlay").style.display = "none";
};

GCS.createOrder = function() {
    const account = GCS.getAccount();

    if (!account) {
        GCS.pendingCheckout = true;
        GCS.openLogin();
        return;
    }

    const email = document.getElementById("email").value.trim();

    if (!GCS.validEmail(email)) {
        document.getElementById("email").classList.add("error");
        document.getElementById("emailError").style.display = "block";
        return;
    }

    const number = Math.floor(
        100000 + Math.random() * 900000
    );

    const order = {
        id: "GCS-" + number,
        brand: GCS.selectedBrand,
        value: "₹" + GCS.selectedValue.toLocaleString("en-IN"),
        price: "₹" + GCS.selectedPrice.toLocaleString("en-IN"),
        discount: GCS.selectedDiscount + "%",
        email: email,
        status: "Confirmed",
        date: new Date().toLocaleString("en-IN")
    };

    GCS.saveOrder(order);

    document.getElementById("checkoutOverlay").style.display = "none";
    document.getElementById("orderId").textContent = order.id;
    document.getElementById("successOverlay").style.display = "flex";

    document.getElementById("email").value = "";
};
