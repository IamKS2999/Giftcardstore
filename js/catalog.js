/* =====================================================
   GIFTCARDSTORE — CATALOG LOGO FIX
   VERSION: 2026-09-16
===================================================== */

(function () {

    "use strict";

    /*
     * Cache-buster.
     * Change this number whenever logo assets are updated.
     */
    const LOGO_VERSION = "20260916-2";


    /*
     * =================================================
     * BRAND LOGO DATABASE
     * =================================================
     *
     * Format:
     * "Brand Name": [simple-icons-slug, colour, domain, fallback]
     */

    const BRAND_LOGOS = {

        "Domino's": [
            "dominos",
            "E31837",
            "dominos.co.in",
            "DO"
        ],

        "Zomato": [
            "zomato",
            "E23744",
            "zomato.com",
            "ZO"
        ],

        "Swiggy": [
            "swiggy",
            "FC8019",
            "swiggy.com",
            "SW"
        ],

        "Uber": [
            "uber",
            "000000",
            "uber.com",
            "UB"
        ],

        "BookMyShow": [
            "bookmyshow",
            "F84464",
            "bookmyshow.com",
            "BM"
        ],

        "PVR": [
            "pvr",
            "F5C400",
            "pvrcinemas.com",
            "PV"
        ],

        "Nykaa": [
            "nykaa",
            "FC2779",
            "nykaa.com",
            "NY"
        ],

        "AJIO": [
            "ajio",
            "000000",
            "ajio.com",
            "AJ"
        ],

        "Westside": [
            "westside",
            "000000",
            "westside.com",
            "WE"
        ],

        "Max Fashion": [
            "max",
            "C8A77A",
            "maxfashion.in",
            "MX"
        ],

        "Tata CLiQ": [
            "tatacliq",
            "E91E63",
            "tatacliq.com",
            "TC"
        ],

        "Meesho": [
            "meesho",
            "E5007D",
            "meesho.com",
            "ME"
        ],

        "bigbasket": [
            "bigbasket",
            "84C225",
            "bigbasket.com",
            "BB"
        ],

        "Blinkit": [
            "blinkit",
            "F8CB46",
            "blinkit.com",
            "BL"
        ],

        "Zepto": [
            "zepto",
            "8A2BE2",
            "zeptonow.com",
            "ZE"
        ],

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

        "IKEA": [
            "ikea",
            "0058A3",
            "ikea.com",
            "IK"
        ],

        "Lifestyle": [
            "lifestyle",
            "000000",
            "lifestylestores.com",
            "LS"
        ],

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
            "M&S"
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
     * =================================================
     * HELPERS
     * =================================================
     */

    function normaliseName(name) {

        return String(name || "")
            .toLowerCase()
            .replace(/['’]/g, "")
            .replace(/&/g, "and")
            .replace(/[^a-z0-9]/g, "");

    }


    function getLogoData(brandName) {

        if (!brandName) {
            return null;
        }

        const exact =
            BRAND_LOGOS[brandName];

        if (exact) {
            return exact;
        }


        const target =
            normaliseName(brandName);


        const key =
            Object.keys(BRAND_LOGOS)
                .find(function (name) {

                    return (
                        normaliseName(name)
                        === target
                    );

                });


        return key
            ? BRAND_LOGOS[key]
            : null;
    }


    function createSimpleIconUrl(
        slug,
        colour
    ) {

        return (
            "https://cdn.simpleicons.org/" +
            slug +
            "/" +
            colour +
            "?v=" +
            LOGO_VERSION
        );

    }


    function createFaviconUrl(
        domain
    ) {

        return (
            "https://www.google.com/s2/favicons" +
            "?domain=" +
            encodeURIComponent(domain) +
            "&sz=256" +
            "&v=" +
            LOGO_VERSION
        );

    }


    function createLetterLogo(
        letters
    ) {

        const safe =
            String(letters || "GC")
                .replace(
                    /[^A-Za-z0-9&]/g,
                    ""
                )
                .substring(0, 3)
                .toUpperCase();


        const svg =
            '<svg xmlns="http://www.w3.org/2000/svg" ' +
            'width="512" height="512" viewBox="0 0 512 512">' +

            '<rect width="512" height="512" ' +
            'rx="90" fill="#f4f4f4"/>' +

            '<text x="256" y="290" ' +
            'text-anchor="middle" ' +
            'font-family="Arial,sans-serif" ' +
            'font-size="130" ' +
            'font-weight="700" ' +
            'fill="#222">' +

            safe +

            '</text>' +

            '</svg>';


        return (
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(svg)
        );

    }


    /*
     * =================================================
     * APPLY LOGO TO AN EXISTING BRAND
     * =================================================
     */

    function applyLogoToBrand(
        brand
    ) {

        if (!brand || !brand.name) {
            return;
        }


        const data =
            getLogoData(brand.name);


        if (!data) {
            return;
        }


        const slug =
            data[0];

        const colour =
            data[1];

        const domain =
            data[2];

        const fallbackLetters =
            data[3];


        /*
         * IMPORTANT:
         *
         * This overwrites the EXISTING logo
         * from brands.js.
         *
         * This was the missing part in the
         * previous catalog.js.
         */

        brand.logo =
            createSimpleIconUrl(
                slug,
                colour
            );

        brand.logoFallback =
            createFaviconUrl(
                domain
            );

        brand.logoLabel =
            fallbackLetters;


        brand.logoVersion =
            LOGO_VERSION;

    }


    /*
     * =================================================
     * UPDATE ALL EXISTING BRANDS
     * =================================================
     */

    function updateExistingBrands() {

        if (
            typeof BRANDS ===
            "undefined"
        ) {
            return;
        }


        Object.keys(BRANDS)
            .forEach(function (key) {

                const brand =
                    BRANDS[key];

                applyLogoToBrand(
                    brand
                );

            });

    }


    /*
     * =================================================
     * FIX ALREADY-RENDERED IMAGES
     * =================================================
     */

    function prepareImage(
        img
    ) {

        if (!img) {
            return;
        }


        const alt =
            String(img.alt || "")
                .trim();


        if (!alt) {
            return;
        }


        const data =
            getLogoData(alt);


        if (!data) {
            return;
        }


        const slug =
            data[0];

        const colour =
            data[1];

        const domain =
            data[2];

        const letters =
            data[3];


        const primary =
            createSimpleIconUrl(
                slug,
                colour
            );


        const favicon =
            createFaviconUrl(
                domain
            );


        const finalFallback =
            createLetterLogo(
                letters
            );


        /*
         * Prevent repeatedly resetting
         * the same image.
         */

        const imageVersion =
            img.dataset.logoVersion;


        if (
            imageVersion ===
            LOGO_VERSION
        ) {
            return;
        }


        img.dataset.logoVersion =
            LOGO_VERSION;


        img.dataset.logoStage =
            "primary";


        img.onerror =
            function () {

                const stage =
                    img.dataset.logoStage;


                /*
                 * Primary logo failed.
                 * Try website favicon.
                 */

                if (
                    stage ===
                    "primary"
                ) {

                    img.dataset.logoStage =
                        "favicon";

                    img.src =
                        favicon;

                    return;
                }


                /*
                 * Favicon failed.
                 * Use final placeholder.
                 */

                img.dataset.logoStage =
                    "final";

                img.onerror = null;

                img.src =
                    finalFallback;

            };


        img.src =
            primary;

    }


    /*
     * =================================================
     * REFRESH ALL LOGO IMAGES
     * =================================================
     */

    function refreshImages() {

        document
            .querySelectorAll(
                "img.brand-logo, " +
                "#productLogo, " +
                ".owned-gift-logo img"
            )
            .forEach(function (img) {

                prepareImage(img);

            });

    }


    /*
     * =================================================
     * OBSERVE DYNAMICALLY CREATED CARDS
     * =================================================
     */

    function startObserver() {

        if (!document.body) {
            return;
        }


        const observer =
            new MutationObserver(
                function () {

                    refreshImages();

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
     * =================================================
     * INITIALISE
     * =================================================
     */

    function initialise() {

        /*
         * STEP 1
         * Fix the actual BRANDS objects.
         */

        updateExistingBrands();


        /*
         * STEP 2
         * Fix cards already on screen.
         */

        refreshImages();


        /*
         * STEP 3
         * Watch cards generated later.
         */

        startObserver();


        /*
         * Extra refreshes because app.js
         * may render products shortly
         * after startup.
         */

        setTimeout(
            function () {

                updateExistingBrands();
                refreshImages();

            },
            300
        );


        setTimeout(
            function () {

                updateExistingBrands();
                refreshImages();

            },
            1000
        );


        setTimeout(
            function () {

                updateExistingBrands();
                refreshImages();

            },
            2000
        );

    }


    /*
     * Start.
     */

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
