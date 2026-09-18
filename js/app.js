/* =====================================================
   GIFTCARDSTORE — MAIN APPLICATION
   PREMIUM MARKETPLACE APPLICATION
   DESKTOP + MOBILE
===================================================== */

window.GCS = window.GCS || {};


/* =====================================================
   STORAGE
===================================================== */

const GCS_CART_KEY = "gcsCart";
const GCS_WISHLIST_KEY = "gcsWishlist";


function readGCSStorage(key, fallback) {

    try {

        const value =
            localStorage.getItem(key);

        if (!value) {
            return fallback;
        }

        return JSON.parse(value);

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
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

}


function gcsToken(value) {

    return encodeURIComponent(
        String(value)
    );

}


function gcsDiscount(
    brand,
    mode
) {

    if (!brand) {
        return 0;
    }

    if (
        mode === "custom"
    ) {

        return Number(
            brand.customDiscount || 0
        );

    }

    return Number(
        brand.fixedDiscount || 0
    );

}


function gcsCalculatePrice(
    value,
    discount
) {

    const amount =
        Number(value) || 0;

    const rate =
        Number(discount) || 0;

    if (
        amount <= 0
    ) {

        return 0;

    }

    return Math.round(
        amount -
        (
            amount *
            rate /
            100
        )
    );

}


function gcsCalculateSavings(
    value,
    discount
) {

    const amount =
        Number(value) || 0;

    const rate =
        Number(discount) || 0;

    return Math.round(
        amount *
        rate /
        100
    );

}


function gcsGetBrands() {

    if (
        typeof getAllBrands ===
        "function"
    ) {

        const brands =
            getAllBrands();

        return Array.isArray(brands)
            ? brands
            : [];

    }

    return [];

}


/* =====================================================
   STATE
===================================================== */

GCS.selectedBrand = null;
GCS.selectedValue = 0;
GCS.selectedPrice = 0;
GCS.selectedSavings = 0;
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


GCS.getBrand = function (
    brandId
) {

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
   OVERLAY CONTROL
===================================================== */

GCS.closeAllOverlays =
    function () {

        const overlayIds = [

            "productOverlay",
            "cartOverlay",
            "checkoutOverlay",
            "successOverlay"

        ];

        overlayIds.forEach(
            function (id) {

                const element =
                    document.getElementById(
                        id
                    );

                if (element) {

                    element.style.display =
                        "none";

                }

            }
        );


        document
            .querySelectorAll(
                ".overlay.open"
            )
            .forEach(
                function (element) {

                    element.classList.remove(
                        "open"
                    );

                }
            );

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


GCS.saveCart = function (
    cart
) {

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
            function (
                total,
                item
            ) {

                return total +
                    Math.max(
                        1,
                        gcsNumber(
                            item.quantity
                        )
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
        function (
            item
        ) {

            const quantity =
                Math.max(
                    1,
                    gcsNumber(
                        item.quantity
                    )
                );

            value +=
                gcsNumber(
                    item.value
                ) *
                quantity;

            price +=
                gcsNumber(
                    item.price
                ) *
                quantity;

            savings +=
                gcsNumber(
                    item.savings
                ) *
                quantity;

        }
    );

    return {

        value,
        price,
        savings,

        count:
            cart.reduce(
                function (
                    total,
                    item
                ) {

                    return total +
                        Math.max(
                            1,
                            gcsNumber(
                                item.quantity
                            )
                        );

                },
                0
            )

    };

};


GCS.updateCartCount =
    function () {

        const count =
            GCS.getCartCount();

        const element =
            document.getElementById(
                "cartCount"
            );

        if (element) {

            element.textContent =
                count;

            element.classList.toggle(
                "empty",
                count === 0
            );

        }

    };


/* =====================================================
   ADD TO CART
===================================================== */

GCS.addToCart =
    function () {

        const brand =
            GCS.getBrand(
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
            gcsDiscount(
                brand,
                GCS.selectedMode
            );


        const savings =
            typeof calculateSavings ===
            "function"

                ? calculateSavings(
                    GCS.selectedValue,
                    discount
                )

                : gcsCalculateSavings(
                    GCS.selectedValue,
                    discount
                );


        const price =
            GCS.selectedPrice ||
            (
                typeof calculatePrice ===
                "function"

                    ? calculatePrice(
                        GCS.selectedValue,
                        discount
                    )

                    : gcsCalculatePrice(
                        GCS.selectedValue,
                        discount
                    )
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
                function (
                    item
                ) {

                    return (
                        item.id ===
                        itemId
                    );

                }
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
                    price,

                savings:
                    savings,

                quantity:
                    1

            });

        }


        GCS.saveCart(
            cart
        );


        GCS.closeProduct();

        GCS.openCart();


        showNotice(
            "Gift card added to your cart.",
            "Added to cart",
            "success"
        );

    };


/* =====================================================
   UPDATE CART
===================================================== */

GCS.updateCartQuantity =
    function (
        itemId,
        change
    ) {

        const cart =
            GCS.getCart();

        const item =
            cart.find(
                function (
                    product
                ) {

                    return (
                        product.id ===
                        itemId
                    );

                }
            );

        if (!item) {
            return;
        }


        item.quantity =
            Math.max(
                1,
                Math.min(
                    20,
                    gcsNumber(
                        item.quantity
                    ) +
                    gcsNumber(
                        change
                    )
                )
            );


        GCS.saveCart(
            cart
        );

        GCS.renderCart();

    };


GCS.removeFromCart =
    function (
        itemId
    ) {

        const cart =
            GCS.getCart()
                .filter(
                    function (
                        item
                    ) {

                        return (
                            item.id !==
                            itemId
                        );

                    }
                );


        GCS.saveCart(
            cart
        );

        GCS.renderCart();

    };


GCS.clearCart =
    function () {

        GCS.saveCart(
            []
        );

        GCS.renderCart();

    };


/* =====================================================
   OPEN CART
===================================================== */

GCS.openCart =
    function () {

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


/* =====================================================
   RENDER CART
===================================================== */

GCS.renderCart =
    function () {

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

                summary.innerHTML =
                    "";

            }


            if (button) {

                button.disabled =
                    true;

            }

            return;

        }


        container.innerHTML =
            cart.map(
                function (
                    item
                ) {

                    const token =
                        gcsToken(
                            item.id
                        );

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
                                    alt="${gcsEsc(item.brand)}"
                                    onerror="this.style.display='none';"
                                >

                            </div>


                            <div class="cart-item-content">

                                <div class="cart-item-top">

                                    <div>

                                        <div class="cart-item-name">
                                            ${gcsEsc(item.brand)}
                                        </div>

                                        <div class="cart-item-value">
                                            ${gcsMoney(item.value)}
                                            ·
                                            ${gcsEsc(item.mode)}
                                        </div>

                                    </div>


                                    <div class="cart-item-price">
                                        ${gcsMoney(
                                            item.price *
                                            quantity
                                        )}
                                    </div>

                                </div>


                                <div class="cart-item-save">
                                    Save
                                    ${gcsMoney(
                                        item.savings
                                    )}
                                    each
                                </div>


                                <div class="cart-item-controls">

                                    <button
                                        class="qty-button"
                                        type="button"
                                        onclick="
                                            GCS.updateCartQuantity(
                                                decodeURIComponent('${token}'),
                                                -1
                                            )
                                        "
                                    >
                                        −
                                    </button>


                                    <span class="qty-number">
                                        ${quantity}
                                    </span>


                                    <button
                                        class="qty-button"
                                        type="button"
                                        onclick="
                                            GCS.updateCartQuantity(
                                                decodeURIComponent('${token}'),
                                                1
                                            )
                                        "
                                    >
                                        +
                                    </button>


                                    <button
                                        class="remove-cart"
                                        type="button"
                                        onclick="
                                            GCS.removeFromCart(
                                                decodeURIComponent('${token}')
                                            )
                                        "
                                    >
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
                        ${gcsMoney(
                            totals.value
                        )}
                    </strong>

                </div>


                <div class="cart-summary-row cart-summary-saving">

                    <span>
                        Total savings
                    </span>

                    <strong>
                        − ${gcsMoney(
                            totals.savings
                        )}
                    </strong>

                </div>


                <div class="cart-summary-row cart-summary-total">

                    <span>
                        Total
                    </span>

                    <strong>
                        ${gcsMoney(
                            totals.price
                        )}
                    </strong>

                </div>

            `;

        }


        if (button) {

            button.disabled =
                false;

        }

    };


/* =====================================================
   CHECKOUT
===================================================== */

GCS.checkoutCart =
    function () {

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


GCS.openCheckout =
    GCS.checkoutCart;


/* =====================================================
   RENDER CHECKOUT
===================================================== */

GCS.renderCheckout =
    function () {

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
                function (
                    item
                ) {

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
                                    ${gcsEsc(
                                        item.brand
                                    )}
                                </div>

                                <div class="checkout-line-meta">
                                    ${gcsMoney(
                                        item.value
                                    )}
                                    ×
                                    ${quantity}
                                </div>

                            </div>

                            <div class="checkout-line-price">
                                ${gcsMoney(
                                    item.price *
                                    quantity
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
                        ${gcsMoney(
                            totals.value
                        )}
                    </strong>

                </div>


                <div class="checkout-total-row">

                    <span>
                        Savings
                    </span>

                    <strong>
                        − ${gcsMoney(
                            totals.savings
                        )}
                    </strong>

                </div>


                <div class="checkout-total-row checkout-total-final">

                    <span>
                        Total
                    </span>

                    <strong>
                        ${gcsMoney(
                            totals.price
                        )}
                    </strong>

                </div>

            `;

        }


        if (email) {

            email.value =
                account?.email ||
                "";

        }

    };


/* =====================================================
   PRODUCT CONFIGURATOR
===================================================== */

GCS.openProduct =
    function (
        brandId
    ) {

        const brand =
            GCS.getBrand(
                brandId
            );


        if (!brand) {

            console.warn(
                "GiftCardStore: brand not found",
                brandId
            );

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

        GCS.selectedSavings =
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


        /* ---------------------------------------------
           BRAND
        --------------------------------------------- */

        if (name) {

            name.textContent =
                brand.name;

        }


        if (logo) {

            logo.src =
                brand.logo;

            logo.alt =
                brand.name;

            logo.style.display =
                "";

        }


        /* ---------------------------------------------
           PRODUCT INFORMATION
           Clean, compact information.
        --------------------------------------------- */

        if (info) {

            const fixedDiscount =
                Number(
                    brand.fixedDiscount || 0
                );

            const customDiscount =
                Number(
                    brand.customDiscount || 0
                );


            info.innerHTML = `

                <div class="product-rate-row">

                    <span>
                        ${gcsEsc(
                            brand.category ||
                            "Gift Card"
                        )}
                    </span>

                    <strong>
                        SAVE ${fixedDiscount}%
                    </strong>

                </div>

            `;

        }


        /* ---------------------------------------------
           FIXED VALUES
        --------------------------------------------- */

        if (values) {

            values.innerHTML =
                "";


            const fixedValues =
                Array.isArray(
                    brand.fixedValues
                )
                    ? brand.fixedValues
                    : [];


            fixedValues.forEach(
                function (
                    value,
                    index
                ) {

                    const discount =
                        Number(
                            brand.fixedDiscount ||
                            0
                        );


                    const price =
                        typeof calculatePrice ===
                        "function"

                            ? calculatePrice(
                                value,
                                discount
                            )

                            : gcsCalculatePrice(
                                value,
                                discount
                            );


                    const savings =
                        typeof calculateSavings ===
                        "function"

                            ? calculateSavings(
                                value,
                                discount
                            )

                            : gcsCalculateSavings(
                                value,
                                discount
                            );


                    const button =
                        document.createElement(
                            "button"
                        );


                    button.className =
                        "value-button";


                    button.type =
                        "button";


                    button.dataset.value =
                        value;


                    button.innerHTML = `

                        <span class="value-main">

                            <strong>
                                ${gcsMoney(
                                    value
                                )}
                            </strong>

                        </span>


                        <span class="value-pay">

                            Pay
                            ${gcsMoney(
                                price
                            )}

                        </span>


                        ${
                            savings > 0
                                ? `
                                    <span class="value-save">
                                        Save ${gcsMoney(savings)}
                                    </span>
                                  `
                                : ""
                        }

                    `;


                    button.addEventListener(
                        "click",
                        function () {

                            document
                                .querySelectorAll(
                                    "#fixedValues .value-button"
                                )
                                .forEach(
                                    function (
                                        item
                                    ) {

                                        item.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                            button.classList.add(
                                "active"
                            );


                            GCS.selectedMode =
                                "fixed";

                            GCS.selectedValue =
                                Number(
                                    value
                                );

                            GCS.selectedPrice =
                                Number(
                                    price
                                );

                            GCS.selectedSavings =
                                Number(
                                    savings
                                );


                            GCS.updatePreview();

                        }
                    );


                    values.appendChild(
                        button
                    );


                    if (
                        index === 0
                    ) {

                        GCS.selectedValue =
                            Number(
                                value
                            );

                        GCS.selectedPrice =
                            Number(
                                price
                            );

                        GCS.selectedSavings =
                            Number(
                                savings
                            );


                        button.classList.add(
                            "active"
                        );

                    }

                }
            );

        }


        /* ---------------------------------------------
           CUSTOM MODE
        --------------------------------------------- */

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
                brand.custom?.min ||
                100;

            customAmount.max =
                brand.custom?.max ||
                10000;

            customAmount.value =
                "";

        }


        const customArea =
            document.getElementById(
                "customArea"
            );


        const fixedArea =
            document.getElementById(
                "fixedArea"
            );


        if (customArea) {

            customArea.style.display =
                "none";

        }


        if (fixedArea) {

            fixedArea.style.display =
                "block";

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


        if (customButton) {

            customButton.classList.remove(
                "active"
            );

        }


        GCS.updateWishlistProductButton();

        GCS.updatePreview();


        overlay.style.display =
            "flex";


        overlay.setAttribute(
            "aria-hidden",
            "false"
        );

    };


/* =====================================================
   CLOSE PRODUCT
===================================================== */

GCS.closeProduct =
    function () {

        const overlay =
            document.getElementById(
                "productOverlay"
            );


        if (overlay) {

            overlay.style.display =
                "none";

            overlay.setAttribute(
                "aria-hidden",
                "true"
            );

        }

    };


/* =====================================================
   PRODUCT TYPE
===================================================== */

GCS.selectMode =
    function (
        mode
    ) {

        const brand =
            GCS.getBrand(
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


        if (
            mode === "custom"
        ) {

            GCS.selectedValue =
                0;

            GCS.selectedPrice =
                0;

            GCS.selectedSavings =
                0;

        }


        GCS.updatePreview();

    };


/* =====================================================
   CUSTOM VALUE
===================================================== */

GCS.updateCustomPrice =
    function () {

        const input =
            document.getElementById(
                "customAmount"
            );

        const brand =
            GCS.getBrand(
                GCS.selectedBrand
            );


        if (
            !input ||
            !brand
        ) {

            return;

        }


        const amount =
            Number(
                input.value
            );


        if (
            typeof isValidProductValue ===
            "function" &&
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

            GCS.selectedSavings =
                0;

            GCS.updatePreview();

            return;

        }


        if (
            !amount ||
            amount <= 0
        ) {

            GCS.selectedValue =
                0;

            GCS.selectedPrice =
                0;

            GCS.selectedSavings =
                0;

            GCS.updatePreview();

            return;

        }


        const discount =
            Number(
                brand.customDiscount ||
                0
            );


        GCS.selectedMode =
            "custom";

        GCS.selectedValue =
            amount;


        GCS.selectedPrice =
            typeof calculatePrice ===
            "function"

                ? calculatePrice(
                    amount,
                    discount
                )

                : gcsCalculatePrice(
                    amount,
                    discount
                );


        GCS.selectedSavings =
            typeof calculateSavings ===
            "function"

                ? calculateSavings(
                    amount,
                    discount
                )

                : gcsCalculateSavings(
                    amount,
                    discount
                );


        GCS.updatePreview();

    };


/* =====================================================
   PREVIEW
===================================================== */

GCS.updatePreview =
    function () {

        const brand =
            GCS.getBrand(
                GCS.selectedBrand
            );


        if (!brand) {
            return;
        }


        const discount =
            gcsDiscount(
                brand,
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
                discount +
                "%";

        }


        if (price) {

            price.textContent =
                GCS.selectedPrice > 0
                    ? gcsMoney(
                        GCS.selectedPrice
                    )
                    : "—";

        }


        const savings =
            GCS.selectedSavings;


        document
            .querySelectorAll(
                "#previewSavings, .preview-savings"
            )
            .forEach(
                function (
                    element
                ) {

                    element.textContent =
                        savings > 0
                            ? "Save " +
                              gcsMoney(
                                  savings
                              )
                            : "";

                }
            );

    };


/* =====================================================
   WISHLIST
===================================================== */

GCS.getWishlist =
    function () {

        const list =
            readGCSStorage(
                GCS_WISHLIST_KEY,
                []
            );


        return Array.isArray(list)
            ? list
            : [];

    };


GCS.isWishlisted =
    function (
        brandId
    ) {

        return GCS.getWishlist()
            .includes(
                brandId
            );

    };


GCS.toggleWishlist =
    function (
        brandId
    ) {

        let list =
            GCS.getWishlist();


        if (
            list.includes(
                brandId
            )
        ) {

            list =
                list.filter(
                    function (
                        id
                    ) {

                        return (
                            id !==
                            brandId
                        );

                    }
                );


            showNotice(
                "Removed from your saved brands.",
                "Wishlist",
                "info"
            );

        } else {

            list.push(
                brandId
            );


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

GCS.applyFilters =
    function () {

        const all =
            gcsGetBrands();


        const category =
            GCS.activeCategory;


        const query =
            GCS.searchQuery
                .trim()
                .toLowerCase();


        const filtered =
            all.filter(
                function (
                    brand
                ) {

                    const brandCategory =
                        String(
                            brand.category ||
                            ""
                        );


                    const categoryMatch =
                        category === "All" ||
                        brandCategory ===
                            category;


                    const name =
                        String(
                            brand.name ||
                            ""
                        )
                            .toLowerCase();


                    const categorySearch =
                        brandCategory
                            .toLowerCase();


                    const searchMatch =
                        !query ||
                        name.includes(
                            query
                        ) ||
                        categorySearch.includes(
                            query
                        );


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


        const count =
            document.getElementById(
                "heroBrandCount"
            );


        if (count) {

            count.textContent =
                all.length;

        }

    };


GCS.searchCards =
    function (
        event
    ) {

        GCS.searchQuery =
            event.target.value;


        GCS.applyFilters();

    };


GCS.clearSearch =
    function () {

        const input =
            document.getElementById(
                "search"
            );


        if (input) {

            input.value =
                "";

        }


        GCS.searchQuery =
            "";


        GCS.applyFilters();

    };


GCS.filterCategory =
    function (
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
                function (
                    item
                ) {

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
   PREMIUM PRODUCT CARDS
===================================================== */

GCS.renderProducts =
    function (
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
            Array.isArray(
                brands
            )
                ? brands
                : gcsGetBrands();


        /* ---------------------------------------------
           EMPTY STATE
        --------------------------------------------- */

        if (!list.length) {

            container.innerHTML = `

                <div class="batch-empty premium-empty">

                    <div class="batch-empty-icon">
                        ✦
                    </div>

                    <h3>
                        No matching brands
                    </h3>

                    <p>
                        Try another search or category.
                    </p>

                    <button
                        type="button"
                        class="premium-empty-button"
                        onclick="GCS.clearSearch()"
                    >
                        Clear search
                    </button>

                </div>

            `;

            return;

        }


        /* ---------------------------------------------
           GROUP BY CATEGORY
        --------------------------------------------- */

        const groups = {};


        list.forEach(
            function (
                brand
            ) {

                const category =
                    brand.category ||
                    "Other";


                if (
                    !groups[category]
                ) {

                    groups[category] =
                        [];

                }


                groups[category].push(
                    brand
                );

            }
        );


        const categoryOrder = [

            "Shopping",
            "Grocery",
            "Food",
            "Fashion",
            "Beauty",
            "Entertainment",
            "Travel",
            "Electronics",
            "Home",
            "Kids",
            "Sports",
            "Fitness",
            "Other"

        ];


        const categoryTitles = {

            Shopping:
                "Shopping",

            Grocery:
                "Grocery",

            Food:
                "Food & Dining",

            Fashion:
                "Fashion",

            Beauty:
                "Beauty",

            Entertainment:
                "Entertainment",

            Travel:
                "Travel",

            Electronics:
                "Electronics",

            Home:
                "Home & Living",

            Kids:
                "Kids & Family",

            Sports:
                "Sports",

            Fitness:
                "Fitness",

            Other:
                "Other"

        };


        const orderedCategories = [];


        categoryOrder.forEach(
            function (
                category
            ) {

                if (
                    groups[category] &&
                    groups[category].length
                ) {

                    orderedCategories.push(
                        category
                    );

                }

            }
        );


        Object.keys(
            groups
        )
            .forEach(
                function (
                    category
                ) {

                    if (
                        !orderedCategories.includes(
                            category
                        )
                    ) {

                        orderedCategories.push(
                            category
                        );

                    }

                }
            );


        let html =
            "";


        /* ---------------------------------------------
           CATEGORY SECTIONS
        --------------------------------------------- */

        orderedCategories.forEach(
            function (
                category
            ) {

                const categoryBrands =
                    groups[
                        category
                    ];


                html += `

                    <section
                        class="brand-category-section premium-category-section"
                        data-category="${gcsEsc(
                            category
                        )}"
                    >

                        <div class="brand-category-heading">

                            <div>

                                <div class="brand-category-eyebrow">
                                    EXPLORE
                                </div>

                                <h2>
                                    ${gcsEsc(
                                        categoryTitles[
                                            category
                                        ] ||
                                        category
                                    )}
                                </h2>

                            </div>


                            <span class="brand-category-count">
                                ${categoryBrands.length}
                            </span>

                        </div>


                        <div class="brand-category-list premium-brand-grid">

                `;


                categoryBrands.forEach(
                    function (
                        brand
                    ) {

                        const discount =
                            Number(
                                brand.fixedDiscount ||
                                brand.customDiscount ||
                                0
                            );


                        const active =
                            GCS.isWishlisted(
                                brand.id
                            );


                        const fixedValues =
                            Array.isArray(
                                brand.fixedValues
                            )
                                ? brand.fixedValues
                                : [];


                        const minimum =
                            fixedValues.length
                                ? Math.min(
                                    ...fixedValues
                                )
                                : 0;


                        const maximum =
                            fixedValues.length
                                ? Math.max(
                                    ...fixedValues
                                )
                                : 0;


                        let valueLabel =
                            "Flexible value";


                        if (
                            minimum &&
                            maximum &&
                            minimum !== maximum
                        ) {

                            valueLabel =
                                gcsMoney(
                                    minimum
                                ) +
                                " – " +
                                gcsMoney(
                                    maximum
                                );

                        }
                        else if (
                            minimum
                        ) {

                            valueLabel =
                                "From " +
                                gcsMoney(
                                    minimum
                                );

                        }


                        html += `

                            <article
                                class="card premium-brand-card"
                                data-brand-id="${gcsEsc(
                                    brand.id
                                )}"
                            >

                                <div class="brand-card-image">

                                    <div class="brand-logo-frame">

                                        <img
                                            class="brand-logo"
                                            src="${gcsEsc(
                                                brand.logo
                                            )}"
                                            alt="${gcsEsc(
                                                brand.name
                                            )}"
                                            loading="lazy"
                                            onerror="this.style.opacity='0'"
                                        >

                                    </div>


                                    ${
                                        discount > 0
                                            ? `
                                                <span class="premium-discount-badge">
                                                    ${discount}% OFF
                                                </span>
                                              `
                                            : ""
                                    }

                                </div>


                                <div class="brand-card-content">


                                    <div class="brand-card-top">

                                        <span class="brand-card-category">
                                            ${gcsEsc(
                                                brand.category ||
                                                "Gift Card"
                                            )}
                                        </span>


                                        <button
                                            class="wishlist-card-button ${
                                                active
                                                    ? "active"
                                                    : ""
                                            }"
                                            type="button"
                                            onclick="
                                                event.stopPropagation();
                                                GCS.toggleWishlist('${gcsEsc(
                                                    brand.id
                                                )}')
                                            "
                                            aria-label="Save ${gcsEsc(
                                                brand.name
                                            )}"
                                        >
                                            ${
                                                active
                                                    ? "♥"
                                                    : "♡"
                                            }
                                        </button>

                                    </div>


                                    <h3 class="brand-card-name">
                                        ${gcsEsc(
                                            brand.name
                                        )}
                                    </h3>


                                    <div class="brand-card-value">

                                        <span>
                                            Available value
                                        </span>

                                        <strong>
                                            ${gcsEsc(
                                                valueLabel
                                            )}
                                        </strong>

                                    </div>


                                    <div class="brand-card-offer">

                                        <span>
                                            SAVE
                                        </span>

                                        <strong>
                                            ${discount}%
                                        </strong>

                                        <span class="brand-card-arrow">
                                            →
                                        </span>

                                    </div>


                                    <button
                                        class="brand-card-purchase"
                                        type="button"
                                    >
                                        Choose value

                                        <span>
                                            →
                                        </span>

                                    </button>


                                </div>

                            </article>

                        `;

                    }
                );


                html += `

                        </div>

                    </section>

                `;

            }
        );


        container.innerHTML =
            html;


        /* ---------------------------------------------
           CARD INTERACTIONS
        --------------------------------------------- */

        container
            .querySelectorAll(
                ".premium-brand-card"
            )
            .forEach(
                function (
                    card
                ) {

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


                    const purchase =
                        card.querySelector(
                            ".brand-card-purchase"
                        );


                    if (purchase) {

                        purchase.addEventListener(
                            "click",
                            function (
                                event
                            ) {

                                event.stopPropagation();

                                GCS.openProduct(
                                    brandId
                                );

                            }
                        );

                    }

                }
            );

    };


/* =====================================================
   HEADER
===================================================== */

GCS.updateHeader =
    function () {

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

GCS.closeSuccess =
    function () {

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

GCS.clearEmailError =
    function () {

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

GCS.createOrder =
    function () {

        if (
            !GCS.isLoggedIn()
        ) {

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
                : account?.email ||
                  "";


        const validEmail =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


        if (
            !validEmail.test(
                email
            )
        ) {

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


        const stamp =
            Date.now()
                .toString()
                .slice(
                    -8
                );


        const batchId =
            "GCS-" +
            stamp;


        cart.forEach(
            function (
                item,
                index
            ) {

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
                        (
                            index +
                            1
                        ),

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
                        item.discount +
                        "%",

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

                    saveOrder(
                        order
                    );

                }

            }
        );


        GCS.saveCart(
            []
        );


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
   PREMIUM VISUAL ENHANCEMENT
   Self-contained styles for the new card system.
===================================================== */

GCS.injectPremiumStyles =
    function () {

        if (
            document.getElementById(
                "gcsPremiumRuntimeStyles"
            )
        ) {

            return;

        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "gcsPremiumRuntimeStyles";


        style.textContent = `

            /* -----------------------------------------
               PRODUCT GRID
            ----------------------------------------- */

            .premium-brand-grid {

                display: grid !important;

                grid-template-columns:
                    repeat(
                        auto-fill,
                        minmax(
                            260px,
                            1fr
                        )
                    );

                gap:
                    18px;

            }


            .premium-brand-card {

                position: relative;

                display: flex;

                flex-direction: column;

                min-height:
                    330px;

                overflow: hidden;

                cursor: pointer;

                border:
                    1px solid
                    rgba(
                        255,
                        255,
                        255,
                        .08
                    );

                border-radius:
                    22px;

                background:
                    linear-gradient(
                        145deg,
                        rgba(
                            23,
                            24,
                            34,
                            .98
                        ),
                        rgba(
                            11,
                            12,
                            18,
                            .98
                        )
                    );

                box-shadow:
                    0 12px 40px
                    rgba(
                        0,
                        0,
                        0,
                        .16
                    );

                transition:
                    transform .22s ease,
                    border-color .22s ease,
                    box-shadow .22s ease;

            }


            .premium-brand-card:hover {

                transform:
                    translateY(
                        -5px
                    );

                border-color:
                    rgba(
                        160,
                        120,
                        255,
                        .36
                    );

                box-shadow:
                    0 22px 60px
                    rgba(
                        0,
                        0,
                        0,
                        .28
                    );

            }


            .brand-card-image {

                position: relative;

                display: flex;

                align-items: center;

                justify-content: center;

                min-height:
                    150px;

                padding:
                    28px;

                background:
                    radial-gradient(
                        circle at 50% 35%,
                        rgba(
                            145,
                            104,
                            255,
                            .11
                        ),
                        transparent 58%
                    );

            }


            .brand-logo-frame {

                display: flex;

                align-items: center;

                justify-content: center;

                width:
                    104px;

                height:
                    104px;

                padding:
                    18px;

                border-radius:
                    26px;

                background:
                    rgba(
                        255,
                        255,
                        255,
                        .96
                    );

                box-shadow:
                    0 10px 32px
                    rgba(
                        0,
                        0,
                        0,
                        .20
                    );

            }


            .brand-logo {

                display: block;

                width:
                    100%;

                height:
                    100%;

                object-fit:
                    contain;

            }


            .premium-discount-badge {

                position: absolute;

                top:
                    16px;

                left:
                    16px;

                padding:
                    7px 10px;

                border-radius:
                    999px;

                font-size:
                    11px;

                font-weight:
                    800;

                letter-spacing:
                    .06em;

                color:
                    #fff;

                background:
                    rgba(
                        125,
                        82,
                        245,
                        .92
                    );

            }


            .brand-card-content {

                display:
                    flex;

                flex-direction:
                    column;

                flex:
                    1;

                padding:
                    0 20px 20px;

            }


            .brand-card-top {

                display:
                    flex;

                align-items:
                    center;

                justify-content:
                    space-between;

                gap:
                    10px;

            }


            .brand-card-category {

                font-size:
                    11px;

                font-weight:
                    700;

                letter-spacing:
                    .10em;

                text-transform:
                    uppercase;

                opacity:
                    .58;

            }


            .wishlist-card-button {

                display:
                    inline-flex;

                align-items:
                    center;

                justify-content:
                    center;

                width:
                    34px;

                height:
                    34px;

                padding:
                    0;

                border:
                    1px solid
                    rgba(
                        255,
                        255,
                        255,
                        .08
                    );

                border-radius:
                    50%;

                background:
                    rgba(
                        255,
                        255,
                        255,
                        .035
                    );

                color:
                    rgba(
                        255,
                        255,
                        255,
                        .65
                    );

                font-size:
                    17px;

                cursor:
                    pointer;

                transition:
                    .2s ease;

            }


            .wishlist-card-button:hover,
            .wishlist-card-button.active {

                color:
                    #c6a7ff;

                border-color:
                    rgba(
                        175,
                        125,
                        255,
                        .4
                    );

                background:
                    rgba(
                        139,
                        92,
                        246,
                        .12
                    );

            }


            .brand-card-name {

                margin:
                    11px 0 0;

                font-size:
                    21px;

                line-height:
                    1.15;

                letter-spacing:
                    -.025em;

            }


            .brand-card-value {

                display:
                    flex;

                flex-direction:
                    column;

                gap:
                    4px;

                margin-top:
                    14px;

            }


            .brand-card-value span {

                font-size:
                    11px;

                opacity:
                    .48;

            }


            .brand-card-value strong {

                font-size:
                    13px;

                font-weight:
                    650;

                opacity:
                    .86;

            }


            .brand-card-offer {

                display:
                    flex;

                align-items:
                    center;

                gap:
                    6px;

                margin-top:
                    auto;

                padding-top:
                    18px;

                font-size:
                    11px;

                letter-spacing:
                    .08em;

            }


            .brand-card-offer span:first-child {

                opacity:
                    .55;

            }


            .brand-card-offer strong {

                color:
                    #c8a9ff;

                font-size:
                    15px;

            }


            .brand-card-arrow {

                margin-left:
                    auto;

                font-size:
                    18px;

                opacity:
                    .55;

            }


            .brand-card-purchase {

                display:
                    flex;

                align-items:
                    center;

                justify-content:
                    space-between;

                width:
                    100%;

                margin-top:
                    14px;

                padding:
                    12px 14px;

                border:
                    1px solid
                    rgba(
                        255,
                        255,
                        255,
                        .08
                    );

                border-radius:
                    12px;

                background:
                    rgba(
                        255,
                        255,
                        255,
                        .045
                    );

                color:
                    inherit;

                font-size:
                    12px;

                font-weight:
                    700;

                cursor:
                    pointer;

                transition:
                    .2s ease;

            }


            .brand-card-purchase:hover {

                background:
                    rgba(
                        139,
                        92,
                        246,
                        .18
                    );

                border-color:
                    rgba(
                        170,
                        125,
                        255,
                        .30
                    );

            }


            /* -----------------------------------------
               CATEGORY
            ----------------------------------------- */

            .premium-category-section {

                margin-bottom:
                    42px;

            }


            .premium-category-section
            .brand-category-heading {

                margin-bottom:
                    18px;

            }


            /* -----------------------------------------
               EMPTY
            ----------------------------------------- */

            .premium-empty {

                width:
                    100%;

                padding:
                    70px 20px;

                text-align:
                    center;

            }


            .premium-empty-button {

                margin-top:
                    16px;

                padding:
                    11px 18px;

                border:
                    0;

                border-radius:
                    11px;

                background:
                    #8b5cf6;

                color:
                    #fff;

                font-weight:
                    700;

                cursor:
                    pointer;

            }


            /* -----------------------------------------
               VALUE BUTTONS
            ----------------------------------------- */

            #fixedValues {

                display:
                    grid;

                grid-template-columns:
                    repeat(
                        auto-fit,
                        minmax(
                            130px,
                            1fr
                        )
                    );

                gap:
                    10px;

            }


            #fixedValues
            .value-button {

                position:
                    relative;

                display:
                    flex;

                flex-direction:
                    column;

                align-items:
                    flex-start;

                gap:
                    5px;

                min-height:
                    82px;

                padding:
                    14px;

                border:
                    1px solid
                    rgba(
                        255,
                        255,
                        255,
                        .09
                    );

                border-radius:
                    14px;

                background:
                    rgba(
                        255,
                        255,
                        255,
                        .035
                    );

                color:
                    inherit;

                cursor:
                    pointer;

                transition:
                    .2s ease;

            }


            #fixedValues
            .value-button:hover {

                border-color:
                    rgba(
                        166,
                        122,
                        255,
                        .4
                    );

            }


            #fixedValues
            .value-button.active {

                border-color:
                    rgba(
                        171,
                        125,
                        255,
                        .8
                    );

                background:
                    rgba(
                        139,
                        92,
                        246,
                        .13
                    );

                box-shadow:
                    inset 0 0 0 1px
                    rgba(
                        171,
                        125,
                        255,
                        .18
                    );

            }


            .value-main strong {

                font-size:
                    16px;

            }


            .value-pay {

                font-size:
                    11px;

                opacity:
                    .60;

            }


            .value-save {

                font-size:
                    10px;

                color:
                    #c7a5ff;

                font-weight:
                    700;

            }


            /* -----------------------------------------
               RESPONSIVE
            ----------------------------------------- */

            @media (
                max-width: 900px
            ) {

                .premium-brand-grid {

                    grid-template-columns:
                        repeat(
                            2,
                            minmax(
                                0,
                                1fr
                            )
                        );

                    gap:
                        13px;

                }


                .premium-brand-card {

                    min-height:
                        290px;

                    border-radius:
                        18px;

                }


                .brand-card-image {

                    min-height:
                        120px;

                    padding:
                        20px;

                }


                .brand-logo-frame {

                    width:
                        82px;

                    height:
                        82px;

                    border-radius:
                        20px;

                }


                .brand-card-content {

                    padding:
                        0 14px 14px;

                }


                .brand-card-name {

                    font-size:
                        17px;

                }

            }


            @media (
                max-width: 560px
            ) {

                .premium-brand-grid {

                    grid-template-columns:
                        1fr;

                }


                .premium-brand-card {

                    min-height:
                        0;

                }


                .brand-card-image {

                    min-height:
                        135px;

                }


                #fixedValues {

                    grid-template-columns:
                        repeat(
                            2,
                            minmax(
                                0,
                                1fr
                            )
                        );

                }

            }

        `;


        document.head.appendChild(
            style
        );

    };


/* =====================================================
   KEYBOARD + ESCAPE
===================================================== */

GCS.setupKeyboard =
    function () {

        document.addEventListener(
            "keydown",
            function (
                event
            ) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    GCS.closeAllOverlays();

                }

            }
        );

    };


/* =====================================================
   MODAL BACKDROP
===================================================== */

GCS.setupBackdrop =
    function () {

        document.addEventListener(
            "click",
            function (
                event
            ) {

                const target =
                    event.target;


                if (
                    target.classList &&
                    target.classList.contains(
                        "overlay"
                    )
                ) {

                    GCS.closeAllOverlays();

                }

            }
        );

    };


/* =====================================================
   SEARCH CLEAR
===================================================== */

GCS.setupSearch =
    function () {

        const input =
            document.getElementById(
                "search"
            );


        if (!input) {
            return;
        }


        input.addEventListener(
            "input",
            function (
                event
            ) {

                GCS.searchCards(
                    event
                );

            }
        );

    };


/* =====================================================
   CATEGORY BUTTONS
===================================================== */

GCS.setupCategories =
    function () {

        document
            .querySelectorAll(
                ".category"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function () {

                            const category =
                                button.dataset.category ||
                                button.textContent
                                    .trim();


                            GCS.filterCategory(
                                category,
                                button
                            );

                        }
                    );

                }
            );

    };


/* =====================================================
   FAQ
===================================================== */

GCS.setupFAQ =
    function () {

        document
            .querySelectorAll(
                ".faq-question"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function () {

                            const item =
                                button.closest(
                                    ".faq-item"
                                );


                            if (!item) {
                                return;
                            }


                            item.classList.toggle(
                                "open"
                            );

                        }
                    );

                }
            );

    };


/* =====================================================
   BACK TO TOP
===================================================== */

GCS.setupBackToTop =
    function () {

        const button =
            document.getElementById(
                "backToTop"
            );


        if (!button) {
            return;
        }


        window.addEventListener(
            "scroll",
            function () {

                button.classList.toggle(
                    "visible",
                    window.scrollY >
                    500
                );

            },
            {
                passive:
                    true
            }
        );


        button.addEventListener(
            "click",
            function () {

                window.scrollTo(
                    {
                        top:
                            0,
                        behavior:
                            "smooth"
                    }
                );

            }
        );

    };


/* =====================================================
   PRODUCT WISHLIST BINDING
===================================================== */

GCS.setupProductActions =
    function () {

        const addButton =
            document.getElementById(
                "addToCartButton"
            );


        if (
            addButton &&
            !addButton.dataset.gcsBound
        ) {

            addButton.dataset.gcsBound =
                "true";

            addButton.addEventListener(
                "click",
                function () {

                    GCS.addToCart();

                }
            );

        }


        const wishlist =
            document.getElementById(
                "wishlistProductButton"
            );


        if (
            wishlist &&
            !wishlist.dataset.gcsBound
        ) {

            wishlist.dataset.gcsBound =
                "true";

            wishlist.addEventListener(
                "click",
                function () {

                    GCS.toggleWishlistSelected();

                }
            );

        }

    };


/* =====================================================
   CUSTOM INPUT BINDING
===================================================== */

GCS.setupCustomInput =
    function () {

        const input =
            document.getElementById(
                "customAmount"
            );


        if (
            !input ||
            input.dataset.gcsBound
        ) {

            return;

        }


        input.dataset.gcsBound =
            "true";


        input.addEventListener(
            "input",
            function () {

                GCS.updateCustomPrice();

            }
        );

    };


/* =====================================================
   MODAL MODE BUTTONS
===================================================== */

GCS.setupModeButtons =
    function () {

        const fixed =
            document.getElementById(
                "fixedMode"
            );


        const custom =
            document.getElementById(
                "customMode"
            );


        if (
            fixed &&
            !fixed.dataset.gcsBound
        ) {

            fixed.dataset.gcsBound =
                "true";

            fixed.addEventListener(
                "click",
                function () {

                    GCS.selectMode(
                        "fixed"
                    );

                }
            );

        }


        if (
            custom &&
            !custom.dataset.gcsBound
        ) {

            custom.dataset.gcsBound =
                "true";

            custom.addEventListener(
                "click",
                function () {

                    GCS.selectMode(
                        "custom"
                    );

                }
            );

        }

    };


/* =====================================================
   FOOTER YEAR
===================================================== */

GCS.updateYear =
    function () {

        const year =
            new Date()
                .getFullYear();


        document
            .querySelectorAll(
                "#currentYear, .current-year"
            )
            .forEach(
                function (
                    element
                ) {

                    element.textContent =
                        year;

                }
            );

    };


/* =====================================================
   HERO BRAND COUNT
===================================================== */

GCS.updateBrandCount =
    function () {

        const count =
            document.getElementById(
                "heroBrandCount"
            );


        if (!count) {
            return;
        }


        const brands =
            gcsGetBrands();


        count.textContent =
            brands.length;

    };


/* =====================================================
   INITIALISE
===================================================== */

GCS.initialise =
    function () {

        GCS.injectPremiumStyles();

        GCS.setupKeyboard();

        GCS.setupBackdrop();

        GCS.setupSearch();

        GCS.setupCategories();

        GCS.setupFAQ();

        GCS.setupBackToTop();

        GCS.setupProductActions();

        GCS.setupCustomInput();

        GCS.setupModeButtons();

        GCS.updateYear();

        GCS.updateBrandCount();

        GCS.renderProducts();

        GCS.updateHeader();

    };


/* =====================================================
   APPLICATION START
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


        GCS.initialise();


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


        /* ---------------------------------------------
           Allow existing HTML onclick handlers
           to continue working.
        --------------------------------------------- */

        const fixedMode =
            document.getElementById(
                "fixedMode"
            );


        const customMode =
            document.getElementById(
                "customMode"
            );


        if (
            fixedMode
        ) {

            fixedMode.onclick =
                function () {

                    GCS.selectMode(
                        "fixed"
                    );

                };

        }


        if (
            customMode
        ) {

            customMode.onclick =
                function () {

                    GCS.selectMode(
                        "custom"
                    );

                };

        }


        GCS.updateCartCount();

    }
);
