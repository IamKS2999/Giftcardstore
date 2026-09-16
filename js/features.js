/* =====================================================
   GIFTCARDSTORE — PREMIUM FEATURES
   WISHLIST + SAVINGS + REFERRAL + SUPPORT + FAQ + TERMS
===================================================== */

(function () {

    "use strict";


    const REFERRAL_KEY =
        "gcsReferralData";

    const TICKETS_KEY =
        "gcsSupportTickets";


    /* =================================================
       HELPERS
    ================================================= */

    function esc(value) {

        return typeof escapeHTML ===
            "function"

            ? escapeHTML(value)

            : String(value ?? "")
                .replace(/&/g,"&amp;")
                .replace(/</g,"&lt;")
                .replace(/>/g,"&gt;")
                .replace(/"/g,"&quot;")
                .replace(/'/g,"&#039;");

    }


    function user() {

        return typeof getCurrentUser ===
            "function"

            ? getCurrentUser()

            : null;

    }


    function orders() {

        const u =
            user();

        if (
            !u ||
            typeof getOrders !==
            "function"
        ) {

            return [];

        }


        return getOrders()
            .filter(
                function (order) {

                    return (
                        order.email &&
                        order.email.toLowerCase() ===
                        u.email.toLowerCase()
                    );

                }
            );

    }


    function quantity(order) {

        return Math.max(
            1,
            Number(
                order.quantity
            ) || 1
        );

    }


    function number(value) {

        return parseInt(
            String(
                value || ""
            ).replace(
                /\D/g,
                ""
            ),
            10
        ) || 0;

    }


    /* =================================================
       OVERLAY FACTORY
    ================================================= */

    function closeEverything() {

        if (
            typeof GCS !==
            "undefined" &&
            typeof GCS.closeAllOverlays ===
            "function"
        ) {

            GCS.closeAllOverlays();

        } else {

            document
                .querySelectorAll(".overlay")
                .forEach(
                    el =>
                        el.style.display =
                            "none"
                );

        }

    }


    function makeOverlay(
        id,
        title,
        eyebrow,
        subtitle,
        content,
        className = "batch-panel"
    ) {

        closeEverything();

        const old =
            document.getElementById(id);

        if (old) {
            old.remove();
        }


        const overlay =
            document.createElement(
                "div"
            );

        overlay.id =
            id;

        overlay.className =
            "overlay";

        overlay.style.display =
            "flex";


        overlay.innerHTML = `

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
            overlay
        );

        return overlay;

    }


    window.closeBatchOverlay =
        function (id) {

            const element =
                document.getElementById(
                    id
                );

            if (element) {
                element.style.display =
                    "none";
            }

        };


    /* =================================================
       WISHLIST
    ================================================= */

    window.openWishlist =
        function () {

            if (!user()) {

                return openLoginPanel();

            }


            const ids =
                typeof GCS !==
                "undefined"

                    ? GCS.getWishlist()
                    : [];


            const brands =
                ids
                    .map(
                        id =>
                            typeof getBrand ===
                            "function"
                                ? getBrand(id)
                                : null
                    )
                    .filter(Boolean);


            let content;


            if (!brands.length) {

                content = `

                    <div class="batch-empty">

                        <div class="batch-empty-icon">
                            ♡
                        </div>

                        <h3>
                            Your wishlist is empty
                        </h3>

                        <p>
                            Tap the heart on any brand to save it here.
                        </p>

                    </div>

                `;

            } else {

                content = `

                    <div class="wishlist-list">

                        ${brands.map(
                            function (brand) {

                                const active =
                                    typeof GCS !==
                                    "undefined" &&
                                    GCS.isWishlisted(
                                        brand.id
                                    );


                                return `

                                    <div
                                        class="cart-item"
                                        style="cursor:pointer"
                                        onclick="
                                            GCS.openProduct(
                                                '${esc(brand.id)}'
                                            )
                                        ">

                                        <div class="cart-item-logo">

                                            <img
                                                src="${esc(
                                                    brand.logo
                                                )}"
                                                alt="${esc(
                                                    brand.name
                                                )}">

                                        </div>


                                        <div class="cart-item-content">

                                            <div class="cart-item-top">

                                                <div>

                                                    <div class="cart-item-name">
                                                        ${esc(
                                                            brand.name
                                                        )}
                                                    </div>

                                                    <div class="cart-item-value">
                                                        ${esc(
                                                            brand.category
                                                        )}
                                                    </div>

                                                </div>

                                                <button
                                                    class="wishlist-card-button ${
                                                        active
                                                            ? "active"
                                                            : ""
                                                    }"
                                                    style="
                                                        position:static;
                                                        flex:0 0 40px;
                                                    "
                                                    onclick="
                                                        event.stopPropagation();
                                                        GCS.toggleWishlist(
                                                            '${esc(
                                                                brand.id
                                                            )}'
                                                        );
                                                        openWishlist();
                                                    ">

                                                    ♥

                                                </button>

                                            </div>


                                            <div class="cart-item-save">

                                                Up to
                                                ${Math.max(
                                                    brand.fixedDiscount || 0,
                                                    brand.customDiscount || 0
                                                )}% off

                                            </div>

                                        </div>

                                    </div>

                                `;

                            }
                        ).join("")}

                    </div>

                `;

            }


            makeOverlay(
                "wishlistOverlay",
                "Wishlist",
                "Saved",
                "Your saved gift-card brands.",
                content,
                "batch-panel"
            );

        };


    window.openWishlistFromAccount =
        window.openWishlist;


    if (
        typeof GCS !==
        "undefined"
    ) {

        GCS.openWishlist =
            window.openWishlist;

    }


    /* =================================================
       SAVINGS
    ================================================= */

    window.getUserSavings =
        function () {

            const list =
                orders();

            let value = 0;
            let paid = 0;


            list.forEach(
                function (order) {

                    const q =
                        quantity(order);

                    value +=
                        number(
                            order.value
                        ) * q;

                    paid +=
                        number(
                            order.price
                        ) * q;

                }
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
                    list.length

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
                "A clear view of your prototype order savings.",
                `

                    <div class="savings-hero">

                        <span>
                            TOTAL SAVED
                        </span>

                        <strong>
                            ₹${data.saved.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                        <small>
                            Across
                            ${data.orders}
                            order${data.orders === 1 ? "" : "s"}
                        </small>

                    </div>


                    <div class="savings-stats">

                        <div>
                            <span>
                                Gift card value
                            </span>

                            <strong>
                                ₹${data.value.toLocaleString(
                                    "en-IN"
                                )}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Amount paid
                            </span>

                            <strong>
                                ₹${data.paid.toLocaleString(
                                    "en-IN"
                                )}
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

                        Savings are calculated from prototype order records stored on this device.

                    </div>

                `,
                "batch-panel"
            );

        };


    /* =================================================
       GIFT CARDS
    ================================================= */

    window.openGiftCards =
        function () {

            if (!user()) {
                return openLoginPanel();
            }


            const list =
                orders();


            let content;


            if (!list.length) {

                content = `

                    <div class="batch-empty">

                        <div class="batch-empty-icon">
                            🎁
                        </div>

                        <h3>
                            No gift cards yet
                        </h3>

                        <p>
                            Your confirmed prototype orders will appear here.
                        </p>

                    </div>

                `;

            } else {

                content = `

                    <div class="gift-card-grid">

                        ${list.map(
                            function (order) {

                                const brand =
                                    typeof getBrand ===
                                    "function"
                                        ? getBrand(
                                            order.brandId
                                        )
                                        : null;


                                const q =
                                    quantity(
                                        order
                                    );


                                return `

                                    <div class="owned-gift-card">

                                        <div class="owned-gift-logo">

                                            ${
                                                brand?.logo
                                                    ? `
                                                        <img
                                                            src="${esc(
                                                                brand.logo
                                                            )}"
                                                            alt="${esc(
                                                                order.brand
                                                            )}">
                                                      `
                                                    : "🎁"
                                            }

                                        </div>


                                        <div class="owned-gift-info">

                                            <strong>
                                                ${esc(
                                                    order.brand
                                                )}
                                            </strong>

                                            <span>
                                                ${esc(
                                                    order.value
                                                )}
                                                Gift Card
                                                ${
                                                    q > 1
                                                        ? " × " + q
                                                        : ""
                                                }
                                            </span>

                                            <small>
                                                ${esc(
                                                    order.id
                                                )}
                                            </small>

                                        </div>


                                        <div class="owned-gift-status">

                                            ${esc(
                                                order.status ||
                                                "Confirmed"
                                            )}

                                        </div>

                                    </div>

                                `;

                            }
                        ).join("")}

                    </div>

                `;

            }


            makeOverlay(
                "giftCardsOverlay",
                "My Gift Cards",
                "Account",
                "Your gift-card collection.",
                content,
                "batch-panel"
            );

        };


    window.openGiftCardsFromAccount =
        window.openGiftCards;


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
                            .slice(2,8)
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
                "Your prototype referral rewards.",
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
                            ${esc(
                                data.code
                            )}
                        </strong>

                        <button
                            class="secondary-button"
                            onclick="copyReferralCode()">

                            Copy Code

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

                        Prototype tracking only. No real money is issued.

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
                navigator.clipboard
            ) {

                navigator.clipboard
                    .writeText(code);

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
                "Create a support ticket.",
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
                        placeholder="Describe the issue..."></textarea>


                    <button
                        class="wide-primary"
                        onclick="createSupportTicket()">

                        Create Support Ticket

                    </button>


                    <div class="support-contact">

                        Prototype tickets are stored locally on this device.

                    </div>

                `,
                "batch-panel"
            );

        };


    window.createSupportTicket =
        function () {

            const u =
                user();

            if (!u) {
                return;
            }


            const subject =
                document.getElementById(
                    "ticketSubject"
                )?.value.trim();


            const message =
                document.getElementById(
                    "ticketMessage"
                )?.value.trim();


            if (
                !subject ||
                !message
            ) {

                showNotice(
                    "Enter both a subject and message.",
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

                subject:
                    subject,

                message:
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
                "Answers to common questions.",
                `

                    <div class="faq-list">

                        <details open>

                            <summary>
                                How does the discount work?
                            </summary>

                            <p>
                                Select a gift-card value and the prototype calculates the discounted price before checkout.
                            </p>

                        </details>


                        <details>

                            <summary>
                                Can I use a custom value?
                            </summary>

                            <p>
                                Where enabled, custom values can be entered within the range shown by the selected brand.
                            </p>

                        </details>


                        <details>

                            <summary>
                                Where are my gift cards?
                            </summary>

                            <p>
                                Open Account → My Gift Cards after completing a prototype order.
                            </p>

                        </details>


                        <details>

                            <summary>
                                Is this a real payment checkout?
                            </summary>

                            <p>
                                No. This website is currently a prototype and does not process real payments.
                            </p>

                        </details>


                        <details>

                            <summary>
                                How does the wishlist work?
                            </summary>

                            <p>
                                Tap the heart on a brand to save it. Saved brands appear under Account → Wishlist.
                            </p>

                        </details>


                        <details>

                            <summary>
                                How do I contact support?
                            </summary>

                            <p>
                                Open Account → Support and create a support ticket.
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
                "Terms for the current prototype.",
                `

                    <div class="legal-content">

                        <h3>
                            1. Prototype status
                        </h3>

                        <p>
                            GiftCardStore is currently a prototype. No real payment is processed.
                        </p>


                        <h3>
                            2. Gift-card information
                        </h3>

                        <p>
                            Brand names, prices and discounts shown here are demonstration data until live commercial integrations are added.
                        </p>


                        <h3>
                            3. Account information
                        </h3>

                        <p>
                            Account information is stored locally in the browser in this prototype. Do not enter sensitive financial information.
                        </p>


                        <h3>
                            4. Orders
                        </h3>

                        <p>
                            Orders created here are demonstration records and do not represent real purchases.
                        </p>


                        <h3>
                            5. Wishlist and referral features
                        </h3>

                        <p>
                            Wishlist and referral information are prototype records stored locally on the device.
                        </p>


                        <h3>
                            6. Support
                        </h3>

                        <p>
                            Support tickets are stored locally and are not connected to a live support team.
                        </p>

                    </div>

                `,
                "batch-panel"
            );

        };


    /* =================================================
       ACCOUNT WISHLIST BUTTON
    ================================================= */

    function addAccountWishlistButton() {

        const overlay =
            document.getElementById(
                "accountOverlay"
            );

        if (!overlay) {
            return;
        }


        const menu =
            overlay.querySelector(
                ".account-menu-clean"
            );

        if (!menu) {
            return;
        }


        if (
            menu.querySelector(
                ".gcs-saved-account-button"
            )
        ) {
            return;
        }


        const button =
            document.createElement(
                "button"
            );

        button.type =
            "button";

        button.className =
            "gcs-saved-account-button";


        button.innerHTML = `

            <span class="saved-icon">
                ♡
            </span>

            <div>

                <strong>
                    Wishlist
                </strong>

                <small>
                    Saved brands
                </small>

            </div>

        `;


        button.onclick =
            window.openWishlist;


        menu.appendChild(
            button
        );

    }


    document.addEventListener(
        "DOMContentLoaded",
        function () {

            setTimeout(
                addAccountWishlistButton,
                250
            );

        }
    );


})();
