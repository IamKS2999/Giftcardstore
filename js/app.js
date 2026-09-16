/* =====================================================
   GIFTCARDSTORE — MAIN APPLICATION
   PREMIUM MARKETPLACE UI
===================================================== */

window.GCS = window.GCS || {};


/* =====================================================
   STORAGE
===================================================== */

const GCS_CART_KEY =
    "gcsCart";

const GCS_WISHLIST_KEY =
    "gcsWishlist";


function readGCSStorage(key, fallback) {

    try {

        const value =
            localStorage.getItem(key);

        if (!value) {
            return fallback;
        }

        const parsed =
            JSON.parse(value);

        return parsed;

    } catch (error) {

        return fallback;

    }

}


function writeGCSStorage(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;

    } catch (error) {

        console.error(
            "GiftCardStore storage error:",
            error
        );

        return false;

    }

}


/* =====================================================
   HELPERS
===================================================== */

function gcsMoney(value) {

    return "₹" +
        Number(value || 0)
            .toLocaleString("en-IN");

}


function gcsNumber(value) {

    return Number(value) || 0;

}


function gcsEsc(value) {

    return typeof escapeHTML === "function"
        ? escapeHTML(value)
        : String(value ?? "")
            .replace(/&/g,"&amp;")
            .replace(/</g,"&lt;")
            .replace(/>/g,"&gt;")
            .replace(/"/g,"&quot;")
            .replace(/'/g,"&#039;");

}


function gcsToken(value) {

    return encodeURIComponent(
        String(value)
    );

}


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
   ACCOUNT COMPATIBILITY
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
        typeof openLoginPanel ===
        "function"
    ) {

        openLoginPanel();

    }

};


GCS.openAccount = function () {

    if (
        typeof openAccountPanel ===
        "function"
    ) {

        openAccountPanel();

    }

};


GCS.openOrders = function () {

    if (
        typeof openOrders ===
        "function"
    ) {

        openOrders();

    }

};


GCS.closeOrders = function () {

    if (
        typeof closeOrders ===
        "function"
    ) {

        closeOrders();

    }

};


/* =====================================================
   CART
===================================================== */

GCS.getCart = function () {

    const cart =
        readGCSStorage(
            GCS_CART_KEY,
            []
        );

    return Array.isArray(cart)
        ? cart
        : [];

};


GCS.saveCart = function (cart) {

    writeGCSStorage(
        GCS_CART_KEY,
        Array.isArray(cart)
            ? cart
            : []
    );

    GCS.updateCartCount();

};


GCS.getCartCount = function () {

    return GCS.getCart()
        .reduce(
            function (total, item) {

                return total +
                    Math.max(
                        1,
                        gcsNumber(item.quantity)
                    );

            },
            0
        );

};


GCS.getCartTotals = function () {

    const cart =
        GCS.getCart();

    let value = 0;
    let price = 0;
    let savings = 0;

    cart.forEach(
        function (item) {

            const quantity =
                Math.max(
                    1,
                    gcsNumber(item.quantity)
                );

            value +=
                gcsNumber(item.value) *
                quantity;

            price +=
                gcsNumber(item.price) *
                quantity;

            savings +=
                gcsNumber(item.savings) *
                quantity;

        }
    );

    return {
        value,
        price,
        savings,
        count: cart.reduce(
            (a, item) =>
                a +
                Math.max(
                    1,
                    gcsNumber(item.quantity)
                ),
            0
        )
    };

};


GCS.updateCartCount = function () {

    const count =
        GCS.getCartCount();

    const element =
        document.getElementById(
            "cartCount"
        );

    if (element) {

        element.textContent =
            count;

    }

};


/* =====================================================
   ADD TO CART
===================================================== */

