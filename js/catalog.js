/* =====================================================
   GIFTCARDSTORE — CATALOG
   LOGO LOADER
   VERSION: 2026-09-16-9
===================================================== */

(function () {

    "use strict";

    const VERSION = "2026-09-16-9";

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
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Domino%27s_2025.svg",

        "Zomato":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Zomato_Logo.svg",

        "Swiggy":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Swiggy_logo.png",

        "BookMyShow":
            "https://cdn.simpleicons.org/bookmyshow/F84464",

        "Nykaa":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Nykaa_New_Logo.svg",

        "Meesho":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Meesho_logo.png",

        "bigbasket":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/BigBasket_Logo.png",

        "Zepto":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Zepto_Logo.svg",

        "Vijay Sales":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/VijaySale-Logo.png",

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


    function clean(name) {

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

        const target = clean(name);

        const key = Object.keys(LOGOS).find(
            function (item) {
                return clean(item) === target;
            }
        );

        return key ? LOGOS[key] : null;

    }


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


    function refreshImages() {

        document
            .querySelectorAll(
                "img.brand-logo, #productLogo, .owned-gift-logo img"
            )
            .forEach(
                function (img) {

                    const name =
                        String(img.alt || "").trim();

                    const logo =
                        getLogo(name);

                    if (!logo) {
                        return;
                    }

                    img.onerror = null;

                    img.src = logo;

                    img.dataset.logoVersion =
                        VERSION;

                }
            );

    }


    function initialise() {

        updateBrands();

        refreshImages();

        setTimeout(
            refreshImages,
            500
        );

        setTimeout(
            refreshImages,
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
