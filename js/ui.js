window.GCS = window.GCS || {};

GCS.pendingCheckout = false;

GCS.closeAllOverlays = function() {
    document.querySelectorAll(".overlay").forEach(
        overlay => overlay.style.display = "none"
    );
};

GCS.closeProduct = function() {
    document.getElementById("productOverlay").style.display = "none";
};

GCS.closeOrder = function() {
    document.getElementById("orderOverlay").style.display = "none";
};

GCS.openCheckout = function() {
    if (!GCS.isLoggedIn()) {
        GCS.pendingCheckout = true;
        GCS.closeOrder();
        GCS.openLogin();
        return;
    }

    const account = GCS.getAccount();

    document.getElementById("checkoutBrand").textContent =
        GCS.getBrand(GCS.selectedBrand).name;

    document.getElementById("checkoutValue").textContent =
        "₹" + GCS.selectedValue.toLocaleString("en-IN") +
        " Gift Card";

    document.getElementById("checkoutPrice").textContent =
        "₹" + GCS.selectedPrice.toLocaleString("en-IN");

    document.getElementById("email").value =
        account.email;

    document.getElementById("checkoutOverlay").style.display = "flex";
};

GCS.closeCheckout = function() {
    document.getElementById("checkoutOverlay").style.display = "none";
};

GCS.closeSuccess = function() {
    document.getElementById("successOverlay").style.display = "none";
};

GCS.clearEmailError = function() {
    document.getElementById("email").classList.remove("error");
    document.getElementById("emailError").style.display = "none";
};

window.onclick = function(event) {
    if (event.target.classList.contains("overlay")) {
        event.target.style.display = "none";
    }
};
