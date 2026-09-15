/* =====================================================
   GIFTCARDSTORE — MAIN APPLICATION
   Brick 13
===================================================== */

window.GCS = window.GCS || {};


/* =====================================================
   APPLICATION STATE
===================================================== */

GCS.selectedBrand = null;
GCS.selectedValue = 0;
GCS.selectedPrice = 0;
GCS.selectedMode = "fixed";

window.checkoutWaitingForLogin = false;


/* =====================================================
   COMPATIBILITY HELPERS
===================================================== */

GCS.isLoggedIn = function () {
    return typeof isLoggedIn === "function" && isLoggedIn();
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
    if (typeof openLoginPanel === "function") {
        openLoginPanel();
    }
};


GCS.openAccount = function () {
    if (typeof openAccountPanel === "function") {
        openAccountPanel();
    }
};


GCS.openOrders = function () {
    if (typeof openOrders === "function") {
        openOrders();
    }
};


GCS.closeOrders = function () {
    if (typeof closeOrders === "function") {
        closeOrders();
    }
};


GCS.closeAccount = function () {
    if (typeof closeAccountPanel === "function") {
        closeAccountPanel();
    }
};


GCS.logout = function () {
    if (typeof logoutUser === "function") {
        logoutUser();
    }
};


/* =====================================================
   RENDER BRANDS
===================================================== */

