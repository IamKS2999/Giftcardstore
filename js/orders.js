/* =====================================================
   GIFTCARDSTORE — ORDERS
   BATCH UPGRADE 3–10
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
            function (order) {

                return (
                    order.email &&
                    order.email.toLowerCase() ===
                    user.email.toLowerCase()
                );

            }
        );


    if (!userOrders.length) {

        container.innerHTML = `

            <div class="empty-orders">

                <div class="empty-orders-icon">
                    🛍️
                </div>

                <h3>
                    No orders yet
                </h3>

                <p>
                    Your completed prototype
                    orders will appear here.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        "";


    userOrders.forEach(
        function (order) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "order-card";


            const saving =
                order.saving ||
                "₹0";


            card.innerHTML = `

                <div class="order-card-top">

                    <span class="order-card-brand">
                        ${escapeHTML(
                            order.brand
                        )}
                    </span>

                    <span class="status">
                        ${escapeHTML(
                            order.status ||
                            "Confirmed"
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
                        You Saved
                    </span>

                    <span>
                        ${escapeHTML(
                            saving
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
   ORDER DETAILS
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
            function (item) {

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


    const brand =
        typeof getBrand === "function"
            ? getBrand(order.brandId)
            : null;


    const old =
        document.getElementById(
            "orderDetailsOverlay"
        );

    if (old) {
        old.remove();
    }


    const overlay =
        document.createElement(
            "div"
        );


    overlay.id =
        "orderDetailsOverlay";

    overlay.className =
        "overlay";

    overlay.style.display =
        "flex";


    overlay.innerHTML = `

        <div class="panel">

            <div class="panel-header">

                <div>
                    <div class="panel-eyebrow">
                        Order
                    </div>

                    <h2>
                        Order Details
                    </h2>

                    <p>
                        Your prototype order information.
                    </p>
                </div>

                <button
                    class="close-button"
                    onclick="document.getElementById('orderDetailsOverlay').remove()">
                    ×
                </button>

            </div>


            <div class="checkout-card">

                <div class="checkout-brand">

                    <span>
                        Gift Card
                    </span>

                    <strong>
                        ${escapeHTML(
                            order.brand
                        )}
                    </strong>

                </div>


                <div class="checkout-value">

                    <span>
                        ${escapeHTML(
                            order.value
                        )}
                    </span>

                    <strong>
                        ${escapeHTML(
                            order.price
                        )}
                    </strong>

                </div>

            </div>


            <div class="order-total-box">

                <div class="order-total-row">
                    <span>Status</span>
                    <strong>
                        ${escapeHTML(
                            order.status ||
                            "Confirmed"
                        )}
                    </strong>
                </div>

                <div class="order-total-row">
                    <span>Discount</span>
                    <strong>
                        ${escapeHTML(
                            order.discount
                        )}
                    </strong>
                </div>

                <div class="order-total-row order-total-saving">
                    <span>You saved</span>
                    <strong>
                        ${escapeHTML(
                            order.saving ||
                            "₹0"
                        )}
                    </strong>
                </div>

                <div class="order-total-row">
                    <span>Order ID</span>
                    <strong>
                        ${escapeHTML(
                            order.id
                        )}
                    </strong>
                </div>

                <div class="order-total-row">
                    <span>Email</span>
                    <strong>
                        ${escapeHTML(
                            order.email
                        )}
                    </strong>
                </div>

                <div class="order-total-row">
                    <span>Date</span>
                    <strong>
                        ${escapeHTML(
                            order.date
                        )}
                    </strong>
                </div>

            </div>


            <div class="prototype-note">
                Prototype order · No real gift card is issued.
            </div>

        </div>

    `;


    document.body.appendChild(
        overlay
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
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

                           }
