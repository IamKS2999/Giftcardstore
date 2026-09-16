/* =====================================================
   GIFTCARDSTORE — CATALOG
   PASSIVE CATALOG LOADER
   VERSION: 2026-09-16-15
===================================================== */

(function () {

    "use strict";

    /*
     * IMPORTANT:
     * catalog.js must NOT modify BRANDS.logo.
     *
     * Logo information belongs to brands.js.
     * This file only refreshes images that the
     * application has already assigned.
     */

    function refreshImages() {

        document
            .querySelectorAll(
                "img.brand-logo, #productLogo, .owned-gift-logo img"
            )
            .forEach(function (img) {

                if (!img.src || img.src === window.location.href) {
                    return;
                }

                img.loading = "eager";

            });

    }


    function initialise() {

        refreshImages();

        setTimeout(refreshImages, 500);
        setTimeout(refreshImages, 1500);

    }


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initialise
        );

    } else {

        initialise();

    }

})();
