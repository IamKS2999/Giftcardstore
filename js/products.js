window.GCS = window.GCS || {};

GCS.selectedBrand = "Domino";
GCS.selectedMode = "fixed";
GCS.selectedValue = 500;
GCS.selectedDiscount = 15;
GCS.selectedPrice = 425;

GCS.renderProducts = function() {
    const container = document.getElementById("cards");

    container.innerHTML = "";

    Object.values(GCS.brands).forEach(brand => {
        const firstValue = brand.fixedValues[0];
        const price = GCS.calculatePrice(
            firstValue,
            brand.fixedDiscount
        );

        const card = document.createElement("div");

        card.className = "card";
        card.dataset.category = brand.category;
        card.dataset.brand = brand.name;

        card.innerHTML = `
            <div class="brand-box">
                <img
                    class="brand-logo"
                    src="${brand.logo}"
                    alt="${brand.name} logo"
                >
            </div>

            <div class="brand">${brand.name}</div>

            <h3>₹${firstValue.toLocaleString("en-IN")} Gift Card</h3>

            <p class="old-price">
                ₹${firstValue.toLocaleString("en-IN")}
            </p>

            <p class="price">
                ₹${price.toLocaleString("en-IN")}
            </p>

            <span class="discount">
                Save ${brand.fixedDiscount}%
            </span>

            <button
                class="buy"
                onclick="GCS.openProduct('${brand.id}')"
            >
                Select Card
            </button>
        `;

        container.appendChild(card);
    });
};

GCS.openProduct = function(brandId) {
    const brand = GCS.getBrand(brandId);

    if (!brand) return;

    GCS.selectedBrand = brand.id;
    GCS.selectedMode = "fixed";
    GCS.selectedValue = brand.fixedValues[0];
    GCS.selectedDiscount = brand.fixedDiscount;
    GCS.selectedPrice = GCS.calculatePrice(
        GCS.selectedValue,
        GCS.selectedDiscount
    );

    document.getElementById("productBrand").textContent = brand.name;

    document.getElementById("productOverlay").style.display = "flex";

    GCS.selectMode("fixed");

    GCS.renderFixedValues(brand);
    GCS.updatePreview();
};

GCS.renderFixedValues = function(brand) {
    const container = document.getElementById("fixedValues");

    container.innerHTML = "";

    brand.fixedValues.forEach((value, index) => {
        const button = document.createElement("button");

        button.className =
            "value-button" + (index === 0 ? " active" : "");

        button.textContent =
            "₹" + value.toLocaleString("en-IN");

        button.onclick = function() {
            GCS.selectFixed(value, button);
        };

        container.appendChild(button);
    });
};

GCS.selectMode = function(mode) {
    const brand = GCS.getBrand(GCS.selectedBrand);

    if (!brand) return;

    GCS.selectedMode = mode;

    document.getElementById("fixedMode")
        .classList.toggle("active", mode === "fixed");

    document.getElementById("customMode")
        .classList.toggle("active", mode === "custom");

    document.getElementById("fixedArea").style.display =
        mode === "fixed" ? "block" : "none";

    document.getElementById("customArea").style.display =
        mode === "custom" ? "block" : "none";

    if (mode === "fixed") {
        GCS.selectedValue = brand.fixedValues[0];
        GCS.selectedDiscount = brand.fixedDiscount;
        GCS.selectedPrice = GCS.calculatePrice(
            GCS.selectedValue,
            GCS.selectedDiscount
        );
    } else {
        GCS.selectedDiscount = brand.customDiscount;

        const input = document.getElementById("customAmount");
        const amount = Number(input.value);

        if (
            Number.isFinite(amount) &&
            amount >= brand.customMin &&
            amount <= brand.customMax
        ) {
            GCS.selectedValue = amount;
            GCS.selectedPrice = GCS.calculatePrice(
                amount,
                GCS.selectedDiscount
            );
        } else {
            GCS.selectedValue = 0;
            GCS.selectedPrice = 0;
        }
    }

    GCS.updatePreview();
};

