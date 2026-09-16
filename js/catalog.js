/* =====================================================
   GIFTCARDSTORE — CATALOG
   VECTOR LOGO SYSTEM
   VERSION: 2026-09-16-5
===================================================== */

(function () {

    "use strict";

    const VERSION = "20260916-5";


    /* ==================================================
       VERIFIED SIMPLE ICON CONFIG
       ================================================== */

    const LOGOS = {

        "Amazon": ["amazon", "FF9900"],
        "Flipkart": ["flipkart", "2874F0"],
        "Myntra": ["myntra", "FF3F6C"],
        "Croma": ["croma", "000000"],

        "Domino's": ["dominos", "E31837"],
        "Zomato": ["zomato", "E23744"],
        "Swiggy": ["swiggy", "FC8019"],
        "Uber": ["uber", "000000"],

        "BookMyShow": ["bookmyshow", "F84464"],
        "PVR": ["pvr", "F5C400"],

        "Nykaa": ["nykaa", "FC2779"],
        "AJIO": ["ajio", "000000"],
        "Westside": ["westside", "000000"],
        "Max Fashion": ["maxfashion", "C8A77A"],

        "Tata CLiQ": ["tatacliq", "E91E63"],
        "Meesho": ["meesho", "E5007D"],

        "bigbasket": ["bigbasket", "84C225"],
        "Blinkit": ["blinkit", "F8CB46"],
        "Zepto": ["zepto", "8A2BE2"],

        "Reliance Digital": ["reliancedigital", "E42529"],
        "Vijay Sales": ["vijaysales", "E31837"],

        "IKEA": ["ikea", "0058A3"],
        "Lifestyle": ["lifestyle", "000000"],

        "Shoppers Stop": ["shoppersstop", "D71920"],
        "Pantaloons": ["pantaloons", "E40046"],
        "Levi's": ["levis", "C41230"],
        "Decathlon": ["decathlon", "0082C3"],
        "FirstCry": ["firstcry", "00AEEF"],
        "Pepperfry": ["pepperfry", "D71920"],

        "Tata 1mg": ["1mg", "FF6B6B"],
        "Netmeds": ["netmeds", "24A148"],
        "Cult.fit": ["cultfit", "FF3D71"],

        "Spotify": ["spotify", "1DB954"],
        "Netflix": ["netflix", "E50914"],
        "Sony LIV": ["sonyliv", "000000"],
        "ZEE5": ["zee5", "8230C6"],

        "MakeMyTrip": ["makemytrip", "E52B50"],
        "Cleartrip": ["cleartrip", "EF3340"],
        "EaseMyTrip": ["easemytrip", "FF6B00"],
        "Air India": ["airindia", "D71920"],

        "Tira": ["tira", "000000"],
        "The Body Shop": ["thebodyshop", "004C3F"],

        "Fastrack": ["fastrack", "000000"],
        "Titan": ["titan", "004B87"],
        "CaratLane": ["caratlane", "000000"],
        "Mia by Tanishq": ["mia", "8C1D40"],

        "Marks & Spencer": ["marksandspencer", "000000"],
        "Van Heusen": ["vanheusen", "000000"],
        "Allen Solly": ["allensolly", "000000"],
        "Peter England": ["peterengland", "003B5C"],

        "Haldiram's": ["haldirams", "E31B23"]

    };


    /* ==================================================
       NAME NORMALISATION
       ================================================== */

    function cleanName(name) {

        return String(name || "")
            .toLowerCase()
            .replace(/['’]/g, "")
            .replace(/&/g, "and")
            .replace(/[^a-z0-9]/g, "");

    }


    function getConfig(name) {

        if (LOGOS[name]) {
            return LOGOS[name];
        }

        const wanted = cleanName(name);

        const key = Object.keys(LOGOS).find(
            function (item) {
                return cleanName(item) === wanted;
            }
        );

        return key ? LOGOS[key] : null;
    }


    /* ==================================================
       SIMPLE ICON URL
       ================================================== */

    function simpleIcon(slug, colour) {

        return (
            "https://cdn.simpleicons.org/" +
            slug +
            "/" +
            colour
        );

    }


    /* ==================================================
       SAFE SVG FALLBACK
       ==================================================

       This is ONLY used when an actual vector source
       cannot be loaded.

       It is intentionally neutral rather than pretending
       to be the official brand logo.
    ================================================== */

    function fallbackLogo(name) {

        const safeName =
            escapeXML(
                String(name || "")
                    .substring(0, 22)
            );

        const svg =
            '<svg xmlns="http://www.w3.org/2000/svg" ' +
            'viewBox="0 0 900 300">' +

            '<rect width="900" height="300" rx="35" ' +
            'fill="#ffffff"/>' +

            '<text x="450" y="180" ' +
            'text-anchor="middle" ' +
            'font-family="Arial,sans-serif" ' +
            'font-size="72" ' +
            'font-weight="700" ' +
            'fill="#222222">' +

            safeName +

            '</text>' +

            '</svg>';

        return (
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(svg)
        );

    }


    /* ==================================================
       XML ESCAPE
       ================================================== */

    function escapeXML(text) {

        return String(text || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");

    }


    /* ==================================================
       APPLY LOGOS TO BRAND DATABASE
       ================================================== */

    function updateBrands() {

        if (typeof BRANDS === "undefined") {
            return;
        }

        Object.keys(BRANDS).forEach(
            function (id) {

                const brand = BRANDS[id];

                if (!brand || !brand.name) {
                    return;
                }

                const config =
                    getConfig(brand.name);

                if (!config) {
                    brand.logo =
                        fallbackLogo(brand.name);

                    brand.logoVersion =
                        VERSION;

                    return;
                }

                brand.logo =
                    simpleIcon(
                        config[0],
                        config[1]
                    );

                brand.logoVersion =
                    VERSION;

            }
        );

    }


    /* ==================================================
       LOAD INDIVIDUAL IMAGE
       ================================================== */

    function loadLogo(img) {

        if (!img) {
            return;
        }

        const name =
            String(img.alt || "").trim();

        if (!name) {
            return;
        }

        const config =
            getConfig(name);

        /*
         * Already processed with this version.
         */

        if (
            img.dataset.logoVersion ===
            VERSION
        ) {
            return;
        }

        img.dataset.logoVersion =
            VERSION;

        /*
         * No configured vector:
         * use controlled fallback.
         */

        if (!config) {

            img.onerror = null;

            img.src =
                fallbackLogo(name);

            return;
        }

        const source =
            simpleIcon(
                config[0],
                config[1]
            );

        img.dataset.logoStage =
            "simple-icons";

        /*
         * IMPORTANT:
         * If the vector source fails, don't repeatedly
         * attempt different broken URLs.
         */

        img.onerror =
            function () {

                img.onerror = null;

                img.dataset.logoStage =
                    "fallback";

                img.src =
                    fallbackLogo(name);

            };

        img.src =
            source;

    }


    /* ==================================================
       REFRESH ALL LOGOS
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

                    loadLogo(img);

                }
            );

    }


    /* ==================================================
       OBSERVE DYNAMIC CONTENT
       ================================================== */

    function observe() {

        if (!document.body) {
            return;
        }

        const observer =
            new MutationObserver(
                function () {

                    refreshLogos();

                }
            );

        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );

    }


    /* ==================================================
       INITIALISE
       ================================================== */

    function initialise() {

        updateBrands();

        refreshLogos();

        observe();

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