GCS.renderProducts = function (brands) {

    const container =
        document.getElementById("cards");

    if (!container) {
        console.error("GiftCardStore: cards container missing.");
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
                No gift cards found.
            </div>
        `;

        return;
    }


    brandList.forEach(function (brand) {

        const card =
            document.createElement("div");


        /*
         * These class names match style.css.
         */

        card.className = "card";


        const discount =
            Math.max(
                brand.fixedDiscount || 0,
                brand.customDiscount || 0
            );


        card.innerHTML = `

            <div class="brand-box">

                <img
                    class="brand-logo"
                    src="${brand.logo}"
                    alt="${brand.name}"
                    loading="lazy"
                >

            </div>


            <div class="brand">
                ${brand.category}
            </div>


            <h3>
                ${brand.name}
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

};


/* =====================================================
   OPEN PRODUCT
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
                        ₹${value.toLocaleString("en-IN")}
                    </strong>

                    <small>
                        Pay ₹${price.toLocaleString("en-IN")}
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


                /*
                 * Automatically select
                 * the first denomination.
                 */

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


/* =====================================================
   CLOSE PRODUCT
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
   SELECT FIXED / CUSTOM
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


        GCS.selectedValue =
            0;

        GCS.selectedPrice =
            0;

        GCS.updatePreview();

    }

};


/* =====================================================
   CUSTOM VALUE PRICE
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


    if (valueElement) {

        valueElement.textContent =
            GCS.selectedValue > 0
                ? "₹" +
                  GCS.selectedValue.toLocaleString(
                      "en-IN"
                  )
                : "—";

    }


    if (discountElement) {

        discountElement.textContent =
            discount + "%";

    }


    if (priceElement) {

        priceElement.textContent =
            GCS.selectedPrice > 0
                ? "₹" +
                  GCS.selectedPrice.toLocaleString(
                      "en-IN"
                  )
                : "—";

    }

};


/* =====================================================
   CONTINUE TO ORDER
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

        alert(
            "Please select a gift card value first."
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

        alert(
            "Please enter a valid amount between ₹100 and ₹10,000."
        );

        return;

    }


    const discount =
        getBrandDiscount(
            GCS.selectedBrand,
            GCS.selectedMode
        );


    const saving =
        calculateSavings(
            GCS.selectedValue,
            discount
        );


    GCS.closeProduct();


    const brandElement =
        document.getElementById(
            "orderBrand"
        );


    const valueElement =
        document.getElementById(
            "orderValue"
        );


    const originalElement =
        document.getElementById(
            "originalPrice"
        );


    const discountElement =
        document.getElementById(
            "orderDiscount"
        );


    const finalElement =
        document.getElementById(
            "finalPrice"
        );


    const totalElement =
        document.getElementById(
            "totalPrice"
        );


    if (brandElement) {

        brandElement.textContent =
            brand.name;

    }


    if (valueElement) {

        valueElement.textContent =
            "₹" +
            GCS.selectedValue.toLocaleString(
                "en-IN"
            ) +
            " Gift Card";

    }


    if (originalElement) {

        originalElement.textContent =
            "₹" +
            GCS.selectedValue.toLocaleString(
                "en-IN"
            );

    }


    if (discountElement) {

        discountElement.textContent =
            discount + "%";

    }


    if (finalElement) {

        finalElement.textContent =
            "₹" +
            GCS.selectedPrice.toLocaleString(
                "en-IN"
            );

    }


    if (totalElement) {

        totalElement.textContent =
            "₹" +
            GCS.selectedPrice.toLocaleString(
                "en-IN"
            );

    }


    const savingElement =
        document.getElementById(
            "orderSaving"
        );


    if (savingElement) {

        savingElement.textContent =
            "You save ₹" +
            saving.toLocaleString(
                "en-IN"
            );

    }


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
   CLOSE ORDER
===================================================== */

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
   CHECKOUT
===================================================== */

GCS.openCheckout = function () {

    if (!GCS.isLoggedIn()) {

        window.checkoutWaitingForLogin =
            true;

        GCS.closeOrder();

        GCS.openLogin();

        return;

    }


    const brand =
        getBrand(
            GCS.selectedBrand
        );


    const account =
        GCS.getAccount();


    if (!brand || !account) {
        return;
    }


    const brandElement =
        document.getElementById(
            "checkoutBrand"
        );


    const valueElement =
        document.getElementById(
            "checkoutValue"
        );


    const priceElement =
        document.getElementById(
            "checkoutPrice"
        );


    const emailElement =
        document.getElementById(
            "email"
        );


    if (brandElement) {

        brandElement.textContent =
            brand.name;

    }


    if (valueElement) {

        valueElement.textContent =
            "₹" +
            GCS.selectedValue.toLocaleString(
                "en-IN"
            ) +
            " Gift Card";

    }


    if (priceElement) {

        priceElement.textContent =
            "₹" +
            GCS.selectedPrice.toLocaleString(
                "en-IN"
            );

    }


    if (emailElement) {

        emailElement.value =
            account.email || "";

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


/* =====================================================
   CLOSE CHECKOUT
===================================================== */

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


/* =====================================================
   EMAIL ERROR
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
   CREATE ORDER
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


    const order = {

        id:
            "GCS-" +
            Date.now()
                .toString()
                .slice(-8),

        brand:
            brand.name,

        brandId:
            GCS.selectedBrand,

        value:
            "₹" +
            GCS.selectedValue.toLocaleString(
                "en-IN"
            ),

        price:
            "₹" +
            GCS.selectedPrice.toLocaleString(
                "en-IN"
            ),

        discount:
            discount + "%",

        email:
            email,

        status:
            "Confirmed",

        date:
            new Date().toLocaleString(
                "en-IN"
            )

    };


    if (
        typeof saveOrder === "function"
    ) {

        saveOrder(order);

    }


    GCS.closeCheckout();


    const orderIdElement =
        document.getElementById(
            "orderId"
        );


    if (orderIdElement) {

        orderIdElement.textContent =
            order.id;

    }


    const successOverlay =
        document.getElementById(
            "successOverlay"
        );


    if (successOverlay) {

        successOverlay.style.display =
            "flex";

    }

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
   SEARCH
===================================================== */

GCS.searchCards = function (event) {

    const query =
        event.target.value
            .trim()
            .toLowerCase();


    const brands =
        getAllBrands();


    const filtered =
        brands.filter(
            function (brand) {

                return (
                    brand.name
                        .toLowerCase()
                        .includes(query)
                    ||
                    brand.category
                        .toLowerCase()
                        .includes(query)
                );

            }
        );


    GCS.renderProducts(
        filtered
    );

};


/* =====================================================
   CATEGORY FILTER
===================================================== */

GCS.filterCategory = function (
    category,
    button
) {

    const brands =
        getBrandsByCategory(
            category
        );


    GCS.renderProducts(
        brands
    );


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


    /*
     * The old standalone My Orders button
     * is deliberately hidden.
     *
     * Orders now live inside Account.
     */

    const standaloneOrders =
        document.querySelector(
            "nav > .orders-button:not(#accountButton)"
        );


    const loggedIn =
        GCS.isLoggedIn();


    if (standaloneOrders) {

        standaloneOrders.style.display =
            "none";

    }


    if (loggedIn) {

        if (loginButton) {

            loginButton.style.display =
                "none";

        }


        if (accountButton) {

            accountButton.style.display =
                "inline-flex";

            accountButton.textContent =
                "Account";

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

};


/* =====================================================
   CLOSE ALL OVERLAYS
===================================================== */

GCS.closeAllOverlays = function () {

    document
        .querySelectorAll(
            ".overlay"
        )
        .forEach(
            function (overlay) {

                overlay.style.display =
                    "none";

            }
        );

};


/* =====================================================
   START APPLICATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "GiftCardStore started."
        );


        /*
         * Account modal is handled by account.js.
         */

        if (
            typeof createAccountModal === "function"
        ) {

            createAccountModal();

        }


        /*
         * Render all brands.
         */

        GCS.renderProducts();


        /*
         * Header state.
         */

        GCS.updateHeader();


        /*
         * Login button.
         */

        const loginButton =
            document.getElementById(
                "loginButton"
            );


        if (loginButton) {

            loginButton.onclick =
                GCS.openLogin;

        }


        /*
         * Account button.
         */

        const accountButton =
            document.getElementById(
                "accountButton"
            );


        if (accountButton) {

            accountButton.onclick =
                GCS.openAccount;

        }


        /*
         * Search.
         */

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


        /*
         * Categories.
         */

        document
            .querySelectorAll(
                ".category"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            GCS.filterCategory(
                                button.textContent.trim(),
                                button
                            );

                        }
                    );

                }
            );


        /*
         * Close overlay when
         * clicking outside panel.
         */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.classList.contains(
                        "overlay"
                    )
                ) {

                    event.target.style.display =
                        "none";

                }

            }
        );

    }
);