GCS.selectFixed = function(amount, button) {
    const brand = GCS.getBrand(GCS.selectedBrand);

    GCS.selectedMode = "fixed";
    GCS.selectedValue = Number(amount);
    GCS.selectedDiscount = brand.fixedDiscount;
    GCS.selectedPrice = GCS.calculatePrice(
        GCS.selectedValue,
        GCS.selectedDiscount
    );

    document.querySelectorAll(".value-button")
        .forEach(b => b.classList.remove("active"));

    button.classList.add("active");

    GCS.updatePreview();
};

GCS.updateCustomPrice = function() {
    const brand = GCS.getBrand(GCS.selectedBrand);
    const input = document.getElementById("customAmount");

    const amount = Number(input.value);

    GCS.selectedDiscount = brand.customDiscount;

    if (
        !Number.isFinite(amount) ||
        amount < brand.customMin ||
        amount > brand.customMax
    ) {
        GCS.selectedValue = 0;
        GCS.selectedPrice = 0;
    } else {
        GCS.selectedValue = amount;
        GCS.selectedPrice = GCS.calculatePrice(
            amount,
            GCS.selectedDiscount
        );
    }

    GCS.updatePreview();
};

GCS.updatePreview = function() {
    const value = Number(GCS.selectedValue) || 0;
    const price = Number(GCS.selectedPrice) || 0;

    document.getElementById("previewValue").textContent =
        "₹" + value.toLocaleString("en-IN");

    document.getElementById("previewDiscount").textContent =
        GCS.selectedDiscount + "%";

    document.getElementById("previewPrice").textContent =
        "₹" + price.toLocaleString("en-IN");
};

GCS.continueProduct = function() {
    const brand = GCS.getBrand(GCS.selectedBrand);

    if (GCS.selectedMode === "custom") {
        const amount = Number(
            document.getElementById("customAmount").value
        );

        if (
            !Number.isFinite(amount) ||
            amount < brand.customMin ||
            amount > brand.customMax
        ) {
            alert(
                `Please enter an amount between ₹${brand.customMin.toLocaleString("en-IN")} and ₹${brand.customMax.toLocaleString("en-IN")}.`
            );
            return;
        }
    }

    if (
        !Number.isFinite(Number(GCS.selectedValue)) ||
        GCS.selectedValue <= 0
    ) {
        alert("Please select a gift card value.");
        return;
    }

    document.getElementById("productOverlay").style.display = "none";

    document.getElementById("orderBrand").textContent = brand.name;
    document.getElementById("orderValue").textContent =
        "₹" + GCS.selectedValue.toLocaleString("en-IN") +
        " Gift Card";

    document.getElementById("originalPrice").textContent =
        "₹" + GCS.selectedValue.toLocaleString("en-IN");

    document.getElementById("orderDiscount").textContent =
        GCS.selectedDiscount + "%";

    document.getElementById("finalPrice").textContent =
        "₹" + GCS.selectedPrice.toLocaleString("en-IN");

    document.getElementById("totalPrice").textContent =
        "₹" + GCS.selectedPrice.toLocaleString("en-IN");

    document.getElementById("orderOverlay").style.display = "flex";
};

GCS.searchCards = function() {
    const query =
        document.getElementById("search").value.toLowerCase();

    document.querySelectorAll(".card").forEach(card => {
        const matches = card.textContent
            .toLowerCase()
            .includes(query);

        card.style.display = matches ? "" : "none";
    });
};

GCS.filterCategory = function(category, button) {
    document.querySelectorAll(".category")
        .forEach(b => b.classList.remove("active"));

    button.classList.add("active");

    document.querySelectorAll(".card").forEach(card => {
        if (category === "All") {
            card.style.display = "";
        } else {
            card.style.display =
                card.dataset.category === category
                    ? ""
                    : "none";
        }
    });
};
