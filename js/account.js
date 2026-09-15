const ACCOUNT_KEY = "giftCardCustomer";

function getCurrentUser() {
    return JSON.parse(localStorage.getItem(ACCOUNT_KEY) || "null");
}

function isLoggedIn() {
    return !!getCurrentUser();
}

function saveUser(user) {
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(user));
    updateAccountUI();
}

function logoutUser() {
    localStorage.removeItem(ACCOUNT_KEY);
    updateAccountUI();
    closeAccountPanel();
    alert("You have been logged out.");
}

/* =========================
   HEADER
========================= */

function updateAccountUI() {
    const loginButton = document.getElementById("loginButton");
    const accountButton = document.getElementById("accountButton");

    if (!loginButton || !accountButton) return;

    if (isLoggedIn()) {
        loginButton.style.display = "none";
        accountButton.style.display = "inline-flex";
    } else {
        loginButton.style.display = "inline-flex";
        accountButton.style.display = "none";
    }
}

/* =========================
   ACCOUNT DASHBOARD
========================= */

function createAccountModal() {

    if (document.getElementById("accountOverlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "accountOverlay";
    overlay.className = "overlay";
    overlay.style.display = "none";

    overlay.innerHTML = `
        <div class="modal account-modal">

            <div class="modal-header">
                <div>
                    <div class="modal-title">My Account</div>
                    <div class="modal-subtitle">
                        Manage your GiftCardStore account
                    </div>
                </div>

                <button class="close-btn"
                    onclick="closeAccountPanel()">×</button>
            </div>

            <div class="account-profile">
                <div class="account-avatar">👤</div>

                <div>
                    <strong id="accountName">Customer</strong>
                    <div id="accountEmail" class="account-email"></div>
                </div>
            </div>

            <div class="account-menu">

                <button onclick="openProfileSection()">
                    <span>👤</span>
                    <div>
                        <strong>Profile</strong>
                        <small>View your account information</small>
                    </div>
                </button>

                <button onclick="openOrdersFromAccount()">
                    <span>📦</span>
                    <div>
                        <strong>My Orders</strong>
                        <small>View your previous orders</small>
                    </div>
                </button>

                <button onclick="openPaymentSection()">
                    <span>💳</span>
                    <div>
                        <strong>Payment Methods</strong>
                        <small>Manage payment options</small>
                    </div>
                </button>

                <button onclick="openGiftCardsSection()">
                    <span>🎁</span>
                    <div>
                        <strong>My Gift Cards</strong>
                        <small>View your purchased gift cards</small>
                    </div>
                </button>

                <button onclick="openSettingsSection()">
                    <span>⚙️</span>
                    <div>
                        <strong>Settings</strong>
                        <small>Account preferences</small>
                    </div>
                </button>

            </div>

            <button class="logout-button" onclick="logoutUser()">
                🔐 Logout
            </button>

        </div>
    `;

    document.body.appendChild(overlay);
}

/* =========================
   OPEN / CLOSE
========================= */

function openAccountPanel() {

    if (!isLoggedIn()) {
        openLoginPanel();
        return;
    }

    const user = getCurrentUser();

    document.getElementById("accountName").textContent =
        user.name || "Customer";

    document.getElementById("accountEmail").textContent =
        user.email || "";

    document.getElementById("accountOverlay").style.display = "flex";
}

function closeAccountPanel() {
    const overlay = document.getElementById("accountOverlay");

    if (overlay) {
        overlay.style.display = "none";
    }
}

/* =========================
   ACCOUNT SECTIONS
========================= */

function openProfileSection() {

    const user = getCurrentUser();

    if (!user) return;

    alert(
        "PROFILE\n\n" +
        "Name: " + (user.name || "Not provided") + "\n" +
        "Email: " + (user.email || "Not provided")
    );
}

function openOrdersFromAccount() {

    closeAccountPanel();

    if (typeof openOrders === "function") {
        openOrders();
    }
}

function openPaymentSection() {

    alert(
        "PAYMENT METHODS\n\n" +
        "Payment methods will be available here.\n\n" +
        "This prototype does not store real card or bank details."
    );
}

function openGiftCardsSection() {

    alert(
        "MY GIFT CARDS\n\n" +
        "Purchased gift cards will appear here."
    );
}

function openSettingsSection() {

    alert(
        "SETTINGS\n\n" +
        "Account settings will be added here."
    );
}

/* =========================
   LOGIN
========================= */

function openLoginPanel() {

    const email = prompt("Enter your email address:");

    if (email === null) return;

    const cleanEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) {
        alert("Please enter a valid email address.");
        return;
    }

    const name = prompt("Enter your name:");

    if (name === null || !name.trim()) {
        alert("Please enter your name.");
        return;
    }

    saveUser({
        name: name.trim(),
        email: cleanEmail,
        createdAt: new Date().toISOString()
    });

    alert("Welcome, " + name.trim() + "!");

    if (window.checkoutWaitingForLogin) {
        window.checkoutWaitingForLogin = false;

        if (typeof openCheckout === "function") {
            openCheckout();
        }
    }
}

/* =========================
   CHECKOUT LOGIN GATE
========================= */

function requireLogin(action) {

    if (isLoggedIn()) {
        action();
        return;
    }

    window.checkoutWaitingForLogin = true;
    openLoginPanel();
}

/* =========================
   STARTUP
========================= */

document.addEventListener("DOMContentLoaded", function() {

    createAccountModal();
    updateAccountUI();

});
