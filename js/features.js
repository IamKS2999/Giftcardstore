/* =====================================================
   GIFTCARDSTORE — BATCH FEATURES
   My Gift Cards + Mobile Account + Referrals + Support
   Savings + FAQ + Terms
===================================================== */

(function () {
    const REFERRAL_KEY = "gcsReferralData";
    const TICKETS_KEY = "gcsSupportTickets";

    function esc(value) {
        return typeof escapeHTML === "function"
            ? escapeHTML(value)
            : String(value ?? "").replace(/[&<>"']/g, function (c) {
                return ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[c];
            });
    }

    function user() {
        return typeof getCurrentUser === "function" ? getCurrentUser() : null;
    }

    function myOrders() {
        const u = user();
        if (!u || typeof getOrders !== "function") return [];
        return getOrders().filter(o => o.email && o.email.toLowerCase() === u.email.toLowerCase());
    }

    function ensureReferral() {
        const u = user();
        if (!u) return null;
        const all = JSON.parse(localStorage.getItem(REFERRAL_KEY) || "{}");
        if (!all[u.email]) {
            all[u.email] = {
                code: "GCS" + Math.random().toString(36).slice(2, 8).toUpperCase(),
                earned: 0,
                referrals: 0
            };
            localStorage.setItem(REFERRAL_KEY, JSON.stringify(all));
        }
        return all[u.email];
    }

    function patchLogin() {
        const email = document.getElementById("loginEmail");
        if (!email || document.getElementById("loginPhone")) return;

        const label = document.createElement("div");
        label.className = "field-label";
        label.textContent = "Mobile number";

        const phone = document.createElement("input");
        phone.className = "login-input";
        phone.id = "loginPhone";
        phone.type = "tel";
        phone.inputMode = "numeric";
        phone.maxLength = 10;
        phone.placeholder = "10-digit mobile number";
        phone.autocomplete = "tel";

        email.parentNode.insertBefore(label, email);
        email.parentNode.insertBefore(phone, email);

        const oldSubmit = window.submitLogin;
        window.submitLogin = function () {
            const name = (document.getElementById("loginName")?.value || "").trim();
            const mail = (email.value || "").trim().toLowerCase();
            const number = (phone.value || "").replace(/\D/g, "");
            const error = document.getElementById("loginError");

            if (!name) {
                error.textContent = "Please enter your name.";
                error.style.display = "block";
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail)) {
                error.textContent = "Please enter a valid email address.";
                error.style.display = "block";
                return;
            }
            if (!/^\d{10}$/.test(number)) {
                error.textContent = "Please enter a valid 10-digit mobile number.";
                error.style.display = "block";
                return;
            }

            saveUser({
                name: name,
                email: mail,
                phone: number,
                createdAt: new Date().toISOString()
            });

            ensureReferral();
            closeLoginPanel();

            showNotice("Welcome, " + name + "!", "Account created", "success");

            if (window.checkoutWaitingForLogin) {
                window.checkoutWaitingForLogin = false;
                setTimeout(function () {
                    if (typeof GCS.openCheckout === "function") GCS.openCheckout();
                }, 180);
            }
        };

        void oldSubmit;
    }

    function makeOverlay(id, title, eyebrow, subtitle, content, className) {
        const old = document.getElementById(id);
        if (old) old.remove();

        const el = document.createElement("div");
        el.id = id;
        el.className = "overlay";
        el.style.display = "flex";
        el.innerHTML = `
            <div class="panel ${className || ""}">
                <div class="panel-header">
                    <div>
                        <div class="panel-eyebrow">${eyebrow}</div>
                        <h2>${title}</h2>
                        <p>${subtitle}</p>
                    </div>
                    <button class="close-button" onclick="closeBatchOverlay('${id}')">×</button>
                </div>
                ${content}
            </div>`;
        document.body.appendChild(el);
        return el;
    }

    window.closeBatchOverlay = function (id) {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    };

    window.openGiftCards = function () {
        if (!user()) return openLoginPanel();

        const orders = myOrders();
        let content = "";

        if (!orders.length) {
            content = `
                <div class="batch-empty">
                    <div class="batch-empty-icon">🎁</div>
                    <h3>No gift cards yet</h3>
                    <p>Your completed prototype gift-card orders will appear here.</p>
                </div>`;
        } else {
            content = `<div class="gift-card-grid">` +
                orders.map(o => {
                    const b = typeof getBrand === "function" ? getBrand(o.brandId) : null;
                    return `
                        <div class="owned-gift-card">
                            <div class="owned-gift-logo">
                                ${b?.logo ? `<img src="${esc(b.logo)}" alt="${esc(o.brand)}">` : "🎁"}
                            </div>
                            <div class="owned-gift-info">
                                <strong>${esc(o.brand)}</strong>
                                <span>${esc(o.value)} Gift Card</span>
                                <small>Order ${esc(o.id)}</small>
                            </div>
                            <div class="owned-gift-status">${esc(o.status || "Confirmed")}</div>
                        </div>`;
                }).join("") + `</div>`;
        }

        makeOverlay(
            "giftCardsOverlay",
            "My Gift Cards",
            "Account",
            "Your gift-card collection from prototype orders.",
            content,
            "batch-panel"
        );
    };

    window.openSavings = function () {
        if (!user()) return openLoginPanel();

        const orders = myOrders();
        const n = s => parseInt(String(s).replace(/\D/g, "")) || 0;
        const value = orders.reduce((a,o) => a + n(o.value), 0);
        const paid = orders.reduce((a,o) => a + n(o.price), 0);
        const saved = Math.max(0, value - paid);

        makeOverlay(
            "savingsOverlay",
            "Your Savings",
            "Savings",
            "See the savings recorded in your prototype orders.",
            `
                <div class="savings-hero">
                    <span>Total saved</span>
                    <strong>₹${saved.toLocaleString("en-IN")}</strong>
                    <small>Across ${orders.length} order${orders.length === 1 ? "" : "s"}</small>
                </div>
                <div class="savings-stats">
                    <div><span>Gift card value</span><strong>₹${value.toLocaleString("en-IN")}</strong></div>
                    <div><span>Amount paid</span><strong>₹${paid.toLocaleString("en-IN")}</strong></div>
                    <div><span>Orders</span><strong>${orders.length}</strong></div>
                    <div><span>Prototype monthly benchmark</span><strong>₹500</strong></div>
                </div>
                <div class="settings-note">The ₹500 benchmark is a prototype display value, not a live market statistic.</div>
            `,
            "batch-panel"
        );
    };

    window.openReferral = function () {
        if (!user()) return openLoginPanel();
        const data = ensureReferral();

        makeOverlay(
            "referralOverlay",
            "Refer & Earn",
            "Rewards",
            "Share your code. The prototype qualifies the reward after a referred customer makes a ₹100+ gift-card order.",
            `
                <div class="referral-code-box">
                    <span>Your referral code</span>
                    <strong id="referralCodeText">${esc(data.code)}</strong>
                    <button class="secondary-button" onclick="copyReferralCode()">Copy code</button>
                </div>
                <div class="savings-stats">
                    <div><span>Successful referrals</span><strong>${data.referrals}</strong></div>
                    <div><span>Rewards earned</span><strong>₹${data.earned}</strong></div>
                </div>
                <div class="settings-note">Prototype tracking only. No real money is issued.</div>
            `,
            "batch-panel"
        );
    };

    window.copyReferralCode = function () {
        const code = document.getElementById("referralCodeText")?.textContent || "";
        if (navigator.clipboard) navigator.clipboard.writeText(code);
        showNotice("Referral code copied.", "Refer & Earn", "success");
    };

    window.openSupport = function () {
        if (!user()) return openLoginPanel();

        makeOverlay(
            "supportOverlay",
            "Support",
            "Help",
            "Create a support ticket for your issue.",
            `
                <label class="field-label">Subject</label>
                <input id="ticketSubject" class="login-input" placeholder="e.g. Gift card issue">
                <label class="field-label">Message</label>
                <textarea id="ticketMessage" class="support-textarea" placeholder="Describe the issue..."></textarea>
                <button class="wide-primary" onclick="createSupportTicket()">Create Support Ticket</button>
                <div class="support-contact">Prototype tickets are stored locally on this device.</div>
            `,
            "batch-panel"
        );
    };

    window.createSupportTicket = function () {
        const u = user();
        const subject = document.getElementById("ticketSubject")?.value.trim();
        const message = document.getElementById("ticketMessage")?.value.trim();

        if (!subject || !message) {
            showNotice("Please enter both a subject and message.", "Support", "error");
            return;
        }

        const tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || "[]");
        tickets.unshift({
            id: "TKT-" + Date.now().toString().slice(-8),
            email: u.email,
            subject: subject,
            message: message,
            status: "Open",
            date: new Date().toLocaleString("en-IN")
        });
        localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));

        closeBatchOverlay("supportOverlay");
        showNotice("Your support ticket has been created.", "Ticket created", "success");
    };

    window.openFaq = function () {
        makeOverlay(
            "faqOverlay",
            "Frequently Asked Questions",
            "Help",
            "Quick answers to common questions.",
            `
                <div class="faq-list">
                    <details open><summary>How does the discount work?</summary><p>Select a gift-card value and the prototype calculates your discounted price before checkout.</p></details>
                    <details><summary>Can I use a custom value?</summary><p>Where enabled, custom values range from ₹100 to ₹10,000.</p></details>
                    <details><summary>Where are my gift cards?</summary><p>Open Account → My Gift Cards after completing a prototype order.</p></details>
                    <details><summary>Is this a real payment checkout?</summary><p>No. This version is a prototype and does not process real payments.</p></details>
                    <details><summary>How does Refer & Earn work?</summary><p>The prototype uses ₹10 as the referral reward and a ₹100 minimum qualifying order.</p></details>
                    <details><summary>How do I contact support?</summary><p>Open Account → Support and create a ticket.</p></details>
                </div>
            `,
            "batch-panel"
        );
    };

    window.openTerms = function () {
        makeOverlay(
            "termsOverlay",
            "Terms & Conditions",
            "Legal",
            "Prototype terms for the current GiftCardStore experience.",
            `
                <div class="legal-content">
                    <h3>1. Prototype status</h3>
                    <p>GiftCardStore is currently a prototype. No real payment is processed.</p>
                    <h3>2. Gift-card information</h3>
                    <p>Brand names, prices and discounts shown here are demonstration data until live commercial integrations are added.</p>
                    <h3>3. Account information</h3>
                    <p>Account information is stored locally in the browser in this prototype. Do not enter sensitive financial information.</p>
                    <h3>4. Orders</h3>
                    <p>Orders created here are demonstration records and do not represent real purchases.</p>
                    <h3>5. Referrals</h3>
                    <p>Referral rewards are prototype records and are not redeemable for cash.</p>
                    <h3>6. Support</h3>
                    <p>Support tickets are stored locally and are not connected to a live support team.</p>
                </div>
            `,
            "batch-panel"
        );
    };

    function patchAccount() {
        const menu = document.querySelector(".account-menu");
        if (!menu || menu.dataset.batchFeatures === "1") return;
        menu.dataset.batchFeatures = "1";

        function add(icon, title, subtitle, fn) {
            const b = document.createElement("button");
            b.innerHTML = `<span>${icon}</span><div><strong>${title}</strong><small>${subtitle}</small></div>`;
            b.onclick = fn;
            menu.appendChild(b);
        }

        add("🎁", "My Gift Cards", "View your gift-card collection", openGiftCards);
        add("💰", "My Savings", "See how much you have saved", openSavings);
        add("🎉", "Refer & Earn", "Earn prototype referral rewards", openReferral);
        add("🎫", "Support", "Create a support ticket", openSupport);
    }

    function patchFooter() {
        const footer = document.querySelector(".footer-inner");
        if (!footer || footer.querySelector(".batch-footer-links")) return;

        const box = document.createElement("div");
        box.className = "batch-footer-links";
        box.innerHTML = `
            <button onclick="openFaq()">FAQ</button>
            <button onclick="openTerms()">Terms & Conditions</button>
            <button onclick="openSupport()">Support</button>
            <button onclick="openReferral()">Refer & Earn</button>`;
        footer.appendChild(box);
    }

    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(function () {
            patchLogin();
            patchAccount();
            patchFooter();
        }, 150);

        const observer = new MutationObserver(function () {
            patchLogin();
            patchAccount();
            patchFooter();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    });
})();
