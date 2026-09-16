/* =====================================================
   GIFTCARDSTORE — MAIN APPLICATION
   BATCH UPGRADE 3–10
===================================================== */

window.GCS = window.GCS || {};


/* =====================================================
   STATE
===================================================== */

GCS.selectedBrand = null;
GCS.selectedValue = 0;
GCS.selectedPrice = 0;
GCS.selectedMode = "fixed";

GCS.activeCategory = "All";
GCS.searchQuery = "";

window.checkoutWaitingForLogin = false;


/* =====================================================
   STORAGE
===================================================== */

const CART_KEY =
    "gcsCart";

const WISHLIST_KEY =
    "gcsWishlist";


function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem(CART_KEY) || "[]"
        );

    } catch (error) {

        return [];

    }

}


function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

    GCS.updateCartUI();

}


function getWishlist() {

    try {

        return JSON.parse(
            localStorage.getItem(WISHLIST_KEY) || "[]"
        );

    } catch (error) {

        return [];

    }

}


function saveWishlist(list) {

    localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(list)
    );

}


/* =====================================================
   HELPERS
===================================================== */

function money(value) {

    return "₹" +
        Number(value || 0).toLocaleString("en-IN");

}


function getProductDiscount(
    brandId,
    mode
) {

    return getBrandDiscount(
        brandId,
        mode
    );

}


function createCartItem() {

    return {

        id:
            "CART-" +
            Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .slice(2, 7),

        brandId:
            GCS.selectedBrand,

        value:
            Number(GCS.selectedValue),

        mode:
            GCS.selectedMode,

        price:
            Number(GCS.selectedPrice),

        quantity:
            1

    };

}


/* =====================================================
   COMPATIBILITY
===================================================== */

GCS.isLoggedIn = function () {

    return (
        typeof isLoggedIn === "function" &&
        isLoggedIn()
    );

};


GCS.getAccount = function () {

    return typeof getCurrentUser === "function"
        ? getCurrentUser()
        : null;

};


GCS.getBrand = function (brandId) {

    return typeof getBrand === "function"
        ? getBrand(brandId)
        : null;

};


GCS.openLogin = function () {

    if (
        typeof openLoginPanel === "function"
    ) {
        openLoginPanel();
    }

};


GCS.openAccount = function () {

    if (
        typeof openAccountPanel === "function"
    ) {
        openAccountPanel();
    }

};


GCS.openOrders = function () {

    if (
        typeof openOrders === "function"
    ) {
        openOrders();
    }

};


GCS.closeOrders = function () {

    if (
        typeof closeOrders === "function"
    ) {
        closeOrders();
    }

};


GCS.closeAccount = function () {

    if (
        typeof closeAccountPanel === "function"
    ) {
        closeAccountPanel();
    }

};


GCS.logout = function () {

    if (
        typeof logoutUser === "function"
    ) {
        logoutUser();
    }

};


/* =====================================================
   RENDER PRODUCTS
===================================================== */

GCS.renderProducts = function (brands) {

    const container =
        document.getElementById("cards");

    if (!container) {
        return;
    }

    const brandList =
        brands ||
        (
            typeof getAllBrands === "function"
                ? getAllBrands()
                : []
        );

    container.innerHTML = "";

    if (!brandList.length) {

        container.innerHTML = `
            <div class="empty-orders">
                <div class="empty-orders-icon">🔎</div>
                <h3>No gift cards found</h3>
                <p>Try another brand, category or search term.</p>
            </div>
        `;

        return;
    }


    const wishlist =
        getWishlist();


    brandList.forEach(function (brand) {

        const card =
            document.createElement("div");

        card.className =
            "card";


        const discount =
            Math.max(
                brand.fixedDiscount || 0,
                brand.customDiscount || 0
            );


        const wished =
            wishlist.includes(brand.id);


        card.innerHTML = `

            <div class="brand-box">

                <img
                    class="brand-logo"
                    src="${brand.logo}"
                    alt="${escapeHTML(brand.name)}"
                    loading="lazy"
                >

                <button
                    class="card-wishlist ${wished ? "active" : ""}"
                    type="button"
                    aria-label="Save ${escapeHTML(brand.name)}"
                    onclick="GCS.toggleWishlist('${brand.id}', this)">
                    ${wished ? "♥" : "♡"}
                </button>

            </div>

            <div class="brand">
                ${escapeHTML(brand.category)}
            </div>

            <h3>
                ${escapeHTML(brand.name)}
            </h3>

            <div class="discount">
                Up to ${discount}% off
            </div>

            <button class="buy">
                View Gift Cards
            </button>

        `;


        const button =
            card.querySelector(".buy");


        button.addEventListener(
            "click",
            function () {

                GCS.openProduct(
                    brand.id
                );

            }
        );


        container.appendChild(card);

    });


    GCS.updateSearchInfo(
        brandList.length
    );

};


