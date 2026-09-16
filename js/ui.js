/* =====================================================
   GIFTCARDSTORE — PREMIUM UI
   VISUAL REDESIGN v2
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

window.closeAllOverlays =
    GCS.closeAllOverlays;


/* =====================================================
   PREMIUM NOTICE
===================================================== */

window.showNotice = function (
    message,
    title = "GiftCardStore",
    type = "info"
) {

    const old =
        document.getElementById(
            "gcsNotice"
        );

    if (old) {
        old.remove();
    }

    const notice =
        document.createElement("div");

    notice.id =
        "gcsNotice";

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

    document.body.appendChild(
        notice
    );

    setTimeout(
        function () {

            if (
                notice.parentElement
            ) {

                notice.remove();

            }

        },
        3200
    );

};


/* =====================================================
   DESIGN SYSTEM
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
        document.createElement(
            "style"
        );

    style.id =
        "gcs-premium-ui";


    style.textContent = `

/* =====================================================
   GLOBAL
===================================================== */

* {
    box-sizing: border-box;
}

button {
    -webkit-tap-highlight-color: transparent;
}


/* =====================================================
   HEADER
===================================================== */

.site-header {

    min-height: 70px !important;

    padding:
        9px 22px !important;

    background:
        rgba(12,10,18,.96) !important;

    border-bottom:
        1px solid rgba(255,255,255,.07) !important;

    backdrop-filter:
        blur(20px);

}

.site-header .logo {

    font-size:
        24px !important;

    font-weight:
        900 !important;

    letter-spacing:
        -1.3px;

}

.site-header nav {

    gap:
        8px !important;

}

.site-header nav .header-action {

    min-height:
        44px !important;

    padding:
        9px 17px !important;

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

}


/* =====================================================
   HERO
===================================================== */

.hero {

    padding-top:
        65px !important;

    padding-bottom:
        40px !important;

}

.hero-mini-stats {

    width:
        min(600px,100%) !important;

    margin:
        12px auto 0 !important;

    gap:
        8px !important;

}

.hero-mini-stats > div {

    min-height:
        63px;

    display:
        flex;

    flex-direction:
        column;

    justify-content:
        center;

    padding:
        9px !important;

    border:
        1px solid rgba(255,255,255,.07) !important;

    border-radius:
        15px !important;

    background:
        rgba(255,255,255,.028) !important;

}

.hero-mini-stats strong {

    font-size:
        17px !important;

}

.hero-mini-stats span {

    margin-top:
        3px;

    font-size:
        9px !important;

    text-transform:
        uppercase;

    letter-spacing:
        .6px;

}


/* =====================================================
   SEARCH
===================================================== */

.search-box {

    min-height:
        57px !important;

    padding:
        0 17px !important;

    border:
        1px solid rgba(255,255,255,.08) !important;

    border-radius:
        17px !important;

    background:
        rgba(255,255,255,.035) !important;

    box-shadow:
        0 10px 30px rgba(0,0,0,.14);

}

.search-box:focus-within {

    border-color:
        rgba(135,90,255,.7) !important;

    box-shadow:
        0 0 0 3px rgba(113,60,243,.10);

}

.search-symbol {

    color:
        var(--muted);

    font-size:
        24px;

}


/* =====================================================
   CATEGORIES
===================================================== */

.categories {

    gap:
        8px !important;

    margin-bottom:
        20px !important;

}

.category {

    min-height:
        39px !important;

    padding:
        7px 16px !important;

    border-radius:
        13px !important;

    font-size:
        11px !important;

}


/* =====================================================
   BRAND CARDS
===================================================== */

.cards {

    display:
        grid !important;

    grid-template-columns:
        repeat(auto-fill,minmax(220px,1fr));

    gap:
        14px !important;

}

.cards .card {

    position:
        relative;

    min-height:
        315px;

    padding:
        11px !important;

    border:
        1px solid rgba(255,255,255,.075) !important;

    border-radius:
        19px !important;

    background:
        linear-gradient(
            145deg,
            rgba(255,255,255,.045),
            rgba(255,255,255,.015)
        ) !important;

    box-shadow:
        0 12px 32px rgba(0,0,0,.15);

    cursor:
        pointer;

    transition:
        transform .18s ease,
        border-color .18s ease;

}

.cards .card:hover {

    transform:
        translateY(-3px);

    border-color:
        rgba(137,92,255,.42) !important;

}

