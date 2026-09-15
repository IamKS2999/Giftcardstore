/* =====================================================
   GIFTCARDSTORE — ORDERS
   BRICK 14
===================================================== */

const ORDERS_STORAGE_KEY =
    "giftCardOrders";


/* =====================================================
   GET ORDERS
===================================================== */

function getOrders() {

    const stored =
        localStorage.getItem(
            ORDERS_STORAGE_KEY
        );

    if (!stored) {
        return [];
    }

    try {

        return JSON.parse(
            stored
        );

    } catch (error) {

        return [];

    }

}


/* =====================================================
   SAVE ORDER
===================================================== */

function saveOrder(order) {

    const orders =
        getOrders();

    orders.unshift(
        order
    );

    localStorage.setItem(
        ORDERS_STORAGE_KEY,
        JSON.stringify(orders)
    );

}


/* =====================================================
   OPEN
===================================================== */

function openOrders() {

    if (!isLoggedIn()) {

        window.checkoutWaitingForLogin =
            false;

        openLoginPanel();

        return;
    }

    loadOrders();

    const overlay =
        document.getElementById(
            "ordersOverlay"
        );

    if (overlay) {
        overlay.style.display =
            "flex";
    }

}


/* =====================================================
   CLOSE
===================================================== */

function closeOrders() {

    const overlay =
        document.getElementById(
            "ordersOverlay"
        );

    if (overlay) {
        overlay.style.display =
            "none";
    }

}


/* =====================================================
   LOAD
===================================================== */

function loadOrders() {

    const user =
        getCurrentUser();

    const container =
        document.getElementById(
            "ordersList"
        );

    if (!container) {
        return;
    }

    if (!user) {

        container.innerHTML =
            "";

        return;
    }


    const orders =
        getOrders();


    const userOrders =
        orders.filter(
            function(order) {

                return (
                    order.email &&
                    order.email.toLowerCase() ===
                    user.email.toLowerCase()
                );

            }
        );


    if (
        userOrders.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-orders">

                <div class="empty-orders-icon">
                    🛍️
                </div>

                <h3>
                    No orders yet
                </h3>

                <p>
                    Your completed orders
                    will appear here.
                </p>

            </div>
        `;

        return;
    }


    container.innerHTML =
        "";


    userOrders.forEach(
        function(order) {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "order-card";


            card.innerHTML = `

                <div class="order-card-top">

                    <span
                        class="order-card-brand">
                        ${escapeHTML(
                            order.brand
                        )}
                    </span>

                    <span class="status">
                        ${escapeHTML(
                            order.status
                        )}
                    </span>

                </div>


                <strong>
                    ${escapeHTML(
                        order.value
                    )} Gift Card
                </strong>


                <div class="order-card-row">

                    <span>
                        Amount Paid
                    </span>

                    <span>
                        ${escapeHTML(
                            order.price
                        )}
                    </span>

                </div>


                <div class="order-card-row">

                    <span>
                        Discount
                    </span>

                    <span>
                        ${escapeHTML(
                            order.discount
                        )}
                    </span>

                </div>


                <div class="order-card-row">

                    <span>
                        Order ID
                    </span>

                    <span class="order-id">
                        ${escapeHTML(
                            order.id
                        )}
                    </span>

                </div>


                <div class="order-card-row">

                    <span>
                        Date
                    </span>

                    <span class="order-id">
                        ${escapeHTML(
                            order.date
                        )}
                    </span>

                </div>


                <button
                    class="view-order-button"
                    onclick="viewOrderDetails('${escapeHTML(
                        order.id
                    )}')">

                    View Order Details

                </button>

            `;


            container.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   DETAILS
===================================================== */

function viewOrderDetails(orderId) {

    if (!isLoggedIn()) {

        openLoginPanel();

        return;
    }


    const user =
        getCurrentUser();


    const order =
        getOrders().find(
            function(item) {

                return (
                    item.id === orderId &&
                    item.email &&
                    item.email.toLowerCase() ===
                    user.email.toLowerCase()
                );

            }
        );


    if (!order) {

        showNotice(
            "The requested order could not be found.",
            "Order unavailable",
            "error"
        );

        return;
    }


    showNotice(
        "Brand: " +
        order.brand +
        "\nGift Card: " +
        order.value +
        "\nAmount Paid: " +
        order.price +
        "\nDiscount: " +
        order.discount +
        "\nOrder ID: " +
        order.id +
        "\nStatus: " +
        order.status +
        "\nDate: " +
        order.date,

        "Order Details",
        "info"
    );

}


/* =====================================================
   HTML SAFETY
===================================================== */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");

           }