/* =====================================================
   FILTER ENGINE
===================================================== */

GCS.applyFilters = function () {

    const all =
        getAllBrands();

    const query =
        GCS.searchQuery
            .trim()
            .toLowerCase();

    const category =
        GCS.activeCategory;


    const filtered =
        all.filter(function (brand) {

            const categoryMatch =
                category === "All" ||
                brand.category.toLowerCase() ===
                category.toLowerCase();


            if (!categoryMatch) {
                return false;
            }


            if (!query) {
                return true;
            }


            const searchable = [
                brand.name,
                brand.category,
                brand.id
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();


            return searchable.includes(query);

        });


    GCS.renderProducts(
        filtered
    );

};


GCS.searchCards = function (event) {

    GCS.searchQuery =
        event.target.value || "";

    const clear =
        document.getElementById(
            "clearSearch"
        );

    if (clear) {

        clear.style.display =
            GCS.searchQuery
                ? "block"
                : "none";

    }

    GCS.applyFilters();

};


GCS.clearSearch = function () {

    const input =
        document.getElementById(
            "search"
        );

    if (input) {
        input.value = "";
    }

    GCS.searchQuery = "";

    const clear =
        document.getElementById(
            "clearSearch"
        );

    if (clear) {
        clear.style.display = "none";
    }

    GCS.applyFilters();

};


GCS.updateSearchInfo = function (count) {

    const info =
        document.getElementById(
            "searchInfo"
        );

    if (!info) {
        return;
    }

    const query =
        GCS.searchQuery.trim();

    if (!query) {

        info.style.display =
            "none";

        return;

    }

    info.style.display =
        "block";

    info.textContent =
        count +
        " result" +
        (count === 1 ? "" : "s") +
        " for “" +
        query +
        "”";

};


/* =====================================================
   CATEGORY
===================================================== */

GCS.filterCategory = function (
    category,
    button
) {

    GCS.activeCategory =
        category;


    document
        .querySelectorAll(".category")
        .forEach(function (item) {

            item.classList.remove(
                "active"
            );

        });


    if (button) {
        button.classList.add(
            "active"
        );
    }


    GCS.applyFilters();

};


/* =====================================================
   PRODUCT
===================================================== */

GCS.openProduct = function (brandId) {

    const brand =
        getBrand(brandId);

    if (!brand) {
        return;
    }


    GCS.selectedBrand =
        brandId;

    GCS.selectedMode =
        "fixed";

    GCS.selectedValue =
        0;

    GCS.selectedPrice =
        0;


    const overlay =
        document.getElementById(
            "productOverlay"
        );

    if (!overlay) {
        return;
    }


    const brandName =
        document.getElementById(
            "productBrand"
        );

    if (brandName) {
        brandName.textContent =
            brand.name;
    }


    const brandLogo =
        document.getElementById(
            "productLogo"
        );

    if (brandLogo) {

        brandLogo.src =
            brand.logo;

        brandLogo.alt =
            brand.name;

    }


    const info =
        document.getElementById(
            "productInfo"
        );

    if (info) {

        const fixed =
            brand.fixedValues
                .map(value => money(value))
                .join(" · ");

        info.innerHTML = `
            <strong>${escapeHTML(brand.name)}</strong>
            · ${escapeHTML(brand.category)}
            · Fixed values: ${fixed || "Available"}
            · Discount: up to ${Math.max(
                brand.fixedDiscount || 0,
                brand.customDiscount || 0
            )}%
        `;

    }


    const wishlist =
        getWishlist();

    const wishButton =
        document.getElementById(
            "wishlistProductButton"
        );

    if (wishButton) {

        const active =
            wishlist.includes(
                brand.id
            );

        wishButton.classList.toggle(
            "active",
            active
        );

        wishButton.textContent =
            active ? "♥" : "♡";

    }


    const fixedValues =
        document.getElementById(
            "fixedValues"
        );


    if (fixedValues) {

        fixedValues.innerHTML = "";


        brand.fixedValues.forEach(
            function (value, index) {

                const price =
                    calculatePrice(
                        value,
                        brand.fixedDiscount
                    );


                const button =
                    document.createElement(
                        "button"
                    );


                button.className =
                    "value-button";


                button.innerHTML = `
                    <strong>
                        ${money(value)}
                    </strong>

                    <small>
                        Pay ${money(price)}
                    </small>
                `;


                button.addEventListener(
                    "click",
                    function () {

                        GCS.selectedMode =
                            "fixed";

                        GCS.selectedValue =
                            value;

                        GCS.selectedPrice =
                            price;


                        document
                            .querySelectorAll(
                                ".value-button"
                            )
                            .forEach(
                                function (item) {
                                    item.classList.remove(
                                        "active"
                                    );
                                }
                            );


                        button.classList.add(
                            "active"
                        );


                        GCS.updatePreview();

                    }
                );


                fixedValues.appendChild(
                    button
                );


                if (index === 0) {

                    GCS.selectedValue =
                        value;

                    GCS.selectedPrice =
                        price;

                    button.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    GCS.selectMode("fixed");
    GCS.updatePreview();

    overlay.style.display =
        "flex";

};


GCS.closeProduct = function () {

    const overlay =
        document.getElementById(
            "productOverlay"
        );

    if (overlay) {
        overlay.style.display =
            "none";
    }

};


/* =====================================================
   PRODUCT MODE
===================================================== */

GCS.selectMode = function (mode) {

    if (
        mode !== "fixed" &&
        mode !== "custom"
    ) {
        return;
    }


    GCS.selectedMode =
        mode;


    const fixedArea =
        document.getElementById(
            "fixedArea"
        );

    const customArea =
        document.getElementById(
            "customArea"
        );

    const fixedButton =
        document.getElementById(
            "fixedMode"
        );

    const customButton =
        document.getElementById(
            "customMode"
        );


    if (fixedArea) {
        fixedArea.style.display =
            mode === "fixed"
                ? "block"
                : "none";
    }


    if (customArea) {
        customArea.style.display =
            mode === "custom"
                ? "block"
                : "none";
    }


    if (fixedButton) {
        fixedButton.classList.toggle(
            "active",
            mode === "fixed"
        );
    }


    if (customButton) {
        customButton.classList.toggle(
            "active",
            mode === "custom"
        );
    }


    if (mode === "custom") {

        const input =
            document.getElementById(
                "customAmount"
            );

        if (input) {
            input.value = "";
        }

        GCS.selectedValue = 0;
        GCS.selectedPrice = 0;

        GCS.updatePreview();

    }

};


/* =====================================================
   CUSTOM PRICE
===================================================== */

GCS.updateCustomPrice = function () {

    const input =
        document.getElementById(
            "customAmount"
        );

    if (!input) {
        return;
    }


    const amount =
        Number(input.value);


    const brand =
        getBrand(
            GCS.selectedBrand
        );


    if (!brand) {
        return;
    }


    if (
        !isValidProductValue(
            GCS.selectedBrand,
            amount,
            "custom"
        )
    ) {

        GCS.selectedValue = 0;
        GCS.selectedPrice = 0;

        GCS.updatePreview();

        return;

    }


    GCS.selectedValue =
        amount;

    GCS.selectedPrice =
        calculatePrice(
            amount,
            brand.customDiscount
        );

    GCS.updatePreview();

};


/* =====================================================
   PREVIEW
===================================================== */

GCS.updatePreview = function () {

    const brand =
        getBrand(
            GCS.selectedBrand
        );

    if (!brand) {
        return;
    }


    const discount =
        getBrandDiscount(
            GCS.selectedBrand,
            GCS.selectedMode
        );


    const valueElement =
        document.getElementById(
            "previewValue"
        );

    const discountElement =
        document.getElementById(
            "previewDiscount"
        );

    const priceElement =
        document.getElementById(
            "previewPrice"
        );


    if (valueElement) {
        valueElement.textContent =
            GCS.selectedValue > 0
                ? money(GCS.selectedValue)
                : "—";
    }


    if (discountElement) {
        discountElement.textContent =
            discount + "%";
    }


    if (priceElement) {
        priceElement.textContent =
            GCS.selectedPrice > 0
                ? money(GCS.selectedPrice)
                : "—";
    }

};


/* =====================================================
   ADD TO CART
===================================================== */

GCS.continueProduct = function () {

    const brand =
        getBrand(
            GCS.selectedBrand
        );

    if (!brand) {
        return;
    }


    if (
        !GCS.selectedValue ||
        GCS.selectedValue <= 0
    ) {

        showNotice(
            "Please select a gift-card value first.",
            "Select a value",
            "error"
        );

        return;

    }


    if (
        GCS.selectedMode === "custom" &&
        !isValidProductValue(
            GCS.selectedBrand,
            GCS.selectedValue,
            "custom"
        )
    ) {

        showNotice(
            "Please enter a valid amount between ₹100 and ₹10,000.",
            "Invalid amount",
            "error"
        );

        return;

    }


    const cart =
        getCart();


    const existing =
        cart.find(function (item) {

            return (
                item.brandId === GCS.selectedBrand &&
                item.value === Number(GCS.selectedValue) &&
                item.mode === GCS.selectedMode
            );

        });


    if (existing) {

        existing.quantity =
            Number(existing.quantity || 1) + 1;

    } else {

        cart.push(
            createCartItem()
        );

    }


    saveCart(cart);

    GCS.closeProduct();

    showNotice(
        brand.name +
        " gift card added to your cart.",
        "Added to cart",
        "success"
    );

};


/* =====================================================
   CART
===================================================== */

GCS.getCartTotals = function () {

    const cart =
        getCart();

    let value = 0;
    let paid = 0;
    let quantity = 0;


    cart.forEach(function (item) {

        const qty =
            Number(item.quantity || 1);

        value +=
            Number(item.value || 0) * qty;

        paid +=
            Number(item.price || 0) * qty;

        quantity +=
            qty;

    });


    return {

        value,
        paid,
        savings:
            Math.max(0, value - paid),
        quantity

    };

};


GCS.updateCartUI = function () {

    const count =
        document.getElementById(
            "cartCount"
        );

    const cart =
        getCart();


    if (count) {

        const quantity =
            cart.reduce(
                (total, item) =>
                    total +
                    Number(item.quantity || 1),
                0
            );

        count.textContent =
            quantity;

    }


    const items =
        document.getElementById(
            "cartItems"
        );

    if (
        items &&
        document.getElementById(
            "cartOverlay"
        )?.style.display === "flex"
    ) {
        GCS.renderCart();
    }

};


GCS.openCart = function () {

    GCS.renderCart();

    const overlay =
        document.getElementById(
            "cartOverlay"
        );

    if (overlay) {
        overlay.style.display =
            "flex";
    }

};


GCS.closeCart = function () {

    const overlay =
        document.getElementById(
            "cartOverlay"
        );

    if (overlay) {
        overlay.style.display =
            "none";
    }

};


GCS.renderCart = function () {

    const container =
        document.getElementById(
            "cartItems"
        );

    const summary =
        document.getElementById(
            "cartSummary"
        );

    if (!container) {
        return;
    }


    const cart =
        getCart();


    if (!cart.length) {

        container.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add gift cards from the catalogue to see them here.</p>
            </div>
        `;

        if (summary) {
            summary.innerHTML = "";
        }

        return;

    }


    container.innerHTML = "";


    cart.forEach(function (item) {

        const brand =
            getBrand(item.brandId);

        if (!brand) {
            return;
        }


        const card =
            document.createElement("div");

        card.className =
            "cart-item";


        const quantity =
            Number(item.quantity || 1);


        card.innerHTML = `

            <div class="cart-item-logo">
                <img
                    src="${brand.logo}"
                    alt="${escapeHTML(brand.name)}">
            </div>

            <div class="cart-item-info">

                <strong>
                    ${escapeHTML(brand.name)}
                </strong>

                <span>
                    ${money(item.value)} Gift Card
                    · ${item.mode === "custom" ? "Custom" : "Fixed"}
                </span>

                <small>
                    Save ${money(
                        Math.max(
                            0,
                            Number(item.value) -
                            Number(item.price)
                        )
                    )} each
                </small>

            </div>

            <div class="cart-item-actions">

                <div class="quantity-control">

                    <button
                        onclick="GCS.changeCartQuantity('${item.id}', -1)">
                        −
                    </button>

                    <span>
                        ${quantity}
                    </span>

                    <button
                        onclick="GCS.changeCartQuantity('${item.id}', 1)">
                        +
                    </button>

                </div>

                <button
                    class="remove-cart"
                    onclick="GCS.removeCartItem('${item.id}')"
                    title="Remove">
                    ×
                </button>

            </div>

        `;


        container.appendChild(
            card
        );

    });


    const totals =
        GCS.getCartTotals();


    if (summary) {

        summary.innerHTML = `

            <div class="cart-summary-row">
                <span>Gift card value</span>
                <strong>${money(totals.value)}</strong>
            </div>

            <div class="cart-summary-row cart-summary-saving">
                <span>Total savings</span>
                <strong>− ${money(totals.savings)}</strong>
            </div>

            <div class="cart-summary-divider"></div>

            <div class="cart-summary-row cart-summary-total">
                <span>Total</span>
                <strong>${money(totals.paid)}</strong>
            </div>

        `;

    }

};


GCS.changeCartQuantity = function (
    itemId,
    change
) {

    const cart =
        getCart();


    const item =
        cart.find(
            item => item.id === itemId
        );


    if (!item) {
        return;
    }


    item.quantity =
        Number(item.quantity || 1) +
        Number(change);


    if (item.quantity <= 0) {

        const index =
            cart.indexOf(item);

        cart.splice(
            index,
            1
        );

    }


    saveCart(cart);

    GCS.renderCart();

};


GCS.removeCartItem = function (
    itemId
) {

    const cart =
        getCart();


    const filtered =
        cart.filter(
            item => item.id !== itemId
        );


    saveCart(filtered);

    GCS.renderCart();

    showNotice(
        "The item was removed from your cart.",
        "Cart updated",
        "info"
    );

};


/* =====================================================
   ORDER SUMMARY
===================================================== */

GCS.openOrderSummary = function () {

    const cart =
        getCart();

    if (!cart.length) {

        showNotice(
            "Your cart is empty.",
            "Nothing to checkout",
            "error"
        );

        return;

    }


    const container =
        document.getElementById(
            "orderSummaryContent"
        );


    if (!container) {
        return;
    }


    const totals =
        GCS.getCartTotals();


    let html = "";


    cart.forEach(function (item) {

        const brand =
            getBrand(item.brandId);

        if (!brand) {
            return;
        }


        const quantity =
            Number(item.quantity || 1);


        html += `

            <div class="summary-item">

                <div class="summary-item-main">

                    <strong>
                        ${escapeHTML(brand.name)}
                    </strong>

                    <span>
                        ${money(item.value)}
                        Gift Card × ${quantity}
                    </span>

                </div>

                <div class="summary-item-price">

                    ${money(
                        Number(item.price) *
                        quantity
                    )}

                    <small>
                        Save ${money(
                            (
                                Number(item.value) -
                                Number(item.price)
                            ) * quantity
                        )}
                    </small>

                </div>

            </div>

        `;

    });


    html += `

        <div class="order-total-box">

            <div class="order-total-row">
                <span>Gift card value</span>
                <strong>${money(totals.value)}</strong>
            </div>

            <div class="order-total-row order-total-saving">
                <span>You save</span>
                <strong>${money(totals.savings)}</strong>
            </div>

            <div class="order-total-row order-total-final">
                <span>Total</span>
                <strong>${money(totals.paid)}</strong>
            </div>

        </div>

    `;


    container.innerHTML =
        html;


    GCS.closeCart();


    const overlay =
        document.getElementById(
            "orderOverlay"
        );

    if (overlay) {
        overlay.style.display =
            "flex";
    }

};


/* =====================================================
   CHECKOUT
===================================================== */

GCS.checkoutCart = function () {

    if (!getCart().length) {

        showNotice(
            "Your cart is empty.",
            "Nothing to checkout",
            "error"
        );

        return;

    }


    GCS.openOrderSummary();

};


GCS.openCheckout = function () {

    if (!GCS.isLoggedIn()) {

        window.checkoutWaitingForLogin =
            true;

        GCS.closeOrder();

        GCS.openLogin();

        return;

    }


    const cart =
        getCart();

    if (!cart.length) {
        return;
    }


    const account =
        GCS.getAccount();


    const items =
        document.getElementById(
            "checkoutItems"
        );


    const totalsBox =
        document.getElementById(
            "checkoutTotals"
        );


    if (items) {

        items.innerHTML =
            cart.map(function (item) {

                const brand =
                    getBrand(item.brandId);

                return `

                    <div class="checkout-item">

                        <span>
                            ${escapeHTML(
                                brand?.name || "Gift Card"
                            )}
                            · ${money(item.value)}
                            × ${Number(item.quantity || 1)}
                        </span>

                        <strong>
                            ${money(
                                Number(item.price || 0) *
                                Number(item.quantity || 1)
                            )}
                        </strong>

                    </div>

                `;

            }).join("");

    }


    const totals =
        GCS.getCartTotals();


    if (totalsBox) {

        totalsBox.innerHTML = `

            <div class="order-total-box">

                <div class="order-total-row">
                    <span>Gift card value</span>
                    <strong>${money(totals.value)}</strong>
                </div>

                <div class="order-total-row order-total-saving">
                    <span>Total savings</span>
                    <strong>${money(totals.savings)}</strong>
                </div>

                <div class="order-total-row order-total-final">
                    <span>You pay</span>
                    <strong>${money(totals.paid)}</strong>
                </div>

            </div>

        `;

    }


    const email =
        document.getElementById(
            "email"
        );

    if (email) {
        email.value =
            account?.email || "";
    }


    const overlay =
        document.getElementById(
            "checkoutOverlay"
        );

    if (overlay) {
        overlay.style.display =
            "flex";
    }

};


GCS.closeCheckout = function () {

    const overlay =
        document.getElementById(
            "checkoutOverlay"
        );

    if (overlay) {
        overlay.style.display =
            "none";
    }

};


GCS.closeOrder = function () {

    const overlay =
        document.getElementById(
            "orderOverlay"
        );

    if (overlay) {
        overlay.style.display =
            "none";
    }

};


/* =====================================================
   EMAIL
===================================================== */

GCS.clearEmailError = function () {

    const email =
        document.getElementById(
            "email"
        );

    const error =
        document.getElementById(
            "emailError"
        );


    if (email) {
        email.classList.remove(
            "error"
        );
    }


    if (error) {
        error.style.display =
            "none";
    }

};


/* =====================================================
   CREATE ORDERS
===================================================== */

GCS.createOrder = function () {

    if (!GCS.isLoggedIn()) {

        GCS.openLogin();

        return;

    }


    const account =
        GCS.getAccount();


    const emailElement =
        document.getElementById(
            "email"
        );


    const email =
        emailElement
            ? emailElement.value.trim().toLowerCase()
            : account.email;


    const validEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


    if (!validEmail.test(email)) {

        const error =
            document.getElementById(
                "emailError"
            );

        if (error) {
            error.style.display =
                "block";
        }

        if (emailElement) {
            emailElement.classList.add(
                "error"
            );
        }

        return;

    }


    const cart =
        getCart();


    if (!cart.length) {
        return;
    }


    const batchId =
        "GCS-" +
        Date.now()
            .toString()
            .slice(-8);


    cart.forEach(function (item, index) {

        const brand =
            getBrand(item.brandId);

        if (!brand) {
            return;
        }


        const quantity =
            Number(item.quantity || 1);


        for (
            let i = 0;
            i < quantity;
            i++
        ) {

            const discount =
                getBrandDiscount(
                    item.brandId,
                    item.mode
                );


            const saving =
                calculateSavings(
                    item.value,
                    discount
                );


            const order = {

                id:
                    batchId +
                    "-" +
                    String(index + 1)
                        .padStart(2, "0") +
                    String(i + 1),

                batchId:
                    batchId,

                brand:
                    brand.name,

                brandId:
                    item.brandId,

                value:
                    money(item.value),

                price:
                    money(item.price),

                discount:
                    discount + "%",

                saving:
                    money(saving),

                email:
                    email,

                status:
                    "Confirmed",

                date:
                    new Date()
                        .toLocaleString(
                            "en-IN"
                        )

            };


            if (
                typeof saveOrder === "function"
            ) {
                saveOrder(order);
            }

        }

    });


    localStorage.removeItem(
        CART_KEY
    );


    GCS.updateCartUI();
    GCS.closeCheckout();


    const orderId =
        document.getElementById(
            "orderId"
        );


    if (orderId) {
        orderId.textContent =
            batchId;
    }


    const success =
        document.getElementById(
            "successOverlay"
        );


    if (success) {
        success.style.display =
            "flex";
    }


    showNotice(
        "Your prototype order has been created.",
        "Order confirmed",
        "success"
    );

};


GCS.closeSuccess = function () {

    const overlay =
        document.getElementById(
            "successOverlay"
        );

    if (overlay) {
        overlay.style.display =
            "none";
    }

};


/* =====================================================
   WISHLIST
===================================================== */

GCS.toggleWishlist = function (
    brandId,
    button
) {

    let list =
        getWishlist();


    const exists =
        list.includes(
            brandId
        );


    if (exists) {

        list =
            list.filter(
                id => id !== brandId
            );

    } else {

        list.push(
            brandId
        );

    }


    saveWishlist(list);


    if (button) {

        button.classList.toggle(
            "active",
            !exists
        );

        button.textContent =
            !exists ? "♥" : "♡";

    }


    const brand =
        getBrand(brandId);


    showNotice(
        exists
            ? "Removed from your saved brands."
            : "Saved to your wishlist.",
        exists
            ? "Wishlist updated"
            : "Saved",
        "success"
    );

};


GCS.toggleWishlistSelected = function () {

    if (!GCS.selectedBrand) {
        return;
    }


    const button =
        document.getElementById(
            "wishlistProductButton"
        );


    GCS.toggleWishlist(
        GCS.selectedBrand,
        button
    );

};


GCS.openWishlist = function () {

    if (
        typeof openWishlistPanel === "function"
    ) {
        openWishlistPanel();
        return;
    }


    const list =
        getWishlist();


    if (!list.length) {

        showNotice(
            "You have no saved brands yet.",
            "Wishlist",
            "info"
        );

        return;

    }


    GCS.closeAllOverlays();


    const overlay =
        document.createElement("div");

    overlay.id =
        "wishlistOverlay";

    overlay.className =
        "overlay";

    overlay.style.display =
        "flex";


    overlay.innerHTML = `

        <div class="panel">

            <div class="panel-header">

                <div>
                    <div class="panel-eyebrow">
                        Saved
                    </div>

                    <h2>
                        Wishlist
                    </h2>

                    <p>
                        Your saved gift-card brands.
                    </p>
                </div>

                <button
                    class="close-button"
                    onclick="document.getElementById('wishlistOverlay').remove()">
                    ×
                </button>

            </div>

            <div class="cards wishlist-cards">

                ${list.map(function (id) {

                    const brand =
                        getBrand(id);

                    if (!brand) {
                        return "";
                    }

                    return `

                        <div class="card">

                            <div class="brand-box">
                                <img
                                    class="brand-logo"
                                    src="${brand.logo}"
                                    alt="${escapeHTML(brand.name)}">
                            </div>

                            <div class="brand">
                                ${escapeHTML(brand.category)}
                            </div>

                            <h3>
                                ${escapeHTML(brand.name)}
                            </h3>

                            <button
                                class="buy"
                                onclick="GCS.closeWishlist();GCS.openProduct('${brand.id}')">
                                View Gift Cards
                            </button>

                        </div>

                    `;

                }).join("")}

            </div>

        </div>

    `;


    document.body.appendChild(
        overlay
    );

};


GCS.closeWishlist = function () {

    const overlay =
        document.getElementById(
            "wishlistOverlay"
        );

    if (overlay) {
        overlay.remove();
    }

};


/* =====================================================
   HEADER
===================================================== */

GCS.updateHeader = function () {

    const loginButton =
        document.getElementById(
            "loginButton"
        );

    const accountButton =
        document.getElementById(
            "accountButton"
        );


    const loggedIn =
        GCS.isLoggedIn();


    if (loggedIn) {

        if (loginButton) {
            loginButton.style.display =
                "none";
        }

        if (accountButton) {
            accountButton.style.display =
                "inline-flex";
        }

    } else {

        if (loginButton) {
            loginButton.style.display =
                "inline-flex";
        }

        if (accountButton) {
            accountButton.style.display =
                "none";
        }

    }


    GCS.updateCartUI();

};


/* =====================================================
   START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "GiftCardStore started — batch upgrade."
        );


        if (
            typeof createAccountModal === "function"
        ) {
            createAccountModal();
        }


        GCS.renderProducts();

        GCS.updateHeader();


        const loginButton =
            document.getElementById(
                "loginButton"
            );

        if (loginButton) {
            loginButton.onclick =
                GCS.openLogin;
        }


        const accountButton =
            document.getElementById(
                "accountButton"
            );

        if (accountButton) {
            accountButton.onclick =
                GCS.openAccount;
        }


        const search =
            document.getElementById(
                "search"
            );

        if (search) {

            search.addEventListener(
                "input",
                GCS.searchCards
            );

        }


        GCS.updateCartUI();


        document
            .querySelectorAll(".category")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        GCS.filterCategory(
                            button.dataset.category ||
                            button.textContent.trim(),
                            button
                        );

                    }
                );

            });


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "/" &&
                    document.activeElement.tagName !== "INPUT" &&
                    document.activeElement.tagName !== "TEXTAREA"
                ) {

                    event.preventDefault();

                    if (search) {
                        search.focus();
                    }

                }

            }
        );

    }
);
