/* =====================================================
   GIFTCARDSTORE — UI POLISH
   HEADER + HERO + BRAND GRID
   VERSION: 2026-09-16-LAYOUT-POLISH
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
   NOTIFICATIONS
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

    notice.id =
        "gcsNotice";

    notice.className =
        "gcs-notice " + type;

    notice.innerHTML = `

        <div class="gcs-notice-icon">
            ${
                type === "success"
                    ? "✓"
                    : type === "error"
                        ? "!"
                        : "i"
            }
        </div>

        <div class="gcs-notice-content">

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

            if (notice.parentElement) {
                notice.remove();
            }

        },
        3200
    );

};


/* =====================================================
   LAYOUT CSS
===================================================== */

(function () {

    const old =
        document.getElementById(
            "gcs-layout-polish"
        );

    if (old) {
        old.remove();
    }

    const style =
        document.createElement(
            "style"
        );

    style.id =
        "gcs-layout-polish";

    style.textContent = `


        /* =================================================
           HEADER
        ================================================= */

        .site-header {

            display:
                flex !important;

            align-items:
                center;

            justify-content:
                space-between;

            gap:
                22px;

        }


        .site-header .logo {

            flex:
                0 1 auto;

            min-width:
                0;

            white-space:
                nowrap;

        }


        .site-header nav {

            display:
                flex !important;

            align-items:
                center;

            justify-content:
                flex-end;

            gap:
                10px;

            min-width:
                0;

        }


        .site-header
        nav .header-action {

            flex:
                0 0 auto;

            white-space:
                nowrap;

        }


        /* Cart spacing */

        #cartButton {

            margin-left:
                2px;

            margin-right:
                2px;

        }


        #cartCount {

            margin-left:
                3px;

        }


        /* =================================================
           HERO
        ================================================= */

        .hero {

            padding-bottom:
                38px !important;

        }


        .hero-actions {

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            gap:
                14px !important;

            margin-top:
                24px !important;

        }


        .hero-actions
        .primary-button,
        .hero-actions
        .secondary-button {

            min-width:
                0;

            flex:
                0 1 325px;

            text-align:
                center;

            white-space:
                nowrap;

        }


        .hero-mini-stats {

            margin:
                10px auto 0 !important;

        }


        /* =================================================
           BRANDS SECTION
        ================================================= */

        .products {

            padding-top:
                42px !important;

        }


        .section-heading {

            margin-bottom:
                24px !important;

        }


        .cards {

            display:
                grid !important;

            grid-template-columns:
                repeat(
                    auto-fill,
                    minmax(215px, 1fr)
                );

            gap:
                16px !important;

            align-items:
                stretch;

        }


        /* Individual brand card */

        .cards .card {

            display:
                flex !important;

            flex-direction:
                column;

            min-width:
                0;

            min-height:
                315px;

            padding:
                15px !important;

            border-radius:
                20px !important;

        }


        /* Logo area */

        .cards .brand-box {

            width:
                100%;

            height:
                118px;

            flex:
                0 0 118px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            margin-bottom:
                12px;

            border-radius:
                16px;

            overflow:
                hidden;

        }


        .cards .brand-box img {

            width:
                76px;

            height:
                76px;

            object-fit:
                contain;

            display:
                block;

        }


        /* Category */

        .cards .brand {

            margin-top:
                0 !important;

            font-size:
                11px !important;

            line-height:
                1.2;

            letter-spacing:
                .4px;

        }


        /* Brand name */

        .cards .card h3 {

            margin:
                5px 0 7px !important;

            min-height:
                23px;

            font-size:
                18px !important;

            line-height:
                1.25;

        }


        /* Discount */

        .cards .discount {

            min-height:
                20px;

            margin-bottom:
                12px;

            font-size:
                12px !important;

        }


        /* Buy button */

        .cards .buy {

            width:
                100%;

            margin-top:
                auto;

            min-height:
                42px;

            border-radius:
                12px;

        }


        /* =================================================
           SEARCH
        ================================================= */

        .search-box {

            margin-bottom:
                14px !important;

        }


        .categories {

            display:
                flex;

            gap:
                8px !important;

            margin-bottom:
                22px !important;

            overflow-x:
                auto;

            padding-bottom:
                3px;

            scrollbar-width:
                none;

        }


        .categories::-webkit-scrollbar {
            display:
                none;
        }


        .category {

            flex:
                0 0 auto;

            white-space:
                nowrap;

        }


        /* =================================================
           PURCHASE MODAL
        ================================================= */

        .product-panel {

            width:
                min(680px,100%) !important;

            max-height:
                calc(100vh - 24px);

            overflow-y:
                auto;

            padding:
                22px !important;

            border-radius:
                24px !important;

        }


        .product-panel .fixed-values {

            display:
                grid !important;

            grid-template-columns:
                repeat(2,minmax(0,1fr));

            gap:
                8px !important;

        }


        .product-panel
        .fixed-values
        .value-button {

            min-height:
                72px;

        }


        /* =================================================
           ACCOUNT
        ================================================= */

        .account-modal-clean {

            width:
                min(650px,100%) !important;

            max-height:
                calc(100vh - 24px);

            overflow-y:
                auto;

            padding:
                21px !important;

            border-radius:
                24px !important;

        }


        .gcs-account-overview {

            display:
                grid;

            grid-template-columns:
                repeat(3,1fr);

            gap:
                7px;

            margin:
                0 0 10px;

        }


        .gcs-account-stat {

            min-width:
                0;

            padding:
                10px 7px;

            text-align:
                center;

            border:
                1px solid var(--border);

            border-radius:
                14px;

            background:
                var(--surface-2);

        }


        .gcs-account-stat span {

            display:
                block;

            color:
                var(--muted);

            font-size:
                9px;

            font-weight:
                900;

            letter-spacing:
                .5px;

        }


        .gcs-account-stat strong {

            display:
                block;

            margin-top:
                3px;

            font-size:
                18px;

        }


        .gcs-account-stat.saved strong {

            color:
                var(--purple);

        }


        .gcs-saved-account-button {

            width:
                100%;

            display:
                flex;

            align-items:
                center;

            gap:
                11px;

            min-height:
                58px;

            padding:
                9px 11px;

            margin-top:
                7px;

            border:
                1px solid var(--border);

            border-radius:
                15px;

            background:
                var(--surface-2);

            color:
                var(--text);

            text-align:
                left;

        }


        .gcs-saved-account-button
        .saved-icon {

            width:
                39px;

            height:
                39px;

            display:
                grid;

            place-items:
                center;

            flex:
                0 0 39px;

            border-radius:
                11px;

            background:
                rgba(113,60,243,.12);

            font-size:
                19px;

        }


        .gcs-saved-account-button strong {

            display:
                block;

            font-size:
                14px;

        }


        .gcs-saved-account-button small {

            display:
                block;

            margin-top:
                2px;

            color:
                var(--muted);

            font-size:
                10px;

        }


        /* =================================================
           NOTIFICATIONS
        ================================================= */

        .gcs-notice {

            position:
                fixed;

            z-index:
                9999;

            left:
                50%;

            bottom:
                20px;

            transform:
                translateX(-50%);

            width:
                min(440px,calc(100% - 28px));

            display:
                flex;

            align-items:
                center;

            gap:
                12px;

            padding:
                14px;

            border:
                1px solid var(--border);

            border-radius:
                17px;

            background:
                var(--surface);

            box-shadow:
                0 18px 55px rgba(0,0,0,.35);

        }


        .gcs-notice-icon {

            width:
                35px;

            height:
                35px;

            flex:
                0 0 35px;

            display:
                grid;

            place-items:
                center;

            border-radius:
                11px;

            background:
                rgba(113,60,243,.18);

            color:
                var(--purple);

            font-weight:
                900;

        }


        .gcs-notice-content {

            min-width:
                0;

            flex:
                1;

        }


        .gcs-notice-content strong,
        .gcs-notice-content span {

            display:
                block;

        }


        .gcs-notice-content strong {

            font-size:
                13px;

        }


        .gcs-notice-content span {

            margin-top:
                3px;

            color:
                var(--muted);

            font-size:
                12px;

            white-space:
                pre-line;

        }


        .gcs-notice-close {

            width:
                30px;

            height:
                30px;

            border:
                0;

            background:
                transparent;

            color:
                var(--muted);

            font-size:
                20px;

        }


        /* =================================================
           MOBILE
        ================================================= */

        @media(max-width:700px) {


            /* ---------- HEADER ---------- */

            .site-header {

                gap:
                    8px !important;

                padding-left:
                    10px !important;

                padding-right:
                    10px !important;

            }


            .site-header .logo {

                flex:
                    1 1 auto;

                min-width:
                    0;

                overflow:
                    hidden;

                text-overflow:
                    ellipsis;

                font-size:
                    20px !important;

            }


            .site-header nav {

                flex:
                    0 0 auto;

                gap:
                    6px !important;

            }


            .site-header
            nav .header-action {

                padding:
                    9px 12px !important;

                min-height:
                    42px;

            }


            #cartButton {

                margin:
                    0 !important;

            }


            /* ---------- HERO ---------- */

            .hero {

                padding-top:
                    54px !important;

                padding-bottom:
                    28px !important;

            }


            .hero-actions {

                gap:
                    8px !important;

                margin-top:
                    20px !important;

            }


            .hero-actions
            .primary-button,
            .hero-actions
            .secondary-button {

                flex:
                    1 1 0;

                min-width:
                    0;

                padding:
                    13px 8px !important;

                font-size:
                    13px !important;

            }


            .hero-mini-stats {

                gap:
                    6px;

                margin-top:
                    9px !important;

            }


            .hero-mini-stats > div {

                padding:
                    9px 4px;

                border-radius:
                    12px;

            }


            .hero-mini-stats strong {

                font-size:
                    15px;

            }


            .hero-mini-stats span {

                font-size:
                    8px;

            }


            /* ---------- BRANDS ---------- */

            .products {

                padding-top:
                    30px !important;

            }


            .section-heading {

                margin-bottom:
                    18px !important;

            }


            .cards {

                grid-template-columns:
                    repeat(2,minmax(0,1fr)) !important;

                gap:
                    10px !important;

            }


            .cards .card {

                min-height:
                    258px;

                padding:
                    10px !important;

                border-radius:
                    16px !important;

            }


            .cards .brand-box {

                height:
                    92px;

                flex-basis:
                    92px;

                margin-bottom:
                    9px;

                border-radius:
                    13px;

            }


            .cards .brand-box img {

                width:
                    58px;

                height:
                    58px;

            }


            .cards .brand {

                font-size:
                    9px !important;

            }


            .cards .card h3 {

                margin:
                    4px 0 5px !important;

                min-height:
                    20px;

                font-size:
                    15px !important;

            }


            .cards .discount {

                min-height:
                    17px;

                margin-bottom:
                    8px;

                font-size:
                    10px !important;

            }


            .cards .buy {

                min-height:
                    36px;

                border-radius:
                    10px;

                font-size:
                    11px;

            }


            /* ---------- PURCHASE ---------- */

            .product-panel {

                width:
                    min(100%,560px) !important;

                max-height:
                    calc(100vh - 16px);

                padding:
                    17px !important;

                border-radius:
                    22px !important;

            }


            .product-panel
            .fixed-values {

                grid-template-columns:
                    repeat(2,minmax(0,1fr));

                gap:
                    7px !important;

            }


            .product-panel
            .fixed-values
            .value-button {

                min-height:
                    67px;

                padding:
                    7px !important;

            }


            .product-panel
            .fixed-values
            .value-button strong {

                font-size:
                    17px !important;

            }


            /* ---------- ACCOUNT ---------- */

            .account-modal-clean {

                width:
                    min(100%,560px) !important;

                max-height:
                    calc(100vh - 16px);

                padding:
                    16px !important;

                border-radius:
                    22px !important;

            }


            .gcs-account-overview {

                gap:
                    5px;

            }


            .gcs-account-stat {

                padding:
                    8px 4px;

                border-radius:
                    12px;

            }


            .gcs-account-stat span {

                font-size:
                    8px;

            }


            .gcs-account-stat strong {

                font-size:
                    16px;

            }

        }

    `;


    document.head.appendChild(
        style
    );

})();