.cards .brand-box {

    height:
        120px !important;

    flex:
        0 0 120px !important;

    margin-bottom:
        11px !important;

    border-radius:
        15px !important;

    background:
        rgba(255,255,255,.045) !important;

}

.cards .brand-box img {

    width:
        78px !important;

    height:
        78px !important;

    object-fit:
        contain;

}

.cards .brand {

    font-size:
        9px !important;

    letter-spacing:
        1px;

}

.cards .card h3 {

    margin:
        5px 0 4px !important;

    font-size:
        18px !important;

}

.cards .discount {

    margin-bottom:
        5px !important;

    font-size:
        11px !important;

}

.cards .buy {

    min-height:
        42px !important;

    border-radius:
        12px !important;

}


/* =====================================================
   CARD WISHLIST
===================================================== */

.wishlist-card-button {

    position:
        absolute !important;

    top:
        19px !important;

    right:
        19px !important;

    z-index:
        5;

    width:
        37px !important;

    height:
        37px !important;

    padding:
        0 !important;

    display:
        grid !important;

    place-items:
        center !important;

    border:
        1px solid rgba(255,255,255,.12) !important;

    border-radius:
        11px !important;

    background:
        rgba(15,13,22,.82) !important;

    color:
        #e9e6ef !important;

    font-size:
        20px !important;

    line-height:
        1 !important;

    backdrop-filter:
        blur(10px);

}

.wishlist-card-button.active {

    color:
        #b17cff !important;

    border-color:
        rgba(150,100,255,.55) !important;

    background:
        rgba(113,60,243,.16) !important;

}


/* =====================================================
   OVERLAY
===================================================== */

.overlay {

    padding:
        12px !important;

    background:
        rgba(4,3,8,.80) !important;

    backdrop-filter:
        blur(13px);

}


/* =====================================================
   PRODUCT MODAL — NEW PREMIUM SHEET
===================================================== */

.product-panel {

    width:
        min(570px,100%) !important;

    max-height:
        calc(100vh - 24px);

    overflow-y:
        auto;

    padding:
        18px !important;

    border-radius:
        24px !important;

    border:
        1px solid rgba(255,255,255,.09) !important;

    box-shadow:
        0 30px 90px rgba(0,0,0,.48);

}


/* -----------------------------------------------------
   HEADER
----------------------------------------------------- */

.product-panel .panel-header {

    margin-bottom:
        13px !important;

}

.product-panel .panel-header h2 {

    margin:
        2px 0 3px !important;

    font-size:
        30px !important;

    letter-spacing:
        -.9px;

}

.product-panel .panel-header p {

    margin:
        0 !important;

    font-size:
        12px !important;

    line-height:
        1.45;

}


/* -----------------------------------------------------
   BRAND HEADER
----------------------------------------------------- */

.product-panel .selected-brand {

    position:
        relative;

    min-height:
        70px !important;

    margin:
        0 0 12px !important;

    padding:
        8px 11px !important;

    display:
        flex !important;

    align-items:
        center;

    gap:
        11px;

    border:
        1px solid rgba(255,255,255,.075) !important;

    border-radius:
        16px !important;

    background:
        rgba(255,255,255,.028) !important;

}


/* logo */

.product-panel .selected-brand-logo {

    width:
        52px !important;

    height:
        52px !important;

    flex:
        0 0 52px;

    display:
        grid;

    place-items:
        center;

    border:
        1px solid rgba(255,255,255,.07);

    border-radius:
        12px !important;

    background:
        rgba(255,255,255,.04);

    overflow:
        hidden;

}

.product-panel .selected-brand-logo img {

    width:
        39px !important;

    height:
        39px !important;

    object-fit:
        contain;

}


/* brand text */

.product-panel .selected-brand-name {

    font-size:
        18px !important;

    font-weight:
        900;

    line-height:
        1.1;

}

.product-panel .selected-brand-subtitle {

    margin-top:
        3px;

    font-size:
        11px !important;

    color:
        var(--muted);

}


/* -----------------------------------------------------
   WISHLIST — REMOVE UGLY WHITE BUTTON
----------------------------------------------------- */

