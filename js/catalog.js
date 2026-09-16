/* =====================================================
   GIFTCARDSTORE — CATALOG
   CLEAN LOGO ENGINE
   VERSION: 2026-09-16-8
===================================================== */

(function () {

    "use strict";

    const VERSION = "2026-09-16-8";


    /* ==================================================
       LOGO SOURCES
       Only use sources we explicitly define.
    ================================================== */

    const LOGOS = {

        "Amazon":
            "https://cdn.simpleicons.org/amazon/FF9900",

        "Flipkart":
            "https://cdn.simpleicons.org/flipkart/2874F0",

        "Myntra":
            "https://cdn.simpleicons.org/myntra/FF3F6C",

        "Croma":
            "https://cdn.simpleicons.org/croma/000000",

        "Domino's":
            "https://cdn.simpleicons.org/dominos/E31837",

        "Zomato":
            "https://cdn.simpleicons.org/zomato/E23744",

        "Swiggy":
            "https://cdn.simpleicons.org/swiggy/FC8019",

        "Uber":
            "https://cdn.simpleicons.org/uber/000000",

        "BookMyShow":
            "https://cdn.simpleicons.org/bookmyshow/F84464",

        "Nykaa":
            "https://cdn.simpleicons.org/nykaa/FC2779",

        "Meesho":
            "https://cdn.simpleicons.org/meesho/E5007D",

        "bigbasket":
            "https://cdn.simpleicons.org/bigbasket/84C225",

        "Blinkit":
            "https://cdn.simpleicons.org/blinkit/F8CB46",

        "Zepto":
            "https://cdn.simpleicons.org/zepto/8A2BE2",

        "IKEA":
            "https://cdn.simpleicons.org/ikea/0058A3",

        "Spotify":
            "https://cdn.simpleicons.org/spotify/1DB954",

        "Netflix":
            "https://cdn.simpleicons.org/netflix/E50914",

        "ZEE5":
            "https://cdn.simpleicons.org/zee5/8230C6",

        "MakeMyTrip":
            "https://cdn.simpleicons.org/makemytrip/E52B50",

        "Cleartrip":
            "https://cdn.simpleicons.org/cleartrip/EF3340",

        "Air India":
            "https://cdn.simpleicons.org/airindia/D71920",

        "The Body Shop":
            "https://cdn.simpleicons.org/thebodyshop/004C3F",

        "Titan":
            "https://cdn.simpleicons.org/titan/004B87",

        "Levi's":
            "https://cdn.simpleicons.org/levis/C41230",

        "Decathlon":
            "https://cdn.simpleicons.org/decathlon/0082C3",

        "FirstCry":
            "https://cdn.simpleicons.org/firstcry/00AEEF",

        "Tata CLiQ":
            "https://cdn.simpleicons.org/tatacliq/E91E63",

        "Reliance Digital":
            "https://cdn.simpleicons.org/reliancedigital/E42529",

        "PVR":
            "https://cdn.simpleicons.org/pvr/F5C400",

        "Sony LIV":
            "https://cdn.simpleicons.org/sonyliv/000000",

        "Fastrack":
            "https://cdn.simpleicons.org/fastrack/000000",

        "CaratLane":
            "https://cdn.simpleicons.org/caratlane/000000",

        "Marks & Spencer":
            "https://cdn.simpleicons.org/marksandspencer/000000",

        "Van Heusen":
            "https://cdn.simpleicons.org/vanheusen/000000",

        "Allen Solly":
            "https://cdn.simpleicons.org/allensolly/000000",

        "Peter England":
            "https://cdn.simpleicons.org/peterengland/003B5C",

        "Haldiram's":
            "https://cdn.simpleicons.org/haldirams/E31B23"

    };


    /* ==================================================
       NAME MATCHING
    ================================================== */

    function cleanName(name) {

        return String(name || "")
            .toLowerCase()
            .replace(/['’]/g, "")
            .replace(/&/g, "and")
            .replace(/[^a-z0-9]/g, "");

    }


    function findLogo(name) {

        if (LOGOS[name]) {
            return LOGOS[name];
        }

        const target =
            cleanName(name);

        const match =
            Object.keys(LOGOS).find(
                function (key) {

                    return (
                        cleanName(key) ===
                        target
                    );

                }
            );

        return match
            ? LOGOS[match]
            : null;

    }


    /* ==================================================
       UPDATE BRAND DATABASE
    ================================================== */

    function updateBrands() {

        if (
            typeof BRANDS ===
            "undefined"
        ) {
            return;
        }

        Object.keys(BRANDS).forEach(
            function (id) {

                const brand =
                    BRANDS[id];

                if (
                    !brand ||
                    !brand.name
                ) {
                    return;
                }

                const logo =
                    findLogo(
                        brand.name
                    );

                /*
                 * Only replace an existing logo
                 * when we have an explicit source.
                 */

                if (logo) {

                    brand.logo =
                        logo;

                    brand.logoVersion =
                        VERSION;

                }

            }
        );

    }


    /* ==================================================
       IMAGE ERROR HANDLING
    ================================================== */

    function protectImage(img) {

        if (!img) {
            return;
        }

        /*
         * Never replace a failed logo with
         * generated text or a favicon.
         */

        img.onerror =
            function () {

                img.onerror = null;

                /*
                 * Leave the image source alone.
                 * This prevents endless replacement.
                 */

            };

    }


    /* ==================================================
       REFRESH LOGOS
    ================================================== */

    function refreshLogos() {

        document
            .querySelectorAll(
                "img.brand-logo, " +
                "#productLogo, " +
                ".owned-gift-logo img"
            )
            .forEach(
                function (img) {

                    const name =
                        String(
                            img.alt || ""
                        ).trim();

                    const logo =
                        findLogo(name);

                    /*
                     * If this brand has no explicit
                     * replacement, leave its original
                     * brands.js logo untouched.
                     */

                    if (!logo) {

                        protectImage(img);

                        return;

                    }

                    img.onerror =
                        function () {

                            img.onerror = null;

                            /*
                             * Restore the original
                             * brands.js logo if available.
                             */

                            if (
                                typeof BRANDS !==
                                "undefined"
                            ) {

                                const brand =
                                    Object.values(
                                        BRANDS
                                    ).find(
                                        function (item) {

                                            return (
                                                item &&
                                                item.name ===
                                                name
                                            );

                                        }
                                    );

                                if (
                                    brand &&
                                    brand.logo &&
                                    brand.logo !==
                                    logo
                                ) {

                                    img.src =
                                        brand.logo;

                                }

                            }

                        };


                    img.src =
                        logo;

                    img.dataset.logoVersion =
                        VERSION;

                }
            );

    }


    /* ==================================================
       INITIALISE
    ================================================== */

    function initialise() {

        updateBrands();

        refreshLogos();

        setTimeout(
            function () {

                updateBrands();
                refreshLogos();

            },
            500
        );

        setTimeout(
            function () {

                updateBrands();
                refreshLogos();

            },
            1500
        );

        setTimeout(
            function () {

                updateBrands();
                refreshLogos();

            },
            3000
        );

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialise
        );

    } else {

        initialise();

    }

})();
