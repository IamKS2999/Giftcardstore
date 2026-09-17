/* =====================================================
   GIFTCARDSTORE — MAIN APPLICATION
   PREMIUM MARKETPLACE APPLICATION
   PART 1 / 3
===================================================== */

window.GCS = window.GCS || {};


/* =====================================================
   STORAGE
===================================================== */

const GCS_CART_KEY =
    "gcsCart";

const GCS_WISHLIST_KEY =
    "gcsWishlist";


function readGCSStorage(
    key,
    fallback
) {

    try {

        const value =
            localStorage.getItem(
                key
            );

        if (!value) {

            return fallback;

        }


        const parsed =
            JSON.parse(
                value
            );


        return parsed;

    } catch (error) {

        return fallback;

    }

}


function writeGCSStorage(
    key,
    value
) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(
                value
            )
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

function gcsMoney(
    value
) {

    return "₹" +
        Number(
            value || 0
        ).toLocaleString(
            "en-IN"
        );

}


function gcsNumber(
    value
) {

    return Number(
        value
    ) || 0;

}


function gcsEsc(
    value
) {

    if (
        typeof escapeHTML ===
        "function"
    ) {

        return escapeHTML(
            value
        );

    }


    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


function gcsToken(
    value
) {

    return encodeURIComponent(
        String(
            value
        )
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
        typeof getBrandDiscount ===
        "function"
    ) {

        return Number(
            getBrandDiscount(
                brand.id,
                mode
            )
        ) || 0;

    }


    if (
        mode ===
        "custom"
    ) {

        return Number(
            brand.customDiscount ||
            0
        );

    }


    return Number(
        brand.fixedDiscount ||
        0
    );

}


function gcsCalculatePrice(
    value,
    discount
) {

    if (
        typeof calculatePrice ===
        "function"
    ) {

        return Number(
            calculatePrice(
                value,
                discount
            )
        ) || 0;

    }


    return (
        Number(value || 0) -
        (
            Number(value || 0) *
            Number(discount || 0) /
            100
        )
    );

}


function gcsCalculateSavings(
    value,
    discount
) {

    if (
        typeof calculateSavings ===
        "function"
    ) {

        return Number(
            calculateSavings(
                value,
                discount
            )
        ) || 0;

    }


    return (
        Number(value || 0) *
        Number(discount || 0) /
        100
    );

}


/* =====================================================
   STATE
===================================================== */

GCS.selectedBrand =
    null;

GCS.selectedValue =
    0;

GCS.selectedPrice =
    0;

GCS.selectedMode =
    "fixed";

GCS.activeCategory =
    "All";

GCS.searchQuery =
    "";

window.checkoutWaitingForLogin =
    false;


/* =====================================================
   ACCOUNT COMPATIBILITY
===================================================== */

GCS.isLoggedIn =
    function () {

        return (
            typeof isLoggedIn ===
            "function" &&
            isLoggedIn()
        );

    };


GCS.getAccount =
    function () {

        return (
            typeof getCurrentUser ===
            "function"
        )
            ? getCurrentUser()
            : null;

    };


GCS.getBrand =
    function (
        brandId
    ) {

        return (
            typeof getBrand ===
            "function"
        )
            ? getBrand(
                brandId
            )
            : null;

    };


GCS.openLogin =
    function () {

        if (
            typeof openLoginPanel ===
            "function"
        ) {

            openLoginPanel();

        }

    };


GCS.openAccount =
    function () {

        if (
            typeof openAccountPanel ===
            "function"
        ) {

            openAccountPanel();

        }

    };


GCS.openOrders =
    function () {

        if (
            typeof openOrders ===
            "function"
        ) {

            openOrders();

        }

    };


GCS.closeOrders =
    function () {

        if (
            typeof closeOrders ===
            "function"
        ) {

            closeOrders();

        }

    };


/* =====================================================
   CART — READ
===================================================== */

GCS.getCart =
    function () {

        const cart =
            readGCSStorage(
                GCS_CART_KEY,
                []
            );


        return Array.isArray(
            cart
        )
            ? cart
            : [];

    };


/* =====================================================
   CART — SAVE
===================================================== */

GCS.saveCart =
    function (
        cart
    ) {

        writeGCSStorage(
            GCS_CART_KEY,
            Array.isArray(
                cart
            )
                ? cart
                : []
        );


        GCS.updateCartCount();

    };


/* =====================================================
   CART — COUNT
===================================================== */

GCS.getCartCount =
    function () {

        return GCS.getCart()
            .reduce(
                function (
                    total,
                    item
                ) {

                    return (
                        total +
                        Math.max(
                            1,
                            gcsNumber(
                                item.quantity
                            )
                        )
                    );

                },
                0
            );

    };


/* =====================================================
   CART — TOTALS
===================================================== */

GCS.getCartTotals =
    function () {

        const cart =
            GCS.getCart();


        let value =
            0;

        let price =
            0;

        let savings =
            0;


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

                        return (
                            total +
                            Math.max(
                                1,
                                gcsNumber(
                                    item.quantity
                                )
                            )
                        );

                    },
                    0
                )

        };

    };


/* =====================================================
   CART — HEADER COUNT
===================================================== */

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

        }

    };


/* =====================================================
   CART — ADD
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

            if (
                typeof showNotice ===
                "function"
            ) {

                showNotice(
                    "Select a gift-card value first.",
                    "Value required",
                    "error"
                );

            }


            return;

        }


        const discount =
            gcsDiscount(
                brand,
                GCS.selectedMode
            );


        const savings =
            gcsCalculateSavings(
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
                    GCS.selectedPrice,

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


        if (
            typeof showNotice ===
            "function"
        ) {

            showNotice(
                "Gift card added to your cart.",
                "Added to cart",
                "success"
            );

        }

    };


/* =====================================================
   CART — UPDATE QUANTITY
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


/* =====================================================
   CART — REMOVE
===================================================== */

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


/* =====================================================
   CART — CLEAR
===================================================== */

GCS.clearCart =
    function () {

        GCS.saveCart(
            []
        );


        GCS.renderCart();

    };


/* =====================================================
   OVERLAY MANAGEMENT
===================================================== */

GCS.closeAllOverlays =
    function () {

        const overlays =
            document.querySelectorAll(
                ".overlay"
            );


        overlays.forEach(
            function (
                overlay
            ) {

                overlay.style.display =
                    "none";

            }
        );

    };


/* =====================================================
   CART — OPEN
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
   CART — RENDER
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
                                    src="${gcsEsc(
                                        item.logo
                                    )}"
                                    alt="${gcsEsc(
                                        item.brand
                                    )}">

                            </div>


                            <div class="cart-item-content">

                                <div class="cart-item-top">

                                    <div>

                                        <div class="cart-item-name">
                                            ${gcsEsc(
                                                item.brand
                                            )}
                                        </div>

                                        <div class="cart-item-value">
                                            ${gcsMoney(
                                                item.value
                                            )}
                                            ·
                                            ${gcsEsc(
                                                item.mode
                                            )}
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
                                        ">
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
                                        ">
                                        +
                                    </button>


                                    <button
                                        class="remove-cart"
                                        type="button"
                                        onclick="
                                            GCS.removeFromCart(
                                                decodeURIComponent('${token}')
                                            )
                                        ">
                                        Remove
                                    </button>

                                </div>

                            </div>

                        </div>

                    `;

                }
            )
            .join(
                ""
            );


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
   CHECKOUT — START
===================================================== */

