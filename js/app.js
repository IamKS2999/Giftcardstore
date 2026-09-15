/* =========================================
   GiftCardStore - Main Application Controller
========================================= */

window.GCS = window.GCS || {};

/* =========================================
   COMPATIBILITY WITH MODULAR FILES
========================================= */

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


/* =========================================
   APPLICATION STATE
========================================= */

GCS.selectedBrand = null;
GCS.selectedValue = 0;
GCS.selectedPrice = 0;
GCS.selectedMode = "fixed";


/* =========================================
   RENDER BRANDS
========================================= */

GCS.renderProducts = function (brands) {

    const container = document.getElementById("cards");

    if (!container) {
        console.error("GiftCardStore: #cards not found.");
        return;
    }

    const brandList = brands || (
        typeof getAllBrands === "function"
            ? getAllBrands()
            : []
    );

    container.innerHTML = "";

    if (!brandList.length) {
        container.innerHTML = `
            <div class="empty-state">
                No gift cards available.
            </div>
        `;
        return;
    }

    brandList.forEach(function (brand) {

        const card = document.createElement("div");
        card.className = "brand-card";

        card.innerHTML = `
            <div class="brand-logo-wrap">
                <img
                    class="brand-logo"
                    src="${brand.logo}"
                    alt="${brand.name}"
                    loading="lazy"
                >
            </div>

            <div class="brand-card-content">
                <h3>${brand.name}</h3>

                <span class="brand-category">
                    ${brand.category}
                </span>

                <div class="brand-discount">
                    Up to ${Math.max(
                        brand.fixedDiscount || 0,
                        brand.customDiscount || 0
                    )}% off
                </div>

                <button class="buy-button">
                    View Gift Cards
                </button>
            </div>
        `;

        card.querySelector(".buy-button").addEventListener(
            "click",
            function () {
                GCS.openProduct(brand.id);
            }
        );

        container.appendChild(card);
    });
};


/* =========================================
   PRODUCT MODAL
========================================= */

GCS.openProduct = function (brandId) {

    const brand = getBrand(brandId);

    if (!brand) return;

    GCS.selectedBrand = brandId;
    GCS.selectedMode = "fixed";

    const overlay = document.getElementById("productOverlay");

    if (!overlay) {
        console.error("GiftCardStore: productOverlay not found.");
        return;
    }

    const brandName = document.getElementById("productBrand");
    const brandLogo = document.getElementById("productLogo");
    const fixedValues = document.getElementById("fixedValues");

    if (brandName) {
        brandName.textContent = brand.name;
    }

    if (brandLogo) {
        brandLogo.src = brand.logo;
        brandLogo.alt = brand.name;
    }

    if (fixedValues) {

        fixedValues.innerHTML = "";

        brand.fixedValues.forEach(function (value) {

            const price = calculatePrice(
                value,
                brand.fixedDiscount
            );

            const button = document.createElement("button");

            button.className = "value-button";

            button.innerHTML = `
                <strong>₹${value.toLocaleString("en-IN")}</strong>
                <small>Pay ₹${price.toLocaleString("en-IN")}</small>
            `;

            button.addEventListener("click", function () {

                GCS.selectedMode = "fixed";
                GCS.selectedValue = value;
                GCS.selectedPrice = price;

                document
                    .querySelectorAll(".value-button")
                    .forEach(function (item) {
                        item.classList.remove("active");
                    });

                button.classList.add("active");
            });

            fixedValues.appendChild(button);
        });
    }

    overlay.style.display = "flex";
};


GCS.closeProduct = function () {

    const overlay = document.getElementById("productOverlay");

    if (overlay) {
        overlay.style.display = "none";
    }
};


/* =========================================
   CUSTOM VALUE
========================================= */

GCS.selectMode = function (mode) {

    GCS.selectedMode = mode;

    const brand = getBrand(GCS.selectedBrand);

    if (!brand) return;

    const fixedSection = document.getElementById("fixedSection");
    const customSection = document.getElementById("customSection");

    if (fixedSection) {
        fixedSection.style.display =
            mode === "fixed" ? "block" : "none";
    }

    if (customSection) {
        customSection.style.display =
            mode === "custom" ? "block" : "none";
    }
};


