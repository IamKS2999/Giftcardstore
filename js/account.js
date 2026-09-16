/* =====================================================
   GIFTCARDSTORE — ACCOUNT SYSTEM
   Batch upgrade: clean account + demo phone verification
   + centered notices + auto-closing overlays
===================================================== */

const ACCOUNT_KEY = "giftCardCustomer";
const THEME_KEY = "gcsTheme";

window.GCS = window.GCS || {};

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem(ACCOUNT_KEY) || "null");
    } catch (_) {
        return null;
    }
}

function isLoggedIn() {
    return !!getCurrentUser();
}

function saveUser(user) {
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(user));
    updateAccountUI();
}

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* =====================================================
   OVERLAY CONTROL
===================================================== */

function closeAllOverlays() {
    document.querySelectorAll(".overlay").forEach(el => {
        el.style.display = "none";
    });
    closeNotice();
}

window.closeAllOverlays = closeAllOverlays;

function openOverlay(id) {
    closeAllOverlays();
    const el = document.getElementById(id);
    if (el) el.style.display = "flex";
}

/* =====================================================
   CENTERED NOTICE
===================================================== */

function createNoticeSystem() {
    if (document.getElementById("siteNoticeOverlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "siteNoticeOverlay";
    overlay.className = "site-notice-overlay";
    overlay.innerHTML = `
        <div class="site-notice">
            <div class="notice-icon" id="noticeIcon">i</div>
            <div class="notice-content">
                <div class="notice-title" id="noticeTitle">GiftCardStore</div>
                <div class="notice-message" id="noticeMessage"></div>
            </div>
            <button class="notice-close" onclick="closeNotice()" aria-label="Close">×</button>
        </div>
    `;
    document.body.appendChild(overlay);
}

let noticeTimer = null;

function showNotice(message, title = "GiftCardStore", type = "info") {
    createNoticeSystem();

    const overlay = document.getElementById("siteNoticeOverlay");
    const titleEl = document.getElementById("noticeTitle");
    const messageEl = document.getElementById("noticeMessage");
    const icon = document.getElementById("noticeIcon");

    titleEl.textContent = title;
    messageEl.innerHTML = escapeHTML(message).replace(/\n/g, "<br>");

    overlay.className = "site-notice-overlay notice-" + type;
    icon.textContent =
        type === "success" ? "✓" :
        type === "error" ? "!" : "i";

    overlay.style.display = "flex";

    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(closeNotice, 3000);
}

function closeNotice() {
    clearTimeout(noticeTimer);
    const overlay = document.getElementById("siteNoticeOverlay");
    if (overlay) overlay.style.display = "none";
}

/* =====================================================
   HEADER
===================================================== */

function updateAccountUI() {
    const loginButton = document.getElementById("loginButton");
    const accountButton = document.getElementById("accountButton");

    if (!loginButton || !accountButton) return;

    if (isLoggedIn()) {
        loginButton.style.display = "none";
        accountButton.style.display = "inline-flex";
        accountButton.textContent = "Account";
    } else {
        loginButton.style.display = "inline-flex";
        accountButton.style.display = "none";
    }
}

/* =====================================================
   ACCOUNT MODAL
===================================================== */

function createAccountModal() {
    if (document.getElementById("accountOverlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "accountOverlay";
    overlay.className = "overlay";
    overlay.style.display = "none";

    overlay.innerHTML = `
        <div class="panel account-modal-clean">
            <div class="panel-header">
                <div>
                    <div class="panel-eyebrow">Account</div>
                    <h2>My Account</h2>
                    <p>Manage your profile, orders and gift cards.</p>
                </div>
                <button class="close-button" onclick="closeAccountPanel()">×</button>
            </div>

            <div class="account-profile-clean">
                <div class="account-avatar-clean">👤</div>
                <div class="account-profile-copy">
                    <strong id="accountName">Customer</strong>
                    <span id="accountEmail"></span>
                    <small id="accountPhone"></small>
                </div>
            </div>

            <button class="account-saving-strip" onclick="openSavingsFromAccount()">
                <span class="account-saving-label">YOUR SAVINGS</span>
                <strong id="accountSavings">₹0</strong>
                <span class="account-saving-arrow">View details →</span>
            </button>

            <div class="account-menu-clean">
                <button onclick="openProfileSection()">
                    <span>👤</span>
                    <div><strong>Profile</strong><small>Personal information & verification</small></div>
                </button>

                <button onclick="openOrdersFromAccount()">
                    <span>📦</span>
                    <div><strong>My Orders</strong><small>View your previous orders</small></div>
                </button>

                <button onclick="openPaymentSection()">
                    <span>💳</span>
                    <div><strong>Payment Methods</strong><small>Prototype payment preferences</small></div>
                </button>

                <button onclick="openGiftCardsFromAccount()">
                    <span>🎁</span>
                    <div><strong>My Gift Cards</strong><small>View your gift-card collection</small></div>
                </button>

                <button onclick="openSettingsSection()">
                    <span>⚙️</span>
                    <div><strong>Settings</strong><small>Appearance and preferences</small></div>
                </button>

                <button onclick="openReferralFromAccount()">
                    <span>🎉</span>
                    <div><strong>Refer & Earn</strong><small>Earn ₹10 per successful referral</small></div>
                </button>

                <button onclick="openSupportFromAccount()">
                    <span>🎫</span>
                    <div><strong>Support</strong><small>Create a support ticket</small></div>
                </button>
            </div>

            <button class="logout-button" onclick="logoutUser()">Log out</button>
        </div>
    `;

    document.body.appendChild(overlay);
}

function openAccountPanel() {
    if (!isLoggedIn()) {
        openLoginPanel();
        return;
    }

    createAccountModal();

    const user = getCurrentUser();
    document.getElementById("accountName").textContent = user.name || "Customer";
    document.getElementById("accountEmail").textContent = user.email || "";
    document.getElementById("accountPhone").textContent =
        user.phone ? `+91 ${user.phone}${user.phoneVerified ? " • Verified" : ""}` : "Mobile number not added";

    updateAccountSavings();
    openOverlay("accountOverlay");
}

function closeAccountPanel() {
    const el = document.getElementById("accountOverlay");
    if (el) el.style.display = "none";
}

function updateAccountSavings() {
    const el = document.getElementById("accountSavings");
    if (!el) return;

    const user = getCurrentUser();
    if (!user || typeof getOrders !== "function") {
        el.textContent = "₹0";
        return;
    }

    const orders = getOrders().filter(
        o => o.email && user.email &&
        o.email.toLowerCase() === user.email.toLowerCase()
    );

    const number = value =>
        parseInt(String(value || "").replace(/\D/g, ""), 10) || 0;

    const saved = Math.max(
        0,
        orders.reduce((sum, o) => sum + number(o.value), 0) -
        orders.reduce((sum, o) => sum + number(o.price), 0)
    );

    el.textContent = "₹" + saved.toLocaleString("en-IN");
}

function openSavingsFromAccount() {
    closeAccountPanel();
    if (typeof openSavings === "function") {
        openSavings();
    }
}

/* =====================================================
   LOGIN / ACCOUNT CREATION
===================================================== */

function createLoginModal() {
    if (document.getElementById("loginOverlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "loginOverlay";
    overlay.className = "overlay";
    overlay.style.display = "none";

    overlay.innerHTML = `
        <div class="panel login-modal-clean">
            <div class="panel-header">
                <div>
                    <div class="panel-eyebrow">Account</div>
                    <h2 id="loginHeading">Welcome back</h2>
                    <p id="loginSubtitle">Sign in with your existing account.</p>
                </div>
                <button class="close-button" onclick="closeLoginPanel()">×</button>
            </div>

            <div class="login-mode-switch">
                <button id="loginModeButton" class="active" onclick="setLoginMode('login')">Sign in</button>
                <button id="createModeButton" onclick="setLoginMode('create')">Create account</button>
            </div>

            <label class="field-label">Your name</label>
            <input class="login-input" id="loginName" type="text" placeholder="Enter your name" autocomplete="name">

            <label class="field-label">Email address</label>
            <input class="login-input" id="loginEmail" type="email" placeholder="you@example.com" autocomplete="email">

            <div id="phoneVerificationBlock" style="display:none">
                <label class="field-label">Mobile number</label>

                <div class="phone-row">
                    <span>+91</span>
                    <input class="login-input phone-input" id="loginPhone" type="tel" inputmode="numeric" maxlength="10" placeholder="10-digit mobile number" autocomplete="tel">
                    <button class="otp-button" onclick="sendDemoOTP()">Send OTP</button>
                </div>

                <div class="otp-status" id="otpStatus">
                    OTP verification is required when creating a new account.
                </div>

                <div id="otpArea" style="display:none">
                    <label class="field-label">Enter OTP</label>
                    <input class="login-input" id="loginOtp" type="tel" inputmode="numeric" maxlength="6" placeholder="6-digit OTP" autocomplete="one-time-code">
                    <div class="demo-otp-note" id="demoOtpNote"></div>
                </div>
            </div>

            <div class="login-error" id="loginError"></div>

            <button class="wide-primary" id="loginSubmitButton" onclick="submitLogin()">Sign in</button>

            <div class="prototype-note" id="loginPrototypeNote">
                Existing accounts do not need to enter a mobile number again.
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
}

let demoOtp = null;
let loginMode = "login";

function setLoginMode(mode) {
    loginMode = mode === "create" ? "create" : "login";

    const heading = document.getElementById("loginHeading");
    const subtitle = document.getElementById("loginSubtitle");
    const phoneBlock = document.getElementById("phoneVerificationBlock");
    const submit = document.getElementById("loginSubmitButton");
    const note = document.getElementById("loginPrototypeNote");
    const loginButton = document.getElementById("loginModeButton");
    const createButton = document.getElementById("createModeButton");

    if (loginMode === "create") {
        heading.textContent = "Create your account";
        subtitle.textContent = "New accounts require mobile verification.";
        phoneBlock.style.display = "block";
        submit.textContent = "Create Account";
        note.textContent = "Prototype verification only. No real SMS is sent.";
        loginButton.classList.remove("active");
        createButton.classList.add("active");
    } else {
        heading.textContent = "Welcome back";
        subtitle.textContent = "Sign in with your existing account.";
        phoneBlock.style.display = "none";
        submit.textContent = "Sign in";
        note.textContent = "Existing accounts do not need to enter a mobile number again.";
        loginButton.classList.add("active");
        createButton.classList.remove("active");
    }

    document.getElementById("loginError").style.display = "none";
}

function openLoginPanel() {
    createLoginModal();
    closeAllOverlays();

    loginMode = "login";
    setLoginMode("login");

    document.getElementById("loginName").value = "";
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPhone").value = "";
    document.getElementById("loginOtp").value = "";
    document.getElementById("otpArea").style.display = "none";
    document.getElementById("otpStatus").textContent =
        "OTP verification is required when creating a new account.";
    document.getElementById("loginError").style.display = "none";
    document.getElementById("demoOtpNote").textContent = "";
    demoOtp = null;

    document.getElementById("loginOverlay").style.display = "flex";
}

function closeLoginPanel() {
    const el = document.getElementById("loginOverlay");
    if (el) el.style.display = "none";
}

function sendDemoOTP() {
    const phone = (document.getElementById("loginPhone").value || "")
        .replace(/\D/g, "");

    const error = document.getElementById("loginError");

    if (!/^[6-9]\d{9}$/.test(phone)) {
        error.textContent = "Enter a valid 10-digit Indian mobile number first.";
        error.style.display = "block";
        return;
    }

    demoOtp = String(Math.floor(100000 + Math.random() * 900000));

    document.getElementById("otpArea").style.display = "block";
    document.getElementById("otpStatus").textContent =
        "OTP generated for this prototype.";
    document.getElementById("demoOtpNote").textContent =
        "Demo OTP: " + demoOtp + " • No real SMS is sent.";

    error.style.display = "none";
}

function submitLogin() {
    const name = document.getElementById("loginName").value.trim();
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const error = document.getElementById("loginError");

    error.style.display = "none";

    if (!name) {
        error.textContent = "Please enter your name.";
        error.style.display = "block";
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        error.textContent = "Please enter a valid email address.";
        error.style.display = "block";
        return;
    }

    if (loginMode === "login") {
        const existing = getCurrentUser();

        if (!existing || existing.email?.toLowerCase() !== email) {
            error.textContent = "No existing account was found with this email.";
            error.style.display = "block";
            return;
        }

        if (existing.name && existing.name.toLowerCase() !== name.toLowerCase()) {
            error.textContent = "The name does not match this account.";
            error.style.display = "block";
            return;
        }

        saveUser(existing);
        closeLoginPanel();

        showNotice("Welcome back, " + (existing.name || name) + "!", "Signed in", "success");

        if (window.checkoutWaitingForLogin) {
            window.checkoutWaitingForLogin = false;
            setTimeout(() => {
                if (typeof GCS.openCheckout === "function") GCS.openCheckout();
            }, 180);
        }

        return;
    }

    const phone = document.getElementById("loginPhone").value.replace(/\D/g, "");
    const otp = document.getElementById("loginOtp").value.trim();

    if (!/^[6-9]\d{9}$/.test(phone)) {
        error.textContent = "Please enter a valid 10-digit mobile number.";
        error.style.display = "block";
        return;
    }

    if (!demoOtp) {
        error.textContent = "Send the OTP before creating the account.";
        error.style.display = "block";
        return;
    }

    if (otp !== demoOtp) {
        error.textContent = "Incorrect OTP. Please enter the generated demo OTP.";
        error.style.display = "block";
        return;
    }

    const existing = getCurrentUser();

    saveUser({
        name,
        email,
        phone,
        phoneVerified: true,
        createdAt: existing?.createdAt || new Date().toISOString()
    });

    if (typeof ensureReferralForUser === "function") {
        ensureReferralForUser();
    }

    closeLoginPanel();

    showNotice(
        "Your mobile number has been verified in this prototype.",
        "Account created",
        "success"
    );

    if (window.checkoutWaitingForLogin) {
        window.checkoutWaitingForLogin = false;
        setTimeout(() => {
            if (typeof GCS.openCheckout === "function") {
                GCS.openCheckout();
            }
        }, 180);
    }
}

/* =====================================================
   ACCOUNT SECTIONS
===================================================== */

function openProfileSection() {
    const user = getCurrentUser();
    if (!user) return;

    closeAccountPanel();

    const verified = user.phoneVerified ? "Verified" : "Not verified";
    makeAccountDetailOverlay(
        "profileOverlay",
        "Your Profile",
        "Profile",
        "Your account information.",
        `
            <div class="profile-detail-grid">
                <div><span>Name</span><strong>${escapeHTML(user.name || "—")}</strong></div>
                <div><span>Email</span><strong>${escapeHTML(user.email || "—")}</strong></div>
                <div><span>Mobile</span><strong>${user.phone ? "+91 " + escapeHTML(user.phone) : "Not added"}</strong></div>
                <div><span>Mobile verification</span><strong class="verified-text">${verified}</strong></div>
            </div>
            <div class="settings-note">Mobile verification is simulated locally in this prototype. No real OTP service is connected.</div>
        `
    );
}

function openOrdersFromAccount() {
    closeAccountPanel();
    if (typeof openOrders === "function") openOrders();
}

function openPaymentSection() {
    closeAccountPanel();
    makeAccountDetailOverlay(
        "paymentOverlay",
        "Payment Methods",
        "Account",
        "Payment methods for the future product version.",
        `
            <div class="batch-empty">
                <div class="batch-empty-icon">💳</div>
                <h3>No payment methods</h3>
                <p>This prototype does not store card, bank or UPI details.</p>
            </div>
        `
    );
}

function openGiftCardsFromAccount() {
    closeAccountPanel();
    if (typeof openGiftCards === "function") openGiftCards();
}

function openReferralFromAccount() {
    closeAccountPanel();
    if (typeof openReferral === "function") openReferral();
}

function openSupportFromAccount() {
    closeAccountPanel();
    if (typeof openSupport === "function") openSupport();
}

function openSettingsSection() {
    closeAccountPanel();

    makeAccountDetailOverlay(
        "settingsOverlay",
        "Settings",
        "Preferences",
        "Choose how GiftCardStore should look.",
        `
            <div class="settings-section-clean">
                <div class="settings-label">Appearance</div>
                <div class="theme-options">
                    <button class="theme-option" onclick="setThemeChoice('light')">
                        <span class="theme-option-icon">☀️</span>
                        <div><strong>Light</strong><small>Bright interface</small></div>
                    </button>
                    <button class="theme-option" onclick="setThemeChoice('dark')">
                        <span class="theme-option-icon">🌙</span>
                        <div><strong>Dark</strong><small>Dark interface</small></div>
                    </button>
                    <button class="theme-option" onclick="setThemeChoice('system')">
                        <span class="theme-option-icon">⚙️</span>
                        <div><strong>System</strong><small>Follow device preference</small></div>
                    </button>
                </div>
            </div>
        `
    );

    updateThemeChoiceUI();
}

function setThemeChoice(theme) {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
    updateThemeChoiceUI();
}

function applyTheme(theme) {
    const effective =
        theme === "system"
            ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
            : theme;

    document.documentElement.setAttribute("data-theme", effective);
}

function updateThemeChoiceUI() {
    const saved = localStorage.getItem(THEME_KEY) || "system";
    document.querySelectorAll(".theme-option").forEach(button => {
        const action = button.getAttribute("onclick") || "";
        const active = action.includes(`'${saved}'`);
        button.classList.toggle("active", active);
    });
}

function initialiseTheme() {
    const saved = localStorage.getItem(THEME_KEY) || "system";
    applyTheme(saved);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    if (media.addEventListener) {
        media.addEventListener("change", () => {
            if ((localStorage.getItem(THEME_KEY) || "system") === "system") {
                applyTheme("system");
            }
        });
    }
}

function makeAccountDetailOverlay(id, title, eyebrow, subtitle, content) {
    closeAllOverlays();

    const old = document.getElementById(id);
    if (old) old.remove();

    const overlay = document.createElement("div");
    overlay.id = id;
    overlay.className = "overlay";
    overlay.style.display = "flex";

    overlay.innerHTML = `
        <div class="panel account-detail-panel">
            <div class="panel-header">
                <div>
                    <div class="panel-eyebrow">${escapeHTML(eyebrow)}</div>
                    <h2>${escapeHTML(title)}</h2>
                    <p>${escapeHTML(subtitle)}</p>
                </div>
                <button class="close-button" onclick="closeAccountDetail('${id}')">×</button>
            </div>
            ${content}
        </div>
    `;

    document.body.appendChild(overlay);
}

function closeAccountDetail(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
}

/* =====================================================
   LOGOUT / LOGIN GATE
===================================================== */

function logoutUser() {
    localStorage.removeItem(ACCOUNT_KEY);
    updateAccountUI();
    closeAllOverlays();

    showNotice(
        "You have been logged out successfully.",
        "Signed out",
        "success"
    );
}

function requireLogin(action) {
    if (isLoggedIn()) {
        action();
        return;
    }

    window.checkoutWaitingForLogin = true;
    openLoginPanel();
}

/* =====================================================
   GCS COMPATIBILITY
===================================================== */

GCS.isLoggedIn = function () {
    return isLoggedIn();
};

GCS.getAccount = function () {
    return getCurrentUser();
};

GCS.openLogin = function () {
    openLoginPanel();
};

GCS.openAccount = function () {
    openAccountPanel();
};

GCS.closeAccount = function () {
    closeAccountPanel();
};

GCS.logout = function () {
    logoutUser();
};

/* =====================================================
   ACCOUNT CSS OVERRIDES
   Injected here so style.css does not need another edit.
===================================================== */

(function injectAccountCSS() {
    const style = document.createElement("style");
    style.textContent = `
        .account-modal-clean,
        .account-detail-panel,
        .login-modal-clean{
            width:min(650px,100%);
        }

        .account-profile-clean{
            display:flex;
            align-items:center;
            gap:16px;
            padding:18px;
            margin-bottom:14px;
            border:1px solid var(--border);
            border-radius:20px;
            background:linear-gradient(135deg,var(--surface-3),var(--surface-2));
        }

        .account-avatar-clean{
            width:58px;
            height:58px;
            display:grid;
            place-items:center;
            flex:0 0 58px;
            border-radius:17px;
            background:var(--surface);
            font-size:28px;
        }

        .account-profile-copy strong,
        .account-profile-copy span,
        .account-profile-copy small{
            display:block;
        }

        .account-profile-copy strong{
            font-size:21px;
        }

        .account-profile-copy span{
            margin-top:3px;
            color:var(--muted);
        }

        .account-profile-copy small{
            margin-top:4px;
            color:var(--green);
            font-weight:800;
        }

        .account-saving-strip{
            width:100%;
            display:grid;
            grid-template-columns:1fr auto;
            gap:2px 14px;
            margin:0 0 16px;
            padding:17px 19px;
            border:1px solid rgba(113,60,243,.35);
            border-radius:19px;
            background:linear-gradient(135deg,rgba(113,60,243,.13),rgba(65,105,225,.10));
            color:var(--text);
            text-align:left;
        }

        .account-saving-label{
            color:var(--purple);
            font-size:11px;
            font-weight:900;
            letter-spacing:1.5px;
        }

        .account-saving-strip strong{
            grid-row:1 / span 2;
            align-self:center;
            font-size:30px;
            color:var(--purple);
        }

        .account-saving-arrow{
            color:var(--muted);
            font-size:13px;
        }

        .account-menu-clean{
            display:grid;
            gap:9px;
        }

        .account-menu-clean>button{
            width:100%;
            display:flex;
            align-items:center;
            gap:14px;
            padding:14px;
            border:1px solid var(--border);
            border-radius:17px;
            background:var(--surface-2);
            color:var(--text);
            text-align:left;
            transition:.18s ease;
        }

        .account-menu-clean>button:hover{
            border-color:#8064d9;
            transform:translateY(-1px);
        }

        .account-menu-clean>button>span{
            width:45px;
            height:45px;
            flex:0 0 45px;
            display:grid;
            place-items:center;
            border-radius:14px;
            background:var(--surface-3);
            font-size:22px;
        }

        .account-menu-clean strong,
        .account-menu-clean small{
            display:block;
        }

        .account-menu-clean strong{
            font-size:16px;
        }

        .account-menu-clean small{
            margin-top:2px;
            color:var(--muted);
            font-size:12px;
        }

        .profile-detail-grid{
            display:grid;
            gap:10px;
        }

        .profile-detail-grid>div{
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:15px;
            padding:16px;
            border:1px solid var(--border);
            border-radius:15px;
            background:var(--surface-2);
        }

        .profile-detail-grid span{
            color:var(--muted);
        }

        .verified-text{
            color:var(--green)!important;
        }

        .phone-row{
            display:grid;
            grid-template-columns:auto 1fr auto;
            align-items:center;
            gap:8px;
            margin-bottom:13px;
            padding-left:14px;
            border:1px solid var(--border);
            border-radius:15px;
            background:var(--surface);
        }

        .phone-row>span{
            color:var(--muted);
            font-weight:800;
        }

        .phone-row .login-input{
            margin:0;
            border:0;
            box-shadow:none!important;
            background:transparent;
        }

        .otp-button{
            height:43px;
            margin-right:6px;
            padding:0 12px;
            border:0;
            border-radius:11px;
            background:linear-gradient(135deg,var(--purple),var(--blue));
            color:#fff;
            font-size:12px;
            font-weight:900;
        }

        .otp-status{
            margin:-4px 0 14px;
            color:var(--muted);
            font-size:12px;
        }

        .demo-otp-note{
            margin:-5px 0 14px;
            padding:10px 12px;
            border-radius:11px;
            background:var(--green-bg);
            color:var(--green);
            font-size:12px;
            font-weight:800;
        }

        
        .login-mode-switch{
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:7px;
            margin-bottom:20px;
            padding:5px;
            border:1px solid var(--border);
            border-radius:14px;
            background:var(--surface-2);
        }

        .login-mode-switch button{
            min-height:40px;
            border:0;
            border-radius:10px;
            background:transparent;
            color:var(--muted);
            font-size:13px;
            font-weight:900;
        }

        .login-mode-switch button.active{
            background:var(--surface);
            color:var(--text);
            box-shadow:var(--shadow-sm);
        }

.settings-section-clean{
            margin-top:3px;
        }

        .settings-label{
            margin-bottom:10px;
            font-weight:900;
        }

        .theme-options{
            display:grid;
            gap:9px;
        }

        .theme-option{
            min-height:62px;
        }

        .site-notice-overlay{
            position:fixed!important;
            inset:0!important;
            z-index:5000!important;
            display:none;
            align-items:center!important;
            justify-content:center!important;
            padding:20px!important;
            background:rgba(0,0,0,.48)!important;
            backdrop-filter:blur(7px);
            pointer-events:none;
        }

        .site-notice{
            width:min(520px,100%)!important;
            min-height:120px;
            display:flex!important;
            align-items:center;
            gap:16px;
            padding:22px!important;
            border-radius:22px!important;
            background:var(--surface)!important;
            border:1px solid var(--border)!important;
            box-shadow:var(--shadow-lg)!important;
            pointer-events:auto;
        }

        .notice-icon{
            width:50px!important;
            height:50px!important;
            border-radius:15px!important;
            font-size:22px!important;
        }

        .notice-title{
            font-size:17px!important;
        }

        .notice-message{
            font-size:14px!important;
        }

        .notice-close{
            margin-left:auto;
            width:38px;
            height:38px;
            flex:0 0 38px;
            border:1px solid var(--border)!important;
            border-radius:11px;
            background:var(--surface-2)!important;
        }

        @media(max-width:700px){
            .account-modal-clean,
            .account-detail-panel,
            .login-modal-clean{
                padding:20px;
            }

            .account-menu-clean{
                gap:8px;
            }

            .account-menu-clean>button{
                padding:12px;
            }

            .phone-row{
                grid-template-columns:auto 1fr;
            }

            .otp-button{
                grid-column:1 / -1;
                width:100%;
                margin:0 6px 6px 0;
            }

            .site-notice{
                min-height:135px;
                padding:19px!important;
            }
        }
    `;
    document.head.appendChild(style);
})();

/* =====================================================
   STARTUP
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    initialiseTheme();
    createAccountModal();
    createLoginModal();
    createNoticeSystem();
    updateAccountUI();
});
