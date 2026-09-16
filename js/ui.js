/* =====================================================
   GIFTCARDSTORE — PREMIUM UI SYSTEM
   FULL UI REDESIGN
===================================================== */

window.GCS = window.GCS || {};

GCS.pendingCheckout = false;


/* =====================================================
   OVERLAY CONTROL
===================================================== */

GCS.closeAllOverlays = function () {

    document
        .querySelectorAll(".overlay")
        .forEach(function (overlay) {
            overlay.style.display = "none";
        });

};

window.closeAllOverlays = GCS.closeAllOverlays;


/* =====================================================
   NOTIFICATION
===================================================== */

window.showNotice = function (
    message,
    title = "GiftCardStore",
    type = "info"
) {

    const old =
        document.getElementById("gcsNotice");

    if (old) {
        old.remove();
    }

    const notice =
        document.createElement("div");

    notice.id = "gcsNotice";

    notice.className =
        "gcs-notice " + type;

    notice.innerHTML = `

        <div class="gcs-notice-mark">
            ${
                type === "success"
                    ? "✓"
                    : type === "error"
                        ? "!"
                        : "i"
            }
        </div>

        <div class="gcs-notice-copy">

            <strong>
                ${escapeHTML(title)}
            </strong>

            <span>
                ${escapeHTML(message)}
            </span>

        </div>

        <button
            class="gcs-notice-close"
            onclick="this.parentElement.remove()">
            ×
        </button>

    `;

    document.body.appendChild(notice);

    setTimeout(function () {

        if (notice.parentElement) {
            notice.remove();
        }

    }, 3500);

};


/* =====================================================
   PREMIUM DESIGN SYSTEM
===================================================== */

