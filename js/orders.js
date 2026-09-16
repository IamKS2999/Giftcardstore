/* =====================================================
   GIFTCARDSTORE — PREMIUM ORDERS
===================================================== */

const ORDERS_STORAGE_KEY =
    "giftCardOrders";


/* =====================================================
   STORAGE
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

        const parsed =
            JSON.parse(stored);

        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        return [];

    }

}


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
   USER ORDERS
===================================================== */

function getCurrentUserOrders() {

    if (
        typeof getCurrentUser !==
        "function"
    ) {
        return [];
    }

    const user =
        getCurrentUser();

    if (!user || !user.email) {
        return [];
    }

    return getOrders()
        .filter(
            function (order) {

                return (
                    order.email &&
                    order.email.toLowerCase() ===
                    user.email.toLowerCase()
                );

            }
        );

}


/* =====================================================
   OPEN ORDERS
===================================================== */

function openOrders() {

    if (
        typeof isLoggedIn !==
        "function" ||
        !isLoggedIn()
    ) {

        window.checkoutWaitingForLogin =
            false;

        if (
            typeof openLoginPanel ===
            "function"
        ) {

            openLoginPanel();

        }

        return;

    }


    if (
        typeof GCS !==
        "undefined" &&
        typeof GCS.closeAllOverlays ===
        "function"
    ) {

        GCS.closeAllOverlays();

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
   LOAD ORDERS
===================================================== */

function loadOrders() {

    const container =
        document.getElementById(
            "ordersList"
        );

    if (!container) {
        return;
    }


    const orders =
        getCurrentUserOrders();


    if (!orders.length) {

        container.innerHTML = `

            <div class="empty-orders">

                <div class="empty-orders-icon">
                    ◌
                </div>

                <h3>
                    No orders yet
                </h3>

                <p>
                    Your confirmed prototype orders will appear here.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        orders.map(
            function (order) {

                const quantity =
                    Math.max(
                        1,
                        Number(
                            order.quantity
                        ) || 1
                    );

                const brand =
                    typeof getBrand ===
                    "function"
                        ? getBrand(
                            order.brandId
                        )
                        : null;

                const logo =
                    brand?.logo ||
                    "";


                const token =
                    encodeURIComponent(
                        order.id
                    );


                return `

                    <div class="order-card">

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
                            )}
                            Gift Card
                            ${
                                quantity > 1
                                    ? " × " + quantity
                                    : ""
                            }
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


                        <button
                            class="view-order-button"
                            onclick="
                                viewOrderDetails(
                                    decodeURIComponent('${token}')
                                )
                            ">

                            View Order Details

                        </button>

                    </div>

                `;

            }
        )
        .join("");

}


/* =====================================================
   ORDER DETAILS
===================================================== */

function viewOrderDetails(
    orderId
) {

    const orders =
        getCurrentUserOrders();

    const order =
        orders.find(
            function (item) {

                return item.id ===
                    orderId;

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


    const existing =
        document.getElementById(
            "orderDetailOverlay"
        );

    if (existing) {
        existing.remove();
    }


    if (
        typeof GCS !==
        "undefined" &&
        typeof GCS.closeAllOverlays ===
        "function"
    ) {

        GCS.closeAllOverlays();

    }


    const brand =
        typeof getBrand ===
        "function"
            ? getBrand(
                order.brandId
            )
            : null;


    const overlay =
        document.createElement(
            "div"
        );

    overlay.id =
        "orderDetailOverlay";

    overlay.className =
        "overlay";

    overlay.style.display =
        "flex";


    const quantity =
        Math.max(
            1,
            Number(
                order.quantity
            ) || 1
        );


    const unitValue =
        parseInt(
            String(
                order.value || ""
            ).replace(
                /\D/g,
                ""
            ),
            10
        ) || 0;


    const unitPrice =
        parseInt(
            String(
                order.price || ""
            ).replace(
                /\D/g,
                ""
            ),
            10
        ) || 0;


    const unitSavings =
        Math.max(
            0,
            unitValue -
            unitPrice
        );


    const totalValue =
        unitValue *
        quantity;


    const totalPrice =
        unitPrice *
        quantity;


    const totalSavings =
        unitSavings *
        quantity;


    overlay.innerHTML = `

        <div class="panel order-detail-panel">

            <div class="panel-header">

                <div>

                    <div class="panel-eyebrow">
                        Order
                    </div>

                    <h2>
                        Order Details
                    </h2>

                    <p>
                        Complete information for this order.
                    </p>

                </div>

                <button
                    class="close-button"
                    onclick="closeOrderDetails()">

                    ×

                </button>

            </div>


            <div class="order-detail-brand">

                <div class="order-detail-logo">

                    ${
                        brand?.logo
                            ? `
                                <img
                                    src="${escapeHTML(
                                        brand.logo
                                    )}"
                                    alt="${escapeHTML(
                                        order.brand
                                    )}">
                              `
                            : "🎁"
                    }

                </div>


                <div>

                    <strong>
                        ${escapeHTML(
                            order.brand
                        )}
                    </strong>

                    <div style="
                        color:var(--muted);
                        font-size:11px;
                        margin-top:3px;
                    ">

                        ${escapeHTML(
                            order.value
                        )}
                        Gift Card

                    </div>

                </div>

            </div>


            <div class="order-detail-grid">

                <div class="order-detail-field">

                    <span>
                        Quantity
                    </span>

                    <strong>
                        ${quantity}
                    </strong>

                </div>


                <div class="order-detail-field">

                    <span>
                        Status
                    </span>

                    <strong>
                        ${escapeHTML(
                            order.status ||
                            "Confirmed"
                        )}
                    </strong>

                </div>


                <div class="order-detail-field">

                    <span>
                        Gift Card Value
                    </span>

                    <strong>
                        ₹${totalValue.toLocaleString(
                            "en-IN"
                        )}
                    </strong>

                </div>


                <div class="order-detail-field">

                    <span>
                        Amount Paid
                    </span>

                    <strong>
                        ₹${totalPrice.toLocaleString(
                            "en-IN"
                        )}
                    </strong>

                </div>


                <div class="order-detail-field">

                    <span>
                        Savings
                    </span>

                    <strong>
                        ₹${totalSavings.toLocaleString(
                            "en-IN"
                        )}
                    </strong>

                </div>


                <div class="order-detail-field">

                    <span>
                        Discount
                    </span>

                    <strong>
                        ${escapeHTML(
                            order.discount
                        )}
                    </strong>

                </div>


                <div class="order-detail-field">

                    <span>
                        Order ID
                    </span>

                    <strong>
                        ${escapeHTML(
                            order.id
                        )}
                    </strong>

                </div>


                <div class="order-detail-field">

                    <span>
                        Date
                    </span>

                    <strong>
                        ${escapeHTML(
                            order.date
                        )}
                    </strong>

                </div>

            </div>


            ${
                order.batchId
                    ? `
                        <div style="
                            margin-top:9px;
                            color:var(--muted);
                            font-size:10px;
                            text-align:center;
                        ">
                            Order group:
                            ${escapeHTML(
                                order.batchId
                            )}
                        </div>
                      `
                    : ""
            }

        </div>

    `;


    document.body.appendChild(
        overlay
    );

}


function closeOrderDetails() {

    const overlay =
        document.getElementById(
            "orderDetailOverlay"
        );

    if (overlay) {
        overlay.remove();
    }

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
