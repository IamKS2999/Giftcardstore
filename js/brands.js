/* =====================================================
   GIFT CARD STORE — BRAND DATABASE
   Full Catalog + Stable Logo Sources
===================================================== */

const LOGO = "https://commons.wikimedia.org/wiki/Special:Redirect/file/";

const BRAND_LOGOS = {

    Amazon:
        LOGO + "Amazon_2024.svg",

    Flipkart:
        LOGO + "Flipkart_logo_(2026).svg",

    TataCLiQ:
        LOGO + "TATA_Cliq_Logo.jpg",

    Meesho:
        LOGO + "Meesho_logo.png",

    Myntra:
        LOGO + "65c5da9f878952603e370d03_Myntra-Logo_1.svg",

    MaxFashion:
        LOGO + "Logo_of_Max_Fashion_and_Accessories,_March_2018.png",

    ShoppersStop:
        LOGO + "Shoppers_Stop_Logo.gif",

    Levis:
        LOGO + "Levi%27s_logo.svg",

    Decathlon:
        LOGO + "Decathlon_Logo24.svg",

    FirstCry:
        LOGO + "FirstCry_logo.svg",

    Croma:
        LOGO + "Croma_logo.png",

    RelianceDigital:
        LOGO + "Reliance_Digital.svg",

    VijaySales:
        LOGO + "VijaySale-Logo.png",

    IKEA:
        LOGO + "Ikea_logo.svg",

    Pepperfry:
        LOGO + "Pepperfry_logo.jpg",

    Domino:
        LOGO + "Domino%27s_2025.svg",

    Zomato:
        LOGO + "Zomato_Logo.svg",

    Swiggy:
        LOGO + "Swiggy_logo.png",

    BigBasket:
        LOGO + "BigBasket_Logo.png",

    Blinkit:
        LOGO + "Blinkit-yellow-rounded.svg",

    Zepto:
        LOGO + "Zepto_Logo.svg",

    BookMyShow:
        LOGO + "Bookmyshow-logoid.png",

    Spotify:
        LOGO + "2024_Spotify_Logo.svg",

    Netflix:
        LOGO + "Netflix_2015_logo.svg",

    SonyLIV:
        LOGO + "SonyLIV_2020.png",

    ZEE5:
        LOGO + "ZEE5_2025.svg",

    Uber:
        LOGO + "Uber_logo_2018.svg",

    MakeMyTrip:
        LOGO + "Makemytrip_logo.svg",

    Cleartrip:
        LOGO + "Cleartrip_Original.svg",

    EaseMyTrip:
        LOGO + "EaseMyTrip_Logo.svg",

    Nykaa:
        LOGO + "Nykaa_New_Logo.svg",

    PeterEngland:
        LOGO + "Peter_England_logo.svg"
};


/* =====================================================
   FALLBACK — OFFICIAL DOMAIN ICON
===================================================== */

const DOMAIN_LOGOS = {

    AJIO: "ajio.com",
    Westside: "westside.com",
    Lifestyle: "lifestylestores.com",
    Pantaloons: "pantaloons.com",
    Haldirams: "haldirams.com",
    PVR: "pvrcinemas.com",
    AirIndia: "airindia.com",
    Tira: "tirabeauty.com",
    TheBodyShop: "thebodyshop.in",
    Tata1mg: "1mg.com",
    Netmeds: "netmeds.com",
    CultFit: "cult.fit",
    Fastrack: "fastrack.in",
    Titan: "titan.co.in",
    CaratLane: "caratlane.com",
    MiaByTanishq: "mia.tanishq.co.in",
    Archies: "archiesonline.com",
    Hamleys: "hamleys.in",
    Crossword: "crossword.in",
    MarksAndSpencer: "marksandspencer.in",
    VanHeusen: "vanheusenindia.com",
    AllenSolly: "allensolly.com"
};


function getLogo(brandId) {

    if (BRAND_LOGOS[brandId]) {
        return BRAND_LOGOS[brandId];
    }

    if (DOMAIN_LOGOS[brandId]) {
        return "https://www.google.com/s2/favicons?domain=" +
            DOMAIN_LOGOS[brandId] +
            "&sz=256";
    }

    return "";
}


/* =====================================================
   BRAND FACTORY
===================================================== */

function createBrand(
    id,
    name,
    category,
    fixedDiscount = 5,
    customDiscount = 5,
    fixedValues = [500, 1000, 2000, 5000]
) {

    return {
        id: id,
        name: name,
        category: category,
        logo: getLogo(id),
        fixedDiscount: fixedDiscount,
        customDiscount: customDiscount,
        fixedValues: fixedValues,
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    };
}


/* =====================================================
   BRAND DATABASE
===================================================== */

