/* =====================================================
   GIFTCARDSTORE — ACCOUNT
   BRICK 14 — ACCOUNT + APPEARANCE SETTINGS
   ===================================================== */

const ACCOUNT_KEY = "giftCardCustomer";
const THEME_KEY = "giftCardTheme";

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
   THEME SYSTEM
   ===================================================== */

function getSavedTheme() {
    return localStorage.getItem(THEME_KEY) || "system";
}

function getEffectiveTheme(theme) {
    if (theme === "system") {
        return window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    return theme;
}

function applyTheme(theme) {
    const effectiveTheme = getEffectiveTheme(theme);

    document.documentElement.setAttribute(
        "data-theme",
        effectiveTheme
    );

    document.documentElement.style.colorScheme =
        effectiveTheme;

    localStorage.setItem(
        THEME_KEY,
        theme
    );

    updateThemeButtons(theme);
}

function updateThemeButtons(theme) {
    document.querySelectorAll(
        "[data-theme-option]"
    ).forEach(function(button) {

        button.classList.toggle(
            "active",
            button.dataset.themeOption === theme
        );

    });
}

function setTheme(theme) {
    if (
        theme !== "light" &&
        theme !== "dark" &&
        theme !== "system"
    ) {
        return;
    }

    applyTheme(theme);
}

function initialiseTheme() {
    applyTheme(getSavedTheme());

    if (window.matchMedia) {
        const media =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            );

        const systemThemeChanged =
            function() {
                if (getSavedTheme() === "system") {
                    applyTheme("system");
                }
            };

        if (media.addEventListener) {
            media.addEventListener(
                "change",
                systemThemeChanged
            );
        } else if (media.addListener) {
            media.addListener(
                systemThemeChanged
            );
        }
    }
}


/* =====================================================
   NOTICE SYSTEM
   ===================================================== */

function createNoticeSystem() {

    if (
        document.getElementById(
            "siteNoticeOverlay"
        )
    ) {
        return;
    }

    const overlay =
        document.createElement("div");

    overlay.id =
        "siteNoticeOverlay";

    overlay.className =
        "site-notice-overlay";

    overlay.innerHTML = `
        <div class="site-notice">

            <div
                class="notice-icon"
                id="noticeIcon">
                ✓
            </div>

            <div class="notice-content">

                <div
                    class="notice-title"
                    id="noticeTitle">
                    GiftCardStore
                </div>

                <div
                    class="notice-message"
                    id="noticeMessage">
                </div>

            </div>

            <button
                class="notice-close"
                onclick="closeNotice()">
                ×
            </button>

        </div>
    `;

    document.body.appendChild(overlay);
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

    titleElement.textContent =
        title;

    messageElement.innerHTML =
        escapeHTML(message)
            .replace(/\n/g, "<br>");

    overlay.className =
        "site-notice-overlay notice-" +
        type;

    icon.textContent =
        type === "success"
            ? "✓"
            : type === "error"
                ? "!"
                : "i";

    overlay.style.display =
        "flex";
}


function closeNotice() {

    const overlay =
        document.getElementById(
            "siteNoticeOverlay"
        );

    if (overlay) {
        overlay.style.display =
            "none";
    }
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

    } else {

        loginButton.style.display =
            "inline-flex";

        accountButton.style.display =
            "none";
    }
}


/* =====================================================
   ACCOUNT MODAL
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
        <div class="panel account-modal">

            <div class="panel-header">

                <div>
                    <div class="panel-eyebrow">
                        Account
                    </div>

                    <h2>
                        My Account
                    </h2>

                    <p>
                        Manage your GiftCardStore account.
                    </p>
                </div>

                <button
                    class="close-button"
                    onclick="closeAccountPanel()">
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
                        class="account-email"
                        id="accountEmail">
                    </div>
                </div>

            </div>

            <div class="account-menu">

                <button
                    onclick="openProfileSection()">

                    <span>👤</span>

                    <div>
                        <strong>Profile</strong>
                        <small>
                            View your account information
                        </small>
                    </div>

                </button>

                <button
                    onclick="openOrdersFromAccount()">

                    <span>📦</span>

                    <div>
                        <strong>My Orders</strong>
                        <small>
                            View your previous orders
                        </small>
                    </div>

                </button>

                <button
                    onclick="openPaymentSection()">

                    <span>💳</span>

                    <div>
                        <strong>Payment Methods</strong>
                        <small>
                            Manage payment options
                        </small>
                    </div>

                </button>

                <button
                    onclick="openGiftCardsSection()">

                    <span>🎁</span>

                    <div>
                        <strong>My Gift Cards</strong>
                        <small>
                            View your purchased gift cards
                        </small>
                    </div>

                </button>

                <button
                    onclick="openSettingsSection()">

                    <span>⚙️</span>

                    <div>
                        <strong>Settings</strong>
                        <small>
                            Appearance and preferences
                        </small>
                    </div>

                </button>

            </div>

            <button
                class="logout-button"
                onclick="logoutUser()">

                🔐 Logout

            </button>

        </div>
    `;

    document.body.appendChild(overlay);
}


/* =====================================================
   LOGIN MODAL
   ===================================================== */

