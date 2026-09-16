/* =====================================================
   GIFTCARDSTORE — UI POLISH
   ACCOUNT + HOMEPAGE FIX
   VERSION: 2026-09-16-HOME-FIX
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
   UI CSS
===================================================== */

(function () {

    const old =
        document.getElementById(
            "gcs-final-ui"
        );

    if (old) {
        old.remove();
    }


    const style =
        document.createElement(
            "style"
        );

    style.id =
        "gcs-final-ui";


    style.textContent = `


        /* =================================================
           GENERAL OVERLAY
        ================================================= */

        .overlay {
            padding: 12px !important;
        }


        /* =================================================
           HOMEPAGE HERO STATS
        ================================================= */

        .hero-mini-stats {

            display:
                grid;

            grid-template-columns:
                repeat(3, minmax(0, 1fr));

            gap:
                10px;

            width:
                min(560px, 100%);

            margin:
                4px auto 0;

        }


        .hero-mini-stats > div {

            padding:
                12px 10px;

            border:
                1px solid var(--border);

            border-radius:
                15px;

            background:
                rgba(255,255,255,.035);

            text-align:
                center;

        }


        .hero-mini-stats strong {

            display:
                block;

            color:
                var(--text);

            font-size:
                17px;

            line-height:
                1.2;

        }


        .hero-mini-stats span {

            display:
                block;

            margin-top:
                3px;

            color:
                var(--muted);

            font-size:
                10px;

            line-height:
                1.25;

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


        .product-panel
        .panel-header h2 {
            margin-bottom:
                4px !important;
        }


        .product-panel
        .panel-header p {

            margin-top:
                0 !important;

            font-size:
                13px !important;

            line-height:
                1.45;

        }


        .product-panel
        .selected-brand {

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


        .product-panel
        .mode-buttons {

            gap:
                8px !important;

            margin-bottom:
                10px !important;

        }


        .product-panel
        .mode-button {

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


        .product-panel
        .fixed-values {

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


        .product-panel
        .price-preview {

            margin-top:
                11px !important;

            padding:
                12px !important;

            border-radius:
                15px !important;

        }


        /* =================================================
           ACCOUNT
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

        }


        .account-modal-clean
        .panel-header p {

            font-size:
                13px !important;

        }


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
            font-size:
                12px;
        }


        .account-profile-copy small {
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

            font-size:
                18px;

        }


        .gcs-account-stat.saved strong {
            color:
                var(--purple);
        }


        /* =================================================
           SAVED ACCOUNT BUTTON
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
           NOTICES
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
                min(440px, calc(100% - 28px));

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

            cursor:
                pointer;

        }


        /* =================================================
           MOBILE
        ================================================= */

        @media(max-width:700px) {

            .overlay {
                padding:
                    8px !important;
            }


            .hero-mini-stats {

                grid-template-columns:
                    repeat(3, 1fr);

                gap:
                    6px;

                margin-top:
                    2px;

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

        }

    `;


    document.head.appendChild(
        style
    );

})();


/* =====================================================
   HOMEPAGE STAT FIX
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
   STARTUP
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setTimeout(
            function () {

                updateHeroBrandCount();

            },
            50
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
