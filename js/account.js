/* =====================================================
   GIFTCARDSTORE — ACCOUNT SYSTEM
   Brick 14.1
===================================================== */

const ACCOUNT_KEY = "giftCardCustomer";

window.GCS = window.GCS || {};


/* =====================================================
   ACCOUNT DATA
===================================================== */

function getCurrentUser() {
    return JSON.parse(
        localStorage.getItem(ACCOUNT_KEY) || "null"
    );
}

function isLoggedIn() {
    return !!getCurrentUser();
}

function saveUser(user) {
    localStorage.setItem(
        ACCOUNT_KEY,
        JSON.stringify(user)
    );

    updateAccountUI();
}


/* =====================================================
   PREMIUM SITE NOTIFICATION
===================================================== */

function createNoticeSystem() {

    if (document.getElementById("siteNoticeOverlay")) {
        return;
    }

    const overlay = document.createElement("div");

    overlay.id = "siteNoticeOverlay";
    overlay.className = "site-notice-overlay";

    overlay.innerHTML = `
        <div class="site-notice">

            <div class="site-notice-icon">
                <span id="noticeIcon">✓</span>
            </div>

            <div class="site-notice-content">

                <div
                    class="site-notice-title"
                    id="noticeTitle"
                >
                    GiftCardStore
                </div>

                <div
                    class="site-notice-message"
                    id="noticeMessage"
                ></div>

            </div>

            <button
                class="site-notice-close"
                onclick="closeNotice()"
                aria-label="Close"
            >
                ×
            </button>

        </div>
    `;

    document.body.appendChild(overlay);

    overlay.addEventListener(
        "click",
        function(event) {

            if (event.target === overlay) {
                closeNotice();
            }

        }
    );
}


function showNotice(
    message,
    title = "GiftCardStore",
    type = "info"
) {

    createNoticeSystem();

    const overlay =
        document.getElementById(
            "siteNoticeOverlay"
        );

    const titleElement =
        document.getElementById(
            "noticeTitle"
        );

    const messageElement =
        document.getElementById(
            "noticeMessage"
        );

    const icon =
        document.getElementById(
            "noticeIcon"
        );

    titleElement.textContent = title;

    messageElement.innerHTML =
        String(message)
            .replace(/\n/g, "<br>");

    overlay.className =
        "site-notice-overlay " +
        "notice-" +
        type;

    if (type === "success") {
        icon.textContent = "✓";
    }
    else if (type === "error") {
        icon.textContent = "!";
    }
    else {
        icon.textContent = "i";
    }

    overlay.style.display = "flex";
}


function closeNotice() {

    const overlay =
        document.getElementById(
            "siteNoticeOverlay"
        );

    if (overlay) {
        overlay.style.display = "none";
    }
}


/*
 * Important:
 * Brick 13 still uses alert() in a few validation
 * situations. Intercept it here so the browser's
 * ugly native alert never appears.
 */

window.alert = function(message) {

    let type = "info";

    const text =
        String(message).toLowerCase();

    if (
        text.includes("valid") ||
        text.includes("select") ||
        text.includes("please enter")
    ) {
        type = "error";
    }

    if (
        text.includes("welcome") ||
        text.includes("logged out") ||
        text.includes("confirmed")
    ) {
        type = "success";
    }

    showNotice(
        message,
        "GiftCardStore",
        type
    );
};


/* =====================================================
   LOGOUT
===================================================== */

function logoutUser() {

    localStorage.removeItem(
        ACCOUNT_KEY
    );

    updateAccountUI();

    closeAccountPanel();

    showNotice(
        "You have been logged out successfully.",
        "Signed out",
        "success"
    );
}


/* =====================================================
   HEADER
===================================================== */

function updateAccountUI() {

    const loginButton =
        document.getElementById(
            "loginButton"
        );

    const accountButton =
        document.getElementById(
            "accountButton"
        );

    if (
        !loginButton ||
        !accountButton
    ) {
        return;
    }

    if (isLoggedIn()) {

        loginButton.style.display =
            "none";

        accountButton.style.display =
            "inline-flex";

    }
    else {

        loginButton.style.display =
            "inline-flex";

        accountButton.style.display =
            "none";

    }
}


/* =====================================================
   ACCOUNT DASHBOARD
===================================================== */