GCS.updateCustomPrice = function () {

    const input = document.getElementById("customValue");

    const priceElement = document.getElementById("customPrice");

    if (!input) return;

    const amount = Number(input.value);

    const brand = getBrand(GCS.selectedBrand);

    if (!brand) return;

    if (
        !isValidProductValue(
            GCS.selectedBrand,
            amount,
            "custom"
        )
    ) {
        if (priceElement) {
            priceElement.textContent = "Enter a valid amount";
        }
        return;
    }

    const price = calculatePrice(
        amount,
        brand.customDiscount
    );

    GCS.selectedValue = amount;
    GCS.selectedPrice = price;

    if (priceElement) {
        priceElement.textContent =
            "Pay ₹" + price.toLocaleString("en-IN");
    }
};


/* =========================================
   CONTINUE TO ORDER SUMMARY
========================================= */

GCS.continueProduct = function () {

    const brand = getBrand(GCS.selectedBrand);

    if (!brand) return;

    if (!GCS.selectedValue || GCS.selectedValue <= 0) {
        alert("Please select a gift card value first.");
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
        alert("Please enter a valid gift card value.");
        return;
    }

    GCS.closeProduct();

    const brandElement = document.getElementById("orderBrand");
    const valueElement = document.getElementById("orderValue");
    const priceElement = document.getElementById("orderPrice");
    const savingElement = document.getElementById("orderSaving");

    if (brandElement) {
        brandElement.textContent = brand.name;
    }

    if (valueElement) {
        valueElement.textContent =
            "₹" +
            GCS.selectedValue.toLocaleString("en-IN");
    }

    if (priceElement) {
        priceElement.textContent =
            "₹" +
            GCS.selectedPrice.toLocaleString("en-IN");
    }

    if (savingElement) {
        savingElement.textContent =
            "You save ₹" +
            calculateSavings(
                GCS.selectedValue,
                getBrandDiscount(
                    GCS.selectedBrand,
                    GCS.selectedMode
                )
            ).toLocaleString("en-IN");
    }

    const overlay = document.getElementById("orderOverlay");

    if (overlay) {
        overlay.style.display = "flex";
    }
};


/* =========================================
   ORDER SUMMARY
========================================= */

GCS.closeOrder = function () {

    const overlay = document.getElementById("orderOverlay");

    if (overlay) {
        overlay.style.display = "none";
    }
};


/* =========================================
   CHECKOUT
========================================= */

GCS.openCheckout = function () {

    if (!GCS.isLoggedIn()) {

        window.checkoutWaitingForLogin = true;

        GCS.closeOrder();
        GCS.openLogin();

        return;
    }

    const brand = getBrand(GCS.selectedBrand);

    if (!brand) return;

    const account = GCS.getAccount();

    const brandElement =
        document.getElementById("checkoutBrand");

    const valueElement =
        document.getElementById("checkoutValue");

    const priceElement =
        document.getElementById("checkoutPrice");

    const emailElement =
        document.getElementById("email");

    if (brandElement) {
        brandElement.textContent = brand.name;
    }

    if (valueElement) {
        valueElement.textContent =
            "₹" +
            GCS.selectedValue.toLocaleString("en-IN") +
            " Gift Card";
    }

    if (priceElement) {
        priceElement.textContent =
            "₹" +
            GCS.selectedPrice.toLocaleString("en-IN");
    }

    if (emailElement && account) {
        emailElement.value = account.email || "";
    }

    const overlay =
        document.getElementById("checkoutOverlay");

    if (overlay) {
        overlay.style.display = "flex";
    }
};


GCS.closeCheckout = function () {

    const overlay =
        document.getElementById("checkoutOverlay");

    if (overlay) {
        overlay.style.display = "none";
    }
};


/* =========================================
   CREATE ORDER
========================================= */

