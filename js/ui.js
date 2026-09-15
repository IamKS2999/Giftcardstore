/* =====================================================
   GIFTCARDSTORE — UI UTILITIES
   BRICK 14
===================================================== */

window.GCS = window.GCS || {};

GCS.pendingCheckout = false;


GCS.closeAllOverlays = function () {

    document
        .querySelectorAll(".overlay")
        .forEach(
            function (overlay) {

                overlay.style.display =
                    "none";

            }
        );

};


window.addEventListener(
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
