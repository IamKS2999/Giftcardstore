/* =====================================================
   GIFTCARDSTORE — UI SYSTEM
   BATCH UPGRADE 3–10
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


window.addEventListener("click", function (event) {

    if (
        event.target &&
        event.target.classList &&
        event.target.classList.contains("overlay")
    ) {
        event.target.style.display = "none";
    }

});


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
            ${type === "success" ? "✓" :
              type === "error" ? "!" : "i"}
        </div>

        <div class="gcs-notice-content">
            <strong>${escapeHTML(title)}</strong>
            <span>${escapeHTML(message)}</span>
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

    }, 3200);

};


/* =====================================================
   UI CSS
===================================================== */

(function injectBatchUIStyles() {

    const style =
        document.createElement("style");

    style.id =
        "gcs-batch-ui-styles";

    style.textContent = `

        /* ---------- HEADER ---------- */

        .site-header{
            position:sticky;
            top:0;
            z-index:100;
            backdrop-filter:blur(18px);
            -webkit-backdrop-filter:blur(18px);
        }

        .site-header nav{
            display:flex;
            align-items:center;
            gap:10px;
        }

        .cart-header-button{
            position:relative;
            gap:7px;
        }

        .cart-count{
            min-width:21px;
            height:21px;
            padding:0 5px;
            display:inline-grid;
            place-items:center;
            border-radius:999px;
            background:var(--purple,#713cf3);
            color:#fff;
            font-size:11px;
            font-weight:900;
        }


        /* ---------- HERO ---------- */

        .hero-mini-stats{
            display:flex;
            justify-content:center;
            gap:12px;
            margin-top:32px;
            flex-wrap:wrap;
        }

        .hero-mini-stats > div{
            min-width:125px;
            padding:13px 18px;
            border:1px solid var(--border);
            border-radius:16px;
            background:rgba(255,255,255,.035);
        }

        .hero-mini-stats strong,
        .hero-mini-stats span{
            display:block;
        }

        .hero-mini-stats strong{
            font-size:17px;
        }

        .hero-mini-stats span{
            margin-top:3px;
            color:var(--muted);
            font-size:11px;
        }


        /* ---------- SEARCH ---------- */

        .search-box{
            position:relative;
        }

        .search-box input{
            padding-right:48px;
        }

        .search-clear{
            position:absolute;
            right:12px;
            top:50%;
            transform:translateY(-50%);
            width:30px;
            height:30px;
            border:0;
            border-radius:50%;
            background:var(--surface-3);
            color:var(--muted);
            font-size:20px;
            cursor:pointer;
        }

        .search-info{
            margin:12px 0 4px;
            color:var(--muted);
            font-size:13px;
            font-weight:700;
        }


        /* ---------- BRAND CARDS ---------- */

        .card{
            transition:
                transform .2s ease,
                border-color .2s ease,
                box-shadow .2s ease;
        }

        .card:hover{
            transform:translateY(-4px);
            border-color:rgba(113,60,243,.55);
            box-shadow:0 18px 45px rgba(0,0,0,.18);
        }

        .card .buy{
            cursor:pointer;
        }

        .brand-box{
            overflow:hidden;
        }

        .brand-logo{
            object-fit:contain;
        }


        /* ---------- PRODUCT INFO ---------- */

        .product-info-box{
            margin:16px 0;
            padding:13px 15px;
            border:1px solid var(--border);
            border-radius:16px;
            background:var(--surface-2);
            color:var(--muted);
            font-size:13px;
        }

        .product-info-box strong{
            color:var(--text);
        }

        .selected-brand{
            position:relative;
        }

        .wishlist-product-button{
            margin-left:auto;
            width:42px;
            height:42px;
            border:1px solid var(--border);
            border-radius:13px;
            background:var(--surface-2);
            color:var(--text);
            font-size:22px;
            cursor:pointer;
        }

        .wishlist-product-button.active{
            color:#fff;
            background:linear-gradient(135deg,#713cf3,#4169e1);
            border-color:transparent;
        }


        /* ---------- CART ---------- */

        .cart-panel{
            width:min(720px,100%);
        }

        .cart-item{
            display:grid;
            grid-template-columns:58px 1fr auto;
            gap:14px;
            align-items:center;
            padding:14px;
            margin-bottom:10px;
            border:1px solid var(--border);
            border-radius:18px;
            background:var(--surface-2);
        }

        .cart-item-logo{
            width:58px;
            height:58px;
            display:grid;
            place-items:center;
            overflow:hidden;
            border-radius:14px;
            background:var(--surface-3);
        }

        .cart-item-logo img{
            width:100%;
            height:100%;
            object-fit:contain;
        }

        .cart-item-info strong,
        .cart-item-info span,
        .cart-item-info small{
            display:block;
        }

        .cart-item-info strong{
            font-size:16px;
        }

        .cart-item-info span{
            margin-top:3px;
            color:var(--muted);
            font-size:13px;
        }

        .cart-item-info small{
            margin-top:4px;
            color:var(--green,#31d48b);
            font-weight:800;
            font-size:12px;
        }

        .cart-item-actions{
            display:flex;
            align-items:center;
            gap:8px;
        }

        .quantity-control{
            display:flex;
            align-items:center;
            border:1px solid var(--border);
            border-radius:11px;
            overflow:hidden;
        }

        .quantity-control button{
            width:32px;
            height:32px;
            border:0;
            background:var(--surface-3);
            color:var(--text);
            cursor:pointer;
            font-size:17px;
        }

        .quantity-control span{
            min-width:28px;
            text-align:center;
            font-weight:900;
            font-size:13px;
        }

        .remove-cart{
            width:32px;
            height:32px;
            border:1px solid var(--border);
            border-radius:10px;
            background:transparent;
            color:var(--muted);
            cursor:pointer;
        }

        .remove-cart:hover{
            color:#ff6678;
            border-color:#ff6678;
        }

        .cart-summary{
            margin-top:16px;
            padding:18px;
            border:1px solid var(--border);
            border-radius:18px;
            background:var(--surface-2);
        }

        .cart-summary-row{
            display:flex;
            justify-content:space-between;
            gap:12px;
            margin:8px 0;
            color:var(--muted);
        }

        .cart-summary-row strong{
            color:var(--text);
        }

        .cart-summary-saving strong{
            color:var(--green,#31d48b);
        }

        .cart-summary-divider{
            height:1px;
            margin:13px 0;
            background:var(--border);
        }

        .cart-summary-total{
            color:var(--text);
            font-size:18px;
            font-weight:900;
        }

        .cart-empty{
            padding:45px 20px;
            text-align:center;
            color:var(--muted);
        }

        .cart-empty-icon{
            font-size:42px;
            margin-bottom:10px;
        }


        /* ---------- ORDER SUMMARY ---------- */

        .summary-item{
            display:flex;
            justify-content:space-between;
            gap:12px;
            padding:13px 0;
            border-bottom:1px solid var(--border);
        }

        .summary-item:last-child{
            border-bottom:0;
        }

        .summary-item-main strong,
        .summary-item-main span{
            display:block;
        }

        .summary-item-main span{
            margin-top:3px;
            color:var(--muted);
            font-size:12px;
        }

        .summary-item-price{
            text-align:right;
            font-weight:900;
        }

        .summary-item-price small{
            display:block;
            margin-top:3px;
            color:var(--green,#31d48b);
        }

        .order-total-box{
            margin-top:15px;
            padding:17px;
            border-radius:18px;
            background:linear-gradient(
                135deg,
                rgba(113,60,243,.14),
                rgba(65,105,225,.10)
            );
            border:1px solid rgba(113,60,243,.35);
        }

        .order-total-row{
            display:flex;
            justify-content:space-between;
            margin:7px 0;
        }

        .order-total-row span{
            color:var(--muted);
        }

        .order-total-final{
            padding-top:12px;
            margin-top:12px;
            border-top:1px solid var(--border);
            font-size:19px;
            font-weight:900;
        }

        .order-total-saving strong{
            color:var(--green,#31d48b);
        }


        /* ---------- CHECKOUT ---------- */

        .checkout-items{
            display:grid;
            gap:8px;
            margin-bottom:14px;
        }

        .checkout-item{
            display:flex;
            justify-content:space-between;
            gap:12px;
            padding:12px 14px;
            border:1px solid var(--border);
            border-radius:14px;
            background:var(--surface-2);
        }

        .checkout-item span{
            color:var(--muted);
            font-size:13px;
        }

        .checkout-item strong{
            text-align:right;
        }

        .checkout-totals{
            margin-bottom:18px;
        }


        /* ---------- NOTICES ---------- */

        .gcs-notice{
            position:fixed;
            z-index:9999;
            left:50%;
            bottom:24px;
            transform:translateX(-50%);
            width:min(440px,calc(100% - 28px));
            display:flex;
            align-items:center;
            gap:12px;
            padding:14px 15px;
            border:1px solid var(--border);
            border-radius:17px;
            background:var(--surface,#17151d);
            box-shadow:0 18px 55px rgba(0,0,0,.35);
        }

        .gcs-notice-icon{
            width:35px;
            height:35px;
            flex:0 0 35px;
            display:grid;
            place-items:center;
            border-radius:11px;
            background:rgba(113,60,243,.18);
            color:var(--purple,#8d67ff);
            font-weight:900;
        }

        .gcs-notice-content{
            min-width:0;
            flex:1;
        }

        .gcs-notice-content strong,
        .gcs-notice-content span{
            display:block;
        }

        .gcs-notice-content strong{
            font-size:13px;
        }

        .gcs-notice-content span{
            margin-top:3px;
            color:var(--muted);
            font-size:12px;
            white-space:pre-line;
        }

        .gcs-notice-close{
            border:0;
            background:transparent;
            color:var(--muted);
            font-size:21px;
            cursor:pointer;
        }

        .gcs-notice.success .gcs-notice-icon{
            color:var(--green,#31d48b);
        }

        .gcs-notice.error .gcs-notice-icon{
            color:#ff6678;
        }


        /* ---------- FOOTER ---------- */

        .footer-links{
            display:flex;
            justify-content:center;
            gap:10px;
            margin:16px 0;
        }

        .footer-links button{
            border:1px solid var(--border);
            border-radius:10px;
            padding:8px 13px;
            background:transparent;
            color:var(--muted);
            cursor:pointer;
        }


        /* ---------- MOBILE ---------- */

        @media(max-width:700px){

            .site-header nav{
                gap:6px;
            }

            .site-header nav > a{
                display:none;
            }

            .cart-header-button{
                padding-left:11px !important;
                padding-right:11px !important;
                font-size:12px;
            }

            .hero-mini-stats{
                gap:7px;
            }

            .hero-mini-stats > div{
                min-width:100px;
                padding:11px 10px;
            }

            .cart-item{
                grid-template-columns:48px 1fr;
            }

            .cart-item-logo{
                width:48px;
                height:48px;
            }

            .cart-item-actions{
                grid-column:2;
                justify-content:space-between;
            }

            .cart-summary{
                padding:15px;
            }

            .gcs-notice{
                bottom:16px;
            }

        }

    `;

    document.head.appendChild(style);

})();


/* =====================================================
   MOBILE ESCAPE KEY
===================================================== */

document.addEventListener("keydown", function (event) {

    if (event.key !== "Escape") {
        return;
    }

    const overlays =
        Array.from(
            document.querySelectorAll(".overlay")
        );

    for (let i = overlays.length - 1; i >= 0; i--) {

        if (
            overlays[i].style.display === "flex"
        ) {
            overlays[i].style.display = "none";
            break;
        }

    }

});
