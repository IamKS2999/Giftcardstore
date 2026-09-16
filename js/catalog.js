/* =====================================================
   GIFTCARDSTORE — CATALOG
   CRISP VECTOR LOGO SYSTEM
   VERSION: 2026-09-16-4
===================================================== */

(function () {

    "use strict";

    const VERSION = "20260916-4";


    /* ==================================================
       BRAND LOGO DATABASE

       [simple-icons slug, colour, fallback colour]
       ================================================== */

    const LOGOS = {

        "Domino's": ["dominos", "E31837", "#E31837"],
        "Zomato": ["zomato", "E23744", "#E23744"],
        "Swiggy": ["swiggy", "FC8019", "#FC8019"],
        "Uber": ["uber", "000000", "#000000"],

        "BookMyShow": ["bookmyshow", "F84464", "#F84464"],
        "PVR": ["pvr", "F5C400", "#F5C400"],

        "Nykaa": ["nykaa", "FC2779", "#FC2779"],
        "AJIO": ["ajio", "000000", "#000000"],
        "Westside": ["westside", "000000", "#000000"],
        "Max Fashion": ["max", "C8A77A", "#C8A77A"],

        "Tata CLiQ": ["tatacliq", "E91E63", "#E91E63"],
        "Meesho": ["meesho", "E5007D", "#E5007D"],

        "bigbasket": ["bigbasket", "84C225", "#84C225"],
        "Blinkit": ["blinkit", "F8CB46", "#F8CB46"],
        "Zepto": ["zepto", "8A2BE2", "#8A2BE2"],

        "Reliance Digital": [
            "reliancedigital",
            "E42529",
            "#E42529"
        ],

        "Vijay Sales": [
            "vijaysales",
            "E31837",
            "#E31837"
        ],

        "IKEA": ["ikea", "0058A3", "#0058A3"],
        "Lifestyle": ["lifestyle", "000000", "#000000"],

        "Shoppers Stop": [
            "shoppersstop",
            "D71920",
            "#D71920"
        ],

        "Pantaloons": [
            "pantaloons",
            "E40046",
            "#E40046"
        ],

        "Levi's": [
            "levis",
            "C41230",
            "#C41230"
        ],

        "Decathlon": [
            "decathlon",
            "0082C3",
            "#0082C3"
        ],

        "FirstCry": [
            "firstcry",
            "00AEEF",
            "#00AEEF"
        ],

        "Pepperfry": [
            "pepperfry",
            "D71920",
            "#D71920"
        ],

        "Tata 1mg": [
            "1mg",
            "FF6B6B",
            "#FF6B6B"
        ],

        "Netmeds": [
            "netmeds",
            "24A148",
            "#24A148"
        ],

        "Cult.fit": [
            "cultfit",
            "FF3D71",
            "#FF3D71"
        ],

        "Spotify": [
            "spotify",
            "1DB954",
            "#1DB954"
        ],

        "Netflix": [
            "netflix",
            "E50914",
            "#E50914"
        ],

        "Sony LIV": [
            "sonyliv",
            "000000",
            "#000000"
        ],

        "ZEE5": [
            "zee5",
            "8230C6",
            "#8230C6"
        ],

        "MakeMyTrip": [
            "makemytrip",
            "E52B50",
            "#E52B50"
        ],

        "Cleartrip": [
            "cleartrip",
            "EF3340",
            "#EF3340"
        ],

        "EaseMyTrip": [
            "easemytrip",
            "FF6B00",
            "#FF6B00"
        ],

        "Air India": [
            "airindia",
            "D71920",
            "#D71920"
        ],

        "Tira": [
            "tira",
            "000000",
            "#000000"
        ],

        "The Body Shop": [
            "thebodyshop",
            "004C3F",
            "#004C3F"
        ],

        "Fastrack": [
            "fastrack",
            "000000",
            "#000000"
        ],

        "Titan": [
            "titan",
            "004B87",
            "#004B87"
        ],

        "CaratLane": [
            "caratlane",
            "000000",
            "#000000"
        ],

        "Mia by Tanishq": [
            "mia",
            "8C1D40",
            "#8C1D40"
        ],

        "Archies": [
            null,
            "E31B23",
            "#E31B23"
        ],

        "Hamleys": [
            null,
            "E30613",
            "#E30613"
        ],

        "Crossword": [
            null,
            "E31837",
            "#E31837"
        ],

        "Marks & Spencer": [
            "marksandspencer",
            "000000",
            "#000000"
        ],

        "Van Heusen": [
            "vanheusen",
            "000000",
            "#000000"
        ],

        "Allen Solly": [
            "allensolly",
            "000000",
            "#000000"
        ],

        "Peter England": [
            "peterengland",
            "003B5C",
            "#003B5C"
        ],

        "Haldiram's": [
            "haldirams",
            "E31B23",
            "#E31B23"
        ]
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

        const wanted =
            cleanName(name);

        const key =
            Object.keys(LOGOS).find(
                function (item) {

                    return (
                        cleanName(item)
                        === wanted
                    );

                }
            );

        return key
            ? LOGOS[key]
            : null;
    }


    /* ==================================================
       SIMPLE ICON SVG
       ================================================== */

    function simpleIcon(
        slug,
        colour
    ) {

        return (
            "https://cdn.simpleicons.org/" +
            slug +
            "/" +
            colour +
            "?v=" +
            VERSION
        );

    }


    /* ==================================================
       CRISP VECTOR WORDMARK

       Used instead of blurry favicons when a brand
       does not have a Simple Icons entry.
       ================================================== */

    function wordmarkLogo(
        name,
        colour
    ) {

        let display =
            String(name || "")
                .replace(
                    /['’]/g,
                    ""
                );


        /*
         * Special visual treatments for brands
         * whose logos don't exist in Simple Icons.
         */

        if (
            cleanName(name) ===
            "archies"
        ) {

            return svgData(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300">' +

                '<path d="M300 250 C270 220 90 125 150 55 C190 10 250 35 300 95 C350 35 410 10 450 55 C510 125 330 220 300 250Z" ' +
                'fill="' + colour + '"/>' +

                '<text x="300" y="170" text-anchor="middle" ' +
                'font-family="Arial,sans-serif" font-size="90" ' +
                'font-weight="700" fill="white">a</text>' +

                '</svg>'
            );

        }


        if (
            cleanName(name) ===
            "hamleys"
        ) {

            return svgData(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 300">' +

                '<text x="350" y="205" text-anchor="middle" ' +
                'font-family="Georgia,serif" font-size="170" ' +
                'font-style="italic" font-weight="600" ' +
                'fill="' + colour + '">H</text>' +

                '</svg>'
            );

        }


        if (
            cleanName(name) ===
            "crossword"
        ) {

            return svgData(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">' +

                '<rect width="500" height="500" rx="70" fill="#FFD600"/>' +

                '<path d="M145 130 H315 V175 H200 V215 H300 V260 H200 V315 H325 V365 H145 Z" ' +
                'fill="#222"/>' +

                '</svg>'
            );

        }


        if (
            cleanName(name) ===
            "shoppersstop"
        ) {

            return svgData(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">' +

                '<rect width="500" height="500" fill="#050505"/>' +

                '<text x="250" y="335" text-anchor="middle" ' +
                'font-family="Georgia,serif" font-size="300" ' +
                'font-weight="700" fill="white">S</text>' +

                '</svg>'
            );

        }


        /*
         * General crisp wordmark.
         */

        const short =
            display
                .substring(0, 18);


        return svgData(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300">' +

            '<text x="450" y="190" text-anchor="middle" ' +
            'font-family="Arial,sans-serif" font-size="100" ' +
            'font-weight="700" fill="' + colour + '">' +

            escapeXML(short) +

            '</text>' +

            '</svg>'
        );

    }


    /* ==================================================
       SVG HELPERS
       ================================================== */

    function escapeXML(text) {

        return String(text || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");

    }


    function svgData(svg) {

        return (
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(svg)
        );

    }


    /* ==================================================
       APPLY TO EXISTING BRANDS
       ================================================== */

    function updateBrands() {

        if (
            typeof BRANDS ===
            "undefined"
        ) {
            return;
        }


        Object.keys(BRANDS)
            .forEach(
                function (id) {

                    const brand =
                        BRANDS[id];


                    if (
                        !brand ||
                        !brand.name
                    ) {
                        return;
                    }


                    const config =
                        getConfig(
                            brand.name
                        );


                    if (!config) {
                        return;
                    }


                    const slug =
                        config[0];

                    const colour =
                        config[1];

                    const hex =
                        config[2];


                    /*
                     * If Simple Icons has the brand,
                     * use the real vector icon.
                     */

                    if (slug) {

                        brand.logo =
                            simpleIcon(
                                slug,
                                colour
                            );

                    }

                    /*
                     * Otherwise use our own crisp
                     * vector SVG.
                     */

                    else {

                        brand.logo =
                            wordmarkLogo(
                                brand.name,
                                hex
                            );

                    }


                    /*
                     * IMPORTANT:
                     * No favicon fallback anymore.
                     */

                    brand.logoFallback =
                        null;

                    brand.logoVersion =
                        VERSION;

                }
            );

    }


    /* ==================================================
       LOAD IMAGE
       ================================================== */

    function loadLogo(img) {

        if (!img) {
            return;
        }


        const name =
            String(
                img.alt || ""
            ).trim();


        if (!name) {
            return;
        }


        const config =
            getConfig(name);


        if (!config) {
            return;
        }


        const slug =
            config[0];

        const colour =
            config[1];

        const hex =
            config[2];


        let source;


        /*
         * Real vector icon.
         */

        if (slug) {

            source =
                simpleIcon(
                    slug,
                    colour
                );

        }

        /*
         * Crisp custom SVG.
         */

        else {

            source =
                wordmarkLogo(
                    name,
                    hex
                );

        }


        /*
         * Prevent unnecessary reloads.
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
            "vector";


        img.onerror =
            function () {

                /*
                 * If a Simple Icon unexpectedly
                 * fails, immediately replace it
                 * with our crisp SVG wordmark.
                 */

                img.onerror = null;


                img.src =
                    wordmarkLogo(
                        name,
                        hex
                    );

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
       WATCH DYNAMIC CONTENT
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