/* =====================================================
   HOMEPAGE BRAND COUNT
===================================================== */

function updateHeroBrandCount() {

    const element =
        document.getElementById(
            "heroBrandCount"
        );


    if (!element) {
        return;
    }


    if (
        typeof getAllBrands !==
        "function"
    ) {
        return;
    }


    const brands =
        getAllBrands();


    element.textContent =
        brands.length;

}


/* =====================================================
   ACCOUNT OVERVIEW
===================================================== */

function gcsGetUserOrders() {

    if (
        typeof getCurrentUser !==
        "function" ||
        typeof getOrders !==
        "function"
    ) {
        return [];
    }


    const user =
        getCurrentUser();


    if (!user || !user.email) {
        return [];
    }


    return getOrders().filter(
        function (order) {

            return (
                order.email &&
                order.email.toLowerCase() ===
                user.email.toLowerCase()
            );

        }
    );

}


function gcsGetSavedCount() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    "gcsWishlist"
                ) || "[]"
            );

        return Array.isArray(saved)
            ? saved.length
            : 0;

    } catch (error) {

        return 0;

    }

}


function gcsEnhanceAccount() {

    const accountOverlay =
        document.getElementById(
            "accountOverlay"
        );


    if (!accountOverlay) {
        return;
    }


    const menu =
        accountOverlay.querySelector(
            ".account-menu-clean"
        );


    if (!menu) {
        return;
    }


    const oldOverview =
        accountOverlay.querySelector(
            ".gcs-account-overview"
        );


    if (oldOverview) {
        oldOverview.remove();
    }


    const overview =
        document.createElement(
            "div"
        );


    overview.className =
        "gcs-account-overview";


    const orders =
        gcsGetUserOrders();


    const saved =
        gcsGetSavedCount();


    overview.innerHTML = `

        <div class="gcs-account-stat">

            <span>
                ORDERS
            </span>

            <strong>
                ${orders.length}
            </strong>

        </div>


        <div class="gcs-account-stat">

            <span>
                GIFT CARDS
            </span>

            <strong>
                ${orders.length}
            </strong>

        </div>


        <div class="gcs-account-stat saved">

            <span>
                SAVED
            </span>

            <strong>
                ${saved}
            </strong>

        </div>

    `;


    menu.parentNode.insertBefore(
        overview,
        menu
    );


    if (
        !accountOverlay.querySelector(
            ".gcs-saved-account-button"
        )
    ) {

        const savedButton =
            document.createElement(
                "button"
            );


        savedButton.type =
            "button";

        savedButton.className =
            "gcs-saved-account-button";


        savedButton.innerHTML = `

            <span class="saved-icon">
                ♡
            </span>

            <div>

                <strong>
                    Saved Gift Cards
                </strong>

                <small>
                    View your saved brands
                </small>

            </div>

        `;


        savedButton.addEventListener(
            "click",
            function () {

                if (
                    typeof GCS.openWishlist ===
                    "function"
                ) {

                    GCS.openWishlist();

                } else if (
                    typeof openWishlist ===
                    "function"
                ) {

                    openWishlist();

                }

            }
        );


        menu.appendChild(
            savedButton
        );

    }

}


/* =====================================================
   PATCH ACCOUNT OPENING
===================================================== */

function patchAccountOpening() {

    if (
        typeof window.openAccountPanel !==
        "function"
    ) {
        return;
    }


    if (
        window.openAccountPanel.__gcsPatched
    ) {
        return;
    }


    const original =
        window.openAccountPanel;


    const enhanced =
        function () {

            original.apply(
                this,
                arguments
            );


            setTimeout(
                function () {

                    gcsEnhanceAccount();

                },
                30
            );

        };


    enhanced.__gcsPatched =
        true;


    window.openAccountPanel =
        enhanced;

}


/* =====================================================
   STARTUP
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setTimeout(
            function () {

                updateHeroBrandCount();

                patchAccountOpening();

                gcsEnhanceAccount();

            },
            150
        );

    }
);


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !== "Escape"
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

                break;

            }

        }

    }
);
