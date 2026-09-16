/* =====================================================
   GIFT CARD STORE — BRAND DATABASE
   Full Catalog + Local User-Provided Logos
   VERSION: 2026-09-16-19
===================================================== */

const LOCAL_LOGOS = {
    TataCLiQ: "logos/tata-cliq.png",
    Meesho: "logos/meesho.jpg",
    AJIO: "logos/ajio.png",
    Westside: "logos/westside.png",
    MaxFashion: "logos/max-fashion.jpg",
    Lifestyle: "logos/lifestyle.png",
    ShoppersStop: "logos/shoppers-stop.jpg",
    AllenSolly: "logos/allen-solly.png",
    FirstCry: "logos/firstcry.png",
    Netmeds: "logos/netmeds.png",
    MiaByTanishq: "logos/mia-by-tanishq.png",
    Crossword: "logos/crossword.png",
};

const REMOTE_LOGOS = {
    Amazon: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Amazon_2024.svg",
    Flipkart: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Flipkart_logo_(2026).svg",
    Myntra: "https://commons.wikimedia.org/wiki/Special:Redirect/file/65c5da9f878952603e370d03_Myntra-Logo_1.svg",
    Levis: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Levi%27s_logo.svg",
    Decathlon: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Decathlon_Logo24.svg",
    Croma: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Croma_logo.png",
    RelianceDigital: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Reliance_Digital.svg",
    VijaySales: "https://commons.wikimedia.org/wiki/Special:Redirect/file/VijaySale-Logo.png",
    IKEA: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ikea_logo.svg",
    Pepperfry: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pepperfry_logo.jpg",
    Domino: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Domino%27s_2025.svg",
    Zomato: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Zomato_Logo.svg",
    Swiggy: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Swiggy_logo.png",
    BigBasket: "https://commons.wikimedia.org/wiki/Special:Redirect/file/BigBasket_Logo.png",
    Blinkit: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Blinkit-yellow-rounded.svg",
    Zepto: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Zepto_Logo.svg",
    BookMyShow: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Bookmyshow-logoid.png",
    Spotify: "https://commons.wikimedia.org/wiki/Special:Redirect/file/2024_Spotify_Logo.svg",
    Netflix: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Netflix_2015_logo.svg",
    SonyLIV: "https://commons.wikimedia.org/wiki/Special:Redirect/file/SonyLIV_2020.png",
    ZEE5: "https://commons.wikimedia.org/wiki/Special:Redirect/file/ZEE5_2025.svg",
    Uber: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Uber_logo_2018.svg",
    MakeMyTrip: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Makemytrip_logo.svg",
    Cleartrip: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cleartrip_Original.svg",
    EaseMyTrip: "https://commons.wikimedia.org/wiki/Special:Redirect/file/EaseMyTrip_Logo.svg",
    Nykaa: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Nykaa_New_Logo.svg",
    PeterEngland: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Peter_England_logo.svg",
};

function getLogo(brandId) {
    if (LOCAL_LOGOS[brandId]) return LOCAL_LOGOS[brandId];
    if (REMOTE_LOGOS[brandId]) return REMOTE_LOGOS[brandId];
    return '';
};

function createBrand(id, name, category, fixedDiscount = 5, customDiscount = 5, fixedValues = [500, 1000, 2000, 5000]) {
    return {
        id, name, category, logo: getLogo(id),
        fixedDiscount, customDiscount, fixedValues,
        custom: { enabled: true, min: 100, max: 10000 }
    };
};

