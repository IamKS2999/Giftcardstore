window.GCS = window.GCS || {};

GCS.selectedBrand = null;
GCS.selectedValue = 0;
GCS.selectedPrice = 0;
GCS.selectedMode = "fixed";
GCS.pendingCheckout = false;


/* =========================
   COMPATIBILITY
========================= */

GCS.isLoggedIn = function () {
    return typeof isLoggedIn === "function" && isLoggedIn();
};

GCS.getAccount = function () {
    return typeof getCurrentUser === "function"
        ? getCurrentUser()
        : null;
};

GCS.getBrand = function (id) {
    return typeof getBrand === "function"
        ? getBrand(id)
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


/* =========================
   RENDER BRANDS
========================= */

GCS.renderProducts = function (brands) {

    const container = document.getElementById("cards");

    if (!container) return;

    const list = brands || getAllBrands();

    container.innerHTML = "";

    list.forEach(function (brand) {

        const card = document.createElement("div");

        card.className = "brand-card";

        const maxDiscount = Math.max(
            brand.fixedDiscount || 0,
            brand.customDiscount || 0
        );

        card.innerHTML = `
            <div class="brand-logo-wrap">
                <img
                    class="brand-logo"
                    src="${brand.logo}"
                    alt="${brand.name}"
                >
            </div>

            <div class="brand-card-content">

                <div class="brand-category">
                    ${brand.category}
                </div>

                <h3>
                    ${brand.name}
                </h3>

                <div class="brand-discount">
                    Up to ${maxDiscount}% off
                </div>

                <button class="buy-button">
                    View Gift Cards
                </button>

            </div>
        `;

        card
            .querySelector(".buy-button")
            .addEventListener(
                "click",
                function () {
                    GCS.openProduct(brand.id);
                }
            );

        container.appendChild(card);
    });
};


/* =========================
   PRODUCT MODAL
========================= */

GCS.openProduct = function (brandId) {

    const brand = getBrand(brandId);

    if (!brand) return;

    GCS.selectedBrand = brandId;
    GCS.selectedMode = "fixed";
    GCS.selectedValue = 0;
    GCS.selectedPrice = 0;

    const fixedValues =
        document.getElementById("fixedValues");

    const customArea =
        document.getElementById("customArea");

    const fixedArea =
        document.getElementById("fixedArea");

    if (fixedArea)
        fixedArea.style.display = "block";

    if (customArea)
        customArea.style.display = "none";

    document
        .querySelectorAll(".mode-button")
        .forEach(function (button) {
            button.classList.remove("active");
        });

    const fixedMode =
        document.getElementById("fixedMode");

    if (fixedMode)
        fixedMode.classList.add("active");

    document.getElementById("productBrand").textContent =
        brand.name;

    if (fixedValues) {

        fixedValues.innerHTML = "";

        brand.fixedValues.forEach(function (value) {

            const price =
                calculatePrice(
                    value,
                    brand.fixedDiscount
                );

            const button =
                document.createElement("button");

            button.className = "value-button";

            button.innerHTML = `
                <strong>
                    ₹${value.toLocaleString("en-IN")}
                </strong>

                <small>
                    Pay ₹${price.toLocaleString("en-IN")}
                </small>
            `;

            button.onclick = function () {

                GCS.selectedMode = "fixed";
                GCS.selectedValue = value;
                GCS.selectedPrice = price;

                document
                    .querySelectorAll(".value-button")
                    .forEach(function (item) {
                        item.classList.remove("active");
                    });

                button.classList.add("active");

                GCS.updatePreview();
            };

            fixedValues.appendChild(button);
        });
    }

    GCS.updatePreview();

    document.getElementById("productOverlay").style.display =
        "flex";
};


GCS.closeProduct = function () {

    const overlay =
        document.getElementById("productOverlay");

    if (overlay)
        overlay.style.display = "none";
};


/* =========================
   FIXED / CUSTOM MODE
========================= */

GCS.selectMode = function (mode) {

    GCS.selectedMode = mode;

    const fixedArea =
        document.getElementById("fixedArea");

    const customArea =
        document.getElementById("customArea");

    const fixedMode =
        document.getElementById("fixedMode");

    const customMode =
        document.getElementById("customMode");

    if (mode === "fixed") {

        if (fixedArea)
            fixedArea.style.display = "block";

        if (customArea)
            customArea.style.display = "none";

        if (fixedMode)
            fixedMode.classList.add("active");

        if (customMode)
            customMode.classList.remove("active");

    } else {

        if (fixedArea)
            fixedArea.style.display = "none";

        if (customArea)
            customArea.style.display = "block";

        if (fixedMode)
            fixedMode.classList.remove("active");

        if (customMode)
            customMode.classList.add("active");

        GCS.selectedValue = 0;
        GCS.selectedPrice = 0;

        GCS.updatePreview();
    }
};


/* =========================
   CUSTOM PRICE
========================= */

GCS.updateCustomPrice = function () {

    const input =
        document.getElementById("customValue");

    if (!input) return;

    const amount =
        Number(input.value);

    const brand =
        getBrand(GCS.selectedBrand);

    if (!brand) return;

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

    GCS.selectedValue = amount;

    GCS.selectedPrice =
        calculatePrice(
            amount,
            brand.customDiscount
        );

    GCS.updatePreview();
};


/* =========================
   PRICE PREVIEW
========================= */

GCS.updatePreview = function () {

    const value =
        document.getElementById("previewValue");

    const discount =
        document.getElementById("previewDiscount");

    const price =
        document.getElementById("previewPrice");

    const brand =
        getBrand(GCS.selectedBrand);

    if (!brand) return;

    const discountValue =
        getBrandDiscount(
            GCS.selectedBrand,
            GCS.selectedMode
        );

    if (GCS.selectedValue > 0) {

        if (value)
            value.textContent =
                "₹" +
                GCS.selectedValue.toLocaleString("en-IN");

        if (price)
            price.textContent =
                "₹" +
                GCS.selectedPrice.toLocaleString("en-IN");

    } else {

        if (value)
            value.textContent = "—";

        if (price)
            price.textContent = "—";
    }

    if (discount)
        discount.textContent =
            discountValue + "%";
};


/* =========================
   CONTINUE
========================= */

GCS.continueProduct = function () {

    if (!GCS.selectedValue) {

        alert(
            "Please select a gift card value first."
        );

        return;
    }

    const brand =
        getBrand(GCS.selectedBrand);

    if (!brand) return;

    const discount =
        getBrandDiscount(
            GCS.selectedBrand,
            GCS.selectedMode
        );

    document.getElementById("orderBrand").textContent =
        brand.name;

    document.getElementById("orderValue").textContent =
        "₹" +
        GCS.selectedValue.toLocaleString("en-IN") +
        " Gift Card";

    document.getElementById("orderValueDisplay").textContent =
        "₹" +
        GCS.selectedValue.toLocaleString("en-IN");

    document.getElementById("orderDiscount").textContent =
        discount + "%";

    document.getElementById("orderPrice").textContent =
        "₹" +
        GCS.selectedPrice.toLocaleString("en-IN");

    document.getElementById("orderTotal").textContent =
        "₹" +
        GCS.selectedPrice.toLocaleString("en-IN");

    GCS.closeProduct();

    document.getElementById("orderOverlay").style.display =
        "flex";
};


GCS.closeOrder = function () {

    const overlay =
        document.getElementById("orderOverlay");

    if (overlay)
        overlay.style.display = "none";
};


/* =========================
   CHECKOUT
========================= */

GCS.openCheckout = function () {

    if (!GCS.isLoggedIn()) {

        GCS.pendingCheckout = true;

        GCS.closeOrder();
        GCS.openLogin();

        return;
    }

    const account =
        GCS.getAccount();

    const brand =
        getBrand(GCS.selectedBrand);

    if (!brand) return;

    document.getElementById("checkoutBrand").textContent =
        brand.name;

    document.getElementById("checkoutValue").textContent =
        "₹" +
        GCS.selectedValue.toLocaleString("en-IN") +
        " Gift Card";

    document.getElementById("checkoutPrice").textContent =
        "₹" +
        GCS.selectedPrice.toLocaleString("en-IN");

    document.getElementById("email").value =
        account.email;

    document.getElementById("checkoutOverlay").style.display =
        "flex";
};


GCS.closeCheckout = function () {

    document.getElementById("checkoutOverlay").style.display =
        "none";
};


/* =========================
   EMAIL
========================= */

GCS.clearEmailError = function () {

    const input =
        document.getElementById("email");

    const error =
        document.getElementById("emailError");

    if (input)
        input.classList.remove("error");

    if (error)
        error.style.display = "none";
};


/* =========================
   CREATE ORDER
========================= */

GCS.createOrder = function () {

    if (!GCS.isLoggedIn()) {

        GCS.openLogin();

        return;
    }

    const email =
        document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase();

    if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
    ) {

        document
            .getElementById("email")
            .classList.add("error");

        document
            .getElementById("emailError")
            .style.display = "block";

        return;
    }

    const brand =
        getBrand(GCS.selectedBrand);

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
            brand.id,

        value:
            GCS.selectedValue,

        price:
            GCS.selectedPrice,

        discount:
            discount + "%",

        email:
            email,

        status:
            "Confirmed",

        date:
            new Date().toLocaleString("en-IN")
    };

    saveOrder(order);

    GCS.closeCheckout();

    document.getElementById("successOrderId").textContent =
        order.id;

    document.getElementById("successOverlay").style.display =
        "flex";
};


