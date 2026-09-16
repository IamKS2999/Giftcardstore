/* =====================================================
   GIFTCARDSTORE — EXTENDED CATALOG
   COLOURED BRAND LOGO VERSION
===================================================== */

(function () {

    /*
     * Brand logo helper
     *
     * Uses Simple Icons with the brand's actual colour.
     * If a logo is unavailable, Google favicon is used.
     * Final fallback is a clean two-letter placeholder.
     */

    const logo = (slug, colour, domain, label) => {
        const simpleIcon =
            "https://cdn.simpleicons.org/" +
            slug +
            "/" +
            colour;

        const favicon =
            "https://www.google.com/s2/favicons?domain=" +
            encodeURIComponent(domain) +
            "&sz=128";

        return {
            primary: simpleIcon,
            fallback: favicon,
            label: label
        };
    };


    const BRAND_LOGOS = {

        Zomato: logo(
            "zomato",
            "E23744",
            "zomato.com",
            "ZO"
        ),

        Swiggy: logo(
            "swiggy",
            "FC8019",
            "swiggy.com",
            "SW"
        ),

        Uber: logo(
            "uber",
            "000000",
            "uber.com",
            "UB"
        ),

        BookMyShow: logo(
            "bookmyshow",
            "F84464",
            "bookmyshow.com",
            "BM"
        ),

        PVR: logo(
            "pvr",
            "F5C400",
            "pvrcinemas.com",
            "PV"
        ),

        Nykaa: logo(
            "nykaa",
            "FC2779",
            "nykaa.com",
            "NY"
        ),

        AJIO: logo(
            "ajio",
            "000000",
            "ajio.com",
            "AJ"
        ),

        Westside: logo(
            "westside",
            "000000",
            "westside.com",
            "WE"
        ),

        MaxFashion: logo(
            "max",
            "C8A77A",
            "maxfashion.in",
            "MX"
        ),

        TataCliq: logo(
            "tatacliq",
            "E91E63",
            "tatacliq.com",
            "TC"
        ),

        Meesho: logo(
            "meesho",
            "E5007D",
            "meesho.com",
            "ME"
        ),

        BigBasket: logo(
            "bigbasket",
            "84C225",
            "bigbasket.com",
            "BB"
        ),

        Blinkit: logo(
            "blinkit",
            "F8CB46",
            "blinkit.com",
            "BL"
        ),

        Zepto: logo(
            "zepto",
            "8A2BE2",
            "zeptonow.com",
            "ZE"
        ),

        RelianceDigital: logo(
            "reliancedigital",
            "E42529",
            "reliancedigital.in",
            "RD"
        ),

        VijaySales: logo(
            "vijaysales",
            "E31837",
            "vijaysales.com",
            "VS"
        ),

        IKEA: logo(
            "ikea",
            "0058A3",
            "ikea.com",
            "IK"
        ),

        Lifestyle: logo(
            "lifestyle",
            "000000",
            "lifestylestores.com",
            "LS"
        ),

        ShoppersStop: logo(
            "shoppersstop",
            "D71920",
            "shoppersstop.com",
            "SS"
        ),

        Pantaloons: logo(
            "pantaloons",
            "E40046",
            "pantaloons.com",
            "PA"
        ),

        Levis: logo(
            "levis",
            "C41230",
            "levi.com",
            "LE"
        ),

        Decathlon: logo(
            "decathlon",
            "0082C3",
            "decathlon.in",
            "DE"
        ),

        FirstCry: logo(
            "firstcry",
            "00AEEF",
            "firstcry.com",
            "FC"
        ),

        Pepperfry: logo(
            "pepperfry",
            "D71920",
            "pepperfry.com",
            "PF"
        ),

        Tata1mg: logo(
            "1mg",
            "FF6B6B",
            "1mg.com",
            "1M"
        ),

        Netmeds: logo(
            "netmeds",
            "24A148",
            "netmeds.com",
            "NM"
        ),

        CultFit: logo(
            "cultfit",
            "FF3D71",
            "cult.fit",
            "CF"
        ),

        Spotify: logo(
            "spotify",
            "1DB954",
            "spotify.com",
            "SP"
        ),

        Netflix: logo(
            "netflix",
            "E50914",
            "netflix.com",
            "NF"
        ),

        SonyLiv: logo(
            "sonyliv",
            "000000",
            "sonyliv.com",
            "SL"
        ),

        Zee5: logo(
            "zee5",
            "8230C6",
            "zee5.com",
            "Z5"
        ),

        MakeMyTrip: logo(
            "makemytrip",
            "E52B50",
            "makemytrip.com",
            "MM"
        ),

        Cleartrip: logo(
            "cleartrip",
            "EF3340",
            "cleartrip.com",
            "CT"
        ),

        EaseMyTrip: logo(
            "easemytrip",
            "FF6B00",
            "easemytrip.com",
            "EM"
        ),

        AirIndia: logo(
            "airindia",
            "D71920",
            "airindia.com",
            "AI"
        ),

        Tira: logo(
            "tira",
            "000000",
            "tirabeauty.com",
            "TI"
        ),

        TheBodyShop: logo(
            "thebodyshop",
            "004C3F",
            "thebodyshop.com",
            "BS"
        ),

        Fastrack: logo(
            "fastrack",
            "000000",
            "fastrack.in",
            "FT"
        ),

        Titan: logo(
            "titan",
            "004B87",
            "titan.co.in",
            "TI"
        ),

        CaratLane: logo(
            "caratlane",
            "000000",
            "caratlane.com",
            "CL"
        ),

        Mia: logo(
            "mia",
            "8C1D40",
            "mia.tatacliq.com",
            "MI"
        ),

        Archies: logo(
            "archies",
            "E31B23",
            "archiesonline.com",
            "AR"
        ),

        Hamleys: logo(
            "hamleys",
            "E30613",
            "hamleys.in",
            "HA"
        ),

        Crossword: logo(
            "crossword",
            "E31837",
            "crossword.in",
            "CR"
        ),

        MarksSpencer: logo(
            "marksandspencer",
            "000000",
            "marksandspencer.com",
            "M&S"
        ),

        VanHeusen: logo(
            "vanheusen",
            "000000",
            "vanheusenindia.com",
            "VH"
        ),

        AllenSolly: logo(
            "allensolly",
            "000000",
            "allensolly.com",
            "AS"
        ),

        PeterEngland: logo(
            "peterengland",
            "003B5C",
            "peterengland.com",
            "PE"
        ),

        Haldirams: logo(
            "haldirams",
            "E31B23",
            "haldirams.com",
            "HA"
        ),

        Dominos2: logo(
            "dominos",
            "E31837",
            "dominos.co.in",
            "DO"
        )
    };


    /*
     * Default gift-card denominations
     */

    const defaultValues = [
        500,
        1000,
        2000,
        5000
    ];


    /*
     * Additional brands
     */

    const extraBrands = [

        ["Zomato", "Zomato", "Food", 6],
        ["Swiggy", "Swiggy", "Food", 5],
        ["Uber", "Uber", "Travel", 4],
        ["BookMyShow", "BookMyShow", "Entertainment", 5],
        ["PVR", "PVR", "Entertainment", 5],

        ["Nykaa", "Nykaa", "Beauty", 5],
        ["AJIO", "AJIO", "Fashion", 5],
        ["Westside", "Westside", "Fashion", 5],
        ["MaxFashion", "Max Fashion", "Fashion", 5],

        ["TataCliq", "Tata CLiQ", "Shopping", 4],
        ["Meesho", "Meesho", "Shopping", 4],

        ["BigBasket", "bigbasket", "Food", 5],
        ["Blinkit", "Blinkit", "Food", 5],
        ["Zepto", "Zepto", "Food", 4],

        ["RelianceDigital", "Reliance Digital", "Electronics", 4],
        ["VijaySales", "Vijay Sales", "Electronics", 4],

        ["IKEA", "IKEA", "Shopping", 5],

        ["Lifestyle", "Lifestyle", "Fashion", 5],
        ["ShoppersStop", "Shoppers Stop", "Fashion", 5],
        ["Pantaloons", "Pantaloons", "Fashion", 5],
        ["Levis", "Levi's", "Fashion", 4],

        ["Decathlon", "Decathlon", "Shopping", 4],
        ["FirstCry", "FirstCry", "Shopping", 4],
        ["Pepperfry", "Pepperfry", "Shopping", 4],

        ["Tata1mg", "Tata 1mg", "Shopping", 4],
        ["Netmeds", "Netmeds", "Shopping", 4],

        ["CultFit", "Cult.fit", "Entertainment", 4],

        ["Spotify", "Spotify", "Entertainment", 4],
        ["Netflix", "Netflix", "Entertainment", 3],
        ["SonyLiv", "Sony LIV", "Entertainment", 4],
        ["Zee5", "ZEE5", "Entertainment", 4],

        ["MakeMyTrip", "MakeMyTrip", "Travel", 5],
        ["Cleartrip", "Cleartrip", "Travel", 4],
        ["EaseMyTrip", "EaseMyTrip", "Travel", 4],
        ["AirIndia", "Air India", "Travel", 3],

        ["Tira", "Tira", "Beauty", 5],
        ["TheBodyShop", "The Body Shop", "Beauty", 4],

        ["Fastrack", "Fastrack", "Fashion", 4],
        ["Titan", "Titan", "Fashion", 4],

        ["CaratLane", "CaratLane", "Shopping", 4],
        ["Mia", "Mia by Tanishq", "Shopping", 4],

        ["Archies", "Archies", "Shopping", 4],
        ["Hamleys", "Hamleys", "Shopping", 4],
        ["Crossword", "Crossword", "Shopping", 4],

        ["ShoppersStop2", "Shoppers Stop", "Shopping", 4],

        ["MarksSpencer", "Marks & Spencer", "Fashion", 4],
        ["VanHeusen", "Van Heusen", "Fashion", 4],
        ["AllenSolly", "Allen Solly", "Fashion", 4],
        ["PeterEngland", "Peter England", "Fashion", 4],

        ["Haldirams", "Haldiram's", "Food", 4],

        ["Dominos2", "Domino's", "Food", 15]
    ];


    /*
     * Add brands to BRANDS
     */

    extraBrands.forEach(function (item) {

        const id = item[0];

        if (BRANDS[id]) {
            return;
        }

        const brandName = item[1];

        const logoData =
            BRAND_LOGOS[id] || {
                primary:
                    "https://www.google.com/s2/favicons?domain=" +
                    encodeURIComponent(
                        brandName.toLowerCase().replace(/\s+/g, "") +
                        ".com"
                    ) +
                    "&sz=128",

                fallback: "",
                label:
                    brandName
                        .replace(/[^A-Za-z]/g, "")
                        .substring(0, 2)
                        .toUpperCase()
            };


        BRANDS[id] = {

            id: id,

            name: brandName,

            category: item[2],

            logo: logoData.primary,

            logoFallback: logoData.fallback,

            logoLabel: logoData.label,

            fixedDiscount: item[3],

            customDiscount:
                Math.min(item[3], 5),

            fixedValues:
                defaultValues.slice(),

            custom: {
                enabled: true,
                min: 100,
                max: 10000
            }
        };
    });


    /*
     * Robust logo loading
     *
     * Primary:
     * coloured Simple Icon
     *
     * Secondary:
     * Google favicon
     *
     * Final:
     * clean two-letter SVG
     */

    function createFallbackLogo(label) {

        const safeLabel =
            String(label || "GC")
                .replace(/[<>&'"]/g, "")
                .substring(0, 3)
                .toUpperCase();

        const svg =
            '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">' +
            '<rect width="256" height="256" rx="48" fill="#f3f3f3"/>' +
            '<text x="128" y="142" text-anchor="middle" ' +
            'font-family="Arial,sans-serif" font-size="72" ' +
            'font-weight="700" fill="#222">' +
            safeLabel +
            '</text>' +
            '</svg>';

        return "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(svg);
    }


    function prepareImage(img, brand) {

        if (!img || !brand) {
            return;
        }

        const primary =
            brand.logo || "";

        const secondary =
            brand.logoFallback || "";

        const finalFallback =
            createFallbackLogo(
                brand.logoLabel ||
                brand.name
            );


        img.dataset.logoStage = "primary";


        img.onerror = function () {

            const stage =
                img.dataset.logoStage;


            /*
             * Primary failed → favicon
             */

            if (
                stage === "primary" &&
                secondary
            ) {

                img.dataset.logoStage =
                    "fallback";

                img.src =
                    secondary;

                return;
            }


            /*
             * Favicon failed → generated
             * clean fallback
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
     * Find brand from image attributes
     */

    function findBrandFromImage(img) {

        const alt =
            (img.alt || "")
                .trim()
                .toLowerCase();

        if (!alt) {
            return null;
        }


        return Object.values(BRANDS).find(
            function (brand) {

                return (
                    brand.name
                        .toLowerCase()
                        === alt
                );
            }
        ) || null;
    }


    /*
     * Apply improved logos to all
     * brand cards already rendered.
     */

    function refreshBrandImages() {

        document
            .querySelectorAll(
                "img.brand-logo, " +
                "#productLogo, " +
                ".owned-gift-logo img"
            )
            .forEach(function (img) {

                const brand =
                    findBrandFromImage(img);

                if (brand) {
                    prepareImage(
                        img,
                        brand
                    );
                }
            });
    }


    /*
     * Watch for dynamically rendered
     * product cards and modals.
     */

    function observeBrandImages() {

        const observer =
            new MutationObserver(
                function () {
                    refreshBrandImages();
                }
            );


        if (document.body) {

            observer.observe(
                document.body,
                {
                    childList: true,
                    subtree: true
                }
            );
        }
    }


    /*
     * Start after page load.
     */

    function initialiseCatalogLogos() {

        refreshBrandImages();

        observeBrandImages();

        setTimeout(
            refreshBrandImages,
            300
        );

        setTimeout(
            refreshBrandImages,
            1000
        );
    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialiseCatalogLogos
        );

    } else {

        initialiseCatalogLogos();
    }


})();