const BRANDS = {
    Amazon: createBrand("Amazon", "Amazon", "Shopping", 3, 3),
    Flipkart: createBrand("Flipkart", "Flipkart", "Shopping", 3.5, 3.5),
    TataCLiQ: createBrand("TataCLiQ", "Tata CLiQ", "Shopping", 5, 5),
    Meesho: createBrand("Meesho", "Meesho", "Shopping", 5, 5),
    Myntra: createBrand("Myntra", "Myntra", "Fashion", 5, 5),
    AJIO: createBrand("AJIO", "AJIO", "Fashion", 5, 5),
    Westside: createBrand("Westside", "Westside", "Fashion", 5, 5),
    MaxFashion: createBrand("MaxFashion", "Max Fashion", "Fashion", 5, 5),
    Lifestyle: createBrand("Lifestyle", "Lifestyle", "Fashion", 5, 5),
    ShoppersStop: createBrand("ShoppersStop", "Shoppers Stop", "Fashion", 5, 5),
    Pantaloons: createBrand("Pantaloons", "Pantaloons", "Fashion", 5, 5),
    Levis: createBrand("Levis", "Levi's", "Fashion", 5, 5),
    Decathlon: createBrand("Decathlon", "Decathlon", "Fashion", 5, 5),
    FirstCry: createBrand("FirstCry", "FirstCry", "Fashion", 5, 5),
    Croma: createBrand("Croma", "Croma", "Electronics", 5, 5),
    RelianceDigital: createBrand("RelianceDigital", "Reliance Digital", "Electronics", 5, 5),
    VijaySales: createBrand("VijaySales", "Vijay Sales", "Electronics", 5, 5),
    IKEA: createBrand("IKEA", "IKEA", "Home", 5, 5),
    Pepperfry: createBrand("Pepperfry", "Pepperfry", "Home", 5, 5),
    Domino: createBrand("Domino", "Domino's", "Food", 15, 5),
    Zomato: createBrand("Zomato", "Zomato", "Food", 5, 5),
    Swiggy: createBrand("Swiggy", "Swiggy", "Food", 5, 5),
    Haldirams: createBrand("Haldirams", "Haldiram's", "Food", 5, 5),
    BigBasket: createBrand("BigBasket", "bigbasket", "Grocery", 5, 5),
    Blinkit: createBrand("Blinkit", "Blinkit", "Grocery", 5, 5),
    Zepto: createBrand("Zepto", "Zepto", "Grocery", 5, 5),
    BookMyShow: createBrand("BookMyShow", "BookMyShow", "Entertainment", 5, 5),
    PVR: createBrand("PVR", "PVR", "Entertainment", 5, 5),
    Spotify: createBrand("Spotify", "Spotify", "Entertainment", 5, 5),
    Netflix: createBrand("Netflix", "Netflix", "Entertainment", 5, 5),
    SonyLIV: createBrand("SonyLIV", "Sony LIV", "Entertainment", 5, 5),
    ZEE5: createBrand("ZEE5", "ZEE5", "Entertainment", 5, 5),
    Uber: createBrand("Uber", "Uber", "Travel", 5, 5),
    MakeMyTrip: createBrand("MakeMyTrip", "MakeMyTrip", "Travel", 5, 5),
    Cleartrip: createBrand("Cleartrip", "Cleartrip", "Travel", 5, 5),
    EaseMyTrip: createBrand("EaseMyTrip", "EaseMyTrip", "Travel", 5, 5),
    AirIndia: createBrand("AirIndia", "Air India", "Travel", 5, 5),
    Nykaa: createBrand("Nykaa", "Nykaa", "Beauty", 5, 5),
    Tira: createBrand("Tira", "Tira", "Beauty", 5, 5),
    TheBodyShop: createBrand("TheBodyShop", "The Body Shop", "Beauty", 5, 5),
    Tata1mg: createBrand("Tata1mg", "Tata 1mg", "Health", 5, 5),
    Netmeds: createBrand("Netmeds", "Netmeds", "Health", 5, 5),
    CultFit: createBrand("CultFit", "Cult.fit", "Health", 5, 5),
    Fastrack: createBrand("Fastrack", "Fastrack", "Jewellery", 5, 5),
    Titan: createBrand("Titan", "Titan", "Jewellery", 5, 5),
    CaratLane: createBrand("CaratLane", "CaratLane", "Jewellery", 5, 5),
    MiaByTanishq: createBrand("MiaByTanishq", "Mia by Tanishq", "Jewellery", 5, 5),
    Archies: createBrand("Archies", "Archies", "Gifts", 5, 5),
    Hamleys: createBrand("Hamleys", "Hamleys", "Gifts", 5, 5),
    Crossword: createBrand("Crossword", "Crossword", "Books", 5, 5),
    MarksAndSpencer: createBrand("MarksAndSpencer", "Marks & Spencer", "Fashion", 5, 5),
    VanHeusen: createBrand("VanHeusen", "Van Heusen", "Fashion", 5, 5),
    AllenSolly: createBrand("AllenSolly", "Allen Solly", "Fashion", 5, 5),
    PeterEngland: createBrand("PeterEngland", "Peter England", "Fashion", 5, 5)
};

function getBrand(brandId) {
    return BRANDS[brandId] || null;
}

function getAllBrands() {
    return Object.values(BRANDS);
}

function getBrandsByCategory(category) {
    if (category === 'All') return getAllBrands();
    return getAllBrands().filter(brand => brand.category === category);
}

function getBrandDiscount(brandId, mode = 'fixed') {
    const brand = getBrand(brandId);
    if (!brand) return 0;
    return mode === 'custom' ? brand.customDiscount : brand.fixedDiscount;
}