.product-panel .wishlist-product-button {

    position:
        absolute !important;

    right:
        11px !important;

    top:
        50% !important;

    transform:
        translateY(-50%);

    width:
        39px !important;

    height:
        39px !important;

    padding:
        0 !important;

    display:
        grid !important;

    place-items:
        center !important;

    border:
        1px solid rgba(255,255,255,.11) !important;

    border-radius:
        11px !important;

    background:
        rgba(255,255,255,.035) !important;

    color:
        #e8e4ef !important;

    font-size:
        21px !important;

    line-height:
        1 !important;

    box-shadow:
        none !important;

}

.product-panel .wishlist-product-button.active {

    color:
        #b27cff !important;

    border-color:
        rgba(164,112,255,.60) !important;

    background:
        rgba(113,60,243,.16) !important;

}


/* -----------------------------------------------------
   REMOVE DEBUG-LIKE PRODUCT INFO
----------------------------------------------------- */

.product-info-box {

    margin:
        0 0 13px !important;

    padding:
        9px 11px !important;

    border:
        1px solid rgba(255,255,255,.06) !important;

    border-radius:
        12px !important;

    background:
        rgba(255,255,255,.018) !important;

    color:
        var(--muted);

    font-size:
        10px !important;

    line-height:
        1.4;

}

.product-info-box strong {

    color:
        var(--text);

}


/* -----------------------------------------------------
   GIFT CARD TYPE
----------------------------------------------------- */

.product-panel .field-label {

    margin:
        12px 0 7px !important;

    font-size:
        12px !important;

    font-weight:
        900 !important;

    letter-spacing:
        .1px;

}

.product-panel .mode-buttons {

    display:
        grid !important;

    grid-template-columns:
        repeat(2,1fr);

    gap:
        8px !important;

    margin-bottom:
        10px !important;

}

.product-panel .mode-button {

    min-height:
        55px !important;

    padding:
        7px 10px !important;

    border-radius:
        13px !important;

}

.product-panel .mode-button strong {

    font-size:
        13px !important;

}

.product-panel .mode-button small {

    margin-top:
        2px;

    font-size:
        9px !important;

}


/* -----------------------------------------------------
   DENOMINATIONS
----------------------------------------------------- */

.product-panel .fixed-values {

    display:
        grid !important;

    grid-template-columns:
        repeat(2,1fr);

    gap:
        8px !important;

}

.product-panel .value-button {

    min-height:
        66px !important;

    padding:
        8px !important;

    border:
        1px solid rgba(255,255,255,.075) !important;

    border-radius:
        14px !important;

    background:
        rgba(255,255,255,.018) !important;

}

.product-panel .value-button strong {

    font-size:
        18px !important;

    line-height:
        1.15;

}

.product-panel .value-button small {

    margin-top:
        3px;

    font-size:
        10px !important;

}


/* -----------------------------------------------------
   SELECTED VALUE
----------------------------------------------------- */

.product-panel .value-button.active {

    border:
        1px solid rgba(153,103,255,.9) !important;

    background:
        linear-gradient(
            135deg,
            rgba(113,60,243,.18),
            rgba(65,105,225,.12)
        ) !important;

    box-shadow:
        0 8px 25px rgba(80,50,180,.12);

}


/* -----------------------------------------------------
   CUSTOM AMOUNT
----------------------------------------------------- */

.product-panel .custom-area {

    margin-top:
        8px;

}

.product-panel .amount-input {

    min-height:
        53px !important;

    border-radius:
        13px !important;

}


/* -----------------------------------------------------
   PRICE PREVIEW
----------------------------------------------------- */

.product-panel .price-preview {

    margin:
        10px 0 !important;

    padding:
        11px 13px !important;

    border:
        1px solid rgba(255,255,255,.07) !important;

    border-radius:
        14px !important;

    background:
        rgba(255,255,255,.025) !important;

}

.product-panel .preview-row {

    min-height:
        27px !important;

}

.product-panel .preview-row span {

    font-size:
        11px !important;

}

.product-panel .preview-row strong {

    font-size:
        12px !important;

}

.product-panel .preview-total {

    padding-top:
        7px;

}

.product-panel .preview-total strong {

    font-size:
        20px !important;

}


/* -----------------------------------------------------
   PRIMARY ACTION
----------------------------------------------------- */

.product-panel .wide-primary {

    min-height:
        48px !important;

    margin-top:
        3px;

    border-radius:
        13px !important;

    font-size:
        13px !important;

}


/* =====================================================
   CART
===================================================== */