GCS.closeSuccess = function () {

    document.getElementById("successOverlay").style.display =
        "none";
};


/* =========================
   SEARCH
========================= */

GCS.searchCards = function (event) {

    const query =
        event.target.value
            .trim()
            .toLowerCase();

    const filtered =
        getAllBrands().filter(function (brand) {

            return (
                brand.name
                    .toLowerCase()
                    .includes(query) ||

                brand.category
                    .toLowerCase()
                    .includes(query)
            );
        });

    GCS.renderProducts(filtered);
};


/* =========================
   CATEGORY
========================= */

GCS.filterCategory = function (
    category,
    button
) {

    GCS.renderProducts(
        getBrandsByCategory(category)
    );

    document
        .querySelectorAll(".category")
        .forEach(function (item) {
            item.classList.remove("active");
        });

    if (button)
        button.classList.add("active");
};


/* =========================
   HEADER
========================= */

GCS.updateHeader = function () {

    const login =
        document.getElementById("loginButton");

    const account =
        document.getElementById("accountButton");

    if (GCS.isLoggedIn()) {

        if (login)
            login.style.display = "none";

        if (account)
            account.style.display = "inline-flex";

    } else {

        if (login)
            login.style.display = "inline-flex";

        if (account)
            account.style.display = "none";
    }
};


/* =========================
   START
========================= */

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
            document.getElementById("loginButton");

        if (login)
            login.onclick = GCS.openLogin;

        const account =
            document.getElementById("accountButton");

        if (account)
            account.onclick = GCS.openAccount;

        const search =
            document.getElementById("search");

        if (search)
            search.addEventListener(
                "input",
                GCS.searchCards
            );

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
