/* =====================================================
   GIFTCARDSTORE — FEATURES
   BATCH UPGRADE 3–10
===================================================== */

(function () {

    "use strict";


    const REFERRAL_KEY =
        "gcsReferralData";

    const TICKETS_KEY =
        "gcsSupportTickets";


    function esc(value) {

        return typeof escapeHTML === "function"
            ? escapeHTML(value)
            : String(value ?? "")
                .replace(/[&<>"']/g, function (c) {
                    return {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#039;"
                    }[c];
                });

    }


    function user() {

        return typeof getCurrentUser === "function"
            ? getCurrentUser()
            : null;

    }


    function myOrders() {

        const u =
            user();

        if (
            !u ||
            typeof getOrders !== "function"
        ) {
            return [];
        }


        return getOrders().filter(
            function (o) {

                return (
                    o.email &&
                    o.email.toLowerCase() ===
                    u.email.toLowerCase()
                );

            }
        );

    }


    /* =================================================
       REFERRAL
    ================================================= */

    window.ensureReferralForUser =
        function () {

            const u =
                user();

            if (!u) {
                return null;
            }


            const all =
                JSON.parse(
                    localStorage.getItem(
                        REFERRAL_KEY
                    ) || "{}"
                );


            if (!all[u.email]) {

                all[u.email] = {

                    code:
                        "GCS" +
                        Math.random()
                            .toString(36)
                            .slice(2, 8)
                            .toUpperCase(),

                    earned:
                        0,

                    referrals:
                        0

                };


                localStorage.setItem(
                    REFERRAL_KEY,
                    JSON.stringify(all)
                );

            }


            return all[u.email];

        };


    /* =================================================
       OVERLAY
    ================================================= */

    function closeEverything() {

        if (
            typeof closeAllOverlays ===
            "function"
        ) {

            closeAllOverlays();

        } else {

            document
                .querySelectorAll(".overlay")
                .forEach(function (el) {
                    el.style.display = "none";
                });

        }

    }


    function makeOverlay(
        id,
        title,
        eyebrow,
        subtitle,
        content,
        className = ""
    ) {

        closeEverything();


        const old =
            document.getElementById(id);

        if (old) {
            old.remove();
        }


        const el =
            document.createElement("div");


        el.id =
            id;

        el.className =
            "overlay";

        el.style.display =
            "flex";


        el.innerHTML = `

            <div class="panel ${className}">

                <div class="panel-header">

                    <div>

                        <div class="panel-eyebrow">
                            ${esc(eyebrow)}
                        </div>

                        <h2>
                            ${esc(title)}
                        </h2>

                        <p>
                            ${esc(subtitle)}
                        </p>

                    </div>

                    <button
                        class="close-button"
                        onclick="closeBatchOverlay('${id}')">
                        ×
                    </button>

                </div>

                ${content}

            </div>

        `;


        document.body.appendChild(
            el
        );


        return el;

    }


    window.closeBatchOverlay =
        function (id) {

            const el =
                document.getElementById(id);

            if (el) {
                el.style.display =
                    "none";
            }

        };


    /* =================================================
       MY GIFT CARDS
    ================================================= */

    window.openGiftCards =
        function () {

            if (!user()) {
                return openLoginPanel();
            }


            const orders =
                myOrders();


            let content;


            if (!orders.length) {

                content = `

                    <div class="batch-empty">

                        <div class="batch-empty-icon">
                            🎁
                        </div>

                        <h3>
                            No gift cards yet
                        </h3>

                        <p>
                            Your completed prototype
                            gift-card orders will appear here.
                        </p>

                    </div>

                `;

            } else {

                content = `

                    <div class="gift-card-grid">

                        ${orders.map(function (o) {

                            const b =
                                typeof getBrand === "function"
                                    ? getBrand(o.brandId)
                                    : null;


                            return `

                                <div class="owned-gift-card">

                                    <div class="owned-gift-logo">

                                        ${b?.logo
                                            ? `
                                                <img
                                                    src="${esc(b.logo)}"
                                                    alt="${esc(o.brand)}">
                                              `
                                            : "🎁"}

                                    </div>


                                    <div class="owned-gift-info">

                                        <strong>
                                            ${esc(o.brand)}
                                        </strong>

                                        <span>
                                            ${esc(o.value)}
                                            Gift Card
                                        </span>

                                        <small>
                                            Order ${esc(o.id)}
                                        </small>

                                    </div>


                                    <div class="owned-gift-status">
                                        ${esc(
                                            o.status ||
                                            "Confirmed"
                                        )}
                                    </div>

                                </div>

                            `;

                        }).join("")}

                    </div>

                `;

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


    window.openGiftCardsFromAccount =
        window.openGiftCards;


    /* =================================================
       SAVINGS
    ================================================= */

    window.getUserSavings =
        function () {

            const orders =
                myOrders();


            const n =
                function (s) {

                    return parseInt(
                        String(s || "")
                            .replace(/\D/g, ""),
                        10
                    ) || 0;

                };


            const value =
                orders.reduce(
                    (a, o) =>
                        a + n(o.value),
                    0
                );


            const paid =
                orders.reduce(
                    (a, o) =>
                        a + n(o.price),
                    0
                );


            return {

                saved:
                    Math.max(
                        0,
                        value - paid
                    ),

                value,

                paid,

                orders:
                    orders.length

            };

        };


    window.openSavings =
        function () {

            if (!user()) {
                return openLoginPanel();
            }


            const data =
                getUserSavings();


            makeOverlay(
                "savingsOverlay",
                "Your Savings",
                "Savings",
                "A simple view of what your prototype orders have saved.",
                `

                    <div class="savings-hero">

                        <span>
                            Total saved
                        </span>

                        <strong>
                            ₹${data.saved.toLocaleString("en-IN")}
                        </strong>

                        <small>
                            Across ${data.orders}
                            order${data.orders === 1 ? "" : "s"}
                        </small>

                    </div>


                    <div class="savings-stats">

                        <div>
                            <span>
                                Gift card value
                            </span>

                            <strong>
                                ₹${data.value.toLocaleString("en-IN")}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Amount paid
                            </span>

                            <strong>
                                ₹${data.paid.toLocaleString("en-IN")}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Orders
                            </span>

                            <strong>
                                ${data.orders}
                            </strong>
                        </div>

                    </div>


                    <div class="settings-note">
                        Savings are calculated from
                        prototype order records stored
                        on this device.
                    </div>

                `,
                "batch-panel"
            );

        };


    /* =================================================
       WISHLIST ACCOUNT ACCESS
    ================================================= */

    window.openWishlistPanel =
        function () {

            if (!user()) {
                return openLoginPanel();
            }


            if (
                typeof GCS.openWishlist ===
                "function"
            ) {

                GCS.openWishlist();

            }

        };


    function addWishlistToAccount() {

        const menu =
            document.querySelector(
                ".account-menu-clean"
            );


        if (!menu) {
            return;
        }


        if (
            menu.querySelector(
                "[data-gcs-wishlist]"
            )
        ) {
            return;
        }


        const button =
            document.createElement(
                "button"
            );


        button.setAttribute(
            "data-gcs-wishlist",
            "true"
        );


        button.innerHTML = `

            <span class="account-menu-icon">
                ♡
            </span>

            <span>
                <strong>Wishlist</strong>
                <small>Saved brands</small>
            </span>

        `;


        button.onclick =
            function () {

                if (
                    typeof closeAccountPanel ===
                    "function"
                ) {
                    closeAccountPanel();
                }

                GCS.openWishlist();

            };


        menu.appendChild(
            button
        );

    }


    /* =================================================
       REFER & EARN
    ================================================= */

    window.openReferral =
        function () {

            if (!user()) {
                return openLoginPanel();
            }


            const data =
                ensureReferralForUser();


            makeOverlay(
                "referralOverlay",
                "Refer & Earn",
                "Rewards",
                "Share your code and earn a prototype reward when a referral qualifies.",
                `

                    <div class="referral-reward-hero">

                        <span>
                            YOU EARN
                        </span>

                        <strong>
                            ₹10
                        </strong>

                        <small>
                            per successful referral
                        </small>

                    </div>


                    <div class="referral-code-box">

                        <span>
                            Your referral code
                        </span>

                        <strong id="referralCodeText">
                            ${esc(data.code)}
                        </strong>

                        <button
                            class="secondary-button"
                            onclick="copyReferralCode()">
                            Copy code
                        </button>

                    </div>


                    <div class="savings-stats">

                        <div>
                            <span>
                                Successful referrals
                            </span>

                            <strong>
                                ${data.referrals}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Rewards earned
                            </span>

                            <strong>
                                ₹${data.earned}
                            </strong>
                        </div>

                    </div>


                    <div class="settings-note">
                        Prototype tracking only.
                        No real money is issued.
                    </div>

                `,
                "batch-panel"
            );

        };


    window.copyReferralCode =
        function () {

            const code =
                document.getElementById(
                    "referralCodeText"
                )?.textContent || "";


            if (
                navigator.clipboard &&
                navigator.clipboard.writeText
            ) {

                navigator.clipboard.writeText(
                    code
                );

            }


            showNotice(
                "Referral code copied.",
                "Refer & Earn",
                "success"
            );

        };


    /* =================================================
       SUPPORT
    ================================================= */

    window.openSupport =
        function () {

            if (!user()) {
                return openLoginPanel();
            }


            makeOverlay(
                "supportOverlay",
                "Support",
                "Help",
                "Create a support ticket for your issue.",
                `

                    <label class="field-label">
                        Subject
                    </label>

                    <input
                        id="ticketSubject"
                        class="login-input"
                        placeholder="e.g. Gift card issue">


                    <label class="field-label">
                        Message
                    </label>

                    <textarea
                        id="ticketMessage"
                        class="support-textarea"
                        placeholder="Describe the issue...">
                    </textarea>


                    <button
                        class="wide-primary"
                        onclick="createSupportTicket()">
                        Create Support Ticket
                    </button>


                    <div class="support-contact">
                        Prototype tickets are stored locally
                        on this device.
                    </div>

                `,
                "batch-panel"
            );

        };


    window.createSupportTicket =
        function () {

            const u =
                user();


            const subject =
                document
                    .getElementById(
                        "ticketSubject"
                    )
                    ?.value
                    .trim();


            const message =
                document
                    .getElementById(
                        "ticketMessage"
                    )
                    ?.value
                    .trim();


            if (!subject || !message) {

                showNotice(
                    "Please enter both a subject and message.",
                    "Support",
                    "error"
                );

                return;

            }


            const tickets =
                JSON.parse(
                    localStorage.getItem(
                        TICKETS_KEY
                    ) || "[]"
                );


            tickets.unshift({

                id:
                    "TKT-" +
                    Date.now()
                        .toString()
                        .slice(-8),

                email:
                    u.email,

                subject,

                message,

                status:
                    "Open",

                date:
                    new Date()
                        .toLocaleString(
                            "en-IN"
                        )

            });


            localStorage.setItem(
                TICKETS_KEY,
                JSON.stringify(tickets)
            );


            closeBatchOverlay(
                "supportOverlay"
            );


            showNotice(
                "Your support ticket has been created.",
                "Ticket created",
                "success"
            );

        };


    /* =================================================
       FAQ
    ================================================= */

    window.openFaq =
        function () {

            makeOverlay(
                "faqOverlay",
                "Frequently Asked Questions",
                "Help",
                "Quick answers to common questions.",
                `

                    <div class="faq-list">

                        <details open>
                            <summary>
                                How does the discount work?
                            </summary>

                            <p>
                                Select a gift-card value and
                                the prototype calculates your
                                discounted price before checkout.
                            </p>
                        </details>


                        <details>
                            <summary>
                                Can I use a custom value?
                            </summary>

                            <p>
                                Where enabled, custom values
                                range from ₹100 to ₹10,000.
                            </p>
                        </details>


                        <details>
                            <summary>
                                Can I add multiple gift cards?
                            </summary>

                            <p>
                                Yes. Add different gift cards
                                to your cart and review them
                                together before checkout.
                            </p>
                        </details>


                        <details>
                            <summary>
                                Where are my gift cards?
                            </summary>

                            <p>
                                Open Account → My Gift Cards
                                after completing a prototype order.
                            </p>
                        </details>


                        <details>
                            <summary>
                                Is this a real payment checkout?
                            </summary>

                            <p>
                                No. This version is a prototype
                                and does not process real payments.
                            </p>
                        </details>


                        <details>
                            <summary>
                                How does Refer & Earn work?
                            </summary>

                            <p>
                                The prototype displays ₹10 for
                                each successful referral.
                                No real money is issued.
                            </p>
                        </details>


                        <details>
                            <summary>
                                How do I contact support?
                            </summary>

                            <p>
                                Open Account → Support and
                                create a ticket.
                            </p>
                        </details>

                    </div>

                `,
                "batch-panel"
            );

        };


    /* =================================================
       TERMS
    ================================================= */

    window.openTerms =
        function () {

            makeOverlay(
                "termsOverlay",
                "Terms & Conditions",
                "Legal",
                "Prototype terms for the current GiftCardStore experience.",
                `

                    <div class="legal-content">

                        <h3>
                            1. Prototype status
                        </h3>

                        <p>
                            GiftCardStore is currently a prototype.
                            No real payment is processed.
                        </p>


                        <h3>
                            2. Gift-card information
                        </h3>

                        <p>
                            Brand names, prices and discounts shown
                            here are demonstration data until live
                            commercial integrations are added.
                        </p>


                        <h3>
                            3. Account information
                        </h3>

                        <p>
                            Account information is stored locally
                            in the browser in this prototype.
                            Do not enter sensitive financial information.
                        </p>


                        <h3>
                            4. Orders
                        </h3>

                        <p>
                            Orders created here are demonstration
                            records and do not represent real purchases.
                        </p>


                        <h3>
                            5. Referrals
                        </h3>

                        <p>
                            Referral rewards are prototype records
                            and are not redeemable for cash.
                        </p>


                        <h3>
                            6. Support
                        </h3>

                        <p>
                            Support tickets are stored locally and
                            are not connected to a live support team.
                        </p>

                    </div>

                `,
                "batch-panel"
            );

        };


    /* =================================================
       FEATURE CSS
    ================================================= */

    const style =
        document.createElement(
            "style"
        );


    style.id =
        "gcs-feature-upgrade-styles";


    style.textContent = `

        .card{
            position:relative;
        }

        .brand-box{
            position:relative;
        }

        .card-wishlist{
            position:absolute;
            top:10px;
            right:10px;
            width:37px;
            height:37px;
            display:grid;
            place-items:center;
            border:1px solid rgba(255,255,255,.15);
            border-radius:12px;
            background:rgba(10,10,15,.68);
            backdrop-filter:blur(8px);
            color:#fff;
            font-size:19px;
            cursor:pointer;
        }

        .card-wishlist.active{
            color:#fff;
            background:linear-gradient(135deg,#713cf3,#4169e1);
            border-color:transparent;
        }

        .wishlist-cards{
            margin-top:5px;
        }

        .account-menu-icon{
            width:38px;
            height:38px;
            display:grid;
            place-items:center;
            flex:0 0 38px;
            border-radius:12px;
            background:var(--surface-3);
            font-size:19px;
        }

    `;


    document.head.appendChild(
        style
    );


    /* =================================================
       START FEATURE PATCH
    ================================================= */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            setTimeout(
                function () {

                    if (
                        typeof ensureReferralForUser ===
                        "function" &&
                        user()
                    ) {
                        ensureReferralForUser();
                    }


                    addWishlistToAccount();


                    if (
                        typeof GCS.updateCartUI ===
                        "function"
                    ) {
                        GCS.updateCartUI();
                    }

                },
                500
            );

        }
    );


})();
