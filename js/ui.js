/* =====================================================
   GIFTCARDSTORE — UI SYSTEM
   POLISH UPDATE
   Purchase modal + Account UX
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

            overlay.style.display =
                "none";

        });

};


window.closeAllOverlays =
    GCS.closeAllOverlays;


window.addEventListener(
    "click",
    function (event) {

        if (
            event.target &&
            event.target.classList &&
            event.target.classList.contains(
                "overlay"
            )
        ) {

            event.target.style.display =
                "none";

        }

    }
);


/* =====================================================
   NOTIFICATIONS
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
        document.createElement(
            "div"
        );


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
   POLISH CSS
===================================================== */

(function injectUIPolish() {

    const old =
        document.getElementById(
            "gcs-polish-styles"
        );


    if (old) {
        old.remove();
    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "gcs-polish-styles";


    style.textContent = `


        /* =================================================
           GENERAL
        ================================================= */

        .overlay{
            padding:18px !important;
        }


        /* =================================================
           PURCHASE MODAL
        ================================================= */

        .product-panel{

            width:min(
                690px,
                100%
            ) !important;

            max-height:
                calc(100vh - 36px);

            overflow-y:auto;

            padding:
                25px !important;

        }


        .product-panel .panel-header{

            margin-bottom:
                14px;

        }


        .product-panel
        .panel-header h2{

            margin-bottom:
                5px;

        }


        .product-panel
        .panel-header p{

            margin-top:
                0;

            font-size:
                14px;

        }


        .selected-brand{

            min-height:
                78px;

            padding:
                11px 13px !important;

            margin-bottom:
                12px !important;

        }


        .selected-brand-logo{

            width:
                68px !important;

            height:
                68px !important;

        }


        .selected-brand-name{

            font-size:
                18px !important;

        }


        .selected-brand-subtitle{

            font-size:
                13px !important;

        }


        .product-info-box{

            margin:
                10px 0 14px !important;

            padding:
                11px 13px !important;

            font-size:
                12px !important;

            line-height:
                1.45;

        }


        /* ---------- VALUE GRID ---------- */

        .fixed-values{

            display:grid !important;

            grid-template-columns:
                repeat(2,minmax(0,1fr));

            gap:
                10px !important;

        }


        .fixed-values
        .value-button{

            min-height:
                82px;

            padding:
                12px !important;

        }


        .fixed-values
        .value-button strong{

            font-size:
                19px !important;

        }


        .fixed-values
        .value-button small{

            margin-top:
                4px;

            font-size:
                12px !important;

        }


        /* ---------- MODE BUTTONS ---------- */

        .mode-buttons{

            gap:
                9px !important;

            margin-bottom:
                12px !important;

        }


        .mode-button{

            min-height:
                68px !important;

            padding:
                10px !important;

        }


        .mode-button strong{

            font-size:
                15px !important;

        }


        .mode-button small{

            font-size:
                11px !important;

        }


        /* ---------- PRICE PREVIEW ---------- */

        .price-preview{

            margin-top:
                14px !important;

            padding:
                14px !important;

        }


        .preview-row{

            padding:
                4px 0 !important;

        }


        .preview-total{

            padding-top:
                10px !important;

        }


        .product-panel
        .wide-primary{

            margin-top:
                13px;

        }


        /* =================================================
           ACCOUNT
        ================================================= */

        .account-modal-clean{

            width:min(
                610px,
                100%
            ) !important;

            max-height:
                calc(100vh - 36px);

            overflow-y:auto;

            padding:
                22px !important;

        }


        .account-modal-clean
        .panel-header{

            margin-bottom:
                13px;

        }


        .account-modal-clean
        .panel-header h2{

            font-size:
                25px;

        }


        .account-modal-clean
        .panel-header p{

            font-size:
                13px;

        }


        /* ---------- PROFILE ---------- */

        .account-profile-clean{

            position:
                relative;

            min-height:
                70px;

            padding:
                13px !important;

            margin-bottom:
                10px !important;

            border-radius:
                17px !important;

        }


        .account-avatar-clean{

            width:
                50px !important;

            height:
                50px !important;

            flex-basis:
                50px !important;

            border-radius:
                14px !important;

            font-size:
                24px !important;

        }


        .account-profile-copy strong{

            font-size:
                17px !important;

        }


        .account-profile-copy span{

            font-size:
                12px !important;

        }


        .account-profile-copy small{

            font-size:
                11px !important;

        }


        /* =================================================
           ACCOUNT QUICK STATS
        ================================================= */

        .gcs-account-overview{

            display:grid;

            grid-template-columns:
                repeat(3,1fr);

            gap:
                8px;

            margin:
                0 0 12px;

        }


        .gcs-account-stat{

            min-width:
                0;

            padding:
                11px 9px;

            border:
                1px solid var(--border);

            border-radius:
                14px;

            background:
                var(--surface-2);

            text-align:
                center;

        }


        .gcs-account-stat span{

            display:block;

            color:
                var(--muted);

            font-size:
                10px;

            font-weight:
                800;

            white-space:
                nowrap;

        }


        .gcs-account-stat strong{

            display:block;

            margin-top:
                3px;

            color:
                var(--text);

            font-size:
                17px;

        }


        .gcs-account-stat.saved strong{

            color:
                var(--purple);

        }


        /* =================================================
           SAVINGS STRIP
        ================================================= */

        .account-saving-strip{

            margin:
                0 0 12px !important;

            padding:
                13px 16px !important;

            border-radius:
                16px !important;

        }


        .account-saving-strip strong{

            font-size:
                25px !important;

        }


        .account-saving-arrow{

            font-size:
                11px !important;

        }


        /* =================================================
           ACCOUNT MENU
        ================================================= */

        .account-menu-clean{

            gap:
                7px !important;

        }


        .account-menu-clean > button{

            min-height:
                61px;

            padding:
                10px 12px !important;

            border-radius:
                15px !important;

        }


        .account-menu-clean > button > span{

            width:
                41px !important;

            height:
                41px !important;

            flex-basis:
                41px !important;

            border-radius:
                12px !important;

            font-size:
                20px !important;

        }


        .account-menu-clean strong{

            font-size:
                15px !important;

        }


        .account-menu-clean small{

            font-size:
                11px !important;

        }


        /* =================================================
           LOGOUT
        ================================================= */

        .account-modal-clean
        .logout-button{

            margin-top:
                12px;

        }


        /* =================================================
           CART
        ================================================= */

        .cart-panel{

            width:min(
                700px,
                100%
            ) !important;

            max-height:
                calc(100vh - 36px);

            overflow-y:auto;

        }


        .cart-item{

            padding:
                12px !important;

            border-radius:
                15px !important;

        }


        /* =================================================
           NOTICES
        ================================================= */

        .gcs-notice{

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


        .gcs-notice-icon{

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


        .gcs-notice-content{

            min-width:
                0;

            flex:
                1;

        }


        .gcs-notice-content strong,
        .gcs-notice-content span{

            display:
                block;

        }


        .gcs-notice-content strong{

            font-size:
                13px;

        }


        .gcs-notice-content span{

            margin-top:
                3px;

            color:
                var(--muted);

            font-size:
                12px;

            white-space:
                pre-line;

        }


        .gcs-notice-close{

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

        @media(max-width:700px){

            .overlay{

                padding:
                    10px !important;

                align-items:
                    center !important;

            }


            /* ---------- PURCHASE ---------- */

            .product-panel{

                width:
                    min(100%,560px) !important;

                max-height:
                    calc(100vh - 20px);

                padding:
                    18px !important;

                border-radius:
                    24px !important;

            }


            .product-panel
            .panel-header h2{

                font-size:
                    28px !important;

            }


            .product-panel
            .panel-header p{

                font-size:
                    13px !important;

                line-height:
                    1.45;

            }


            .selected-brand{

                min-height:
                    68px;

                padding:
                    9px 10px !important;

            }


            .selected-brand-logo{

                width:
                    56px !important;

                height:
                    56px !important;

            }


            .selected-brand-name{

                font-size:
                    17px !important;

            }


            .product-info-box{

                font-size:
                    11px !important;

                padding:
                    9px 11px !important;

            }


            .fixed-values{

                grid-template-columns:
                    repeat(2,minmax(0,1fr));

                gap:
                    8px !important;

            }


            .fixed-values
            .value-button{

                min-height:
                    70px;

                padding:
                    8px !important;

            }


            .fixed-values
            .value-button strong{

                font-size:
                    17px !important;

            }


            .fixed-values
            .value-button small{

                font-size:
                    11px !important;

            }


            .mode-button{

                min-height:
                    61px !important;

            }


            .mode-button strong{

                font-size:
                    14px !important;

            }


            .price-preview{

                padding:
                    11px !important;

                margin-top:
                    10px !important;

            }


            /* ---------- ACCOUNT ---------- */

            .account-modal-clean{

                width:
                    min(100%,560px) !important;

                max-height:
                    calc(100vh - 20px);

                padding:
                    17px !important;

                border-radius:
                    23px !important;

            }


            .account-modal-clean
            .panel-header h2{

                font-size:
                    24px !important;

            }


            .gcs-account-overview{

                gap:
                    6px;

            }


            .gcs-account-stat{

                padding:
                    9px 5px;

                border-radius:
                    12px;

            }


            .gcs-account-stat span{

                font-size:
                    9px;

            }


            .gcs-account-stat strong{

                font-size:
                    15px;

            }


            .account-menu-clean > button{

                min-height:
                    57px;

                padding:
                    9px 10px !important;

            }


            .account-menu-clean > button > span{

                width:
                    38px !important;

                height:
                    38px !important;

                flex-basis:
                    38px !important;

                font-size:
                    18px !important;

            }


            .account-menu-clean strong{

                font-size:
                    14px !important;

            }


            .account-menu-clean small{

                font-size:
                    10px !important;

            }

        }

    `;


    document.head.appendChild(
        style
    );

})();


/* =====================================================
   ACCOUNT OVERVIEW
===================================================== */

function createAccountOverview() {

    const account =
        document.getElementById(
            "accountOverlay"
        );


    if (!account) {
        return;
    }


    const menu =
        account.querySelector(
            ".account-menu-clean"
        );


    if (!menu) {
        return;
    }


    if (
        account.querySelector(
            ".gcs-account-overview"
        )
    ) {
        return;
    }


    const cart =
        JSON.parse(
            localStorage.getItem(
                "gcsCart"
            ) || "[]"
        );


    let orders = [];


    if (
        typeof getOrders ===
        "function"
    ) {

        orders =
            getOrders();

    }


    const user =
        typeof getCurrentUser ===
        "function"
            ? getCurrentUser()
            : null;


    const userOrders =
        user
            ? orders.filter(
                function (order) {

                    return (
                        order.email &&
                        order.email.toLowerCase() ===
                        user.email.toLowerCase()
                    );

                }
            )
            : [];


    const wishlist =
        JSON.parse(
            localStorage.getItem(
                "gcsWishlist"
            ) || "[]"
        );


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
                ${userOrders.length}
            </strong>

        </div>


        <div class="gcs-account-stat">

            <span>
                GIFT CARDS
            </span>

            <strong>
                ${userOrders.length}
            </strong>

        </div>


        <div class="gcs-account-stat saved">

            <span>
                SAVED
            </span>

            <strong>
                ${wishlist.length}
            </strong>

        </div>

    `;


    menu.parentNode.insertBefore(
        overview,
        menu
    );

}


/* =====================================================
   REFRESH ACCOUNT OVERVIEW
===================================================== */

function refreshAccountOverview() {

    const old =
        document.querySelector(
            ".gcs-account-overview"
        );


    if (old) {
        old.remove();
    }


    createAccountOverview();

}


/* =====================================================
   STARTUP
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setTimeout(
            function () {

                createAccountOverview();

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
                overlays[i].style.display ===
                "flex"
            ) {

                overlays[i].style.display =
                    "none";

                break;

            }

        }

    }
);