.cart-panel {

    width:
        min(610px,100%) !important;

    max-height:
        calc(100vh - 24px);

    overflow-y:
        auto;

    padding:
        18px !important;

    border-radius:
        24px !important;

}

.cart-item {

    display:
        grid;

    grid-template-columns:
        54px minmax(0,1fr);

    gap:
        10px;

    padding:
        10px;

    margin-bottom:
        7px;

    border:
        1px solid rgba(255,255,255,.07);

    border-radius:
        15px;

    background:
        rgba(255,255,255,.025);

}

.cart-item-logo {

    width:
        54px;

    height:
        54px;

    border-radius:
        12px;

}

.cart-item-logo img {

    width:
        40px;

    height:
        40px;

    object-fit:
        contain;

}

.cart-item-name {

    font-size:
        13px;

    font-weight:
        900;

}

.cart-item-value {

    font-size:
        10px;

}

.cart-item-price {

    font-size:
        13px;

}

.cart-item-save {

    font-size:
        9px;

}

.cart-item-controls {

    margin-top:
        6px;

}

.qty-button {

    width:
        29px;

    height:
        29px;

    border-radius:
        8px;

}

.remove-cart {

    font-size:
        10px;

}


/* =====================================================
   CART SUMMARY
===================================================== */

.cart-summary {

    margin-top:
        10px;

    padding:
        12px;

    border-radius:
        15px;

}

.cart-summary-row {

    padding:
        4px 0;

    font-size:
        11px;

}

.cart-summary-total {

    font-size:
        14px;

}

.cart-summary-total strong {

    font-size:
        18px;

}


/* =====================================================
   CHECKOUT
===================================================== */

.checkout-panel {

    width:
        min(600px,100%) !important;

    max-height:
        calc(100vh - 24px);

    overflow-y:
        auto;

    padding:
        18px !important;

    border-radius:
        24px !important;

}

.checkout-line {

    padding:
        9px 0;

}

.checkout-line-name {

    font-size:
        12px;

}

.checkout-line-meta {

    font-size:
        9px;

}

.checkout-line-price {

    font-size:
        12px;

}

.checkout-totals {

    padding:
        12px;

    border-radius:
        14px;

}


/* =====================================================
   ORDERS
===================================================== */

.orders-panel {

    width:
        min(620px,100%) !important;

    max-height:
        calc(100vh - 24px);

    overflow-y:
        auto;

    padding:
        18px !important;

    border-radius:
        24px !important;

}

.order-card {

    padding:
        12px !important;

    margin-bottom:
        7px;

    border-radius:
        15px !important;

}

.order-card-top {

    margin-bottom:
        6px;

}

.order-card-brand {

    font-size:
        13px;

}

.order-card .status {

    font-size:
        8px;

}

.view-order-button {

    min-height:
        37px;

    margin-top:
        8px;

    border-radius:
        10px;

    font-size:
        11px;

}


/* =====================================================
   ORDER DETAILS
===================================================== */

.order-detail-panel {

    width:
        min(560px,100%) !important;

    padding:
        18px !important;

    border-radius:
        24px !important;

}

.order-detail-brand {

    padding:
        10px;

    border-radius:
        15px;

}

.order-detail-logo {

    width:
        50px;

    height:
        50px;

}

.order-detail-logo img {

    width:
        38px;

    height:
        38px;

}

.order-detail-grid {

    gap:
        7px;

}

.order-detail-field {

    padding:
        9px;

    border-radius:
        12px;

}

.order-detail-field span {

    font-size:
        8px;

}

.order-detail-field strong {

    font-size:
        12px;

}


/* =====================================================
   FEATURE PANELS
===================================================== */

.batch-panel {

    width:
        min(600px,100%) !important;

    max-height:
        calc(100vh - 24px);

    overflow-y:
        auto;

    padding:
        18px !important;

    border-radius:
        24px !important;

}


/* =====================================================
   FAQ
===================================================== */

.faq-list details {

    margin-bottom:
        6px;

    padding:
        11px 12px;

    border-radius:
        13px;

}

.faq-list summary {

    font-size:
        12px;

}

.faq-list p {

    margin-top:
        7px;

    font-size:
        10px;

}


/* =====================================================
   NOTICE
===================================================== */

.gcs-notice {

    bottom:
        16px;

    width:
        min(410px,calc(100% - 24px));

    padding:
        11px;

    border-radius:
        15px;

}

.gcs-notice-copy strong {

    font-size:
        11px;

}