const BRANDS = {

    Amazon:
        createBrand("Amazon", "Amazon", "Shopping", 3, 3),

    Flipkart:
        createBrand("Flipkart", "Flipkart", "Shopping", 3.5, 3.5),

    TataCLiQ:
        createBrand("TataCLiQ", "Tata CLiQ", "Shopping"),

    Meesho:
        createBrand("Meesho", "Meesho", "Shopping"),

    Myntra:
        createBrand("Myntra", "Myntra", "Fashion"),

    AJIO:
        createBrand("AJIO", "AJIO", "Fashion"),

    Westside:
        createBrand("Westside", "Westside", "Fashion"),

    MaxFashion:
        createBrand("MaxFashion", "Max Fashion", "Fashion"),

    Lifestyle:
        createBrand("Lifestyle", "Lifestyle", "Fashion"),

    ShoppersStop:
        createBrand("ShoppersStop", "Shoppers Stop", "Fashion"),

    Pantaloons:
        createBrand("Pantaloons", "Pantaloons", "Fashion"),

    Levis:
        createBrand("Levis", "Levi's", "Fashion"),

    Decathlon:
        createBrand("Decathlon", "Decathlon", "Fashion"),

    FirstCry:
        createBrand("FirstCry", "FirstCry", "Fashion"),

    Croma:
        createBrand("Croma", "Croma", "Electronics"),

    RelianceDigital:
        createBrand("RelianceDigital", "Reliance Digital", "Electronics"),

    VijaySales:
        createBrand("VijaySales", "Vijay Sales", "Electronics"),

    IKEA:
        createBrand("IKEA", "IKEA", "Home"),

    Pepperfry:
        createBrand("Pepperfry", "Pepperfry", "Home"),

    Domino:
        createBrand("Domino", "Domino's", "Food", 15, 5),

    Zomato:
        createBrand("Zomato", "Zomato", "Food"),

    Swiggy:
        createBrand("Swiggy", "Swiggy", "Food"),

    Haldirams:
        createBrand("Haldirams", "Haldiram's", "Food"),

    BigBasket:
        createBrand("BigBasket", "bigbasket", "Grocery"),

    Blinkit:
        createBrand("Blinkit", "Blinkit", "Grocery"),

    Zepto:
        createBrand("Zepto", "Zepto", "Grocery"),

    BookMyShow:
        createBrand("BookMyShow", "BookMyShow", "Entertainment"),

    PVR:
        createBrand("PVR", "PVR", "Entertainment"),

    Spotify:
        createBrand("Spotify", "Spotify", "Entertainment"),

    Netflix:
        createBrand("Netflix", "Netflix", "Entertainment"),

    SonyLIV:
        createBrand("SonyLIV", "Sony LIV", "Entertainment"),

    ZEE5:
        createBrand("ZEE5", "ZEE5", "Entertainment"),

    Uber:
        createBrand("Uber", "Uber", "Travel"),

    MakeMyTrip:
        createBrand("MakeMyTrip", "MakeMyTrip", "Travel"),

    Cleartrip:
        createBrand("Cleartrip", "Cleartrip", "Travel"),

    EaseMyTrip:
        createBrand("EaseMyTrip", "EaseMyTrip", "Travel"),

    AirIndia:
        createBrand("AirIndia", "Air India", "Travel"),

    Nykaa:
        createBrand("Nykaa", "Nykaa", "Beauty"),

    Tira:
        createBrand("Tira", "Tira", "Beauty"),

    TheBodyShop:
        createBrand("TheBodyShop", "The Body Shop", "Beauty"),

    Tata1mg:
        createBrand("Tata1mg", "Tata 1mg", "Health"),

    Netmeds:
        createBrand("Netmeds", "Netmeds", "Health"),

    CultFit:
        createBrand("CultFit", "Cult.fit", "Health"),

    Fastrack:
        createBrand("Fastrack", "Fastrack", "Jewellery"),

    Titan:
        createBrand("Titan", "Titan", "Jewellery"),

    CaratLane:
        createBrand("CaratLane", "CaratLane", "Jewellery"),

    MiaByTanishq:
        createBrand("MiaByTanishq", "Mia by Tanishq", "Jewellery"),

    Archies:
        createBrand("Archies", "Archies", "Gifts"),

    Hamleys:
        createBrand("Hamleys", "Hamleys", "Gifts"),

    Crossword:
        createBrand("Crossword", "Crossword", "Books"),

    MarksAndSpencer:
        createBrand("MarksAndSpencer", "Marks & Spencer", "Fashion"),

    VanHeusen:
        createBrand("VanHeusen", "Van Heusen", "Fashion"),

    AllenSolly:
        createBrand("AllenSolly", "Allen Solly", "Fashion"),

    PeterEngland:
        createBrand("PeterEngland", "Peter England", "Fashion")
};


/* =====================================================
   BRAND HELPERS
===================================================== */

function getBrand(brandId) {
    return BRANDS[brandId] || null;
}


function getAllBrands() {
    return Object.values(BRANDS);
}


function getBrandsByCategory(category) {

    if (category === "All") {
        return getAllBrands();
    }

    return getAllBrands().filter(
        brand => brand.category === category
    );
}


function getBrandDiscount(
    brandId,
    mode = "fixed"
) {

    const brand = getBrand(brandId);

    if (!brand) {
        return 0;
    }

    return mode === "custom"
        ? brand.customDiscount
        : brand.fixedDiscount;
}