GCS.addToCart = function () {

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
            "Select a gift-card value first.",
            "Value required",
            "error"
        );

        return;

    }

    const discount =
        getBrandDiscount(
            GCS.selectedBrand,
            GCS.selectedMode
        );

    const savings =
        calculateSavings(
            GCS.selectedValue,
            discount
        );

    const itemId =
        GCS.selectedBrand +
        "|" +
        GCS.selectedMode +
        "|" +
        GCS.selectedValue;

    const cart =
        GCS.getCart();

    const existing =
        cart.find(
            item =>
                item.id === itemId
        );

    if (existing) {

        existing.quantity =
            Math.min(
                20,
                Math.max(
                    1,
                    gcsNumber(
                        existing.quantity
                    )
                ) + 1
            );

    } else {

        cart.push({

            id:
                itemId,

            brandId:
                brand.id,

            brand:
                brand.name,

            category:
                brand.category,

            logo:
                brand.logo,

            value:
                GCS.selectedValue,

            mode:
                GCS.selectedMode,

            discount:
                discount,

            price:
                GCS.selectedPrice,

            savings:
                savings,

            quantity:
                1

        });

    }

    GCS.saveCart(cart);

    GCS.closeProduct();

    GCS.openCart();

    showNotice(
        "Gift card added to your cart.",
        "Added to cart",
        "success"
    );

};


/* =====================================================
   UPDATE QUANTITY
===================================================== */

GCS.updateCartQuantity = function (
    itemId,
    change
) {

    const cart =
        GCS.getCart();

    const item =
        cart.find(
            product =>
                product.id === itemId
        );

    if (!item) {
        return;
    }

    item.quantity =
        Math.max(
            1,
            Math.min(
                20,
                gcsNumber(item.quantity) +
                gcsNumber(change)
            )
        );

    GCS.saveCart(cart);

    GCS.renderCart();

};


GCS.removeFromCart = function (
    itemId
) {

    const cart =
        GCS.getCart()
            .filter(
                item =>
                    item.id !== itemId
            );

    GCS.saveCart(cart);

    GCS.renderCart();

};


GCS.clearCart = function () {

    GCS.saveCart([]);

    GCS.renderCart();

};


/* =====================================================
   OPEN CART
===================================================== */

