/* =====================================================
   GIFTCARDSTORE — CATALOG
   COMPLETE LOGO SYSTEM
   VERSION: 2026-09-16-12
===================================================== */

(function () {

    "use strict";

    const VERSION = "2026-09-16-12";

    /*
     * Verified logo files where we already know they work.
     * Everything else uses the brand's own website icon.
     */

    const VERIFIED = {

        "Amazon":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Amazon_2024.svg",

        "Flipkart":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Flipkart_logo_(2026).svg",

        "Myntra":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/65c5da9f878952603e370d03_Myntra-Logo_1.svg",

        "Croma":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Croma_logo.png",

        "Domino's":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Domino%27s_2025.svg",

        "Zomato":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Zomato_Logo.svg",

        "Swiggy":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Swiggy_logo.png",

        "Meesho":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Meesho_logo.png",

        "bigbasket":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/BigBasket_Logo.png",

        "Zepto":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Zepto_Logo.svg",

        "Vijay Sales":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/VijaySale-Logo.png",

        "Nykaa":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Nykaa_New_Logo.svg",

        "Max Fashion":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Logo_of_Max_Fashion_and_Accessories,_March_2018.png"

    };


    /*
     * Official website domains.
     * Used to obtain the brand's current website icon.
     */

    const DOMAINS = {

        /* Shopping */
        "Amazon": "amazon.in",
        "Flipkart": "flipkart.com",
        "Tata CLiQ": "tatacliq.com",
        "Meesho": "meesho.com",

        /* Fashion */
        "Myntra": "myntra.com",
        "AJIO": "ajio.com",
        "Westside": "westside.com",
        "Max Fashion": "maxfashion.in",
        "Lifestyle": "lifestylestores.com",
        "Shoppers Stop": "shoppersstop.com",
        "Pantaloons": "pantaloons.com",
        "Levi's": "levi.in",
        "Decathlon": "decathlon.in",
        "FirstCry": "firstcry.com",
        "Marks & Spencer": "marksandspencer.in",
        "Van Heusen": "vanheusenindia.com",
        "Allen Solly": "allensolly.com",
        "Peter England": "peterengland.com",

        /* Electronics / Home */
        "Croma": "croma.com",
        "Reliance Digital": "reliancedigital.in",
        "Vijay Sales": "vijaysales.com",
        "IKEA": "ikea.com",
        "Pepperfry": "pepperfry.com",

        /* Food */
        "Domino's": "dominos.co.in",
        "Zomato": "zomato.com",
        "Swiggy": "swiggy.com",
        "Haldiram's": "haldirams.com",

        /* Grocery */
        "bigbasket": "bigbasket.com",
        "Blinkit": "blinkit.com",
        "Zepto": "zepto.com",

        /* Entertainment */
        "BookMyShow": "bookmyshow.com",
        "PVR": "pvrcinemas.com",
        "Spotify": "spotify.com",
        "Netflix": "netflix.com",
        "Sony LIV": "sonyliv.com",
        "ZEE5": "zee5.com",

        /* Travel */
        "Uber": "uber.com",
        "MakeMyTrip": "makemytrip.com",
        "Cleartrip": "cleartrip.com",
        "EaseMyTrip": "easemytrip.com",
        "Air India": "airindia.com",

        /* Beauty / Health */
        "Nykaa": "nykaa.com",
        "Tira": "tirabeauty.com",
        "The Body Shop": "thebodyshop.in",
        "Tata 1mg": "1mg.com",
        "Netmeds": "netmeds.com",
        "Cult.fit": "cult.fit",

        /* Jewellery */
        "Fastrack": "fastrack.in",
        "Titan": "titan.co.in",
        "CaratLane": "caratlane.com",
        "Mia by Tanishq": "miyatiss.com",

        /* Gifts / Books */
        "Archies": "archiesonline.com",
        "Hamleys": "hamleys.in",
        "Crossword": "crossword.in"

    };


    /*
     * Normalise brand names so small spelling differences
     * do not break the lookup.
     */

    function clean(name) {

        return String(name || "")
            .toLowerCase()
            .replace(/['’]/g, "")
            .replace(/&/g, "and")
            .replace(/[^a-z0-9]/g, "");

    }


    function findObjectKey(object, name) {

        if (object[name]) {
            return name;
        }

        const target = clean(name);

        return Object.keys(object).find(
            function (key) {
                return clean(key) === target;
            }
        ) || null;

    }


    /*
     * Google retrieves the current favicon from the
     * specified official brand domain.
     */

    function websiteLogo(domain) {

        return (
            "https://www.google.com/s2/favicons" +
            "?domain=" +
            encodeURIComponent(domain) +
            "&sz=256"
        );

    }


    /*
     * Get the best available logo.
     */

    function getLogo(name) {

        const verifiedKey =
            findObjectKey(VERIFIED, name);

        if (verifiedKey) {
            return VERIFIED[verifiedKey];
        }

        const domainKey =
            findObjectKey(DOMAINS, name);

        if (domainKey) {
            return websiteLogo(DOMAINS[domainKey]);
        }

        return null;

    }


    /*
     * Update BRANDS before products are created.
     */

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

                const logo =
                    getLogo(brand.name);

                if (logo) {
                    brand.logo = logo;
                }

            }
        );

    }


    /*
     * Refresh images already present on screen.
     */

    function refreshImages() {

        const images =
            document.querySelectorAll(
                "img.brand-logo, #productLogo, .owned-gift-logo img"
            );

        images.forEach(
            function (img) {

                const name =
                    String(img.alt || "").trim();

                if (!name) {
                    return;
                }

                const logo =
                    getLogo(name);

                if (!logo) {
                    return;
                }

                if (
                    img.dataset.gcsLogo === logo
                ) {
                    return;
                }

                img.dataset.gcsLogo = logo;

                img.onerror = function () {

                    /*
                     * If the verified/website image fails,
                     * try the website favicon once.
                     */

                    const domainKey =
                        findObjectKey(DOMAINS, name);

                    if (!domainKey) {
                        return;
                    }

                    const fallback =
                        websiteLogo(
                            DOMAINS[domainKey]
                        );

                    if (
                        img.dataset.gcsFallback !== fallback
                    ) {

                        img.dataset.gcsFallback =
                            fallback;

                        img.onerror = null;
                        img.src = fallback;

                    }

                };

                img.src = logo;

            }
        );

    }


    /*
     * Watch the catalog because cards are generated
     * dynamically by the application.
     */

    function startObserver() {

        if (
            typeof MutationObserver === "undefined"
        ) {
            return;
        }

        const target =
            document.getElementById("cards");

        if (!target) {
            return;
        }

        const observer =
            new MutationObserver(
                function () {
                    refreshImages();
                }
            );

        observer.observe(
            target,
            {
                childList: true,
                subtree: true
            }
        );

    }


    /*
     * Initialise everything.
     */

    function initialise() {

        updateBrands();

        refreshImages();

        startObserver();

        setTimeout(
            refreshImages,
            300
        );

        setTimeout(
            refreshImages,
            1000
        );

        setTimeout(
            refreshImages,
            2500
        );

        setTimeout(
            refreshImages,
            5000
        );

    }


    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialise
        );

    } else {

        initialise();

    }

})();
