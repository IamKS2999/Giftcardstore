/* =====================================================
   GIFTCARDSTORE — CATALOG
   VECTOR LOGO SYSTEM
   VERSION: 2026-09-16
===================================================== */

(function () {

    "use strict";

    const VERSION = "20260916-3";


    /*
     * ==================================================
     * BRAND LOGO CONFIGURATION
     * ==================================================
     *
     * [Simple Icons slug, brand colour, website, fallback]
     *
     * SVG is always attempted first.
     * Website favicon is ONLY a last-resort fallback.
     */

    const LOGOS = {

        "Domino's": ["dominos", "E31837", "dominos.co.in", "DO"],
        "Zomato": ["zomato", "E23744", "zomato.com", "ZO"],
        "Swiggy": ["swiggy", "FC8019", "swiggy.com", "SW"],
        "Uber": ["uber", "000000", "uber.com", "UB"],

        "BookMyShow": ["bookmyshow", "F84464", "bookmyshow.com", "BM"],
        "PVR": ["pvr", "F5C400", "pvrcinemas.com", "PV"],

        "Nykaa": ["nykaa", "FC2779", "nykaa.com", "NY"],
        "AJIO": ["ajio", "000000", "ajio.com", "AJ"],
        "Westside": ["westside", "000000", "westside.com", "WE"],
        "Max Fashion": ["max", "C8A77A", "maxfashion.in", "MX"],

        "Tata CLiQ": ["tatacliq", "E91E63", "tatacliq.com", "TC"],
        "Meesho": ["meesho", "E5007D", "meesho.com", "ME"],

        "bigbasket": ["bigbasket", "84C225", "bigbasket.com", "BB"],
        "Blinkit": ["blinkit", "F8CB46", "blinkit.com", "BL"],
        "Zepto": ["zepto", "8A2BE2", "zeptonow.com", "ZE"],

        "Reliance Digital": [
            "reliancedigital",
            "E42529",
            "reliancedigital.in",
            "RD"
        ],

        "Vijay Sales": [
            "vijaysales",
            "E31837",
            "vijaysales.com",
            "VS"
        ],

        "IKEA": ["ikea", "0058A3", "ikea.com", "IK"],
        "Lifestyle": ["lifestyle", "000000", "lifestylestores.com", "LS"],

        "Shoppers Stop": [
            "shoppersstop",
            "D71920",
            "shoppersstop.com",
            "SS"
        ],

        "Pantaloons": [
            "pantaloons",
            "E40046",
            "pantaloons.com",
            "PA"
        ],

        "Levi's": [
            "levis",
            "C41230",
            "levi.com",
            "LE"
        ],

        "Decathlon": [
            "decathlon",
            "0082C3",
            "decathlon.in",
            "DE"
        ],

        "FirstCry": [
            "firstcry",
            "00AEEF",
            "firstcry.com",
            "FC"
        ],

        "Pepperfry": [
            "pepperfry",
            "D71920",
            "pepperfry.com",
            "PF"
        ],

        "Tata 1mg": [
            "1mg",
            "FF6B6B",
            "1mg.com",
            "1M"
        ],

        "Netmeds": [
            "netmeds",
            "24A148",
            "netmeds.com",
            "NM"
        ],

        "Cult.fit": [
            "cultfit",
            "FF3D71",
            "cult.fit",
            "CF"
        ],

        "Spotify": [
            "spotify",
            "1DB954",
            "spotify.com",
            "SP"
        ],

        "Netflix": [
            "netflix",
            "E50914",
            "netflix.com",
            "NF"
        ],

        "Sony LIV": [
            "sonyliv",
            "000000",
            "sonyliv.com",
            "SL"
        ],

        "ZEE5": [
            "zee5",
            "8230C6",
            "zee5.com",
            "Z5"
        ],

        "MakeMyTrip": [
            "makemytrip",
            "E52B50",
            "makemytrip.com",
            "MM"
        ],

        "Cleartrip": [
            "cleartrip",
            "EF3340",
            "cleartrip.com",
            "CT"
        ],

        "EaseMyTrip": [
            "easemytrip",
            "FF6B00",
            "easemytrip.com",
            "EM"
        ],

        "Air India": [
            "airindia",
            "D71920",
            "airindia.com",
            "AI"
        ],

        "Tira": [
            "tira",
            "000000",
            "tirabeauty.com",
            "TI"
        ],

        "The Body Shop": [
            "thebodyshop",
            "004C3F",
            "thebodyshop.com",
            "BS"
        ],

        "Fastrack": [
            "fastrack",
            "000000",
            "fastrack.in",
            "FT"
        ],

        "Titan": [
            "titan",
            "004B87",
            "titan.co.in",
            "TI"
        ],

        "CaratLane": [
            "caratlane",
            "000000",
            "caratlane.com",
            "CL"
        ],

        "Mia by Tanishq": [
            "mia",
            "8C1D40",
            "mia.tatacliq.com",
            "MI"
        ],

        "Archies": [
            "archies",
            "E31B23",
            "archiesonline.com",
            "AR"
        ],

        "Hamleys": [
            "hamleys",
            "E30613",
            "hamleys.in",
            "HA"
        ],

        "Crossword": [
            "crossword",
            "E31837",
            "crossword.in",
            "CR"
        ],

        "Marks & Spencer": [
            "marksandspencer",
            "000000",
            "marksandspencer.com",
            "MS"
        ],

        "Van Heusen": [
            "vanheusen",
            "000000",
            "vanheusenindia.com",
            "VH"
        ],

        "Allen Solly": [
            "allensolly",
            "000000",
            "allensolly.com",
            "AS"
        ],

        "Peter England": [
            "peterengland",
            "003B5C",
            "peterengland.com",
            "PE"
        ],

        "Haldiram's": [
            "haldirams",
            "E31B23",
            "haldirams.com",
            "HA"
        ]
    };


    /*
     * ==================================================
     * NAME NORMALISATION
     * ==================================================
     */

    function cleanName(name) {

        return String(name || "")
            .toLowerCase()
            .replace(/['’]/g, "")
            .replace(/&/g, "and")
            .replace(/[^a-z0-9]/g, "");

    }


    function getLogoConfig(name) {

        if (LOGOS[name]) {
            return LOGOS[name];
        }

        const wanted =
            cleanName(name);

        const found =
            Object.keys(LOGOS).find(
                function (key) {

                    return (
                        cleanName(key)
                        === wanted
                    );

                }
            );

        return found
            ? LOGOS[found]
            : null;
    }


    /*
     * ==================================================
     * URL BUILDERS
     * ==================================================
     */

    function vectorLogo(
        slug,
        colour
    ) {

        /*
         * Simple Icons CDN returns SVG.
         *
         * The colour is explicitly supplied so
         * the icon is not forced into a generic
         * black/grey appearance.
         */

        return (
            "https://cdn.simpleicons.org/" +
            slug +
            "/" +
            colour +
            "?v=" +
            VERSION
        );

    }


    function faviconLogo(domain) {

        return (
            "https://www.google.com/s2/favicons" +
            "?domain=" +
            encodeURIComponent(domain) +
            "&sz=256" +
            "&v=" +
            VERSION
        );

    }


    /*
     * ==================================================
     * FINAL PLACEHOLDER
     * ==================================================
     *
     * This is deliberately only the FINAL fallback.
     */

    function placeholderLogo(text) {

        const label =
            String(text || "GC")
                .replace(
                    /[^A-Za-z0-9]/g,
                    ""
                )
                .substring(0, 3)
                .toUpperCase();


        const svg =
            '<svg xmlns="http://www.w3.org/2000/svg" ' +
            'viewBox="0 0 512 512">' +

            '<rect width="512" height="512" ' +
            'rx="90" fill="#f3f3f3"/>' +

            '<text x="256" y="300" ' +
            'text-anchor="middle" ' +
            'font-family="Arial,sans-serif" ' +
            'font-size="125" ' +
            'font-weight="700" ' +
            'fill="#222">' +

            label +

            '</text>' +

            '</svg>';


        return (
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(svg)
        );

    }


    /*
     * ==================================================
     * APPLY LOGOS TO EXISTING BRANDS
     * ==================================================
     *
     * IMPORTANT:
     * We DO NOT add duplicate brands.
     * We modify the brands that already exist.
     */

    function updateBrands() {

        if (
            typeof BRANDS ===
            "undefined"
        ) {
            return;
        }


        Object.keys(BRANDS)
            .forEach(function (id) {

                const brand =
                    BRANDS[id];


                if (
                    !brand ||
                    !brand.name
                ) {
                    return;
                }


                const config =
                    getLogoConfig(
                        brand.name
                    );


                if (!config) {
                    return;
                }


                brand.logo =
                    vectorLogo(
                        config[0],
                        config[1]
                    );


                brand.logoFallback =
                    faviconLogo(
                        config[2]
                    );


                brand.logoLabel =
                    config[3];


                brand.logoVersion =
                    VERSION;

            });

    }


    /*
     * ==================================================
     * LOAD AN IMAGE
     * ==================================================
     */

    function loadLogo(img) {

        if (!img) {
            return;
        }


        const brandName =
            String(
                img.alt || ""
            ).trim();


        if (!brandName) {
            return;
        }


        const config =
            getLogoConfig(
                brandName
            );


        if (!config) {
            return;
        }


        const svg =
            vectorLogo(
                config[0],
                config[1]
            );


        const favicon =
            faviconLogo(
                config[2]
            );


        const placeholder =
            placeholderLogo(
                config[3]
            );


        /*
         * Don't continuously reload
         * the same image.
         */

        if (
            img.dataset.logoVersion ===
            VERSION
        ) {
            return;
        }


        img.dataset.logoVersion =
            VERSION;


        img.dataset.logoStage =
            "svg";


        img.onerror =
            function () {

                /*
                 * SVG failed.
                 * Try favicon.
                 */

                if (
                    img.dataset.logoStage ===
                    "svg"
                ) {

                    img.dataset.logoStage =
                        "favicon";

                    img.src =
                        favicon;

                    return;
                }


                /*
                 * Favicon failed.
                 * Use clean placeholder.
                 */

                img.dataset.logoStage =
                    "placeholder";

                img.onerror = null;

                img.src =
                    placeholder;

            };


        /*
         * SVG FIRST.
         */

        img.src =
            svg;

    }


    /*
     * ==================================================
     * REFRESH VISIBLE LOGOS
     * ==================================================
     */

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


    /*
     * ==================================================
     * OBSERVER
     * ==================================================
     *
     * app.js dynamically creates cards,
     * so watch for newly-created images.
     */

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


    /*
     * ==================================================
     * INITIALISATION
     * ==================================================
     */

    function initialise() {

        /*
         * First modify the existing
         * BRANDS objects.
         */

        updateBrands();


        /*
         * Then update whatever is already
         * rendered.
         */

        refreshLogos();


        /*
         * Watch future cards.
         */

        observe();


        /*
         * app.js may render products
         * after startup, so refresh a few
         * times during initial rendering.
         */

        setTimeout(
            function () {

                updateBrands();
                refreshLogos();

            },
            300
        );


        setTimeout(
            function () {

                updateBrands();
                refreshLogos();

            },
            1000
        );


        setTimeout(
            function () {

                updateBrands();
                refreshLogos();

            },
            2000
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