function createLoginModal() {

    if (
        document.getElementById(
            "loginOverlay"
        )
    ) {
        return;
    }

    const overlay =
        document.createElement("div");

    overlay.id =
        "loginOverlay";

    overlay.className =
        "overlay";

    overlay.style.display =
        "none";

    overlay.innerHTML = `
        <div class="panel login-modal">

            <button
                class="close-button"
                onclick="closeLoginPanel()"
                style="float:right">

                ×

            </button>

            <div class="login-icon">
                👤
            </div>

            <h2>
                Welcome back
            </h2>

            <p>
                Sign in to access your account and orders.
            </p>

            <div class="field-label">
                Your name
            </div>

            <input
                class="login-input"
                id="loginName"
                type="text"
                placeholder="Enter your name"
                autocomplete="name">

            <div class="field-label">
                Email address
            </div>

            <input
                class="login-input"
                id="loginEmail"
                type="email"
                placeholder="you@example.com"
                autocomplete="email">

            <div
                class="login-error"
                id="loginError">
            </div>

            <button
                class="wide-primary"
                onclick="submitLogin()">

                Continue

            </button>

        </div>
    `;

    document.body.appendChild(overlay);
}


/* =====================================================
   LOGIN
   ===================================================== */

function openLoginPanel() {

    createLoginModal();

    document.getElementById(
        "loginName"
    ).value = "";

    document.getElementById(
        "loginEmail"
    ).value = "";

    document.getElementById(
        "loginError"
    ).style.display = "none";

    document.getElementById(
        "loginOverlay"
    ).style.display = "flex";
}


function closeLoginPanel() {

    const overlay =
        document.getElementById(
            "loginOverlay"
        );

    if (overlay) {
        overlay.style.display =
            "none";
    }
}


function submitLogin() {

    const name =
        document.getElementById(
            "loginName"
        ).value.trim();

    const email =
        document.getElementById(
            "loginEmail"
        ).value.trim().toLowerCase();

    const error =
        document.getElementById(
            "loginError"
        );

    if (!name) {

        error.textContent =
            "Please enter your name.";

        error.style.display =
            "block";

        return;
    }

    if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
            .test(email)
    ) {

        error.textContent =
            "Please enter a valid email address.";

        error.style.display =
            "block";

        return;
    }

    saveUser({
        name:name,
        email:email,
        createdAt:new Date().toISOString()
    });

    closeLoginPanel();

    showNotice(
        "Welcome, " + name + "!",
        "Signed in",
        "success"
    );

    if (
        window.checkoutWaitingForLogin
    ) {

        window.checkoutWaitingForLogin =
            false;

        setTimeout(function() {

            if (
                typeof GCS.openCheckout ===
                "function"
            ) {
                GCS.openCheckout();
            }

        },180);
    }
}


/* =====================================================
   ACCOUNT OPEN / CLOSE
   ===================================================== */

function openAccountPanel() {

    if (!isLoggedIn()) {
        openLoginPanel();
        return;
    }

    createAccountModal();

    const user =
        getCurrentUser();

    document.getElementById(
        "accountName"
    ).textContent =
        user.name || "Customer";

    document.getElementById(
        "accountEmail"
    ).textContent =
        user.email || "";

    document.getElementById(
        "accountOverlay"
    ).style.display =
        "flex";
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
        "Name: " +
        (user.name || "Not provided") +
        "\nEmail: " +
        (user.email || "Not provided"),
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
        "Payment methods will be available here.\n\n" +
        "This prototype does not store real card or bank details.",
        "Payment Methods",
        "info"
    );
}


function openGiftCardsSection() {

    showNotice(
        "Purchased gift cards will appear here after an order is completed.",
        "My Gift Cards",
        "info"
    );
}


/* =====================================================
   SETTINGS
   ===================================================== */

function openSettingsSection() {

    const existing =
        document.getElementById(
            "settingsOverlay"
        );

    if (existing) {
        existing.style.display = "flex";
        updateThemeButtons(getSavedTheme());
        return;
    }

    const overlay =
        document.createElement("div");

    overlay.id =
        "settingsOverlay";

    overlay.className =
        "overlay";

    overlay.style.display =
        "flex";

    overlay.innerHTML = `
        <div class="panel settings-panel">

            <div class="panel-header">

                <div>
                    <div class="panel-eyebrow">
                        Settings
                    </div>

                    <h2>
                        Appearance
                    </h2>

                    <p>
                        Choose how GiftCardStore looks on this device.
                    </p>
                </div>

                <button
                    class="close-button"
                    onclick="closeSettingsPanel()">

                    ×

                </button>

            </div>

            <div class="settings-section">

                <div class="settings-label">
                    Theme
                </div>

                <div class="theme-options">

                    <button
                        class="theme-option"
                        data-theme-option="light"
                        onclick="setTheme('light')">

                        <span class="theme-option-icon">
                            ☀️
                        </span>

                        <span>
                            <strong>Light</strong>
                            <small>
                                Bright appearance
                            </small>
                        </span>

                    </button>

                    <button
                        class="theme-option"
                        data-theme-option="dark"
                        onclick="setTheme('dark')">

                        <span class="theme-option-icon">
                            🌙
                        </span>

                        <span>
                            <strong>Dark</strong>
                            <small>
                                Dark appearance
                            </small>
                        </span>

                    </button>

                    <button
                        class="theme-option"
                        data-theme-option="system"
                        onclick="setTheme('system')">

                        <span class="theme-option-icon">
                            💻
                        </span>

                        <span>
                            <strong>System</strong>
                            <small>
                                Follow device preference
                            </small>
                        </span>

                    </button>

                </div>

            </div>

            <div class="settings-note">
                Your appearance preference is saved on this device.
            </div>

        </div>
    `;

    document.body.appendChild(overlay);

    updateThemeButtons(
        getSavedTheme()
    );
}


function closeSettingsPanel() {

    const overlay =
        document.getElementById(
            "settingsOverlay"
        );

    if (overlay) {
        overlay.style.display =
            "none";
    }
}


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
   ESCAPE HTML
   ===================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");
}


/* =====================================================
   STARTUP
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initialiseTheme();

        createAccountModal();

        createLoginModal();

        createNoticeSystem();

        updateAccountUI();

    }
);
