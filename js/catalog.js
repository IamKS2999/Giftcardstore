/* =====================================================
   GIFTCARDSTORE — CATALOG
   SAFE LOGO SYSTEM
   VERSION: 2026-09-16-6
===================================================== */

(function () {

    "use strict";

    const VERSION = "20260916-6";

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

        "PVR":
            "https://cdn.simpleicons.org/pvr/F5C400",

        "Nykaa":
            "https://cdn.simpleicons.org/nykaa/FC2779",

        "AJIO":
            "https://cdn.simpleicons.org/ajio/000000",

        "Westside":
            "https://cdn.simpleicons.org/westside/000000",

        "Tata CLiQ":
            "https://cdn.simpleicons.org/tatacliq/E91E63",

        "Meesho":
            "https://cdn.simpleicons.org/meesho/E5007D",

        "bigbasket":
            "https://cdn.simpleicons.org/bigbasket/84C225",

        "Blinkit":
            "https://cdn.simpleicons.org/blinkit/F8CB46",

        "Zepto":
            "https://cdn.simpleicons.org/zepto/8A2BE2",

        "Reliance Digital":
            "https://cdn.simpleicons.org/reliancedigital/E42529",

        "IKEA":
            "https://cdn.simpleicons.org/ikea/0058A3",

        "Lifestyle":
            "https://cdn.simpleicons.org/lifestyle/000000",

        "Levi's":
            "https://cdn.simpleicons.org/levis/C41230",

        "Decathlon":
            "https://cdn.simpleicons.org/decathlon/0082C3",

        "FirstCry":
            "https://cdn.simpleicons.org/firstcry/00AEEF",

        "Pepperfry":
            "https://cdn.simpleicons.org/pepperfry/D71920",

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

        "Spotify":
            "https://cdn.simpleicons.org/spotify/1DB954",

        "Titan":
            "https://cdn.simpleicons.org/titan/004B87",

        "Marks & Spencer":
            "https://cdn.simpleicons.org/marksandspencer/000000",

        "Peter England":
            "https://cdn.simpleicons.org/peterengland/003B5C",

        "Haldiram's":
            "https://cdn.simpleicons.org/haldirams/E31B23"

    };


    function normalise(name) {

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
            normalise(name);

        const key =
            Object.keys(LOGOS).find(
                function (item) {
                    return normalise(item) === target;
                }
            );

        return key
            ? LOGOS[key]
            : null;

    }


    function updateBrands() {

        if (typeof BRANDS === "undefined") {
            return;
        }

        Object.keys(BRANDS).forEach(
            function (id) {

                const brand =
                    BRANDS[id];

                if (!brand || !brand.name) {
                    return;
                }

                const logo =
                    findLogo(brand.name);

                /*
                 * Only replace the logo when we have
                 * a known logo URL.
                 */

                if (logo) {
                    brand.logo = logo;
                    brand.logoVersion = VERSION;
                }

            }
        );

    }


    function loadLogo(img) {

        if (!img) {
            return;
        }

        const name =
            String(img.alt || "").trim();

        if (!name) {
            return;
        }

        const logo =
            findLogo(name);

        /*
         * If there is no logo in our database,
         * leave the existing image alone.
         */

        if (!logo) {
            return;
        }

        if (
            img.dataset.logoVersion ===
            VERSION
        ) {
            return;
        }

        img.dataset.logoVersion =
            VERSION;

        img.onerror = null;

        img.src = logo;

    }


    function refreshLogos() {

        document
            .querySelectorAll(
                "img.brand-logo, " +
                "#productLogo, " +
                ".owned-gift-logo img"
            )
            .forEach(
                function (img) {
                    loadLogo(img);
                }
            );

    }


    function initialise() {

        updateBrands();

        refreshLogos();

        /*
         * Run again after the product cards
         * have been rendered.
         */

        setTimeout(
            refreshLogos,
            500
        );

        setTimeout(
            refreshLogos,
            1500
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