function createAccountModal() {

    if (
        document.getElementById(
            "accountOverlay"
        )
    ) {
        return;
    }

    const overlay =
        document.createElement("div");

    overlay.id =
        "accountOverlay";

    overlay.className =
        "overlay";

    overlay.style.display =
        "none";

    overlay.innerHTML = `

        <div class="modal account-modal">

            <div class="modal-header">

                <div>

                    <div class="modal-title">
                        My Account
                    </div>

                    <div class="modal-subtitle">
                        Manage your GiftCardStore account
                    </div>

                </div>

                <button
                    class="close-btn"
                    onclick="closeAccountPanel()"
                >
                    ×
                </button>

            </div>


            <div class="account-profile">

                <div class="account-avatar">
                    👤
                </div>

                <div>

                    <strong id="accountName">
                        Customer
                    </strong>

                    <div
                        id="accountEmail"
                        class="account-email"
                    ></div>

                </div>

            </div>


            <div class="account-menu">

                <button
                    onclick="openProfileSection()"
                >

                    <span>👤</span>

                    <div>

                        <strong>
                            Profile
                        </strong>

                        <small>
                            View your account information
                        </small>

                    </div>

                </button>


                <button
                    onclick="openOrdersFromAccount()"
                >

                    <span>📦</span>

                    <div>

                        <strong>
                            My Orders
                        </strong>

                        <small>
                            View your previous orders
                        </small>

                    </div>

                </button>


                <button
                    onclick="openPaymentSection()"
                >

                    <span>💳</span>

                    <div>

                        <strong>
                            Payment Methods
                        </strong>

                        <small>
                            Manage payment options
                        </small>

                    </div>

                </button>


                <button
                    onclick="openGiftCardsSection()"
                >

                    <span>🎁</span>

                    <div>

                        <strong>
                            My Gift Cards
                        </strong>

                        <small>
                            View your purchased gift cards
                        </small>

                    </div>

                </button>


                <button
                    onclick="openSettingsSection()"
                >

                    <span>⚙️</span>

                    <div>

                        <strong>
                            Settings
                        </strong>

                        <small>
                            Account preferences
                        </small>

                    </div>

                </button>

            </div>


            <button
                class="logout-button"
                onclick="logoutUser()"
            >
                🔐 Logout
            </button>

        </div>
    `;

    document.body.appendChild(
        overlay
    );
}


/* =====================================================
   OPEN / CLOSE ACCOUNT
===================================================== */

function openAccountPanel() {

    if (!isLoggedIn()) {

        openLoginPanel();

        return;
    }

    const user =
        getCurrentUser();

    const name =
        document.getElementById(
            "accountName"
        );

    const email =
        document.getElementById(
            "accountEmail"
        );

    if (name) {
        name.textContent =
            user.name ||
            "Customer";
    }

    if (email) {
        email.textContent =
            user.email ||
            "";
    }

    const overlay =
        document.getElementById(
            "accountOverlay"
        );

    if (overlay) {
        overlay.style.display =
            "flex";
    }
}


function closeAccountPanel() {

    const overlay =
        document.getElementById(
            "accountOverlay"
        );

    if (overlay) {
        overlay.style.display =
            "none";
    }
}


/* =====================================================
   ACCOUNT SECTIONS
===================================================== */

function openProfileSection() {

    const user =
        getCurrentUser();

    if (!user) {
        return;
    }

    showNotice(
        `
        <strong>${escapeNotice(user.name || "Customer")}</strong><br>
        ${escapeNotice(user.email || "No email provided")}
        `,
        "Your Profile",
        "info"
    );
}


function openOrdersFromAccount() {

    closeAccountPanel();

    if (
        typeof openOrders ===
        "function"
    ) {
        openOrders();
    }
}


function openPaymentSection() {

    showNotice(
        `
        Payment methods will be available here.<br><br>
        <span class="notice-muted">
        This prototype does not store real card
        or bank details.
        </span>
        `,
        "Payment Methods",
        "info"
    );
}


function openGiftCardsSection() {

    showNotice(
        `
        Your purchased gift cards will appear
        here after an order is completed.
        `,
        "My Gift Cards",
        "info"
    );
}


function openSettingsSection() {

    showNotice(
        `
        Account preferences will be available
        here in a future version.
        `,
        "Settings",
        "info"
    );
}


/* =====================================================
   SAFE NOTICE TEXT
===================================================== */

function escapeNotice(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =====================================================
   LOGIN
===================================================== */

function openLoginPanel() {

    const email =
        prompt(
            "Enter your email address:"
        );

    if (email === null) {
        return;
    }

    const cleanEmail =
        email
            .trim()
            .toLowerCase();

    if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
            .test(cleanEmail)
    ) {

        showNotice(
            "Please enter a valid email address.",
            "Invalid email",
            "error"
        );

        return;
    }


    const name =
        prompt(
            "Enter your name:"
        );

    if (
        name === null ||
        !name.trim()
    ) {

        showNotice(
            "Please enter your name.",
            "Name required",
            "error"
        );

        return;
    }


    saveUser({

        name:
            name.trim(),

        email:
            cleanEmail,

        createdAt:
            new Date().toISOString()

    });


    showNotice(
        "Welcome, " +
        escapeNotice(name.trim()) +
        "!",
        "Welcome",
        "success"
    );


    if (
        window.checkoutWaitingForLogin
    ) {

        window.checkoutWaitingForLogin =
            false;

        if (
            typeof openCheckout ===
            "function"
        ) {
            openCheckout();
        }

    }
}


/* =====================================================
   CHECKOUT LOGIN GATE
===================================================== */

function requireLogin(action) {

    if (isLoggedIn()) {

        action();

        return;
    }

    window.checkoutWaitingForLogin =
        true;

    openLoginPanel();
}


/* =====================================================
   STARTUP
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        createAccountModal();

        createNoticeSystem();

        updateAccountUI();

    }
);