GCS.openCart = function () {

    GCS.closeAllOverlays();

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


GCS.renderCart = function () {

    const container =
        document.getElementById(
            "cartItems"
        );

    const summary =
        document.getElementById(
            "cartSummary"
        );

    const button =
        document.getElementById(
            "cartCheckoutButton"
        );

    if (!container) {
        return;
    }

    const cart =
        GCS.getCart();

    if (!cart.length) {

        container.innerHTML = `

            <div class="batch-empty">

                <div class="batch-empty-icon">
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Select a gift card and add it here.
                </p>

            </div>

        `;

        if (summary) {
            summary.innerHTML = "";
        }

        if (button) {
            button.disabled = true;
        }

        return;

    }

    container.innerHTML =
        cart.map(
            function (item) {

                const token =
                    gcsToken(item.id);

                const quantity =
                    Math.max(
                        1,
                        gcsNumber(
                            item.quantity
                        )
                    );

                return `

                    <div class="cart-item">

                        <div class="cart-item-logo">

                            <img
                                src="${gcsEsc(item.logo)}"
                                alt="${gcsEsc(item.brand)}">

                        </div>

                        <div class="cart-item-content">

                            <div class="cart-item-top">

                                <div>

                                    <div class="cart-item-name">
                                        ${gcsEsc(item.brand)}
                                    </div>

                                    <div class="cart-item-value">
                                        ${gcsMoney(item.value)}
                                        · ${gcsEsc(item.mode)}
                                    </div>

                                </div>

                                <div class="cart-item-price">
                                    ${gcsMoney(item.price * quantity)}
                                </div>

                            </div>

                            <div class="cart-item-save">
                                Save ${gcsMoney(item.savings)}
                                each
                            </div>

                            <div class="cart-item-controls">

                                <button
                                    class="qty-button"
                                    onclick="GCS.updateCartQuantity(decodeURIComponent('${token}'),-1)">
                                    −
                                </button>

                                <span class="qty-number">
                                    ${quantity}
                                </span>

                                <button
                                    class="qty-button"
                                    onclick="GCS.updateCartQuantity(decodeURIComponent('${token}'),1)">
                                    +
                                </button>

                                <button
                                    class="remove-cart"
                                    onclick="GCS.removeFromCart(decodeURIComponent('${token}'))">
                                    Remove
                                </button>

                            </div>

                        </div>

                    </div>

                `;

            }
        )
        .join("");


    const totals =
        GCS.getCartTotals();


    if (summary) {

        summary.innerHTML = `

            <div class="cart-summary-row">

                <span>
                    Gift card value
                </span>

                <strong>
                    ${gcsMoney(totals.value)}
                </strong>

            </div>

            <div class="cart-summary-row cart-summary-saving">

                <span>
                    Total savings
                </span>

                <strong>
                    − ${gcsMoney(totals.savings)}
                </strong>

            </div>

            <div class="cart-summary-row cart-summary-total">

                <span>
                    Total
                </span>

                <strong>
                    ${gcsMoney(totals.price)}
                </strong>

            </div>

        `;

    }

    if (button) {
        button.disabled = false;
    }

};


/* =====================================================
   CHECKOUT
===================================================== */

GCS.checkoutCart = function () {

    const cart =
        GCS.getCart();

    if (!cart.length) {

        showNotice(
            "Your cart is empty.",
            "Cart",
            "error"
        );

        return;

    }

    if (!GCS.isLoggedIn()) {

        window.checkoutWaitingForLogin =
            true;

        GCS.closeAllOverlays();

        GCS.openLogin();

        return;

    }

    GCS.renderCheckout();

    GCS.closeAllOverlays();

    const overlay =
        document.getElementById(
            "checkoutOverlay"
        );

    if (overlay) {
        overlay.style.display =
            "flex";
    }

};


/*
 * Compatibility with account.js.
 */

GCS.openCheckout =
    GCS.checkoutCart;


GCS.renderCheckout = function () {

    const container =
        document.getElementById(
            "checkoutItems"
        );

    const totalsContainer =
        document.getElementById(
            "checkoutTotals"
        );

    const email =
        document.getElementById(
            "email"
        );

    const account =
        GCS.getAccount();

    if (!container) {
        return;
    }

    const cart =
        GCS.getCart();

    container.innerHTML =
        cart.map(
            function (item) {

                const quantity =
                    Math.max(
                        1,
                        gcsNumber(
                            item.quantity
                        )
                    );

                return `

                    <div class="checkout-line">

                        <div>

                            <div class="checkout-line-name">
                                ${gcsEsc(item.brand)}
                            </div>

                            <div class="checkout-line-meta">
                                ${gcsMoney(item.value)}
                                × ${quantity}
                            </div>

                        </div>

                        <div class="checkout-line-price">
                            ${gcsMoney(
                                item.price * quantity
                            )}
                        </div>

                    </div>

                `;

            }
        )
        .join("");


    const totals =
        GCS.getCartTotals();


    if (totalsContainer) {

        totalsContainer.innerHTML = `

            <div class="checkout-total-row">

                <span>
                    Gift card value
                </span>

                <strong>
                    ${gcsMoney(totals.value)}
                </strong>

            </div>

            <div class="checkout-total-row">

                <span>
                    Savings
                </span>

                <strong>
                    − ${gcsMoney(totals.savings)}
                </strong>

            </div>

            <div class="checkout-total-row checkout-total-final">

                <span>
                    Total
                </span>

                <strong>
                    ${gcsMoney(totals.price)}
                </strong>

            </div>

        `;

    }


    if (email) {

        email.value =
            account?.email || "";

    }

};


/* =====================================================
   PRODUCT
===================================================== */

GCS.openProduct = function (
    brandId
) {

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

    GCS.closeAllOverlays();

    const name =
        document.getElementById(
            "productBrand"
        );

    const logo =
        document.getElementById(
            "productLogo"
        );

    const values =
        document.getElementById(
            "fixedValues"
        );

    const info =
        document.getElementById(
            "productInfo"
        );

    const customButton =
        document.getElementById(
            "customMode"
        );

    const customAmount =
        document.getElementById(
            "customAmount"
        );

    if (name) {
        name.textContent =
            brand.name;
    }

    if (logo) {

        logo.src =
            brand.logo;

        logo.alt =
            brand.name;

    }


    if (info) {

        const fixed =
            brand.fixedValues
                .map(
                    value =>
                        gcsMoney(value)
                )
                .join(" · ");

        const custom =
            brand.custom &&
            brand.custom.enabled
                ? "Custom values available"
                : "Preset values only";

        info.innerHTML = `

            <strong>
                ${gcsEsc(brand.name)}
            </strong>

            · ${gcsEsc(brand.category)}

            · Fixed values:
            ${gcsEsc(fixed)}

            · ${custom}

            · Up to
            ${Math.max(
                brand.fixedDiscount || 0,
                brand.customDiscount || 0
            )}% off

        `;

    }


    if (values) {

        values.innerHTML = "";

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
                        ${gcsMoney(value)}
                    </strong>

                    <small>
                        Pay ${gcsMoney(price)}
                    </small>

                `;

                button.addEventListener(
                    "click",
                    function () {

                        document
                            .querySelectorAll(
                                ".value-button"
                            )
                            .forEach(
                                item =>
                                    item.classList.remove(
                                        "active"
                                    )
                            );

                        button.classList.add(
                            "active"
                        );

                        GCS.selectedMode =
                            "fixed";

                        GCS.selectedValue =
                            value;

                        GCS.selectedPrice =
                            price;

                        GCS.updatePreview();

                    }
                );

                values.appendChild(
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


    if (customButton) {

        const enabled =
            !!(
                brand.custom &&
                brand.custom.enabled
            );

        customButton.style.display =
            enabled
                ? ""
                : "none";

    }


    if (customAmount) {

        customAmount.min =
            brand.custom?.min || 100;

        customAmount.max =
            brand.custom?.max || 10000;

        customAmount.value =
            "";

    }


    const customArea =
        document.getElementById(
            "customArea"
        );

    if (customArea) {
        customArea.style.display =
            "none";
    }


    const fixedButton =
        document.getElementById(
            "fixedMode"
        );

    if (fixedButton) {
        fixedButton.classList.add(
            "active"
        );
    }


    GCS.updateWishlistProductButton();
    GCS.updatePreview();

    overlay.style.display =
        "flex";

};


/* =====================================================
   PRODUCT CLOSE
===================================================== */

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
   MODE
===================================================== */

GCS.selectMode = function (
    mode
) {

    const brand =
        getBrand(
            GCS.selectedBrand
        );

    if (!brand) {
        return;
    }

    if (
        mode === "custom" &&
        !brand.custom?.enabled
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

        GCS.selectedValue =
            0;

        GCS.selectedPrice =
            0;

    }

    GCS.updatePreview();

};


/* =====================================================
   CUSTOM VALUE
===================================================== */

GCS.updateCustomPrice = function () {

    const input =
        document.getElementById(
            "customAmount"
        );

    const brand =
        getBrand(
            GCS.selectedBrand
        );

    if (!input || !brand) {
        return;
    }

    const amount =
        Number(input.value);

    if (
        !isValidProductValue(
            GCS.selectedBrand,
            amount,
            "custom"
        )
    ) {

        GCS.selectedValue =
            0;

        GCS.selectedPrice =
            0;

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

    const value =
        document.getElementById(
            "previewValue"
        );

    const discountElement =
        document.getElementById(
            "previewDiscount"
        );

    const price =
        document.getElementById(
            "previewPrice"
        );

    if (value) {

        value.textContent =
            GCS.selectedValue > 0
                ? gcsMoney(
                    GCS.selectedValue
                )
                : "—";

    }

    if (discountElement) {

        discountElement.textContent =
            discount + "%";

    }

    if (price) {

        price.textContent =
            GCS.selectedPrice > 0
                ? gcsMoney(
                    GCS.selectedPrice
                )
                : "—";

    }

};


/* =====================================================
   WISHLIST
===================================================== */

GCS.getWishlist = function () {

    const list =
        readGCSStorage(
            GCS_WISHLIST_KEY,
            []
        );

    return Array.isArray(list)
        ? list
        : [];

};


GCS.isWishlisted = function (
    brandId
) {

    return GCS.getWishlist()
        .includes(brandId);

};


GCS.toggleWishlist = function (
    brandId
) {

    let list =
        GCS.getWishlist();

    if (list.includes(brandId)) {

        list =
            list.filter(
                id =>
                    id !== brandId
            );

        showNotice(
            "Removed from your saved brands.",
            "Wishlist",
            "info"
        );

    } else {

        list.push(brandId);

        showNotice(
            "Saved to your wishlist.",
            "Wishlist",
            "success"
        );

    }

    writeGCSStorage(
        GCS_WISHLIST_KEY,
        list
    );

    GCS.updateWishlistProductButton();

    if (
        typeof GCS.renderProducts ===
        "function"
    ) {

        GCS.applyFilters();

    }

};


GCS.toggleWishlistSelected =
    function () {

        if (
            !GCS.selectedBrand
        ) {
            return;
        }

        GCS.toggleWishlist(
            GCS.selectedBrand
        );

    };


GCS.updateWishlistProductButton =
    function () {

        const button =
            document.getElementById(
                "wishlistProductButton"
            );

        if (!button) {
            return;
        }

        const active =
            GCS.isWishlisted(
                GCS.selectedBrand
            );

        button.classList.toggle(
            "active",
            active
        );

        button.textContent =
            active
                ? "♥"
                : "♡";

    };


/* =====================================================
   SEARCH + FILTER
===================================================== */

GCS.applyFilters = function () {

    const all =
        typeof getAllBrands ===
        "function"
            ? getAllBrands()
            : [];

    const category =
        GCS.activeCategory;

    const query =
        GCS.searchQuery
            .trim()
            .toLowerCase();


    const filtered =
        all.filter(
            function (brand) {

                const categoryMatch =
                    category === "All" ||
                    brand.category ===
                        category;

                const searchMatch =
                    !query ||
                    brand.name
                        .toLowerCase()
                        .includes(query) ||
                    brand.category
                        .toLowerCase()
                        .includes(query);

                return (
                    categoryMatch &&
                    searchMatch
                );

            }
        );


    GCS.renderProducts(
        filtered
    );


    const info =
        document.getElementById(
            "searchInfo"
        );

    if (info) {

        if (query) {

            info.innerHTML =
                `<strong>${filtered.length}</strong>
                 result${filtered.length === 1 ? "" : "s"}
                 for “${gcsEsc(query)}”`;

        } else {

            info.textContent =
                "";

        }

    }

};


GCS.searchCards = function (
    event
) {

    GCS.searchQuery =
        event.target.value;

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

    GCS.searchQuery =
        "";

    GCS.applyFilters();

};


GCS.filterCategory = function (
    category,
    button
) {

    GCS.activeCategory =
        category;

    document
        .querySelectorAll(
            ".category"
        )
        .forEach(
            function (item) {

                item.classList.remove(
                    "active"
                );

            }
        );

    if (button) {

        button.classList.add(
            "active"
        );

    }

    GCS.applyFilters();

};


/* =====================================================
   RENDER PRODUCTS
===================================================== */

GCS.renderProducts = function (
    brands
) {

    const container =
        document.getElementById(
            "cards"
        );

    if (!container) {
        return;
    }

    const list =
        brands ||
        (
            typeof getAllBrands ===
            "function"
                ? getAllBrands()
                : []
        );


    if (!list.length) {

        container.innerHTML = `

            <div class="batch-empty">

                <div class="batch-empty-icon">
                    ◌
                </div>

                <h3>
                    No matching brands
                </h3>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        list.map(
            function (brand) {

                const discount =
                    Math.max(
                        brand.fixedDiscount || 0,
                        brand.customDiscount || 0
                    );

                const active =
                    GCS.isWishlisted(
                        brand.id
                    );

                const minimum =
                    brand.fixedValues?.length
                        ? Math.min(
                            ...brand.fixedValues
                        )
                        : 0;


                return `

                    <article
                        class="card"
                        data-brand-id="${gcsEsc(
                            brand.id
                        )}">

                        <button
                            class="wishlist-card-button ${
                                active
                                    ? "active"
                                    : ""
                            }"
                            onclick="
                                event.stopPropagation();
                                GCS.toggleWishlist('${gcsEsc(
                                    brand.id
                                )}')
                            "
                            aria-label="Save ${gcsEsc(
                                brand.name
                            )}">

                            ${active ? "♥" : "♡"}

                        </button>


                        <div class="brand-box">

                            <img
                                class="brand-logo"
                                src="${gcsEsc(
                                    brand.logo
                                )}"
                                alt="${gcsEsc(
                                    brand.name
                                )}"
                                loading="lazy">

                        </div>


                        <div class="brand">
                            ${gcsEsc(
                                brand.category
                            )}
                        </div>


                        <h3>
                            ${gcsEsc(
                                brand.name
                            )}
                        </h3>


                        <div class="discount">
                            Up to ${discount}% off
                        </div>


                        <div class="card-min-value"
                             style="
                                color:var(--muted);
                                font-size:10px;
                                margin-bottom:8px;
                             ">
                            From ${gcsMoney(minimum)}
                        </div>


                        <button
                            class="buy"
                            type="button">
                            View Gift Cards
                        </button>

                    </article>

                `;

            }
        )
        .join("");


    container
        .querySelectorAll(".card")
        .forEach(
            function (card) {

                const brandId =
                    card.dataset.brandId;

                card.addEventListener(
                    "click",
                    function () {

                        GCS.openProduct(
                            brandId
                        );

                    }
                );

            }
        );

};


/* =====================================================
   HEADER
===================================================== */

GCS.updateHeader = function () {

    const login =
        document.getElementById(
            "loginButton"
        );

    const account =
        document.getElementById(
            "accountButton"
        );

    const loggedIn =
        GCS.isLoggedIn();


    if (login) {

        login.style.display =
            loggedIn
                ? "none"
                : "inline-flex";

    }


    if (account) {

        account.style.display =
            loggedIn
                ? "inline-flex"
                : "none";

    }


    GCS.updateCartCount();

};


/* =====================================================
   SUCCESS
===================================================== */

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
   EMAIL
===================================================== */

GCS.clearEmailError = function () {

    const input =
        document.getElementById(
            "email"
        );

    const error =
        document.getElementById(
            "emailError"
        );

    if (input) {
        input.classList.remove(
            "error"
        );
    }

    if (error) {
        error.style.display =
            "none";
    }

};


/* =====================================================
   CREATE ORDER
===================================================== */

GCS.createOrder = function () {

    if (!GCS.isLoggedIn()) {

        window.checkoutWaitingForLogin =
            true;

        GCS.openLogin();

        return;

    }


    const account =
        GCS.getAccount();

    const cart =
        GCS.getCart();

    if (!cart.length) {

        showNotice(
            "Your cart is empty.",
            "Checkout",
            "error"
        );

        return;

    }


    const emailInput =
        document.getElementById(
            "email"
        );

    const email =
        emailInput
            ? emailInput.value
                .trim()
                .toLowerCase()
            : account?.email || "";


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

        if (emailInput) {
            emailInput.classList.add(
                "error"
            );
        }

        return;

    }


    const totals =
        GCS.getCartTotals();


    const stamp =
        Date.now()
            .toString()
            .slice(-8);


    const batchId =
        "GCS-" + stamp;


    cart.forEach(
        function (item, index) {

            const quantity =
                Math.max(
                    1,
                    gcsNumber(
                        item.quantity
                    )
                );


            const order = {

                id:
                    batchId +
                    "-" +
                    (index + 1),

                batchId:
                    batchId,

                brand:
                    item.brand,

                brandId:
                    item.brandId,

                value:
                    gcsMoney(
                        item.value
                    ),

                price:
                    gcsMoney(
                        item.price
                    ),

                discount:
                    item.discount + "%",

                savings:
                    gcsMoney(
                        item.savings
                    ),

                quantity:
                    quantity,

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
                typeof saveOrder ===
                "function"
            ) {

                saveOrder(order);

            }

        }
    );


    GCS.saveCart([]);

    GCS.closeAllOverlays();


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


    GCS.updateHeader();

};


/* =====================================================
   START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (
            typeof createAccountModal ===
            "function"
        ) {

            createAccountModal();

        }


        GCS.renderProducts();

        GCS.updateHeader();


        const login =
            document.getElementById(
                "loginButton"
            );

        if (login) {
            login.onclick =
                GCS.openLogin;
        }


        const account =
            document.getElementById(
                "accountButton"
            );

        if (account) {
            account.onclick =
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


        setTimeout(
            function () {

                const count =
                    document.getElementById(
                        "heroBrandCount"
                    );

                if (
                    count &&
                    typeof getAllBrands ===
                    "function"
                ) {

                    count.textContent =
                        getAllBrands().length;

                }

            },
            100
        );

    }
);