GCS.checkoutCart =
    function () {

        const cart =
            GCS.getCart();


        if (!cart.length) {

            if (
                typeof showNotice ===
                "function"
            ) {

                showNotice(
                    "Your cart is empty.",
                    "Cart",
                    "error"
                );

            }


            return;

        }


        if (
            !GCS.isLoggedIn()
        ) {

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
   CHECKOUT — RENDER
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
            .join(
                ""
            );


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
   PRODUCT — RESET STATE
===================================================== */

GCS.resetProductState =
    function () {

        GCS.selectedBrand =
            null;

        GCS.selectedValue =
            0;

        GCS.selectedPrice =
            0;

        GCS.selectedMode =
            "fixed";

    };


/* =====================================================
   PRODUCT — OPEN
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


        /*
         * PRODUCT INFORMATION
         *
         * Keep this compact.
         * The configurator itself should
         * communicate:
         *
         * Brand
         * Type
         * Value
         * Price
         *
         * Avoid redundant promotional
         * paragraphs inside the selector.
         */

        if (info) {

            const discount =
                gcsDiscount(
                    brand,
                    "fixed"
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
                        SAVE ${discount}%
                    </strong>

                </div>

            `;

        }


        /*
         * FIXED VALUES
         */

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

                    const numericValue =
                        Number(
                            value
                        );


                    if (
                        !numericValue ||
                        numericValue <= 0
                    ) {

                        return;

                    }


                    const discount =
                        gcsDiscount(
                            brand,
                            "fixed"
                        );


                    const price =
                        gcsCalculatePrice(
                            numericValue,
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


                    button.innerHTML = `

                        <strong>
                            ${gcsMoney(
                                numericValue
                            )}
                        </strong>

                        <small>
                            Pay
                            ${gcsMoney(
                                price
                            )}
                        </small>

                    `;


                    button.addEventListener(
                        "click",
                        function () {

                            values
                                .querySelectorAll(
                                    ".value-button"
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
                                numericValue;


                            GCS.selectedPrice =
                                price;


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
                            numericValue;


                        GCS.selectedPrice =
                            price;


                        button.classList.add(
                            "active"
                        );

                    }

                }
            );

        }


        /*
         * CUSTOM MODE
         */

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


            customButton.setAttribute(
                "aria-hidden",
                enabled
                    ? "false"
                    : "true"
            );

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


        if (customArea) {

            customArea.style.display =
                "none";

        }


        const fixedArea =
            document.getElementById(
                "fixedArea"
            );


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

    };


/* =====================================================
   PRODUCT — CLOSE
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

        }

    };


/* =====================================================
   PRODUCT — SELECT MODE
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
            mode ===
            "custom" &&
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
            mode ===
            "custom"
        ) {

            GCS.selectedValue =
                0;


            GCS.selectedPrice =
                0;

        } else {

            /*
             * Restore the first valid
             * fixed denomination when
             * returning from custom mode.
             */

            const values =
                document.querySelectorAll(
                    "#fixedValues .value-button"
                );


            const active =
                document.querySelector(
                    "#fixedValues .value-button.active"
                );


            if (
                !active &&
                values.length
            ) {

                values[0].click();

            }

        }


        GCS.updatePreview();

    };


/* =====================================================
   PRODUCT — CUSTOM VALUE
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


            GCS.updatePreview();


            return;

        }


        const minimum =
            Number(
                brand.custom?.min ||
                0
            );


        const maximum =
            Number(
                brand.custom?.max ||
                Infinity
            );


        if (
            amount < minimum ||
            amount > maximum
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


        const discount =
            gcsDiscount(
                brand,
                "custom"
            );


        GCS.selectedPrice =
            gcsCalculatePrice(
                amount,
                discount
            );


        GCS.updatePreview();

    };


/* =====================================================
   PRODUCT — PREVIEW
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

    };


/* =====================================================
   PRODUCT — WISHLIST STATE
===================================================== */

GCS.getWishlist =
    function () {

        const list =
            readGCSStorage(
                GCS_WISHLIST_KEY,
                []
            );


        return Array.isArray(
            list
        )
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


/* =====================================================
   PRODUCT — WISHLIST TOGGLE
===================================================== */

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


            if (
                typeof showNotice ===
                "function"
            ) {

                showNotice(
                    "Removed from your saved brands.",
                    "Wishlist",
                    "info"
                );

            }

        } else {

            list.push(
                brandId
            );


            if (
                typeof showNotice ===
                "function"
            ) {

                showNotice(
                    "Saved to your wishlist.",
                    "Wishlist",
                    "success"
                );

            }

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


/* =====================================================
   PRODUCT — SELECTED WISHLIST
===================================================== */

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


/* =====================================================
   PRODUCT — UPDATE WISHLIST BUTTON
===================================================== */

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


        button.setAttribute(
            "aria-pressed",
            active
                ? "true"
                : "false"
        );

    };


/* =====================================================
   SEARCH — FILTER
===================================================== */

GCS.applyFilters =
    function () {

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
                function (
                    brand
                ) {

                    const categoryMatch =
                        category ===
                        "All" ||
                        brand.category ===
                        category;


                    const name =
                        String(
                            brand.name ||
                            ""
                        )
                            .toLowerCase();


                    const brandCategory =
                        String(
                            brand.category ||
                            ""
                        )
                            .toLowerCase();


                    const searchMatch =
                        !query ||
                        name.includes(
                            query
                        ) ||
                        brandCategory.includes(
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

    };


/* =====================================================
   SEARCH — INPUT
===================================================== */

GCS.searchCards =
    function (
        event
    ) {

        GCS.searchQuery =
            event.target.value;


        GCS.applyFilters();

    };


/* =====================================================
   SEARCH — CLEAR
===================================================== */

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


/* =====================================================
   CATEGORY — FILTER
===================================================== */

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
   GIFTCARDSTORE — MAIN APPLICATION
   PREMIUM MARKETPLACE APPLICATION
   PART 2 / 3
   CONTINUATION — START AFTER PART 1
===================================================== */


/* =====================================================
   PRODUCT DATA HELPERS
===================================================== */

GCS.getProductList =
    function () {

        if (
            Array.isArray(
                window.products
            )
        ) {

            return window.products;

        }

        if (
            Array.isArray(
                window.GCS_PRODUCTS
            )
        ) {

            return window.GCS_PRODUCTS;

        }

        if (
            Array.isArray(
                GCS.products
            )
        ) {

            return GCS.products;

        }

        if (
            window.GCS &&
            Array.isArray(
                window.GCS.catalog
            )
        ) {

            return window.GCS.catalog;

        }

        return [];

    };


GCS.getProductId =
    function (
        product
    ) {

        if (!product) {
            return "";
        }

        return String(
            product.id ??
            product.productId ??
            product.slug ??
            product.code ??
            ""
        );

    };


GCS.getProductName =
    function (
        product
    ) {

        if (!product) {
            return "Gift Card";
        }

        return String(
            product.name ??
            product.title ??
            product.brandName ??
            "Gift Card"
        );

    };


GCS.getProductBrand =
    function (
        product
    ) {

        if (!product) {
            return "";
        }

        return String(
            product.brand ??
            product.brandName ??
            product.name ??
            ""
        );

    };


GCS.getProductCategory =
    function (
        product
    ) {

        if (!product) {
            return "Other";
        }

        return String(
            product.category ??
            product.type ??
            product.categoryName ??
            "Other"
        );

    };


GCS.getProductLogo =
    function (
        product
    ) {

        if (!product) {
            return "";
        }

        return String(
            product.logo ??
            product.logoUrl ??
            product.image ??
            product.imageUrl ??
            product.icon ??
            ""
        );

    };


GCS.getProductValues =
    function (
        product
    ) {

        if (!product) {
            return [];
        }

        let values =
            product.values ??
            product.denominations ??
            product.amounts ??
            product.fixedValues ??
            [];

        if (
            typeof values === "string"
        ) {

            values =
                values
                    .split(",")
                    .map(
                        function (
                            value
                        ) {

                            return Number(
                                String(
                                    value
                                )
                                    .replace(
                                        /[^\d.]/g,
                                        ""
                                    )
                            );

                        }
                    )
                    .filter(
                        function (
                            value
                        ) {

                            return Number.isFinite(
                                value
                            );

                        }
                    );

        }

        if (
            !Array.isArray(values)
        ) {

            return [];

        }

        return values
            .map(
                function (
                    value
                ) {

                    if (
                        typeof value ===
                        "object"
                    ) {

                        return Number(
                            value.value ??
                            value.amount ??
                            value.price ??
                            0
                        );

                    }

                    return Number(
                        String(
                            value
                        )
                            .replace(
                                /[^\d.]/g,
                                ""
                            )
                    );

                }
            )
            .filter(
                function (
                    value
                ) {

                    return (
                        Number.isFinite(
                            value
                        ) &&
                        value > 0
                    );

                }
            );

    };


GCS.getProductDiscount =
    function (
        product
    ) {

        if (!product) {
            return 0;
        }

        return Number(
            product.discount ??
            product.discountPercent ??
            product.off ??
            product.savings ??
            0
        ) || 0;

    };


GCS.getProductDescription =
    function (
        product
    ) {

        if (!product) {
            return "";
        }

        return String(
            product.description ??
            product.shortDescription ??
            product.subtitle ??
            ""
        );

    };


GCS.productMatchesSearch =
    function (
        product,
        search
    ) {

        if (
            !search
        ) {

            return true;

        }

        const term =
            String(
                search
            )
                .trim()
                .toLowerCase();

        if (!term) {
            return true;
        }

        const haystack =
            [
                GCS.getProductName(
                    product
                ),
                GCS.getProductBrand(
                    product
                ),
                GCS.getProductCategory(
                    product
                ),
                GCS.getProductDescription(
                    product
                )
            ]
                .join(" ")
                .toLowerCase();

        return haystack.includes(
            term
        );

    };


GCS.productMatchesCategory =
    function (
        product,
        category
    ) {

        if (
            !category ||
            category === "all" ||
            category === "All"
        ) {

            return true;

        }

        const productCategory =
            GCS.getProductCategory(
                product
            )
                .trim()
                .toLowerCase();

        return (
            productCategory ===
            String(
                category
            )
                .trim()
                .toLowerCase()
        );

    };


/* =====================================================
   PRODUCT CARD HTML
===================================================== */

GCS.productCardHTML =
    function (
        product
    ) {

        const id =
            GCS.getProductId(
                product
            );

        const name =
            GCS.getProductName(
                product
            );

        const brand =
            GCS.getProductBrand(
                product
            );

        const category =
            GCS.getProductCategory(
                product
            );

        const logo =
            GCS.getProductLogo(
                product
            );

        const values =
            GCS.getProductValues(
                product
            );

        const discount =
            GCS.getProductDiscount(
                product
            );

        const description =
            GCS.getProductDescription(
                product
            );

        const firstValue =
            values.length
                ? values[0]
                : 0;

        const minValue =
            values.length
                ? Math.min(
                    ...values
                )
                : 0;

        const maxValue =
            values.length
                ? Math.max(
                    ...values
                )
                : 0;

        let valueText =
            "Custom value";

        if (
            minValue &&
            maxValue &&
            minValue !== maxValue
        ) {

            valueText =
                "₹" +
                minValue.toLocaleString(
                    "en-IN"
                ) +
                " – ₹" +
                maxValue.toLocaleString(
                    "en-IN"
                );

        }
        else if (
            minValue
        ) {

            valueText =
                "From ₹" +
                minValue.toLocaleString(
                    "en-IN"
                );

        }

        const safeId =
            encodeURIComponent(
                id
            );

        const wishlistActive =
            GCS.isWishlisted
                ? GCS.isWishlisted(
                    id
                )
                : false;

        const heartClass =
            wishlistActive
                ? "active"
                : "";

        const logoHTML =
            logo
                ? `
                    <img
                        class="product-card-logo"
                        src="${logo}"
                        alt="${GCS.escapeHTML
                            ? GCS.escapeHTML(
                                brand
                            )
                            : brand}"
                        loading="lazy"
                        onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
                    >
                    <span
                        class="product-card-logo-fallback"
                        style="display:none;"
                    >
                        ${brand
                            .slice(
                                0,
                                1
                            )
                            .toUpperCase()}
                    </span>
                  `
                : `
                    <span
                        class="product-card-logo-fallback"
                    >
                        ${brand
                            .slice(
                                0,
                                1
                            )
                            .toUpperCase()}
                    </span>
                  `;

        return `
            <article
                class="product-card"
                data-product-id="${safeId}"
                data-brand="${String(
                    brand
                )
                    .toLowerCase()}"
                data-category="${String(
                    category
                )
                    .toLowerCase()}"
            >

                <div class="product-card-top">

                    <button
                        type="button"
                        class="product-wishlist ${heartClass}"
                        aria-label="Add ${brand} to wishlist"
                        data-wishlist-id="${safeId}"
                        onclick="event.stopPropagation();GCS.toggleWishlist('${safeId}')"
                    >
                        <span class="wishlist-icon">
                            ${wishlistActive
                                ? "♥"
                                : "♡"}
                        </span>
                    </button>

                    ${
                        discount > 0
                            ? `
                                <span
                                    class="product-discount-badge"
                                >
                                    ${discount}% OFF
                                </span>
                              `
                            : ""
                    }

                </div>


                <button
                    type="button"
                    class="product-card-main"
                    onclick="GCS.openProductById('${safeId}')"
                    aria-label="View ${brand} gift card"
                >

                    <div class="product-brand-mark">
                        ${logoHTML}
                    </div>

                    <div class="product-card-content">

                        <div
                            class="product-card-category"
                        >
                            ${category}
                        </div>

                        <h3
                            class="product-card-title"
                        >
                            ${name}
                        </h3>

                        ${
                            description
                                ? `
                                    <p
                                        class="product-card-description"
                                    >
                                        ${description}
                                    </p>
                                  `
                                : `
                                    <p
                                        class="product-card-description"
                                    >
                                        Digital gift card
                                    </p>
                                  `
                        }

                    </div>

                    <div
                        class="product-card-value"
                    >
                        <span>
                            Available values
                        </span>

                        <strong>
                            ${valueText}
                        </strong>
                    </div>

                    <div
                        class="product-card-arrow"
                        aria-hidden="true"
                    >
                        →
                    </div>

                </button>


                <div class="product-card-footer">

                    <div
                        class="product-card-price-note"
                    >
                        ${
                            discount > 0
                                ? `
                                    Save up to
                                    ${discount}%
                                  `
                                : `
                                    Secure digital delivery
                                  `
                        }
                    </div>

                    <button
                        type="button"
                        class="product-buy-button"
                        onclick="event.stopPropagation();GCS.openProductById('${safeId}')"
                    >
                        Choose value
                    </button>

                </div>

            </article>
        `;

    };


/* =====================================================
   PRODUCT RENDERING
===================================================== */

GCS.renderProducts =
    function (
        products
    ) {

        const container =
            document.querySelector(
                "#productGrid"
            ) ||
            document.querySelector(
                ".product-grid"
            ) ||
            document.querySelector(
                "#productsGrid"
            );

        if (!container) {
            return;
        }

        const list =
            Array.isArray(
                products
            )
                ? products
                : GCS.getProductList();

        if (!list.length) {

            container.innerHTML =
                `
                    <div
                        class="products-empty"
                    >
                        <div
                            class="products-empty-icon"
                        >
                            ✦
                        </div>

                        <h3>
                            No gift cards found
                        </h3>

                        <p>
                            Try another search
                            or category.
                        </p>

                        <button
                            type="button"
                            onclick="GCS.clearFilters()"
                        >
                            Clear filters
                        </button>
                    </div>
                `;

            GCS.updateProductCount(
                0
            );

            return;

        }

        container.innerHTML =
            list
                .map(
                    function (
                        product
                    ) {

                        return GCS.productCardHTML(
                            product
                        );

                    }
                )
                .join("");

        GCS.updateProductCount(
            list.length
        );

    };


GCS.updateProductCount =
    function (
        count
    ) {

        const elements =
            document.querySelectorAll(
                "[data-product-count], #productCount"
            );

        elements.forEach(
            function (
                element
            ) {

                element.textContent =
                    String(
                        count
                    );

            }
        );

    };


GCS.applyFilters =
    function () {

        const allProducts =
            GCS.getProductList();

        const filtered =
            allProducts.filter(
                function (
                    product
                ) {

                    return (
                        GCS.productMatchesSearch(
                            product,
                            GCS.searchTerm
                        ) &&
                        GCS.productMatchesCategory(
                            product,
                            GCS.activeCategory
                        )
                    );

                }
            );

        GCS.renderProducts(
            filtered
        );

    };


GCS.clearFilters =
    function () {

        GCS.searchTerm =
            "";

        GCS.activeCategory =
            "all";

        const searchInputs =
            document.querySelectorAll(
                "#searchInput, .search-input, [data-search-input]"
            );

        searchInputs.forEach(
            function (
                input
            ) {

                input.value =
                    "";

            }
        );

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

        const allButton =
            document.querySelector(
                '.category[data-category="all"]'
            ) ||
            document.querySelector(
                '.category:first-child'
            );

        if (allButton) {

            allButton.classList.add(
                "active"
            );

        }

        GCS.applyFilters();

    };


/* =====================================================
   PRODUCT LOOKUP
===================================================== */

GCS.findProductById =
    function (
        id
    ) {

        const decoded =
            decodeURIComponent(
                String(
                    id ?? ""
                )
            );

        return GCS.getProductList()
            .find(
                function (
                    product
                ) {

                    return (
                        String(
                            GCS.getProductId(
                                product
                            )
                        ) === decoded
                    );

                }
            );

    };


GCS.openProductById =
    function (
        id
    ) {

        const product =
            GCS.findProductById(
                id
            );

        if (!product) {

            GCS.notify(
                "Gift card unavailable.",
                "error"
            );

            return;

        }

        GCS.openProduct(
            product
        );

    };


/* =====================================================
   PRODUCT MODAL — CLEAN CONFIGURATOR
===================================================== */

GCS.getProductModal =
    function () {

        return (
            document.querySelector(
                "#productModal"
            ) ||
            document.querySelector(
                ".product-modal"
            )
        );

    };


GCS.renderProductModal =
    function (
        product
    ) {

        const modal =
            GCS.getProductModal();

        if (!modal) {
            return;
        }

        const name =
            GCS.getProductName(
                product
            );

        const brand =
            GCS.getProductBrand(
                product
            );

        const category =
            GCS.getProductCategory(
                product
            );

        const logo =
            GCS.getProductLogo(
                product
            );

        const values =
            GCS.getProductValues(
                product
            );

        const discount =
            GCS.getProductDiscount(
                product
            );

        const description =
            GCS.getProductDescription(
                product
            );

        const selectedValue =
            GCS.productConfig.value ||
            values[0] ||
            0;

        const logoTarget =
            modal.querySelector(
                ".product-modal-logo"
            );

        if (logoTarget) {

            if (logo) {

                logoTarget.innerHTML =
                    `
                        <img
                            src="${logo}"
                            alt="${brand}"
                            onerror="this.style.display='none';"
                        >
                    `;

            }
            else {

                logoTarget.textContent =
                    brand
                        .slice(
                            0,
                            1
                        )
                        .toUpperCase();

            }

        }

        const brandTarget =
            modal.querySelector(
                ".product-modal-brand"
            );

        if (brandTarget) {

            brandTarget.textContent =
                brand;

        }

        const titleTarget =
            modal.querySelector(
                ".product-modal-title"
            );

        if (titleTarget) {

            titleTarget.textContent =
                name;

        }

        const categoryTarget =
            modal.querySelector(
                ".product-modal-category"
            );

        if (categoryTarget) {

            categoryTarget.textContent =
                category;

        }

        const descriptionTarget =
            modal.querySelector(
                ".product-modal-description"
            );

        if (descriptionTarget) {

            descriptionTarget.textContent =
                description ||
                "Choose your gift card value.";

        }

        const valueContainer =
            modal.querySelector(
                ".product-values"
            ) ||
            modal.querySelector(
                ".denomination-options"
            ) ||
            modal.querySelector(
                ".value-options"
            );

        if (valueContainer) {

            valueContainer.innerHTML =
                values
                    .map(
                        function (
                            value
                        ) {

                            const active =
                                Number(
                                    selectedValue
                                ) ===
                                Number(
                                    value
                                );

                            return `
                                <button
                                    type="button"
                                    class="value-option ${active ? "active" : ""}"
                                    data-value="${value}"
                                    onclick="GCS.selectProductValue(${value}, this)"
                                >
                                    ₹${Number(
                                        value
                                    ).toLocaleString(
                                        "en-IN"
                                    )}
                                </button>
                            `;

                        }
                    )
                    .join("");

        }

        GCS.updateProductPreview();

    };


GCS.updateProductPreview =
    function () {

        const modal =
            GCS.getProductModal();

        if (!modal) {
            return;
        }

        const value =
            Number(
                GCS.productConfig.value
            ) || 0;

        const discount =
            GCS.productConfig.discount ??
            0;

        const pay =
            GCSCalculateSafePrice(
                value,
                discount
            );

        const valueTargets =
            modal.querySelectorAll(
                "[data-preview-value], .preview-value"
            );

        valueTargets.forEach(
            function (
                element
            ) {

                element.textContent =
                    "₹" +
                    value.toLocaleString(
                        "en-IN"
                    );

            }
        );

        const discountTargets =
            modal.querySelectorAll(
                "[data-preview-discount], .preview-discount"
            );

        discountTargets.forEach(
            function (
                element
            ) {

                element.textContent =
                    discount +
                    "%";

            }
        );

        const priceTargets =
            modal.querySelectorAll(
                "[data-preview-price], .preview-price, .payable-price"
            );

        priceTargets.forEach(
            function (
                element
            ) {

                element.textContent =
                    "₹" +
                    pay.toLocaleString(
                        "en-IN"
                    );

            }
        );

    };


function GCSCalculateSafePrice(
    value,
    discount
) {

    const numericValue =
        Number(
            value
        ) || 0;

    const numericDiscount =
        Number(
            discount
        ) || 0;

    return Math.max(
        0,
        Math.round(
            numericValue *
            (
                1 -
                numericDiscount /
                100
            )
        )
    );

}


/* =====================================================
   PRODUCT TYPE SWITCHING
===================================================== */

GCS.setProductType =
    function (
        type,
        button
    ) {

        GCS.productConfig.type =
            type === "custom"
                ? "custom"
                : "fixed";

        document
            .querySelectorAll(
                ".product-type-button, .gift-card-type-button"
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

        const fixedArea =
            document.querySelector(
                ".fixed-value-area"
            ) ||
            document.querySelector(
                ".fixed-values"
            );

        const customArea =
            document.querySelector(
                ".custom-value-area"
            ) ||
            document.querySelector(
                ".custom-value"
            );

        if (fixedArea) {

            fixedArea.style.display =
                type === "custom"
                    ? "none"
                    : "";

        }

        if (customArea) {

            customArea.style.display =
                type === "custom"
                    ? ""
                    : "none";

        }

    };


GCS.selectProductValue =
    function (
        value,
        button
    ) {

        const numericValue =
            Number(
                value
            );

        if (
            !Number.isFinite(
                numericValue
            ) ||
            numericValue <= 0
        ) {

            return;

        }

        GCS.productConfig.value =
            numericValue;

        GCS.productConfig.type =
            "fixed";

        document
            .querySelectorAll(
                ".value-option, .denomination-option"
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

        const customInput =
            document.querySelector(
                "#customGiftValue"
            ) ||
            document.querySelector(
                ".custom-gift-value"
            );

        if (customInput) {

            customInput.value =
                numericValue;

        }

        GCS.updateProductPreview();

    };


GCS.updateCustomProductValue =
    function (
        input
    ) {

        const value =
            Number(
                String(
                    input?.value ??
                    ""
                )
                    .replace(
                        /[^\d.]/g,
                        ""
                    )
            );

        if (
            !Number.isFinite(
                value
            ) ||
            value <= 0
        ) {

            GCS.productConfig.value =
                0;

            GCS.updateProductPreview();

            return;

        }

        GCS.productConfig.type =
            "custom";

        GCS.productConfig.value =
            value;

        document
            .querySelectorAll(
                ".value-option, .denomination-option"
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

        GCS.updateProductPreview();

    };


/* =====================================================
   ADD PRODUCT TO CART
===================================================== */

GCS.addConfiguredProduct =
    function () {

        const product =
            GCS.productConfig.product;

        if (!product) {

            GCS.notify(
                "Please select a gift card first.",
                "error"
            );

            return;

        }

        const value =
            Number(
                GCS.productConfig.value
            ) || 0;

        if (
            value <= 0
        ) {

            GCS.notify(
                "Please choose a gift card value.",
                "error"
            );

            return;

        }

        const discount =
            GCS.getProductDiscount(
                product
            );

        const price =
            GCSCalculateSafePrice(
                value,
                discount
            );

        const item =
            {
                id:
                    GCS.getProductId(
                        product
                    ),
                productId:
                    GCS.getProductId(
                        product
                    ),
                name:
                    GCS.getProductName(
                        product
                    ),
                brand:
                    GCS.getProductBrand(
                        product
                    ),
                category:
                    GCS.getProductCategory(
                        product
                    ),
                logo:
                    GCS.getProductLogo(
                        product
                    ),
                type:
                    GCS.productConfig.type ||
                    "fixed",
                value:
                    value,
                amount:
                    value,
                discount:
                    discount,
                price:
                    price,
                quantity:
                    1,
                addedAt:
                    Date.now()
            };

        const cart =
            GCS.getCart();

        const existing =
            cart.find(
                function (
                    cartItem
                ) {

                    return (
                        String(
                            cartItem.productId ??
                            cartItem.id
                        ) ===
                        String(
                            item.productId
                        ) &&
                        Number(
                            cartItem.value ??
                            cartItem.amount
                        ) ===
                        Number(
                            item.value
                        ) &&
                        String(
                            cartItem.type ??
                            "fixed"
                        ) ===
                        String(
                            item.type
                        )
                    );

                }
            );

        if (existing) {

            existing.quantity =
                (
                    Number(
                        existing.quantity
                    ) || 1
                ) + 1;

        }
        else {

            cart.push(
                item
            );

        }

        GCS.saveCart(
            cart
        );

        GCS.updateCartCount();

        GCS.closeProduct();

        GCS.notify(
            `${item.brand} gift card added to cart.`,
            "success"
        );

    };


/* =====================================================
   QUICK BUY
===================================================== */

GCS.quickBuy =
    function (
        product,
        value
    ) {

        if (!product) {
            return;
        }

        GCS.productConfig =
            {
                product:
                    product,
                value:
                    Number(
                        value
                    ) ||
                    GCS.getProductValues(
                        product
                    )[0] ||
                    0,
                type:
                    "fixed",
                discount:
                    GCS.getProductDiscount(
                        product
                    )
            };

        GCS.addConfiguredProduct();

    };


/* =====================================================
   CART DISPLAY
===================================================== */

GCS.renderCart =
    function () {

        const cart =
            GCS.getCart();

        const container =
            document.querySelector(
                "#cartItems"
            ) ||
            document.querySelector(
                ".cart-items"
            );

        if (!container) {
            return;
        }

        if (!cart.length) {

            container.innerHTML =
                `
                    <div
                        class="cart-empty"
                    >
                        <div
                            class="cart-empty-icon"
                        >
                            🛍
                        </div>

                        <h3>
                            Your cart is empty
                        </h3>

                        <p>
                            Add a gift card
                            to get started.
                        </p>

                        <button
                            type="button"
                            onclick="GCS.closeCart();GCS.scrollToProducts()"
                        >
                            Browse gift cards
                        </button>
                    </div>
                `;

            GCS.updateCartTotals();

            return;

        }

        container.innerHTML =
            cart
                .map(
                    function (
                        item,
                        index
                    ) {

                        const quantity =
                            Number(
                                item.quantity
                            ) || 1;

                        const value =
                            Number(
                                item.value ??
                                item.amount ??
                                0
                            );

                        const price =
                            Number(
                                item.price ??
                                GCSCalculateSafePrice(
                                    value,
                                    item.discount
                                )
                            );

                        const total =
                            price *
                            quantity;

                        const logo =
                            item.logo
                                ? `
                                    <img
                                        src="${item.logo}"
                                        alt=""
                                    >
                                  `
                                : `
                                    <span>
                                        ${String(
                                            item.brand ||
                                            item.name ||
                                            "G"
                                        )
                                            .slice(
                                                0,
                                                1
                                            )
                                            .toUpperCase()}
                                    </span>
                                  `;

                        return `
                            <div
                                class="cart-item"
                                data-cart-index="${index}"
                            >

                                <div
                                    class="cart-item-logo"
                                >
                                    ${logo}
                                </div>

                                <div
                                    class="cart-item-info"
                                >

                                    <strong>
                                        ${item.brand ||
                                        item.name ||
                                        "Gift Card"}
                                    </strong>

                                    <span>
                                        ₹${value.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>

                                    <small>
                                        ${
                                            item.type ===
                                            "custom"
                                                ? "Custom value"
                                                : "Fixed value"
                                        }
                                    </small>

                                </div>

                                <div
                                    class="cart-item-controls"
                                >

                                    <button
                                        type="button"
                                        onclick="GCS.changeCartQuantity(${index}, -1)"
                                    >
                                        −
                                    </button>

                                    <span>
                                        ${quantity}
                                    </span>

                                    <button
                                        type="button"
                                        onclick="GCS.changeCartQuantity(${index}, 1)"
                                    >
                                        +
                                    </button>

                                </div>

                                <div
                                    class="cart-item-total"
                                >
                                    ₹${total.toLocaleString(
                                        "en-IN"
                                    )}
                                </div>

                                <button
                                    type="button"
                                    class="cart-item-remove"
                                    onclick="GCS.removeFromCart(${index})"
                                    aria-label="Remove item"
                                >
                                    ×
                                </button>

                            </div>
                        `;

                    }
                )
                .join("");

        GCS.updateCartTotals();

    };


GCS.changeCartQuantity =
    function (
        index,
        change
    ) {

        const cart =
            GCS.getCart();

        if (
            !cart[index]
        ) {

            return;

        }

        const current =
            Number(
                cart[index].quantity
            ) || 1;

        const next =
            current +
            Number(
                change
            );

        if (
            next <= 0
        ) {

            cart.splice(
                index,
                1
            );

        }
        else {

            cart[index].quantity =
                next;

        }

        GCS.saveCart(
            cart
        );

        GCS.renderCart();

        GCS.updateCartCount();

    };


GCS.removeFromCart =
    function (
        index
    ) {

        const cart =
            GCS.getCart();

        if (
            index < 0 ||
            index >= cart.length
        ) {

            return;

        }

        const removed =
            cart[index];

        cart.splice(
            index,
            1
        );

        GCS.saveCart(
            cart
        );

        GCS.renderCart();

        GCS.updateCartCount();

        if (removed) {

            GCS.notify(
                `${removed.brand || "Gift card"} removed from cart.`,
                "info"
            );

        }

    };


GCS.updateCartTotals =
    function () {

        const cart =
            GCS.getCart();

        let subtotal =
            0;

        let savings =
            0;

        cart.forEach(
            function (
                item
            ) {

                const quantity =
                    Number(
                        item.quantity
                    ) || 1;

                const value =
                    Number(
                        item.value ??
                        item.amount ??
                        0
                    );

                const price =
                    Number(
                        item.price ??
                        GCSCalculateSafePrice(
                            value,
                            item.discount
                        )
                    );

                subtotal +=
                    price *
                    quantity;

                savings +=
                    Math.max(
                        0,
                        value -
                        price
                    ) *
                    quantity;

            }
        );

        const subtotalTargets =
            document.querySelectorAll(
                "#cartSubtotal, [data-cart-subtotal]"
            );

        subtotalTargets.forEach(
            function (
                element
            ) {

                element.textContent =
                    "₹" +
                    subtotal.toLocaleString(
                        "en-IN"
                    );

            }
        );

        const savingsTargets =
            document.querySelectorAll(
                "#cartSavings, [data-cart-savings]"
            );

        savingsTargets.forEach(
            function (
                element
            ) {

                element.textContent =
                    "₹" +
                    savings.toLocaleString(
                        "en-IN"
                    );

            }
        );

        const totalTargets =
            document.querySelectorAll(
                "#cartTotal, [data-cart-total]"
            );

        totalTargets.forEach(
            function (
                element
            ) {

                element.textContent =
                    "₹" +
                    subtotal.toLocaleString(
                        "en-IN"
                    );

            }
        );

    };


/* =====================================================
   CART OPEN / CLOSE
===================================================== */

GCS.openCart =
    function () {

        const cart =
            document.querySelector(
                "#cartPanel"
            ) ||
            document.querySelector(
                ".cart-panel"
            );

        if (!cart) {
            return;
        }

        GCS.renderCart();

        cart.classList.add(
            "open"
        );

        document.body.classList.add(
            "modal-open"
        );

    };


GCS.closeCart =
    function () {

        const cart =
            document.querySelector(
                "#cartPanel"
            ) ||
            document.querySelector(
                ".cart-panel"
            );

        if (cart) {

            cart.classList.remove(
                "open"
            );

        }

        document.body.classList.remove(
            "modal-open"
        );

    };


/* =====================================================
   CHECKOUT SCREEN
===================================================== */

GCS.openCheckout =
    function () {

        const cart =
            GCS.getCart();

        if (!cart.length) {

            GCS.notify(
                "Your cart is empty.",
                "error"
            );

            return;

        }

        const checkout =
            document.querySelector(
                "#checkoutPanel"
            ) ||
            document.querySelector(
                ".checkout-panel"
            );

        if (!checkout) {

            GCS.notify(
                "Checkout is unavailable.",
                "error"
            );

            return;

        }

        GCS.renderCheckout();

        GCS.closeCart();

        checkout.classList.add(
            "open"
        );

        document.body.classList.add(
            "modal-open"
        );

    };


GCS.closeCheckout =
    function () {

        const checkout =
            document.querySelector(
                "#checkoutPanel"
            ) ||
            document.querySelector(
                ".checkout-panel"
            );

        if (checkout) {

            checkout.classList.remove(
                "open"
            );

        }

        document.body.classList.remove(
            "modal-open"
        );

    };


GCS.renderCheckout =
    function () {

        const cart =
            GCS.getCart();

        const container =
            document.querySelector(
                "#checkoutItems"
            ) ||
            document.querySelector(
                ".checkout-items"
            );

        if (
            container
        ) {

            container.innerHTML =
                cart
                    .map(
                        function (
                            item
                        ) {

                            const quantity =
                                Number(
                                    item.quantity
                                ) || 1;

                            const price =
                                Number(
                                    item.price
                                ) || 0;

                            return `
                                <div
                                    class="checkout-item"
                                >
                                    <div>
                                        <strong>
                                            ${item.brand ||
                                            item.name ||
                                            "Gift Card"}
                                        </strong>

                                        <span>
                                            ₹${Number(
                                                item.value ??
                                                item.amount ??
                                                0
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                            ×
                                            ${quantity}
                                        </span>
                                    </div>

                                    <strong>
                                        ₹${(
                                            price *
                                            quantity
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </strong>
                                </div>
                            `;

                        }
                    )
                    .join("");

        }

        GCS.updateCartTotals();

    };


/* =====================================================
   MOCK ORDER CREATION
===================================================== */

GCS.validateCheckoutEmail =
    function (
        email
    ) {

        const value =
            String(
                email ||
                ""
            )
                .trim();

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(
                value
            );

    };


GCS.createMockOrder =
    function (
        email
    ) {

        const cart =
            GCS.getCart();

        if (!cart.length) {

            GCS.notify(
                "Your cart is empty.",
                "error"
            );

            return null;

        }

        if (
            !GCS.validateCheckoutEmail(
                email
            )
        ) {

            GCS.notify(
                "Enter a valid email address.",
                "error"
            );

            return null;

        }

        const total =
            cart.reduce(
                function (
                    sum,
                    item
                ) {

                    return (
                        sum +
                        (
                            Number(
                                item.price
                            ) || 0
                        ) *
                        (
                            Number(
                                item.quantity
                            ) || 1
                        )
                    );

                },
                0
            );

        const order =
            {
                id:
                    "GCS-" +
                    Date.now()
                        .toString()
                        .slice(
                            -8
                        ),
                email:
                    String(
                        email
                    )
                        .trim(),
                items:
                    cart.map(
                        function (
                            item
                        ) {

                            return {
                                ...item
                            };

                        }
                    ),
                total:
                    total,
                status:
                    "Demo order",
                createdAt:
                    new Date()
                        .toISOString()
            };

        const orders =
            GCS.getOrders();

        orders.unshift(
            order
        );

        GCS.saveOrders(
            orders
        );

        GCS.saveCart(
            []
        );

        GCS.updateCartCount();

        return order;

    };


GCS.completeMockCheckout =
    function () {

        const emailInput =
            document.querySelector(
                "#checkoutEmail"
            ) ||
            document.querySelector(
                "[name='checkoutEmail']"
            ) ||
            document.querySelector(
                ".checkout-email"
            );

        const email =
            emailInput
                ? emailInput.value
                : "";

        const order =
            GCS.createMockOrder(
                email
            );

        if (!order) {
            return;
        }

        GCS.closeCheckout();

        GCS.showOrderSuccess(
            order
        );

    };


/* =====================================================
   ORDER SUCCESS
===================================================== */

GCS.showOrderSuccess =
    function (
        order
    ) {

        const modal =
            document.querySelector(
                "#successModal"
            ) ||
            document.querySelector(
                ".success-modal"
            );

        if (!modal) {

            GCS.notify(
                `Demo order ${order.id} created.`,
                "success"
            );

            return;

        }

        const idTargets =
            modal.querySelectorAll(
                "[data-order-id], .success-order-id"
            );

        idTargets.forEach(
            function (
                element
            ) {

                element.textContent =
                    order.id;

            }
        );

        const emailTargets =
            modal.querySelectorAll(
                "[data-order-email], .success-order-email"
            );

        emailTargets.forEach(
            function (
                element
            ) {

                element.textContent =
                    order.email;

            }
        );

        modal.classList.add(
            "open"
        );

        document.body.classList.add(
            "modal-open"
        );

    };


GCS.closeSuccess =
    function () {

        const modal =
            document.querySelector(
                "#successModal"
            ) ||
            document.querySelector(
                ".success-modal"
            );

        if (modal) {

            modal.classList.remove(
                "open"
            );

        }

        document.body.classList.remove(
            "modal-open"
        );

    };


/* =====================================================
   EMAIL VALIDATION
===================================================== */

GCS.bindEmailValidation =
    function () {

        const inputs =
            document.querySelectorAll(
                "input[type='email'], #checkoutEmail"
            );

        inputs.forEach(
            function (
                input
            ) {

                input.addEventListener(
                    "input",
                    function () {

                        const valid =
                            GCS.validateCheckoutEmail(
                                input.value
                            );

                        input.classList.toggle(
                            "valid",
                            valid &&
                            input.value.length > 0
                        );

                        input.classList.toggle(
                            "invalid",
                            !valid &&
                            input.value.length > 0
                        );

                    }
                );

            }
        );

    };


/* =====================================================
   SEARCH UI
===================================================== */

GCS.bindSearch =
    function () {

        const inputs =
            document.querySelectorAll(
                "#searchInput, .search-input, [data-search-input]"
            );

        inputs.forEach(
            function (
                input
            ) {

                input.addEventListener(
                    "input",
                    function (
                        event
                    ) {

                        GCS.searchTerm =
                            event.target.value;

                        GCS.applyFilters();

                    }
                );

                input.addEventListener(
                    "keydown",
                    function (
                        event
                    ) {

                        if (
                            event.key ===
                            "Escape"
                        ) {

                            input.value =
                                "";

                            GCS.searchTerm =
                                "";

                            GCS.applyFilters();

                        }

                    }
                );

            }
        );

    };


/* =====================================================
   CATEGORY UI
===================================================== */

GCS.bindCategories =
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
                                button.getAttribute(
                                    "data-value"
                                ) ||
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
   HEADER UI
===================================================== */

GCS.updateHeader =
    function () {

        GCS.updateCartCount();

        const account =
            GCS.getAccount
                ? GCS.getAccount()
                : null;

        const loginButtons =
            document.querySelectorAll(
                ".login-button, [data-login]"
            );

        const accountButtons =
            document.querySelectorAll(
                ".account-button, [data-account]"
            );

        const loggedIn =
            !!account;

        loginButtons.forEach(
            function (
                button
            ) {

                button.style.display =
                    loggedIn
                        ? "none"
                        : "";

            }
        );

        accountButtons.forEach(
            function (
                button
            ) {

                button.style.display =
                    loggedIn
                        ? ""
                        : "none";

            }
        );

        const nameTargets =
            document.querySelectorAll(
                "[data-user-name], .user-name"
            );

        nameTargets.forEach(
            function (
                element
            ) {

                element.textContent =
                    account?.name ||
                    "Account";

            }
        );

    };


/* =====================================================
   SCROLL HELPERS
===================================================== */

GCS.scrollToProducts =
    function () {

        const section =
            document.querySelector(
                "#products"
            ) ||
            document.querySelector(
                ".products-section"
            ) ||
            document.querySelector(
                "#productSection"
            );

        if (!section) {
            return;
        }

        section.scrollIntoView(
            {
                behavior:
                    "smooth",
                block:
                    "start"
            }
        );

    };


GCS.scrollTop =
    function () {

        window.scrollTo(
            {
                top:
                    0,
                behavior:
                    "smooth"
            }
        );

    };


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

GCS.openMobileMenu =
    function () {

        const menu =
            document.querySelector(
                "#mobileMenu"
            ) ||
            document.querySelector(
                ".mobile-menu"
            );

        if (!menu) {
            return;
        }

        menu.classList.add(
            "open"
        );

        document.body.classList.add(
            "menu-open"
        );

    };


GCS.closeMobileMenu =
    function () {

        const menu =
            document.querySelector(
                "#mobileMenu"
            ) ||
            document.querySelector(
                ".mobile-menu"
            );

        if (menu) {

            menu.classList.remove(
                "open"
            );

        }

        document.body.classList.remove(
            "menu-open"
        );

    };


/* =====================================================
   NOTIFICATION SYSTEM
===================================================== */

GCS.notify =
    function (
        message,
        type
    ) {

        let container =
            document.querySelector(
                "#notificationContainer"
            );

        if (!container) {

            container =
                document.createElement(
                    "div"
                );

            container.id =
                "notificationContainer";

            container.className =
                "notification-container";

            document.body.appendChild(
                container
            );

        }

        const notification =
            document.createElement(
                "div"
            );

        notification.className =
            "notification " +
            (
                type ||
                "info"
            );

        notification.innerHTML =
            `
                <span
                    class="notification-message"
                >
                    ${String(
                        message
                    )}
                </span>

                <button
                    type="button"
                    class="notification-close"
                    aria-label="Close notification"
                >
                    ×
                </button>
            `;

        container.appendChild(
            notification
        );

        const close =
            notification.querySelector(
                ".notification-close"
            );

        if (close) {

            close.addEventListener(
                "click",
                function () {

                    notification.remove();

                }
            );

        }

        window.setTimeout(
            function () {

                if (
                    notification &&
                    notification.parentNode
                ) {

                    notification.classList.add(
                        "leaving"
                    );

                    window.setTimeout(
                        function () {

                            if (
                                notification.parentNode
                            ) {

                                notification.remove();

                            }

                        },
                        250
                    );

                }

            },
            3200
        );

    };


/* =====================================================
   WISHLIST UI REFRESH
===================================================== */

GCS.refreshWishlistButtons =
    function () {

        document
            .querySelectorAll(
                "[data-wishlist-id]"
            )
            .forEach(
                function (
                    button
                ) {

                    const id =
                        decodeURIComponent(
                            button.dataset.wishlistId ||
                            ""
                        );

                    const active =
                        GCS.isWishlisted
                            ? GCS.isWishlisted(
                                id
                            )
                            : false;

                    button.classList.toggle(
                        "active",
                        active
                    );

                    const icon =
                        button.querySelector(
                            ".wishlist-icon"
                        );

                    if (icon) {

                        icon.textContent =
                            active
                                ? "♥"
                                : "♡";

                    }

                }
            );

    };


/* =====================================================
   ACCOUNT-AREA COMPATIBILITY
===================================================== */

GCS.openAccountArea =
    function () {

        if (
            typeof GCS.openAccount ===
            "function"
        ) {

            GCS.openAccount();

            return;

        }

        const account =
            document.querySelector(
                "#accountModal"
            ) ||
            document.querySelector(
                ".account-modal"
            );

        if (account) {

            account.classList.add(
                "open"
            );

            document.body.classList.add(
                "modal-open"
            );

        }

    };


/* =====================================================
   FAQ ACCORDION
===================================================== */

GCS.bindFAQ =
    function () {

        document
            .querySelectorAll(
                ".faq-question, [data-faq-toggle]"
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
                                ) ||
                                button.parentElement;

                            if (!item) {
                                return;
                            }

                            const wasOpen =
                                item.classList.contains(
                                    "open"
                                );

                            document
                                .querySelectorAll(
                                    ".faq-item.open"
                                )
                                .forEach(
                                    function (
                                        openItem
                                    ) {

                                        openItem.classList.remove(
                                            "open"
                                        );

                                    }
                                );

                            if (!wasOpen) {

                                item.classList.add(
                                    "open"
                                );

                            }

                        }
                    );

                }
            );

    };


/* =====================================================
   OUTSIDE CLICK HANDLING
===================================================== */

GCS.bindOutsideClicks =
    function () {

        document.addEventListener(
            "click",
            function (
                event
            ) {

                const target =
                    event.target;

                if (
                    target.matches(
                        ".modal-backdrop, [data-close-modal]"
                    )
                ) {

                    GCS.closeAllOverlays();

                }

            }
        );

    };


/* =====================================================
   ESCAPE KEY
===================================================== */

GCS.bindEscape =
    function () {

        document.addEventListener(
            "keydown",
            function (
                event
            ) {

                if (
                    event.key !==
                    "Escape"
                ) {

                    return;

                }

                GCS.closeAllOverlays();

            }
        );

    };


/* =====================================================
   BUTTON BINDINGS
===================================================== */

GCS.bindGlobalButtons =
    function () {

        document
            .querySelectorAll(
                "[data-open-cart], .cart-button"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function (
                            event
                        ) {

                            event.preventDefault();

                            GCS.openCart();

                        }
                    );

                }
            );


        document
            .querySelectorAll(
                "[data-checkout], .checkout-button"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function (
                            event
                        ) {

                            event.preventDefault();

                            GCS.openCheckout();

                        }
                    );

                }
            );


        document
            .querySelectorAll(
                "[data-close-cart]"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function () {

                            GCS.closeCart();

                        }
                    );

                }
            );


        document
            .querySelectorAll(
                "[data-close-checkout]"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function () {

                            GCS.closeCheckout();

                        }
                    );

                }
            );


        document
            .querySelectorAll(
                "[data-submit-checkout]"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function (
                            event
                        ) {

                            event.preventDefault();

                            GCS.completeMockCheckout();

                        }
                    );

                }
            );


        document
            .querySelectorAll(
                "[data-open-account]"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function (
                            event
                        ) {

                            event.preventDefault();

                            GCS.openAccountArea();

                        }
                    );

                }
            );


        document
            .querySelectorAll(
                "[data-open-menu]"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function (
                            event
                        ) {

                            event.preventDefault();

                            GCS.openMobileMenu();

                        }
                    );

                }
            );


        document
            .querySelectorAll(
                "[data-close-menu]"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function () {

                            GCS.closeMobileMenu();

                        }
                    );

                }
            );


        document
            .querySelectorAll(
                "[data-scroll-products]"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function (
                            event
                        ) {

                            event.preventDefault();

                            GCS.scrollToProducts();

                        }
                    );

                }
            );

    };


/* =====================================================
   PRODUCT MODAL BUTTONS
===================================================== */

GCS.bindProductModal =
    function () {

        document
            .querySelectorAll(
                "[data-product-type]"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function () {

                            GCS.setProductType(
                                button.dataset.productType,
                                button
                            );

                        }
                    );

                }
            );


        document
            .querySelectorAll(
                "[data-add-to-cart], .add-to-cart-button"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function (
                            event
                        ) {

                            event.preventDefault();

                            GCS.addConfiguredProduct();

                        }
                    );

                }
            );


        document
            .querySelectorAll(
                "[data-close-product]"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function () {

                            GCS.closeProduct();

                        }
                    );

                }
            );


        document
            .querySelectorAll(
                "#customGiftValue, [data-custom-value]"
            )
            .forEach(
                function (
                    input
                ) {

                    input.addEventListener(
                        "input",
                        function () {

                            GCS.updateCustomProductValue(
                                input
                            );

                        }
                    );

                }
            );

    };


/* =====================================================
   PRODUCT MODAL RESET
===================================================== */

GCS.resetProductModal =
    function () {

        GCS.productConfig =
            {
                product:
                    null,
                value:
                    0,
                type:
                    "fixed",
                discount:
                    0
            };

        const modal =
            GCS.getProductModal();

        if (!modal) {
            return;
        }

        const customInput =
            modal.querySelector(
                "#customGiftValue, [data-custom-value]"
            );

        if (customInput) {

            customInput.value =
                "";

        }

        modal
            .querySelectorAll(
                ".value-option, .denomination-option"
            )
            .forEach(
                function (
                    button
                ) {

                    button.classList.remove(
                        "active"
                    );

                }
            );

    };


/* =====================================================
   PRODUCT OPEN / CLOSE OVERRIDES
===================================================== */

GCS.openProduct =
    function (
        product
    ) {

        if (!product) {
            return;
        }

        const values =
            GCS.getProductValues(
                product
            );

        const firstValue =
            values.length
                ? values[0]
                : 0;

        GCS.productConfig =
            {
                product:
                    product,
                value:
                    firstValue,
                type:
                    "fixed",
                discount:
                    GCS.getProductDiscount(
                        product
                    )
            };

        const modal =
            GCS.getProductModal();

        if (!modal) {

            GCS.notify(
                "Product details are unavailable.",
                "error"
            );

            return;

        }

        GCS.renderProductModal(
            product
        );

        modal.classList.add(
            "open"
        );

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

        GCS.refreshWishlistButtons();

    };


GCS.closeProduct =
    function () {

        const modal =
            GCS.getProductModal();

        if (modal) {

            modal.classList.remove(
                "open"
            );

            modal.setAttribute(
                "aria-hidden",
                "true"
            );

        }

        document.body.classList.remove(
            "modal-open"
        );

    };


/* =====================================================
   DOM INITIALISATION
===================================================== */

GCS.initialise =
    function () {

        GCS.bindSearch();

        GCS.bindCategories();

        GCS.bindFAQ();

        GCS.bindOutsideClicks();

        GCS.bindEscape();

        GCS.bindGlobalButtons();

        GCS.bindProductModal();

        GCS.bindEmailValidation();

        GCS.applyFilters();

        GCS.updateHeader();

        GCS.updateCartCount();

        GCS.refreshWishlistButtons();

    };


/* =====================================================
   PAGE READY
===================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            GCS.initialise();

        }
    );

}
else {

    GCS.initialise();

}


/* =====================================================
   PART 2 END
   PART 3 CONTINUES AFTER THIS LINE
===================================================== */
/* =====================================================
   GIFTCARDSTORE — PREMIUM APPLICATION
   PART 3 / 3
   FINAL UI + COMPATIBILITY + SAFETY LAYER
===================================================== */


/* =====================================================
   GENERAL DOM HELPERS
===================================================== */

GCS.$ =
    function (
        selector,
        parent
    ) {

        return (
            parent ||
            document
        ).querySelector(
            selector
        );

    };


GCS.$$ =
    function (
        selector,
        parent
    ) {

        return Array.from(
            (
                parent ||
                document
            ).querySelectorAll(
                selector
            )
        );

    };


GCS.escapeHTML =
    function (
        value
    ) {

        const element =
            document.createElement(
                "div"
            );

        element.textContent =
            String(
                value ??
                ""
            );

        return element.innerHTML;

    };


GCS.safeText =
    function (
        value,
        fallback
    ) {

        const text =
            String(
                value ??
                ""
            )
                .trim();

        return text ||
            String(
                fallback ??
                ""
            );

    };


/* =====================================================
   STORAGE SAFETY
===================================================== */

GCS.safeStorageGet =
    function (
        key,
        fallback
    ) {

        try {

            const raw =
                localStorage.getItem(
                    key
                );

            if (
                raw ===
                null
            ) {

                return fallback;

            }

            return JSON.parse(
                raw
            );

        }
        catch (
            error
        ) {

            return fallback;

        }

    };


GCS.safeStorageSet =
    function (
        key,
        value
    ) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(
                    value
                )
            );

            return true;

        }
        catch (
            error
        ) {

            return false;

        }

    };


/* =====================================================
   CART COMPATIBILITY
===================================================== */

GCS.normaliseCartItem =
    function (
        item
    ) {

        if (!item) {

            return null;

        }

        const productId =
            String(
                item.productId ??
                item.id ??
                ""
            );

        const value =
            Number(
                item.value ??
                item.amount ??
                0
            );

        const quantity =
            Math.max(
                1,
                Number(
                    item.quantity
                ) || 1
            );

        if (
            !productId ||
            !Number.isFinite(
                value
            ) ||
            value <= 0
        ) {

            return null;

        }

        return {
            ...item,
            productId:
                productId,
            id:
                String(
                    item.id ??
                    productId
                ),
            value:
                value,
            amount:
                value,
            quantity:
                quantity,
            price:
                Number(
                    item.price
                ) ||
                GCSCalculateSafePrice(
                    value,
                    item.discount
                )
        };

    };


GCS.normaliseCart =
    function (
        cart
    ) {

        if (
            !Array.isArray(
                cart
            )
        ) {

            return [];

        }

        return cart
            .map(
                GCS.normaliseCartItem
            )
            .filter(
                Boolean
            );

    };


/* =====================================================
   ORDER COMPATIBILITY
===================================================== */

GCS.normaliseOrder =
    function (
        order
    ) {

        if (!order) {

            return null;

        }

        return {
            ...order,
            id:
                String(
                    order.id ??
                    "GCS-" +
                    Date.now()
                ),
            email:
                String(
                    order.email ??
                    ""
                ),
            status:
                String(
                    order.status ??
                    "Demo order"
                ),
            items:
                Array.isArray(
                    order.items
                )
                    ? order.items
                    : [],
            total:
                Number(
                    order.total
                ) || 0,
            createdAt:
                order.createdAt ??
                new Date()
                    .toISOString()
        };

    };


/* =====================================================
   SAVINGS
===================================================== */

GCS.calculateCartSavings =
    function () {

        return GCS.getCart()
            .reduce(
                function (
                    total,
                    item
                ) {

                    const value =
                        Number(
                            item.value ??
                            item.amount ??
                            0
                        );

                    const price =
                        Number(
                            item.price
                        ) ||
                        GCSCalculateSafePrice(
                            value,
                            item.discount
                        );

                    const quantity =
                        Number(
                            item.quantity
                        ) || 1;

                    return (
                        total +
                        Math.max(
                            0,
                            value -
                            price
                        ) *
                        quantity
                    );

                },
                0
            );

    };


GCS.updateSavingsDisplay =
    function () {

        const savings =
            GCS.calculateCartSavings();

        document
            .querySelectorAll(
                "[data-savings], #savedAmount, .saved-amount"
            )
            .forEach(
                function (
                    element
                ) {

                    element.textContent =
                        "₹" +
                        savings.toLocaleString(
                            "en-IN"
                        );

                }
            );

    };


/* =====================================================
   PREMIUM HEADER BEHAVIOUR
===================================================== */

GCS.setupHeader =
    function () {

        const header =
            document.querySelector(
                "header"
            ) ||
            document.querySelector(
                ".site-header"
            ) ||
            document.querySelector(
                ".navbar"
            );

        if (!header) {

            return;

        }

        const update =
            function () {

                header.classList.toggle(
                    "scrolled",
                    window.scrollY >
                    20
                );

            };

        update();

        window.addEventListener(
            "scroll",
            update,
            {
                passive:
                    true
            }
        );

    };


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

GCS.setupNavigation =
    function () {

        const links =
            document.querySelectorAll(
                "[data-nav-target]"
            );

        links.forEach(
            function (
                link
            ) {

                link.addEventListener(
                    "click",
                    function (
                        event
                    ) {

                        const selector =
                            link.dataset.navTarget;

                        if (!selector) {

                            return;

                        }

                        const target =
                            document.querySelector(
                                selector
                            );

                        if (!target) {

                            return;

                        }

                        event.preventDefault();

                        target.scrollIntoView(
                            {
                                behavior:
                                    "smooth",
                                block:
                                    "start"
                            }
                        );

                        GCS.closeMobileMenu();

                    }
                );

            }
        );

    };


/* =====================================================
   SCROLL REVEAL
===================================================== */

GCS.setupReveal =
    function () {

        const elements =
            document.querySelectorAll(
                ".reveal, .fade-up, [data-reveal]"
            );

        if (
            !elements.length
        ) {

            return;

        }

        if (
            !("IntersectionObserver"
                in window)
        ) {

            elements.forEach(
                function (
                    element
                ) {

                    element.classList.add(
                        "visible"
                    );

                }
            );

            return;

        }

        const observer =
            new IntersectionObserver(
                function (
                    entries
                ) {

                    entries.forEach(
                        function (
                            entry
                        ) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold:
                        0.12
                }
            );

        elements.forEach(
            function (
                element
            ) {

                observer.observe(
                    element
                );

            }
        );

    };


/* =====================================================
   PRODUCT CARD HOVER / TOUCH
===================================================== */

GCS.setupProductCards =
    function () {

        document
            .querySelectorAll(
                ".product-card"
            )
            .forEach(
                function (
                    card
                ) {

                    card.addEventListener(
                        "mouseenter",
                        function () {

                            card.classList.add(
                                "hovered"
                            );

                        }
                    );

                    card.addEventListener(
                        "mouseleave",
                        function () {

                            card.classList.remove(
                                "hovered"
                            );

                        }
                    );

                }
            );

    };


/* =====================================================
   IMAGE ERROR FALLBACK
===================================================== */

GCS.setupImageFallbacks =
    function () {

        document
            .querySelectorAll(
                "img"
            )
            .forEach(
                function (
                    image
                ) {

                    image.addEventListener(
                        "error",
                        function () {

                            image.classList.add(
                                "image-error"
                            );

                        }
                    );

                }
            );

    };


/* =====================================================
   MODAL SCROLL LOCK
===================================================== */

GCS.lockBody =
    function () {

        document.body.classList.add(
            "modal-open"
        );

    };


GCS.unlockBody =
    function () {

        const active =
            document.querySelector(
                ".open"
            );

        if (!active) {

            document.body.classList.remove(
                "modal-open"
            );

        }

    };


/* =====================================================
   MODAL FOCUS
===================================================== */

GCS.focusModal =
    function (
        modal
    ) {

        if (!modal) {

            return;

        }

        const focusable =
            modal.querySelector(
                "button, input, select, textarea, [tabindex]"
            );

        if (focusable) {

            window.setTimeout(
                function () {

                    try {

                        focusable.focus();

                    }
                    catch (
                        error
                    ) {

                        /* no-op */

                    }

                },
                80
            );

        }

    };


/* =====================================================
   PRODUCT MODAL VISUAL STATE
===================================================== */

GCS.syncProductModalState =
    function () {

        const modal =
            GCS.getProductModal();

        if (!modal) {

            return;

        }

        const config =
            GCS.productConfig ||
            {};

        const fixedButtons =
            modal.querySelectorAll(
                ".product-type-button[data-type='fixed'], [data-product-type='fixed']"
            );

        const customButtons =
            modal.querySelectorAll(
                ".product-type-button[data-type='custom'], [data-product-type='custom']"
            );

        fixedButtons.forEach(
            function (
                button
            ) {

                button.classList.toggle(
                    "active",
                    config.type !==
                    "custom"
                );

            }
        );

        customButtons.forEach(
            function (
                button
            ) {

                button.classList.toggle(
                    "active",
                    config.type ===
                    "custom"
                );

            }
        );

        const fixedArea =
            modal.querySelector(
                ".fixed-value-area"
            ) ||
            modal.querySelector(
                ".fixed-values"
            );

        const customArea =
            modal.querySelector(
                ".custom-value-area"
            ) ||
            modal.querySelector(
                ".custom-value"
            );

        if (fixedArea) {

            fixedArea.hidden =
                config.type ===
                "custom";

        }

        if (customArea) {

            customArea.hidden =
                config.type !==
                "custom";

        }

    };


/* =====================================================
   PRODUCT VALUE VALIDATION
===================================================== */

GCS.validateCustomValue =
    function (
        value,
        product
    ) {

        const numeric =
            Number(
                value
            );

        if (
            !Number.isFinite(
                numeric
            )
        ) {

            return {
                valid:
                    false,
                message:
                    "Enter a valid amount."
            };

        }

        if (
            numeric <= 0
        ) {

            return {
                valid:
                    false,
                message:
                    "Amount must be greater than zero."
            };

        }

        const values =
            GCS.getProductValues(
                product
            );

        if (
            values.length
        ) {

            const minimum =
                Math.min(
                    ...values
                );

            const maximum =
                Math.max(
                    ...values
                );

            if (
                numeric <
                minimum
            ) {

                return {
                    valid:
                        false,
                    message:
                        `Minimum value is ₹${minimum.toLocaleString("en-IN")}.`
                };

            }

            if (
                numeric >
                maximum
            ) {

                return {
                    valid:
                        false,
                    message:
                        `Maximum value is ₹${maximum.toLocaleString("en-IN")}.`
                };

            }

        }

        return {
            valid:
                true,
            value:
                numeric
        };

    };


/* =====================================================
   CART DRAWER SYNC
===================================================== */

GCS.syncCart =
    function () {

        GCS.renderCart();

        GCS.updateCartCount();

        GCS.updateCartTotals();

        GCS.updateSavingsDisplay();

    };


/* =====================================================
   CART COUNT ANIMATION
===================================================== */

GCS.animateCartCount =
    function () {

        const counters =
            document.querySelectorAll(
                "#cartCount, .cart-count, [data-cart-count]"
            );

        counters.forEach(
            function (
                counter
            ) {

                counter.classList.remove(
                    "pulse"
                );

                void counter.offsetWidth;

                counter.classList.add(
                    "pulse"
                );

            }
        );

    };


/* =====================================================
   OVERRIDE CART UPDATE WITH VISUAL SYNC
===================================================== */

const gcsOriginalUpdateCartCount =
    GCS.updateCartCount;


GCS.updateCartCount =
    function () {

        if (
            typeof gcsOriginalUpdateCartCount ===
            "function"
        ) {

            gcsOriginalUpdateCartCount();

        }

        GCS.animateCartCount();

        GCS.updateSavingsDisplay();

    };


/* =====================================================
   WISHLIST STORAGE
===================================================== */

GCS.getWishlist =
    function () {

        const list =
            GCS.safeStorageGet(
                "gcs_wishlist",
                []
            );

        return Array.isArray(
            list
        )
            ? list
            : [];

    };


GCS.saveWishlist =
    function (
        list
    ) {

        GCS.safeStorageSet(
            "gcs_wishlist",
            list
        );

    };


GCS.isWishlisted =
    function (
        id
    ) {

        return GCS.getWishlist()
            .some(
                function (
                    item
                ) {

                    return String(
                        item
                    ) ===
                    String(
                        id
                    );

                }
            );

    };


GCS.toggleWishlist =
    function (
        id
    ) {

        const value =
            decodeURIComponent(
                String(
                    id
                )
            );

        const list =
            GCS.getWishlist();

        const index =
            list.findIndex(
                function (
                    item
                ) {

                    return String(
                        item
                    ) ===
                    value;

                }
            );

        let added =
            false;

        if (
            index >= 0
        ) {

            list.splice(
                index,
                1
            );

        }
        else {

            list.push(
                value
            );

            added =
                true;

        }

        GCS.saveWishlist(
            list
        );

        GCS.refreshWishlistButtons();

        GCS.notify(
            added
                ? "Added to wishlist."
                : "Removed from wishlist.",
            "info"
        );

    };


/* =====================================================
   WISHLIST COUNT
===================================================== */

GCS.updateWishlistCount =
    function () {

        const count =
            GCS.getWishlist()
                .length;

        document
            .querySelectorAll(
                "[data-wishlist-count], .wishlist-count"
            )
            .forEach(
                function (
                    element
                ) {

                    element.textContent =
                        String(
                            count
                        );

                    element.hidden =
                        count ===
                        0;

                }
            );

    };


/* =====================================================
   WISHLIST BUTTON DELEGATION
===================================================== */

GCS.setupWishlist =
    function () {

        document.addEventListener(
            "click",
            function (
                event
            ) {

                const button =
                    event.target.closest(
                        "[data-wishlist-id]"
                    );

                if (!button) {

                    return;

                }

                if (
                    button.dataset.wishlistBound ===
                    "true"
                ) {

                    return;

                }

                event.preventDefault();

                const id =
                    button.dataset.wishlistId;

                if (id) {

                    GCS.toggleWishlist(
                        id
                    );

                }

            }
        );

    };


/* =====================================================
   SEARCH CLEAR BUTTON
===================================================== */

GCS.setupSearchClear =
    function () {

        document
            .querySelectorAll(
                ".search-clear, [data-clear-search]"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function () {

                            document
                                .querySelectorAll(
                                    "#searchInput, .search-input, [data-search-input]"
                                )
                                .forEach(
                                    function (
                                        input
                                    ) {

                                        input.value =
                                            "";

                                    }
                                );

                            GCS.searchTerm =
                                "";

                            GCS.applyFilters();

                        }
                    );

                }
            );

    };


/* =====================================================
   CATEGORY NORMALISATION
===================================================== */

GCS.normaliseCategory =
    function (
        value
    ) {

        const text =
            String(
                value ??
                "all"
            )
                .trim();

        if (
            !text
        ) {

            return "all";

        }

        return text;

    };


/* =====================================================
   CATEGORY BUTTON STATE
===================================================== */

GCS.syncCategoryButtons =
    function () {

        const active =
            String(
                GCS.activeCategory ||
                "all"
            )
                .toLowerCase();

        document
            .querySelectorAll(
                ".category"
            )
            .forEach(
                function (
                    button
                ) {

                    const value =
                        String(
                            button.dataset.category ||
                            button.textContent ||
                            "all"
                        )
                            .trim()
                            .toLowerCase();

                    button.classList.toggle(
                        "active",
                        value ===
                        active ||
                        (
                            active ===
                            "all" &&
                            (
                                value ===
                                "all" ||
                                button ===
                                document.querySelector(
                                    ".category:first-child"
                                )
                            )
                        )
                    );

                }
            );

    };


/* =====================================================
   HERO CTA
===================================================== */

GCS.setupHeroActions =
    function () {

        document
            .querySelectorAll(
                "[data-hero-shop], .hero-shop-button"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function (
                            event
                        ) {

                            event.preventDefault();

                            GCS.scrollToProducts();

                        }
                    );

                }
            );

    };


/* =====================================================
   ACCOUNT BUTTONS
===================================================== */

GCS.setupAccountButtons =
    function () {

        document
            .querySelectorAll(
                ".login-button, [data-login], [data-open-account]"
            )
            .forEach(
                function (
                    button
                ) {

                    if (
                        button.dataset.accountBound ===
                        "true"
                    ) {

                        return;

                    }

                    button.dataset.accountBound =
                        "true";

                    button.addEventListener(
                        "click",
                        function (
                            event
                        ) {

                            event.preventDefault();

                            GCS.openAccountArea();

                        }
                    );

                }
            );

    };


/* =====================================================
   FOOTER YEAR
===================================================== */

GCS.setFooterYear =
    function () {

        const year =
            new Date()
                .getFullYear();

        document
            .querySelectorAll(
                "[data-current-year], .current-year"
            )
            .forEach(
                function (
                    element
                ) {

                    element.textContent =
                        String(
                            year
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
            document.querySelector(
                "#backToTop"
            ) ||
            document.querySelector(
                ".back-to-top"
            );

        if (!button) {

            return;

        }

        const update =
            function () {

                button.classList.toggle(
                    "visible",
                    window.scrollY >
                    500
                );

            };

        update();

        window.addEventListener(
            "scroll",
            update,
            {
                passive:
                    true
            }
        );

        button.addEventListener(
            "click",
            function () {

                GCS.scrollTop();

            }
        );

    };


/* =====================================================
   MOBILE VIEWPORT FIX
===================================================== */

GCS.setupViewport =
    function () {

        const setHeight =
            function () {

                document.documentElement
                    .style
                    .setProperty(
                        "--gcs-vh",
                        window.innerHeight +
                        "px"
                    );

            };

        setHeight();

        window.addEventListener(
            "resize",
            setHeight,
            {
                passive:
                    true
            }
        );

    };


/* =====================================================
   PREVENT ACCIDENTAL FORM SUBMISSION
===================================================== */

GCS.setupForms =
    function () {

        document
            .querySelectorAll(
                "form"
            )
            .forEach(
                function (
                    form
                ) {

                    form.addEventListener(
                        "submit",
                        function (
                            event
                        ) {

                            if (
                                form.dataset.mockCheckout ===
                                "true"
                            ) {

                                event.preventDefault();

                                GCS.completeMockCheckout();

                            }

                        }
                    );

                }
            );

    };


/* =====================================================
   PRODUCT CARD REBIND
===================================================== */

GCS.rebindDynamicUI =
    function () {

        GCS.setupProductCards();

        GCS.refreshWishlistButtons();

        GCS.updateWishlistCount();

        GCS.setupImageFallbacks();

    };


/* =====================================================
   FILTER HOOK
===================================================== */

const gcsOriginalApplyFilters =
    GCS.applyFilters;


GCS.applyFilters =
    function () {

        if (
            typeof gcsOriginalApplyFilters ===
            "function"
        ) {

            gcsOriginalApplyFilters();

        }

        GCS.syncCategoryButtons();

        GCS.rebindDynamicUI();

    };


/* =====================================================
   PRODUCT OPEN HOOK
===================================================== */

const gcsOriginalOpenProduct =
    GCS.openProduct;


GCS.openProduct =
    function (
        product
    ) {

        if (
            typeof gcsOriginalOpenProduct ===
            "function"
        ) {

            gcsOriginalOpenProduct(
                product
            );

        }

        const modal =
            GCS.getProductModal();

        if (modal) {

            GCS.lockBody();

            GCS.focusModal(
                modal
            );

            GCS.syncProductModalState();

        }

    };


/* =====================================================
   PRODUCT CLOSE HOOK
===================================================== */

const gcsOriginalCloseProduct =
    GCS.closeProduct;


GCS.closeProduct =
    function () {

        if (
            typeof gcsOriginalCloseProduct ===
            "function"
        ) {

            gcsOriginalCloseProduct();

        }

        GCS.unlockBody();

    };


/* =====================================================
   CART OPEN HOOK
===================================================== */

const gcsOriginalOpenCart =
    GCS.openCart;


GCS.openCart =
    function () {

        if (
            typeof gcsOriginalOpenCart ===
            "function"
        ) {

            gcsOriginalOpenCart();

        }

        const panel =
            document.querySelector(
                "#cartPanel"
            ) ||
            document.querySelector(
                ".cart-panel"
            );

        if (panel) {

            GCS.focusModal(
                panel
            );

        }

        GCS.syncCart();

    };


/* =====================================================
   CHECKOUT HOOK
===================================================== */

const gcsOriginalOpenCheckout =
    GCS.openCheckout;


GCS.openCheckout =
    function () {

        if (
            typeof gcsOriginalOpenCheckout ===
            "function"
        ) {

            gcsOriginalOpenCheckout();

        }

        const checkout =
            document.querySelector(
                "#checkoutPanel"
            ) ||
            document.querySelector(
                ".checkout-panel"
            );

        if (checkout) {

            GCS.focusModal(
                checkout
            );

        }

    };


/* =====================================================
   SUCCESS MODAL ACCESSIBILITY
===================================================== */

GCS.setupSuccessModal =
    function () {

        const modal =
            document.querySelector(
                "#successModal"
            ) ||
            document.querySelector(
                ".success-modal"
            );

        if (!modal) {

            return;

        }

        modal.setAttribute(
            "role",
            "dialog"
        );

        modal.setAttribute(
            "aria-modal",
            "true"
        );

        modal
            .querySelectorAll(
                "[data-close-success], .success-close"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function () {

                            GCS.closeSuccess();

                        }
                    );

                }
            );

    };


/* =====================================================
   GLOBAL MODAL BACKDROP
===================================================== */

GCS.setupBackdrop =
    function () {

        document
            .querySelectorAll(
                ".modal-backdrop"
            )
            .forEach(
                function (
                    backdrop
                ) {

                    backdrop.addEventListener(
                        "click",
                        function () {

                            GCS.closeAllOverlays();

                        }
                    );

                }
            );

    };


/* =====================================================
   KEYBOARD ACCESSIBILITY
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
                    "Enter"
                ) {

                    const target =
                        event.target;

                    if (
                        target.matches(
                            ".category[role='button']"
                        )
                    ) {

                        target.click();

                    }

                }

            }
        );

    };


/* =====================================================
   PREFERS REDUCED MOTION
===================================================== */

GCS.setupMotionPreference =
    function () {

        const media =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );

        const apply =
            function () {

                document.documentElement
                    .classList.toggle(
                        "reduced-motion",
                        media.matches
                    );

            };

        apply();

        if (
            typeof media.addEventListener ===
            "function"
        ) {

            media.addEventListener(
                "change",
                apply
            );

        }

    };


/* =====================================================
   PRODUCT MODAL ARIA
===================================================== */

GCS.setupProductAccessibility =
    function () {

        const modal =
            GCS.getProductModal();

        if (!modal) {

            return;

        }

        modal.setAttribute(
            "role",
            "dialog"
        );

        modal.setAttribute(
            "aria-modal",
            "true"
        );

        modal.setAttribute(
            "aria-hidden",
            modal.classList.contains(
                "open"
            )
                ? "false"
                : "true"
        );

    };


/* =====================================================
   ERROR BOUNDARY
===================================================== */

window.addEventListener(
    "error",
    function (
        event
    ) {

        if (
            !event ||
            !event.error
        ) {

            return;

        }

        console.warn(
            "GiftCardStore handled a UI error:",
            event.error
        );

    }
);


/* =====================================================
   UNHANDLED PROMISE SAFETY
===================================================== */

window.addEventListener(
    "unhandledrejection",
    function (
        event
    ) {

        if (
            event &&
            event.reason
        ) {

            console.warn(
                "GiftCardStore handled an async error:",
                event.reason
            );

        }

    }
);


/* =====================================================
   FINAL APPLICATION SETUP
===================================================== */

GCS.finalise =
    function () {

        GCS.setupHeader();

        GCS.setupNavigation();

        GCS.setupReveal();

        GCS.setupSearchClear();

        GCS.setupHeroActions();

        GCS.setupAccountButtons();

        GCS.setupBackToTop();

        GCS.setupViewport();

        GCS.setupForms();

        GCS.setupWishlist();

        GCS.setupSuccessModal();

        GCS.setupBackdrop();

        GCS.setupKeyboard();

        GCS.setupMotionPreference();

        GCS.setupProductAccessibility();

        GCS.setFooterYear();

        GCS.updateWishlistCount();

        GCS.updateSavingsDisplay();

        GCS.syncCategoryButtons();

        GCS.rebindDynamicUI();

    };


/* =====================================================
   DELAYED UI SYNC
===================================================== */

GCS.delayedSync =
    function () {

        window.setTimeout(
            function () {

                GCS.updateHeader();

                GCS.updateCartCount();

                GCS.updateWishlistCount();

                GCS.updateSavingsDisplay();

                GCS.rebindDynamicUI();

            },
            150
        );

        window.setTimeout(
            function () {

                GCS.rebindDynamicUI();

            },
            700
        );

    };


/* =====================================================
   FINAL READY HANDLER
===================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            GCS.finalise();

            GCS.delayedSync();

        },
        {
            once:
                true
        }
    );

}
else {

    GCS.finalise();

    GCS.delayedSync();

}


/* =====================================================
   PUBLIC COMPATIBILITY API
===================================================== */

window.GiftCardStore =
    GCS;

window.GCS =
    GCS;


/* =====================================================
   FINAL STATE
===================================================== */

GCS.version =
    "premium-3.0";

GCS.ready =
    true;


/* =====================================================
   PART 3 COMPLETE
===================================================== */
