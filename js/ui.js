/* =====================================================
   GIFTCARDSTORE — UI
   Clean premium mobile-first visual layer
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
   CLEAN VISUAL SYSTEM
===================================================== */

(function () {

    const oldStyle =
        document.getElementById(
            "gcs-clean-ui"
        );

    if (oldStyle) {
        oldStyle.remove();
    }


    const style =
        document.createElement("style");

    style.id =
        "gcs-clean-ui";


    style.textContent = `

/* =====================================================
   GENERAL
===================================================== */

button {
    -webkit-tap-highlight-color: transparent;
}

.overlay {
    padding: 16px !important;
    background: rgba(7,6,11,.82) !important;
    backdrop-filter: blur(10px);
}


/* =====================================================
   HEADER
===================================================== */

.site-header {
    padding: 10px 18px !important;
    min-height: 64px !important;
}

.site-header nav {
    gap: 6px !important;
}

.site-header nav a {
    display: none !important;
}

.site-header .header-action {
    min-height: 40px !important;
    padding: 8px 12px !important;
    border-radius: 12px !important;
    font-size: 12px !important;
}

.cart-header-button {
    display: inline-flex !important;
    align-items: center;
    gap: 5px;
}

.cart-header-button b {
    font-size: 11px;
}

.savings-header-button {
    color: #42d69a !important;
}


/* =====================================================
   HERO
===================================================== */

.hero {
    padding-top: 55px !important;
    padding-bottom: 35px !important;
}

.hero h1 {
    letter-spacing: -1.5px;
}

.hero-mini-stats {
    max-width: 560px;
    margin: 18px auto 0 !important;
    gap: 8px !important;
}

.hero-mini-stats > div {
    padding: 10px !important;
    min-height: 58px;
    border-radius: 14px !important;
}


/* =====================================================
   SEARCH
===================================================== */

.search-box {
    min-height: 52px !important;
    border-radius: 14px !important;
}


/* =====================================================
   CATEGORY BAR
===================================================== */

.catalog-toolbar {
    display: block !important;
}

.catalog-toolbar .categories {
    display: flex !important;
    flex-wrap: wrap;
    gap: 7px !important;
    margin-bottom: 9px !important;
}

.category {
    min-height: 40px !important;
    padding: 8px 15px !important;
    border-radius: 12px !important;
}

.saved-filter-button {
    width: auto !important;
    min-height: 38px !important;
    padding: 7px 13px !important;
}


/* =====================================================
   PRODUCT GRID
===================================================== */

.cards {
    grid-template-columns:
        repeat(auto-fill,minmax(210px,1fr)) !important;

    gap: 14px !important;
}

.cards .card {
    min-height: 285px !important;
    padding: 10px !important;
    border-radius: 18px !important;
    background: rgba(255,255,255,.025) !important;
    border: 1px solid rgba(255,255,255,.07) !important;
    box-shadow: none !important;
    transition: transform .15s ease,
                border-color .15s ease;
}

.cards .card:hover {
    transform: translateY(-2px);
}

.cards .brand-box {
    height: 112px !important;
    flex-basis: 112px !important;
    margin-bottom: 10px !important;
    border-radius: 14px !important;
}

.cards .brand-box img {
    width: 72px !important;
    height: 72px !important;
    object-fit: contain;
}

.cards .brand {
    font-size: 9px !important;
}

.cards .card h3 {
    font-size: 17px !important;
    margin: 5px 0 !important;
}

.cards .discount {
    font-size: 10px !important;
}

.cards .buy {
    min-height: 39px !important;
    border-radius: 11px !important;
}


/* =====================================================
   WISHLIST HEART
===================================================== */

.wishlist-card-button {
    width: 34px !important;
    height: 34px !important;

    position: absolute !important;
    top: 17px !important;
    right: 17px !important;

    display: grid !important;
    place-items: center !important;

    padding: 0 !important;

    border-radius: 10px !important;
    border: 1px solid rgba(255,255,255,.1) !important;

    background: rgba(10,8,15,.72) !important;

    font-size: 18px !important;
}

.wishlist-card-button.active {
    color: #a879ff !important;
}


/* =====================================================
   PRODUCT POPUP
===================================================== */

.product-panel {

    width: min(520px, 100%) !important;

    max-height: 88vh !important;

    overflow-y: auto !important;

    padding: 18px !important;

    border-radius: 22px !important;

    box-sizing: border-box;

}


/* Header */

.product-panel .panel-header {
    margin-bottom: 12px !important;
}

.product-panel .panel-header h2 {
    font-size: 29px !important;
    line-height: 1.05 !important;
    margin: 2px 0 5px !important;
}

.product-panel .panel-header p {
    font-size: 12px !important;
}


/* Brand */

.premium-product-brand {

    min-height: 66px !important;

    margin-bottom: 9px !important;

    padding: 8px 10px !important;

    border-radius: 14px !important;

}

.selected-brand-logo {

    width: 50px !important;
    height: 50px !important;

    flex: 0 0 50px !important;

    border-radius: 11px !important;

}

.selected-brand-logo img {

    width: 38px !important;
    height: 38px !important;

    object-fit: contain;

}

.selected-brand-name {
    font-size: 18px !important;
}

.selected-brand-subtitle {
    font-size: 10px !important;
}


/* Wishlist inside popup */

.wishlist-product-button {

    width: 36px !important;
    height: 36px !important;

    right: 10px !important;

    border-radius: 10px !important;

    font-size: 19px !important;

}


/* Product information */

.product-info-box {

    margin-bottom: 10px !important;

    padding: 8px 10px !important;

    border-radius: 11px !important;

    font-size: 10px !important;

    line-height: 1.4;

}


/* Gift card type */

.product-panel .field-label {

    margin: 9px 0 6px !important;

    font-size: 11px !important;

}

.mode-buttons {

    gap: 7px !important;

    margin-bottom: 9px !important;

}

.mode-button {

    min-height: 54px !important;

    padding: 7px !important;

    border-radius: 12px !important;

}

.mode-button strong {
    font-size: 13px !important;
}

.mode-button small {
    font-size: 9px !important;
}


/* Values */

.fixed-values {

    display: grid !important;

    grid-template-columns:
        repeat(2,minmax(0,1fr));

    gap: 7px !important;

}

.value-button {

    min-height: 62px !important;

    padding: 7px !important;

    border-radius: 12px !important;

}

.value-button strong {
    font-size: 17px !important;
}

.value-button small {
    font-size: 9px !important;
}


/* Preview */

.price-preview {

    margin: 9px 0 !important;

    padding: 9px 11px !important;

    border-radius: 12px !important;

}

.preview-row {

    min-height: 24px !important;

}

.preview-row span {
    font-size: 10px !important;
}

.preview-row strong {
    font-size: 12px !important;
}

.preview-total strong {
    font-size: 18px !important;
}


/* =====================================================
   CART
===================================================== */

.cart-panel,
.checkout-panel,
.orders-panel,
.order-summary-panel {

    width: min(560px,100%) !important;

    max-height: 88vh !important;

    overflow-y: auto !important;

    padding: 18px !important;

    border-radius: 22px !important;

}

.cart-item {

    grid-template-columns: 48px minmax(0,1fr) !important;

    gap: 10px !important;

    padding: 10px !important;

    margin-bottom: 7px !important;

    border-radius: 13px !important;

}

.cart-item-logo {

    width: 48px !important;
    height: 48px !important;

    border-radius: 11px !important;

}

.cart-item-logo img {

    width: 36px !important;
    height: 36px !important;

    object-fit: contain;

}

.cart-item-name {
    font-size: 13px !important;
}

.cart-item-value,
.cart-item-save {
    font-size: 9px !important;
}

.cart-item-price {
    font-size: 11px !important;
}


/* =====================================================
   CHECKOUT
===================================================== */

.checkout-line {

    padding: 8px 0 !important;

}

.checkout-line-name {
    font-size: 11px !important;
}

.checkout-line-meta {
    font-size: 9px !important;
}

.checkout-line-price {
    font-size: 11px !important;
}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width:700px) {

    .site-header {

        padding: 8px 9px !important;

    }

    .site-header .logo {

        font-size: 19px !important;

    }

    .site-header nav {

        gap: 4px !important;

    }

    .site-header .header-action {

        min-height: 38px !important;

        padding: 7px 9px !important;

        font-size: 10px !important;

        border-radius: 10px !important;

    }

    .savings-header-button {

        display: none !important;

    }


    .hero {

        padding-top: 42px !important;

    }

    .hero h1 {

        font-size: 37px !important;

        line-height: 1.03 !important;

    }


    .hero-mini-stats {

        gap: 5px !important;

    }

    .hero-mini-stats > div {

        min-height: 53px;

        padding: 7px 4px !important;

    }

    .hero-mini-stats strong {

        font-size: 14px !important;

    }

    .hero-mini-stats span {

        font-size: 7px !important;

    }


    .catalog-toolbar .categories {

        overflow-x: auto;

        flex-wrap: nowrap !important;

        padding-bottom: 3px;

        scrollbar-width: none;

    }

    .catalog-toolbar .categories::-webkit-scrollbar {

        display:none;

    }

    .category {

        flex: 0 0 auto;

    }


    .cards {

        grid-template-columns:
            repeat(2,minmax(0,1fr)) !important;

        gap: 9px !important;

    }

    .cards .card {

        min-height: 250px !important;

        padding: 8px !important;

        border-radius: 15px !important;

    }

    .cards .brand-box {

        height: 86px !important;

        flex-basis: 86px !important;

        border-radius: 11px !important;

    }

    .cards .brand-box img {

        width: 55px !important;

        height: 55px !important;

    }

    .cards .card h3 {

        font-size: 14px !important;

    }

    .cards .discount {

        font-size: 9px !important;

    }

    .cards .buy {

        min-height: 34px !important;

        font-size: 9px !important;

    }

    .wishlist-card-button {

        top: 12px !important;

        right: 12px !important;

        width: 32px !important;

        height: 32px !important;

    }


    /* Popup */

    .overlay {

        padding: 8px !important;

        align-items: center !important;

    }

    .product-panel,
    .cart-panel,
    .checkout-panel,
    .orders-panel,
    .order-summary-panel {

        width: 100% !important;

        max-width: 520px !important;

        max-height: 88vh !important;

        padding: 14px !important;

        border-radius: 20px !important;

    }

    .product-panel .panel-header h2 {

        font-size: 27px !important;

    }

    .product-panel .panel-header p {

        font-size: 11px !important;

    }

    .premium-product-brand {

        min-height: 61px !important;

    }

    .selected-brand-logo {

        width: 45px !important;

        height: 45px !important;

        flex-basis: 45px !important;

    }

    .selected-brand-logo img {

        width: 33px !important;

        height: 33px !important;

    }

    .selected-brand-name {

        font-size: 16px !important;

    }

    .fixed-values {

        grid-template-columns:
            repeat(2,1fr) !important;

    }

    .value-button {

        min-height: 58px !important;

    }

}


/* =====================================================
   REMOVE UNWANTED SIDE ACCESSIBILITY/SLIDER LOOK
===================================================== */

body > .gcs-side-arrow,
.gcs-side-arrow,
.side-arrow,
.floating-arrow {

    display: none !important;

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
                document.querySelectorAll(
                    ".overlay"
                )
            )
            .filter(function (el) {

                return getComputedStyle(
                    el
                ).display !== "none";

            });

        if (overlays.length) {

            overlays[
                overlays.length - 1
            ].style.display = "none";

        }

    }
);


/* =====================================================
   CLICK OUTSIDE PANEL
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.classList.contains(
                "overlay"
            )
        ) {

            event.target.style.display =
                "none";

        }

    }
);