.gcs-notice-copy span {

    font-size:
        10px;

}


/* =====================================================
   MOBILE
===================================================== */

@media(max-width:700px) {

    .site-header {

        min-height:
            65px !important;

        padding:
            8px 9px !important;

    }

    .site-header .logo {

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
            8px 10px !important;

        border-radius:
            12px !important;

        font-size:
            12px !important;

    }


    .hero {

        padding-top:
            48px !important;

        padding-bottom:
            30px !important;

    }


    .cards {

        grid-template-columns:
            repeat(2,minmax(0,1fr)) !important;

        gap:
            9px !important;

    }

    .cards .card {

        min-height:
            255px;

        padding:
            8px !important;

        border-radius:
            16px !important;

    }

    .cards .brand-box {

        height:
            88px !important;

        flex-basis:
            88px !important;

        margin-bottom:
            8px !important;

        border-radius:
            12px !important;

    }

    .cards .brand-box img {

        width:
            57px !important;

        height:
            57px !important;

    }

    .cards .card h3 {

        font-size:
            14px !important;

    }

    .cards .discount {

        font-size:
            9px !important;

    }

    .cards .buy {

        min-height:
            35px !important;

        font-size:
            9px !important;

    }

    .wishlist-card-button {

        top:
            14px !important;

        right:
            14px !important;

        width:
            33px !important;

        height:
            33px !important;

        font-size:
            18px !important;

    }


    /* -----------------------------------------------
       MOBILE PRODUCT MODAL
    ----------------------------------------------- */

    .product-panel {

        width:
            100% !important;

        max-height:
            calc(100vh - 8px);

        padding:
            14px !important;

        border-radius:
            21px !important;

    }

    .product-panel .panel-header h2 {

        font-size:
            27px !important;

    }

    .product-panel .panel-header p {

        font-size:
            11px !important;

    }


    .product-panel .selected-brand {

        min-height:
            62px !important;

        padding:
            7px 9px !important;

        margin-bottom:
            10px !important;

    }

    .product-panel .selected-brand-logo {

        width:
            46px !important;

        height:
            46px !important;

        flex-basis:
            46px;

    }

    .product-panel .selected-brand-logo img {

        width:
            34px !important;

        height:
            34px !important;

    }

    .product-panel .selected-brand-name {

        font-size:
            16px !important;

    }

    .product-panel .selected-brand-subtitle {

        font-size:
            10px !important;

    }

    .product-panel .wishlist-product-button {

        width:
            35px !important;

        height:
            35px !important;

        font-size:
            19px !important;

    }


    .product-info-box {

        padding:
            8px 9px !important;

        font-size:
            9px !important;

        margin-bottom:
            10px !important;

    }


    .product-panel .field-label {

        margin:
            9px 0 6px !important;

        font-size:
            11px !important;

    }


    .product-panel .mode-button {

        min-height:
            52px !important;

        border-radius:
            12px !important;

    }


    .product-panel .fixed-values {

        gap:
            7px !important;

    }

    .product-panel .value-button {

        min-height:
            62px !important;

        border-radius:
            13px !important;

    }

    .product-panel .value-button strong {

        font-size:
            17px !important;

    }

    .product-panel .value-button small {

        font-size:
            9px !important;

    }


    .product-panel .price-preview {

        padding:
            9px 11px !important;

        margin:
            8px 0 !important;

    }


    .product-panel .wide-primary {

        min-height:
            45px !important;

    }


    .cart-panel,
    .checkout-panel,
    .orders-panel,
    .batch-panel,
    .order-detail-panel {

        width:
            100% !important;

        max-height:
            calc(100vh - 8px);

        padding:
            14px !important;

        border-radius:
            21px !important;

    }

}

`;

    document.head.appendChild(
        style
    );

})();


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !==
            "Escape"
        ) {
            return;
        }


        const overlays =
            Array.from(
                document.querySelectorAll(
                    ".overlay"
                )
            );


        for (
            let i =
                overlays.length - 1;

            i >= 0;

            i--
        ) {

            if (
                getComputedStyle(
                    overlays[i]
                ).display !==
                "none"
            ) {

                overlays[i].style.display =
                    "none";

                return;

            }

        }

    }
);


/* =====================================================
   OUTSIDE CLICK
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.classList
                .contains("overlay")
        ) {

            event.target.style.display =
                "none";

        }

    }
);
