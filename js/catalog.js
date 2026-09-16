/* =====================================================
   GIFTCARDSTORE — CATALOG
   VERIFIED LOGO SYSTEM
   VERSION: 2026-09-16-7
===================================================== */

(function () {

    "use strict";

    const VERSION = "2026-09-16-7";

    const LOGOS = {

        "Amazon":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Amazon_2024.svg",

        "Flipkart":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Flipkart_logo_(2026).svg",

        "Myntra":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/65c5da9f878952603e370d03_Myntra-Logo_1.svg",

        "Croma":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Croma_logo.png",

        "Domino's":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Domino%27s_pizza_logo.svg",

        "Zomato":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Zomato_Logo.svg",

        "Swiggy":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Swiggy_logo.png",

        "Zepto":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Zepto_Logo.svg",

        "BookMyShow":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Bookmyshow-logoid.png",

        "Blinkit":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Blinkit-yellow-rounded.svg",

        "Pepperfry":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pepperfry_logo.svg",

        "Nykaa":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Nykaa_New_Logo.svg",

        "Meesho":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Meesho_logo.png",

        "IKEA":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ikea_logo.svg",

        "Westside":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Westside_logo.png",

        "Max Fashion":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Logo_of_Max_Fashion_and_Accessories,_March_2018.png",

        "Shoppers Stop":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Shoppers_Stop_Logo.gif"

    };


    function normalise(name) {

        return String(name || "")
            .toLowerCase()
            .replace(/['’]/g, "")
            .replace(/&/g, "and")
            .replace(/[^a-z0-9]/g, "");

    }


    function getLogo(name) {

        if (LOGOS[name]) {
            return LOGOS[name];
        }

        const wanted =
            normalise(name);

        const key =
            Object.keys(LOGOS).find(
                function (item) {
                    return normalise(item) === wanted;
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
                    getLogo(brand.name);

                if (!logo) {
                    return;
                }

                brand.logo =
                    logo;

                brand.logoVersion =
                    VERSION;

            }
        );

    }


    function refreshLogos() {

        document
            .querySelectorAll(
                "img.brand-logo, #productLogo, .owned-gift-logo img"
            )
            .forEach(
                function (img) {

                    const name =
                        String(
                            img.alt || ""
                        ).trim();

                    const logo =
                        getLogo(name);

                    if (!logo) {
                        return;
                    }

                    img.src =
                        logo;

                    img.dataset.logoVersion =
                        VERSION;

                }
            );

    }


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