GCS.createOrder = function () {

    if (!GCS.isLoggedIn()) {
        GCS.openLogin();
        return;
    }

    const account = GCS.getAccount();

    const emailElement =
        document.getElementById("email");

    const email =
        emailElement
            ? emailElement.value.trim().toLowerCase()
            : account.email;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {

        alert("Please enter a valid email address.");
        return;
    }

    const order = {
        id:
            "GCS-" +
            Date.now().toString().slice(-8),

        brand:
            getBrand(GCS.selectedBrand).name,

        brandId:
            GCS.selectedBrand,

        value:
            GCS.selectedValue,

        price:
            GCS.selectedPrice,

        email:
            email,

        status:
            "Confirmed",

        date:
            new Date().toISOString()
    };

    if (typeof saveOrder === "function") {
        saveOrder(order);
    }

    GCS.closeCheckout();

    const successOverlay =
        document.getElementById("successOverlay");

    const orderIdElement =
        document.getElementById("successOrderId");

    if (orderIdElement) {
        orderIdElement.textContent = order.id;
    }

    if (successOverlay) {
        successOverlay.style.display = "flex";
    }
};


/* =========================================
   SUCCESS
========================================= */

GCS.closeSuccess = function () {

    const overlay =
        document.getElementById("successOverlay");

    if (overlay) {
        overlay.style.display = "none";
    }
};


/* =========================================
   SEARCH
========================================= */

GCS.searchCards = function (event) {

    const query =
        event.target.value.trim().toLowerCase();

    const brands =
        typeof getAllBrands === "function"
            ? getAllBrands()
            : [];

    const filtered =
        brands.filter(function (brand) {
            return (
                brand.name.toLowerCase().includes(query) ||
                brand.category.toLowerCase().includes(query)
            );
        });

    GCS.renderProducts(filtered);
};


/* =========================================
   CATEGORY FILTER
========================================= */

GCS.filterCategory = function (category, button) {

    const brands =
        typeof getBrandsByCategory === "function"
            ? getBrandsByCategory(category)
            : [];

    GCS.renderProducts(brands);

    document
        .querySelectorAll(".category")
        .forEach(function (item) {
            item.classList.remove("active");
        });

    if (button) {
        button.classList.add("active");
    }
};


/* =========================================
   HEADER
========================================= */

GCS.updateHeader = function () {

    const loginButton =
        document.getElementById("loginButton");

    const accountButton =
        document.getElementById("accountButton");

    const ordersButton =
        document.querySelector(".orders-button");

    if (GCS.isLoggedIn()) {

        if (loginButton) {
            loginButton.style.display = "none";
        }

        if (accountButton) {
            accountButton.style.display = "inline-flex";
        }

        /*
         * Remove the old standalone My Orders button.
         */
        if (
            ordersButton &&
            ordersButton.id !== "accountButton"
        ) {
            ordersButton.style.display = "none";
        }

    } else {

        if (loginButton) {
            loginButton.style.display = "inline-flex";
        }

        if (accountButton) {
            accountButton.style.display = "none";
        }

        if (
            ordersButton &&
            ordersButton.id !== "accountButton"
        ) {
            ordersButton.style.display = "none";
        }
    }
};


/* =========================================
   START APPLICATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log("GiftCardStore application started.");

        /*
         * Create account UI first.
         */
        if (
            typeof createAccountModal === "function"
        ) {
            createAccountModal();
        }

        /*
         * Render brands.
         */
        GCS.renderProducts();

        /*
         * Header.
         */
        GCS.updateHeader();

        /*
         * Login.
         */
        const loginButton =
            document.getElementById("loginButton");

        if (loginButton) {
            loginButton.onclick =
                GCS.openLogin;
        }

        /*
         * Account.
         */
        const accountButton =
            document.getElementById("accountButton");

        if (accountButton) {
            accountButton.onclick =
                GCS.openAccount;
        }

        /*
         * Search.
         */
        const search =
            document.getElementById("search");

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
            .querySelectorAll(".category")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        GCS.filterCategory(
                            button.textContent.trim(),
                            button
                        );

                    }
                );

            });

    }
);
