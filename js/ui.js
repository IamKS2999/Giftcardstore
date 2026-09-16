/* =====================================================
   GIFTCARDSTORE — UI POLISH SYSTEM
   Purchase Modal + Account Upgrade
   VERSION: 2026-09-16-UI-FINAL
===================================================== */

window.GCS = window.GCS || {};

GCS.pendingCheckout = false;


/* =====================================================
   UI POLISH CSS
===================================================== */

(function injectUIPolish() {

    const existing =
        document.getElementById(
            "gcs-ui-polish"
        );

    if (existing) {
        existing.remove();
    }

    const style =
        document.createElement("style");

    style.id =
        "gcs-ui-polish";

    style.textContent = `

        /* =================================================
           OVERLAY
        ================================================= */

        .overlay {
            padding: 12px !important;
        }


        /* =================================================
           PURCHASE MODAL
        ================================================= */

        .product-panel {

            width:
                min(680px, 100%) !important;

            max-height:
                calc(100vh - 24px);

            overflow-y:
                auto;

            padding:
                22px !important;

            border-radius:
                24px !important;

        }


        .product-panel .panel-header {
            margin-bottom:
                12px !important;
        }


        .product-panel .panel-header h2 {
            margin-bottom:
                4px !important;
        }


        .product-panel .panel-header p {
            margin-top:
                0 !important;

            font-size:
                13px !important;

            line-height:
                1.45;
        }


        /* =================================================
           SELECTED BRAND
        ================================================= */

        .product-panel .selected-brand {

            min-height:
                76px;

            margin-bottom:
                11px !important;

            padding:
                10px 12px !important;

            border-radius:
                17px !important;

        }


        .product-panel
        .selected-brand-logo {

            width:
                62px !important;

            height:
                62px !important;

        }


        .product-panel
        .selected-brand-name {

            font-size:
                18px !important;

        }


        .product-panel
        .selected-brand-subtitle {

            font-size:
                12px !important;

        }


        /* =================================================
           PRODUCT INFORMATION
        ================================================= */

        .product-info-box {

            margin:
                9px 0 12px !important;

            padding:
                10px 12px !important;

            border-radius:
                14px !important;

            font-size:
                12px !important;

            line-height:
                1.45;

        }


        /* =================================================
           GIFT CARD TYPE
        ================================================= */

        .product-panel .field-label {

            margin-bottom:
                7px !important;

        }


        .product-panel .mode-buttons {

            gap:
                8px !important;

            margin-bottom:
                10px !important;

        }


        .product-panel .mode-button {

            min-height:
                62px !important;

            padding:
                9px !important;

            border-radius:
                15px !important;

        }


        .product-panel
        .mode-button strong {

            font-size:
                14px !important;

        }


        .product-panel
        .mode-button small {

            font-size:
                11px !important;

        }


        /* =================================================
           FIXED VALUE GRID
        ================================================= */

        .product-panel .fixed-values {

            display:
                grid !important;

            grid-template-columns:
                repeat(2, minmax(0, 1fr));

            gap:
                8px !important;

        }


        .product-panel
        .fixed-values
        .value-button {

            min-height:
                72px;

            padding:
                9px !important;

            border-radius:
                15px !important;

        }


        .product-panel
        .fixed-values
        .value-button strong {

            font-size:
                18px !important;

        }


        .product-panel
        .fixed-values
        .value-button small {

            display:
                block;

            margin-top:
                3px;

            font-size:
                11px !important;

        }


        /* =================================================
           PRICE PREVIEW
        ================================================= */

        .product-panel .price-preview {

            margin-top:
                11px !important;

            padding:
                12px !important;

            border-radius:
                15px !important;

        }


        .product-panel .preview-row {

            padding:
                3px 0 !important;

        }


        .product-panel .preview-total {

            padding-top:
                8px !important;

        }


        .product-panel .wide-primary {

            margin-top:
                11px;

        }


        /* =================================================
           ACCOUNT MODAL
        ================================================= */

        .account-modal-clean {

            width:
                min(650px, 100%) !important;

            max-height:
                calc(100vh - 24px);

            overflow-y:
                auto;

            padding:
                21px !important;

            border-radius:
                24px !important;

        }


        .account-modal-clean
        .panel-header {

            margin-bottom:
                11px !important;

        }


        .account-modal-clean
        .panel-header h2 {

            font-size:
                26px !important;

            margin-bottom:
                3px !important;

        }


        .account-modal-clean
        .panel-header p {

            font-size:
                13px !important;

        }


        /* =================================================
           ACCOUNT PROFILE
        ================================================= */

        .account-modal-clean
        .account-profile-clean {

            min-height:
                68px;

            gap:
                13px;

            margin-bottom:
                10px !important;

            padding:
                12px !important;

            border-radius:
                17px !important;

        }


        .account-modal-clean
        .account-avatar-clean {

            width:
                52px !important;

            height:
                52px !important;

            flex:
                0 0 52px;

            border-radius:
                14px !important;

            font-size:
                24px !important;

        }


        .account-profile-copy strong {

            font-size:
                18px !important;

        }


        .account-profile-copy span {

            margin-top:
                2px !important;

            font-size:
                12px;

        }


        .account-profile-copy small {

            margin-top:
                3px !important;

            font-size:
                11px;

        }


        /* =================================================
           ACCOUNT OVERVIEW
        ================================================= */

        .gcs-account-overview {

            display:
                grid;

            grid-template-columns:
                repeat(3, 1fr);

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

            color:
                var(--text);

            font-size:
                18px;

        }


        .gcs-account-stat.saved strong {

            color:
                var(--purple);

        }


        /* =================================================
           ACCOUNT SAVINGS
        ================================================= */

        .account-modal-clean
        .account-saving-strip {

            margin:
                0 0 10px !important;

            padding:
                13px 16px !important;

            border-radius:
                16px !important;

        }


        .account-modal-clean
        .account-saving-strip strong {

            font-size:
                27px !important;

        }


        .account-modal-clean
        .account-saving-label {

            font-size:
                10px !important;

        }


        .account-modal-clean
        .account-saving-arrow {

            font-size:
                11px !important;

        }


        /* =================================================
           ACCOUNT MENU
        ================================================= */

        .account-menu-clean {

            gap:
                7px !important;

        }


        .account-menu-clean > button {

            min-height:
                58px;

            gap:
                11px !important;

            padding:
                9px 11px !important;

            border-radius:
                15px !important;

        }


        .account-menu-clean > button > span {

            width:
                39px !important;

            height:
                39px !important;

            flex:
                0 0 39px;

            display:
                grid;

            place-items:
                center;

            border-radius:
                11px !important;

            font-size:
                18px !important;

        }


        .account-menu-clean
        button strong {

            font-size:
                14px !important;

        }


        .account-menu-clean
        button small {

            margin-top:
                2px;

            font-size:
                10px !important;

        }


        /* =================================================
           SAVED / WISHLIST ACCOUNT BUTTON
        ================================================= */

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

            cursor:
                pointer;

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
           LOGOUT
        ================================================= */

        .account-modal-clean
        .logout-button {

            margin-top:
                10px !important;

        }


        /* =================================================
           MOBILE
        ================================================= */

        @media(max-width:700px) {

            .overlay {
                padding:
                    8px !important;
            }


            /* ---------- PURCHASE ---------- */

            .product-panel {

                width:
                    min(100%, 560px) !important;

                max-height:
                    calc(100vh - 16px);

                padding:
                    17px !important;

                border-radius:
                    22px !important;

            }


            .product-panel
            .panel-header h2 {

                font-size:
                    27px !important;

            }


            .product-panel
            .panel-header p {

                font-size:
                    12px !important;

            }


            .product-panel
            .selected-brand {

                min-height:
                    64px;

                padding:
                    8px 9px !important;

            }


            .product-panel
            .selected-brand-logo {

                width:
                    53px !important;

                height:
                    53px !important;

            }


            .product-panel
            .selected-brand-name {

                font-size:
                    16px !important;

            }


            .product-panel
            .selected-brand-subtitle {

                font-size:
                    11px !important;

            }


            .product-panel
            .fixed-values {

                grid-template-columns:
                    repeat(2, minmax(0, 1fr));

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


            .product-panel
            .fixed-values
            .value-button small {

                font-size:
                    10px !important;

            }


            .product-panel
            .mode-button {

                min-height:
                    58px !important;

            }


            .product-panel
            .price-preview {

                padding:
                    10px !important;

            }


            /* ---------- ACCOUNT ---------- */

            .account-modal-clean {

                width:
                    min(100%, 560px) !important;

                max-height:
                    calc(100vh - 16px);

                padding:
                    16px !important;

                border-radius:
                    22px !important;

            }


            .account-modal-clean
            .panel-header h2 {

                font-size:
                    23px !important;

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


            .account-menu-clean > button,
            .gcs-saved-account-button {

                min-height:
                    55px;

                padding:
                    8px 9px !important;

            }


            .account-menu-clean > button > span,
            .gcs-saved-account-button .saved-icon {

                width:
                    37px !important;

                height:
                    37px !important;

                flex-basis:
                    37px !important;

            }

        }

    `;

    document.head.appendChild(style);

})();


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