(function () {

    const old =
        document.getElementById(
            "gcs-premium-ui"
        );

    if (old) {
        old.remove();
    }

    const style =
        document.createElement("style");

    style.id =
        "gcs-premium-ui";

    style.textContent = `

/* =====================================================
   GLOBAL
===================================================== */

* {
    box-sizing: border-box;
}

button,
input,
textarea {
    font: inherit;
}

button {
    -webkit-tap-highlight-color: transparent;
}


/* =====================================================
   HEADER
===================================================== */

.site-header {

    min-height: 72px !important;

    padding:
        10px 28px !important;

    gap: 20px !important;

    background:
        rgba(12,10,20,.94) !important;

    border-bottom:
        1px solid rgba(255,255,255,.08) !important;

    backdrop-filter:
        blur(18px);

}

.site-header .logo {

    font-size:
        25px !important;

    font-weight:
        900 !important;

    letter-spacing:
        -1.2px;

}

.site-header nav {

    gap:
        9px !important;

}

.site-header nav .header-action {

    min-height:
        44px !important;

    padding:
        10px 18px !important;

    border-radius:
        14px !important;

}

#cartButton {

    display:
        inline-flex !important;

    align-items:
        center;

    justify-content:
        center;

    gap:
        7px;

    min-width:
        104px;

}

#cartCount {

    display:
        inline-flex;

    align-items:
        center;

    justify-content:
        center;

}


/* =====================================================
   HERO
===================================================== */

.hero {

    padding-top:
        70px !important;

    padding-bottom:
        46px !important;

}

.hero-actions {

    gap:
        12px !important;

}

.hero-mini-stats {

    width:
        min(610px,100%) !important;

    margin:
        13px auto 0 !important;

    gap:
        8px !important;

}

.hero-mini-stats > div {

    min-height:
        66px;

    display:
        flex;

    flex-direction:
        column;

    justify-content:
        center;

    padding:
        10px 8px !important;

    border:
        1px solid rgba(255,255,255,.08) !important;

    border-radius:
        16px !important;

    background:
        rgba(255,255,255,.035) !important;

}

.hero-mini-stats strong {

    font-size:
        17px !important;

    line-height:
        1.15;

}

.hero-mini-stats span {

    margin-top:
        4px;

    font-size:
        9px !important;

    text-transform:
        uppercase;

    letter-spacing:
        .7px;

}


/* =====================================================
   PRODUCTS SECTION
===================================================== */

.products {

    padding-top:
        42px !important;

}

.section-heading {

    margin-bottom:
        22px !important;

}

.section-heading h2 {

    letter-spacing:
        -.6px;

}


/* =====================================================
   PREMIUM SEARCH
===================================================== */

.search-box {

    position:
        relative;

    min-height:
        58px !important;

    display:
        flex;

    align-items:
        center;

    margin:
        0 auto 15px !important;

    padding:
        0 18px !important;

    border:
        1px solid rgba(255,255,255,.09) !important;

    border-radius:
        17px !important;

    background:
        rgba(255,255,255,.035) !important;

    box-shadow:
        0 8px 30px rgba(0,0,0,.14);

}

.search-box:focus-within {

    border-color:
        rgba(135,90,255,.8) !important;

    box-shadow:
        0 0 0 3px rgba(113,60,243,.10),
        0 12px 35px rgba(0,0,0,.18);

}

.search-box input {

    min-width:
        0;

    width:
        100%;

    border:
        0 !important;

    outline:
        0 !important;

    background:
        transparent !important;

    color:
        var(--text) !important;

}

.search-symbol {

    margin-right:
        10px;

    color:
        var(--muted);

    font-size:
        25px;

}


/* =====================================================
   SEARCH RESULTS
===================================================== */

.search-info {

    margin:
        4px 0 13px;

    color:
        var(--muted);

    font-size:
        13px;

}

.search-info strong {
    color:
        var(--text);
}


/* =====================================================
   CATEGORIES
===================================================== */

.categories {

    gap:
        8px !important;

    margin-bottom:
        24px !important;

    scrollbar-width:
        none;

}

.categories::-webkit-scrollbar {
    display:
        none;
}

.category {

    min-height:
        40px !important;

    padding:
        8px 17px !important;

    border-radius:
        13px !important;

    font-size:
        12px !important;

    font-weight:
        800 !important;

}


/* =====================================================
   BRAND GRID
===================================================== */

.cards {

    display:
        grid !important;

    grid-template-columns:
        repeat(auto-fill,minmax(220px,1fr));

    gap:
        15px !important;

}


/* =====================================================
   PREMIUM BRAND CARD
===================================================== */

.cards .card {

    position:
        relative;

    display:
        flex !important;

    flex-direction:
        column;

    min-width:
        0;

    min-height:
        326px;

    padding:
        12px !important;

    border:
        1px solid rgba(255,255,255,.075) !important;

    border-radius:
        20px !important;

    background:
        linear-gradient(
            145deg,
            rgba(255,255,255,.045),
            rgba(255,255,255,.018)
        ) !important;

    box-shadow:
        0 12px 32px rgba(0,0,0,.14);

    transition:
        transform .18s ease,
        border-color .18s ease,
        box-shadow .18s ease;

    cursor:
        pointer;

}

.cards .card:hover {

    transform:
        translateY(-3px);

    border-color:
        rgba(132,91,255,.45) !important;

    box-shadow:
        0 18px 42px rgba(0,0,0,.22);

}


/* =====================================================
   BRAND LOGO
===================================================== */

.cards .brand-box {

    position:
        relative;

    width:
        100%;

    height:
        125px;

    flex:
        0 0 125px;

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    margin-bottom:
        12px;

    border:
        1px solid rgba(255,255,255,.06);

    border-radius:
        16px;

    background:
        rgba(255,255,255,.045);

    overflow:
        hidden;

}

.cards .brand-box img {

    width:
        82px;

    height:
        82px;

    object-fit:
        contain;

    display:
        block;

}


/* =====================================================
   CARD TEXT
===================================================== */

.cards .brand {

    margin:
        0 !important;

    font-size:
        10px !important;

    font-weight:
        900 !important;

    letter-spacing:
        1px;

    text-transform:
        uppercase;

}

.cards .card h3 {

    margin:
        5px 0 5px !important;

    min-height:
        23px;

    font-size:
        18px !important;

    line-height:
        1.2;

    letter-spacing:
        -.3px;

}

.cards .discount {

    min-height:
        19px;

    margin-bottom:
        12px;

    font-size:
        12px !important;

    font-weight:
        800;

}

.cards .buy {

    width:
        100%;

    min-height:
        43px;

    margin-top:
        auto;

    border-radius:
        12px !important;

}


/* =====================================================
   WISHLIST BUTTON
===================================================== */

.wishlist-card-button {

    position:
        absolute;

    top:
        21px;

    right:
        21px;

    z-index:
        3;

    width:
        40px;

    height:
        40px;

    display:
        grid;

    place-items:
        center;

    border:
        1px solid rgba(255,255,255,.10);

    border-radius:
        12px;

    background:
        rgba(10,9,16,.72);

    color:
        white;

    font-size:
        21px;

    cursor:
        pointer;

    backdrop-filter:
        blur(8px);

}

.wishlist-card-button.active,
.wishlist-product-button.active {

    color:
        #a875ff;

    border-color:
        rgba(168,117,255,.55);

    background:
        rgba(113,60,243,.16);

}


/* =====================================================
   PRODUCT MODAL
===================================================== */

.product-panel {

    width:
        min(620px,100%) !important;

    max-height:
        calc(100vh - 20px);

    overflow-y:
        auto;

    padding:
        20px !important;

    border-radius:
        25px !important;

}

.product-panel .panel-header {

    margin-bottom:
        11px !important;

}

.product-panel .panel-header h2 {

    margin:
        2px 0 4px !important;

    font-size:
        29px !important;

}

.product-panel .panel-header p {

    margin:
        0 !important;

    font-size:
        13px !important;

}


/* =====================================================
   PRODUCT BRAND HEADER
===================================================== */

.selected-brand {

    position:
        relative;

    display:
        flex !important;

    align-items:
        center;

    min-height:
        72px;

    margin-bottom:
        10px !important;

    padding:
        9px 12px !important;

    border:
        1px solid rgba(255,255,255,.08) !important;

    border-radius:
        17px !important;

    background:
        rgba(255,255,255,.035) !important;

}

.selected-brand-logo {

    width:
        57px !important;

    height:
        57px !important;

    flex:
        0 0 57px;

    border-radius:
        13px !important;

}

.selected-brand-name {

    font-size:
        17px !important;

    font-weight:
        900;

}


/* =====================================================
   PRODUCT INFO
===================================================== */

.product-info-box {

    margin:
        8px 0 12px;

    padding:
        10px 12px;

    border:
        1px solid rgba(255,255,255,.07);

    border-radius:
        13px;

    background:
        rgba(255,255,255,.025);

    color:
        var(--muted);

    font-size:
        11px;

    line-height:
        1.45;

}

.product-info-box strong {
    color:
        var(--text);
}


/* =====================================================
   MODE
===================================================== */

.mode-buttons {

    gap:
        8px !important;

    margin-bottom:
        10px !important;

}

.mode-button {

    min-height:
        60px !important;

    padding:
        8px !important;

    border-radius:
        14px !important;

}

.mode-button strong {

    font-size:
        14px !important;

}

.mode-button small {

    font-size:
        10px !important;

}


/* =====================================================
   VALUES
===================================================== */

.fixed-values {

    display:
        grid !important;

    grid-template-columns:
        repeat(2,minmax(0,1fr));

    gap:
        8px !important;

}

.value-button {

    min-height:
        70px !important;

    padding:
        8px !important;

    border-radius:
        14px !important;

}

.value-button strong {

    font-size:
        18px !important;

}

.value-button small {

    font-size:
        10px !important;

}


/* =====================================================
   PRICE PREVIEW
===================================================== */

.price-preview {

    margin-top:
        10px !important;

    padding:
        12px !important;

    border-radius:
        15px !important;

}

.preview-row {

    min-height:
        28px;

}

.preview-total strong {

    font-size:
        20px !important;

}


/* =====================================================
   CART
===================================================== */

.cart-panel {

    width:
        min(650px,100%) !important;

    max-height:
        calc(100vh - 20px);

    overflow-y:
        auto;

    padding:
        20px !important;

    border-radius:
        25px !important;

}

.cart-item {

    display:
        grid;

    grid-template-columns:
        56px minmax(0,1fr);

    gap:
        11px;

    padding:
        11px;

    margin-bottom:
        8px;

    border:
        1px solid rgba(255,255,255,.075);

    border-radius:
        16px;

    background:
        rgba(255,255,255,.025);

}

.cart-item-logo {

    width:
        56px;

    height:
        56px;

    display:
        grid;

    place-items:
        center;

    border-radius:
        13px;

    background:
        rgba(255,255,255,.05);

    overflow:
        hidden;

}

.cart-item-logo img {

    width:
        42px;

    height:
        42px;

    object-fit:
        contain;

}

.cart-item-content {

    min-width:
        0;

}

.cart-item-top {

    display:
        flex;

    justify-content:
        space-between;

    gap:
        8px;

}

.cart-item-name {

    font-size:
        14px;

    font-weight:
        900;

}

.cart-item-value {

    margin-top:
        2px;

    color:
        var(--muted);

    font-size:
        11px;

}

.cart-item-price {

    margin-top:
        4px;

    font-size:
        14px;

    font-weight:
        900;

}

.cart-item-save {

    color:
        #38d996;

    font-size:
        10px;

    font-weight:
        800;

}

.cart-item-controls {

    display:
        flex;

    align-items:
        center;

    gap:
        5px;

    margin-top:
        8px;

}

.qty-button {

    width:
        30px;

    height:
        30px;

    display:
        grid;

    place-items:
        center;

    border:
        1px solid rgba(255,255,255,.10);

    border-radius:
        9px;

    background:
        rgba(255,255,255,.04);

    color:
        var(--text);

}

.qty-number {

    min-width:
        27px;

    text-align:
        center;

    font-size:
        12px;

    font-weight:
        900;

}

.remove-cart {

    margin-left:
        auto;

    border:
        0;

    background:
        transparent;

    color:
        #ff7d8c;

    font-size:
        11px;

}


/* =====================================================
   CART SUMMARY
===================================================== */

.cart-summary {

    margin-top:
        12px;

    padding:
        14px;

    border:
        1px solid rgba(255,255,255,.08);

    border-radius:
        16px;

    background:
        rgba(255,255,255,.025);

}

.cart-summary-row {

    display:
        flex;

    justify-content:
        space-between;

    gap:
        12px;

    padding:
        5px 0;

    color:
        var(--muted);

    font-size:
        12px;

}

.cart-summary-row strong {
    color:
        var(--text);
}

.cart-summary-saving strong {
    color:
        #38d996;
}

.cart-summary-total {

    margin-top:
        7px;

    padding-top:
        11px;

    border-top:
        1px solid rgba(255,255,255,.08);

    color:
        var(--text);

    font-size:
        15px;

}

.cart-summary-total strong {

    font-size:
        20px;

}


/* =====================================================
   CHECKOUT
===================================================== */

.checkout-panel {

    width:
        min(620px,100%) !important;

    max-height:
        calc(100vh - 20px);

    overflow-y:
        auto;

    padding:
        20px !important;

    border-radius:
        25px !important;

}

.checkout-line {

    display:
        flex;

    justify-content:
        space-between;

    gap:
        12px;

    padding:
        10px 0;

    border-bottom:
        1px solid rgba(255,255,255,.06);

}

.checkout-line:last-child {
    border-bottom:
        0;
}

.checkout-line-name {

    font-size:
        13px;

    font-weight:
        800;

}

.checkout-line-meta {

    margin-top:
        2px;

    color:
        var(--muted);

    font-size:
        10px;

}

.checkout-line-price {

    white-space:
        nowrap;

    font-size:
        13px;

    font-weight:
        900;

}

.checkout-totals {

    margin-top:
        12px;

    padding:
        13px;

    border-radius:
        15px;

    background:
        rgba(255,255,255,.035);

}

.checkout-total-row {

    display:
        flex;

    justify-content:
        space-between;

    padding:
        4px 0;

    color:
        var(--muted);

    font-size:
        12px;

}

.checkout-total-row strong {
    color:
        var(--text);
}

.checkout-total-final {

    margin-top:
        7px;

    padding-top:
        9px;

    border-top:
        1px solid rgba(255,255,255,.08);

    color:
        var(--text);

    font-size:
        15px;

}

.checkout-total-final strong {

    font-size:
        19px;

}


/* =====================================================
   ORDER DETAILS
===================================================== */

.order-detail-panel {

    width:
        min(560px,100%) !important;

    padding:
        20px !important;

    border-radius:
        25px !important;

}

.order-detail-brand {

    display:
        flex;

    align-items:
        center;

    gap:
        12px;

    padding:
        12px;

    margin-bottom:
        10px;

    border:
        1px solid rgba(255,255,255,.08);

    border-radius:
        16px;

    background:
        rgba(255,255,255,.03);

}

.order-detail-logo {

    width:
        54px;

    height:
        54px;

    display:
        grid;

    place-items:
        center;

    border-radius:
        13px;

    background:
        rgba(255,255,255,.05);

}

.order-detail-logo img {

    width:
        42px;

    height:
        42px;

    object-fit:
        contain;

}

.order-detail-grid {

    display:
        grid;

    grid-template-columns:
        repeat(2,1fr);

    gap:
        7px;

}

.order-detail-field {

    padding:
        10px;

    border:
        1px solid rgba(255,255,255,.06);

    border-radius:
        13px;

    background:
        rgba(255,255,255,.025);

}

.order-detail-field span {

    display:
        block;

    color:
        var(--muted);

    font-size:
        9px;

    text-transform:
        uppercase;

    letter-spacing:
        .6px;

}

.order-detail-field strong {

    display:
        block;

    margin-top:
        4px;

    font-size:
        13px;

}


/* =====================================================
   ORDERS
===================================================== */

.orders-panel {

    width:
        min(650px,100%) !important;

    max-height:
        calc(100vh - 20px);

    overflow-y:
        auto;

    padding:
        20px !important;

    border-radius:
        25px !important;

}

.order-card {

    padding:
        13px !important;

    margin-bottom:
        8px;

    border:
        1px solid rgba(255,255,255,.075) !important;

    border-radius:
        16px !important;

    background:
        rgba(255,255,255,.025) !important;

}

.order-card-top {

    display:
        flex;

    justify-content:
        space-between;

    gap:
        10px;

    margin-bottom:
        7px;

}

.order-card-brand {

    font-size:
        14px;

    font-weight:
        900;

}

.order-card .status {

    padding:
        4px 8px;

    border-radius:
        8px;

    background:
        rgba(56,217,150,.10);

    color:
        #38d996;

    font-size:
        9px;

    font-weight:
        900;

}

.view-order-button {

    width:
        100%;

    min-height:
        38px;

    margin-top:
        9px;

    border-radius:
        10px;

}


/* =====================================================
   FAQ / TERMS / FEATURE PANELS
===================================================== */

.batch-panel {

    width:
        min(620px,100%) !important;

    max-height:
        calc(100vh - 20px);

    overflow-y:
        auto;

    padding:
        20px !important;

    border-radius:
        25px !important;

}

.faq-list details {

    margin-bottom:
        7px;

    padding:
        12px 13px;

    border:
        1px solid rgba(255,255,255,.07);

    border-radius:
        14px;

    background:
        rgba(255,255,255,.025);

}

.faq-list summary {

    cursor:
        pointer;

    font-size:
        13px;

    font-weight:
        800;

}

.faq-list p {

    margin:
        8px 0 0;

    color:
        var(--muted);

    font-size:
        11px;

    line-height:
        1.55;

}

.legal-content h3 {

    margin:
        15px 0 5px;

    font-size:
        13px;

}

.legal-content p {

    margin:
        0;

    color:
        var(--muted);

    font-size:
        11px;

    line-height:
        1.55;

}


/* =====================================================
   NOTICES
===================================================== */

.gcs-notice {

    position:
        fixed;

    z-index:
        99999;

    left:
        50%;

    bottom:
        18px;

    transform:
        translateX(-50%);

    width:
        min(430px,calc(100% - 24px));

    display:
        flex;

    align-items:
        center;

    gap:
        11px;

    padding:
        12px;

    border:
        1px solid rgba(255,255,255,.10);

    border-radius:
        16px;

    background:
        rgba(25,23,33,.96);

    box-shadow:
        0 18px 50px rgba(0,0,0,.40);

    backdrop-filter:
        blur(18px);

}

.gcs-notice-mark {

    width:
        34px;

    height:
        34px;

    flex:
        0 0 34px;

    display:
        grid;

    place-items:
        center;

    border-radius:
        10px;

    background:
        rgba(113,60,243,.16);

    color:
        #a875ff;

    font-weight:
        900;

}

.gcs-notice-copy {

    min-width:
        0;

    flex:
        1;

}

.gcs-notice-copy strong,
.gcs-notice-copy span {

    display:
        block;

}

.gcs-notice-copy strong {

    font-size:
        12px;

}

.gcs-notice-copy span {

    margin-top:
        2px;

    color:
        var(--muted);

    font-size:
        11px;

}

.gcs-notice-close {

    border:
        0;

    background:
        transparent;

    color:
        var(--muted);

    font-size:
        19px;

}


/* =====================================================
   EMPTY STATES
===================================================== */

.batch-empty,
.empty-orders {

    padding:
        30px 15px;

    text-align:
        center;

}

.batch-empty h3,
.empty-orders h3 {

    margin:
        7px 0 3px;

    font-size:
        17px;

}

.batch-empty p,
.empty-orders p {

    margin:
        0;

    color:
        var(--muted);

    font-size:
        11px;

}


/* =====================================================
   MOBILE
===================================================== */

@media(max-width:700px) {

    .site-header {

        min-height:
            66px !important;

        padding:
            8px 9px !important;

        gap:
            7px !important;

    }

    .site-header .logo {

        max-width:
            205px;

        font-size:
            20px !important;

    }

    .site-header nav {

        gap:
            5px !important;

    }

    .site-header nav .header-action {

        min-height:
            40px !important;

        padding:
            8px 11px !important;

        border-radius:
            12px !important;

        font-size:
            12px !important;

    }

    #cartButton {

        min-width:
            78px;

    }


    .hero {

        padding-top:
            52px !important;

        padding-bottom:
            32px !important;

    }

    .hero-actions {

        gap:
            7px !important;

        margin-top:
            18px !important;

    }

    .hero-actions
    .primary-button,
    .hero-actions
    .secondary-button {

        flex:
            1;

        min-width:
            0;

        padding:
            13px 7px !important;

        font-size:
            12px !important;

    }

    .hero-mini-stats {

        gap:
            5px !important;

        margin-top:
            9px !important;

    }

    .hero-mini-stats > div {

        min-height:
            60px;

        padding:
            7px 3px !important;

        border-radius:
            13px !important;

    }

    .hero-mini-stats strong {

        font-size:
            15px !important;

    }

    .hero-mini-stats span {

        font-size:
            7px !important;

    }


    .products {

        padding-top:
            28px !important;

    }

    .cards {

        grid-template-columns:
            repeat(2,minmax(0,1fr)) !important;

        gap:
            9px !important;

    }

    .cards .card {

        min-height:
            258px;

        padding:
            9px !important;

        border-radius:
            16px !important;

    }

    .cards .brand-box {

        height:
            91px;

        flex-basis:
            91px;

        margin-bottom:
            8px;

        border-radius:
            13px;

    }

    .cards .brand-box img {

        width:
            58px;

        height:
            58px;

    }

    .cards .card h3 {

        margin:
            4px 0 !important;

        min-height:
            19px;

        font-size:
            15px !important;

    }

    .cards .discount {

        min-height:
            16px;

        margin-bottom:
            7px;

        font-size:
            9px !important;

    }

    .cards .buy {

        min-height:
            36px;

        font-size:
            10px;

    }

    .wishlist-card-button {

        top:
            15px;

        right:
            15px;

        width:
            34px;

        height:
            34px;

        font-size:
            18px;

    }


    .product-panel,
    .cart-panel,
    .checkout-panel,
    .orders-panel,
    .batch-panel,
    .order-detail-panel {

        width:
            min(100%,560px) !important;

        max-height:
            calc(100vh - 12px);

        padding:
            15px !important;

        border-radius:
            21px !important;

    }

    .product-panel .panel-header h2 {

        font-size:
            27px !important;

    }

    .fixed-values {

        gap:
            7px !important;

    }

    .value-button {

        min-height:
            65px !important;

    }

    .value-button strong {

        font-size:
            16px !important;

    }

    .order-detail-grid {

        gap:
            6px;

    }

}
`;

    document.head.appendChild(style);

})();


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }

        const overlays =
            Array.from(
                document.querySelectorAll(".overlay")
            );

        for (
            let i = overlays.length - 1;
            i >= 0;
            i--
        ) {

            if (
                getComputedStyle(
                    overlays[i]
                ).display !== "none"
            ) {

                overlays[i].style.display =
                    "none";

                return;

            }

        }

    }
);
