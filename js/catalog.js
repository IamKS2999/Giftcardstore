/* =====================================================
   GIFTCARDSTORE — CATALOG
   VECTOR LOGO SYSTEM
   VERSION: 2026-09-16-13
===================================================== */

(function () {

    "use strict";

    const LOGOS = {

        /* SHOPPING */

        "Amazon":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Amazon_2024.svg",

        "Flipkart":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Flipkart_logo_(2026).svg",

        "Tata CLiQ":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/TATA_Cliq_Logo.jpg",

        "Meesho":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Meesho_logo.png",


        /* FASHION */

        "Myntra":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/65c5da9f878952603e370d03_Myntra-Logo_1.svg",

        "Max Fashion":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Logo_of_Max_Fashion_and_Accessories,_March_2018.png",

        "Shoppers Stop":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Shoppers_Stop_Logo.gif",

        "Levi's":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Levi%27s_logo.svg",

        "Decathlon":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Decathlon_Logo24.svg",

        "FirstCry":
            "https://cdn.simpleicons.org/firstcry/00AEEF",

        "Marks & Spencer":
            "https://cdn.simpleicons.org/marksandspencer/000000",

        "Van Heusen":
            "https://cdn.simpleicons.org/vanheusen/000000",

        "Allen Solly":
            "https://cdn.simpleicons.org/allensolly/000000",

        "Peter England":
            "https://cdn.simpleicons.org/peterengland/003B5C",


        /* ELECTRONICS / HOME */

        "Croma":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Croma_logo.png",

        "Vijay Sales":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/VijaySale-Logo.png",

        "IKEA":
            "https://cdn.simpleicons.org/ikea/0058A3",

        "Pepperfry":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pepperfry_logo.jpg",


        /* FOOD */

        "Domino's":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Domino%27s_2025.svg",

        "Zomato":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Zomato_Logo.svg",

        "Swiggy":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Swiggy_logo.png",

        "Haldiram's":
            "https://cdn.simpleicons.org/haldirams/E31B23",


        /* GROCERY */

        "bigbasket":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/BigBasket_Logo.png",

        "Zepto":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Zepto_Logo.svg",


        /* ENTERTAINMENT */

        "BookMyShow":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/BookMyShow_Logo.svg",

        "PVR":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/PVR_INOX_Logo_After_Merger.png",

        "Spotify":
            "https://cdn.simpleicons.org/spotify/1DB954",

        "Netflix":
            "https://cdn.simpleicons.org/netflix/E50914",

        "Sony LIV":
            "https://cdn.simpleicons.org/sonyliv/000000",

        "ZEE5":
            "https://cdn.simpleicons.org/zee5/8230C6",


        /* TRAVEL */

        "Uber":
            "https://cdn.simpleicons.org/uber/000000",

        "MakeMyTrip":
            "https://cdn.simpleicons.org/makemytrip/E52B50",

        "Cleartrip":
            "https://cdn.simpleicons.org/cleartrip/EF3340",

        "EaseMyTrip":
            "https://cdn.simpleicons.org/easemytrip/000000",

        "Air India":
            "https://cdn.simpleicons.org/airindia/D71920",


        /* BEAUTY / HEALTH */

        "Nykaa":
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Nykaa_New_Logo.svg",

        "Tira":
            "https://cdn.simpleicons.org/tira/000000",

        "The Body Shop":
            "https://cdn.simpleicons.org/thebodyshop/004C3F",

        "Tata 1mg":
            "https://cdn.simpleicons.org/1mg/FF6F61",

        "Netmeds":
            "https://cdn.simpleicons.org/netmeds/00A651",

        "Cult.fit":
            "https://cdn.simpleicons.org/cultfit/000000",


        /* JEWELLERY */

        "Fastrack":
            "https://cdn.simpleicons.org/fastrack/000000",

        "Titan":
            "https://cdn.simpleicons.org/titan/004B87",

        "CaratLane":
            "https://cdn.simpleicons.org/caratlane/000000",

        "Mia by Tanishq":
            "https://cdn.simpleicons.org/tanishq/000000",


        /* GIFTS / BOOKS */

        "Archies":
            "https://cdn.simpleicons.org/archies/000000",

        "Hamleys":
            "https://cdn.simpleicons.org/hamleys/000000",

        "Crossword":
            "https://cdn.simpleicons.org/crossword/000000"

    };


    function clean(name) {

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
                    findLogo(brand.name);

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
                        findLogo(name);

                    if (!logo) {
                        return;
                    }

                    if (
                        img.dataset.gcsLogo === logo
                    ) {
                        return;
                    }

                    img.dataset.gcsLogo = logo;

                    img.onerror = null;

                    img.src = logo;

                }
            );

    }


    function observeCards() {

        const cards =
            document.getElementById("cards");

        if (!cards) {
            return;
        }

        const observer =
            new MutationObserver(
                function () {
                    refreshImages();
                }
            );

        observer.observe(
            cards,
            {
                childList: true,
                subtree: true
            }
        );

    }


    function initialise() {

        updateBrands();

        refreshImages();

        observeCards();

        setTimeout(refreshImages, 500);
        setTimeout(refreshImages, 1500);
        setTimeout(refreshImages, 3000);

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