function gcsCreateAccountOverview() {

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


    const old =
        accountOverlay.querySelector(
            ".gcs-account-overview"
        );


    if (old) {
        old.remove();
    }


    const orders =
        gcsGetUserOrders();


    const saved =
        gcsGetSavedCount();


    const overview =
        document.createElement(
            "div"
        );


    overview.className =
        "gcs-account-overview";


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

}


/* =====================================================
   SAVED ACCOUNT BUTTON
===================================================== */

function gcsCreateSavedButton() {

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


    if (
        accountOverlay.querySelector(
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
                Saved Gift Cards
            </strong>

            <small>
                View your saved brands
            </small>

        </div>

    `;


    button.addEventListener(
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
        button
    );

}


/* =====================================================
   ACCOUNT ENHANCEMENT
===================================================== */

function gcsEnhanceAccount() {

    gcsCreateAccountOverview();

    gcsCreateSavedButton();

}


/* =====================================================
   REFRESH ACCOUNT WHEN OPENED
===================================================== */

function gcsPatchAccountOpening() {

    if (
        typeof window.openAccountPanel !==
        "function"
    ) {
        return;
    }


    if (
        window.openAccountPanel.__gcsEnhanced
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
                20
            );

        };


    enhanced.__gcsEnhanced =
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

                gcsPatchAccountOpening();

                gcsEnhanceAccount();

            },
            250
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

            const overlay =
                overlays[i];


            if (
                getComputedStyle(
                    overlay
                ).display !== "none"
            ) {

                overlay.style.display =
                    "none";

                break;

            }

        }

    }
);
