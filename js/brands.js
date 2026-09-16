/* =====================================================
   GIFT CARD STORE — BRAND DATABASE
   Full Catalog
===================================================== */

const BRANDS = {

    /* ==================================================
       SHOPPING
    ================================================== */

    Amazon: {
        id: "Amazon",
        name: "Amazon",
        category: "Shopping",
        logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Amazon_2024.svg",
        fixedDiscount: 3,
        customDiscount: 3,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Flipkart: {
        id: "Flipkart",
        name: "Flipkart",
        category: "Shopping",
        logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Flipkart_logo_(2026).svg",
        fixedDiscount: 3.5,
        customDiscount: 3.5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    TataCLiQ: {
        id: "TataCLiQ",
        name: "Tata CLiQ",
        category: "Shopping",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Meesho: {
        id: "Meesho",
        name: "Meesho",
        category: "Shopping",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    /* ==================================================
       FASHION
    ================================================== */

    Myntra: {
        id: "Myntra",
        name: "Myntra",
        category: "Fashion",
        logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/65c5da9f878952603e370d03_Myntra-Logo_1.svg",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    AJIO: {
        id: "AJIO",
        name: "AJIO",
        category: "Fashion",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Westside: {
        id: "Westside",
        name: "Westside",
        category: "Fashion",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    MaxFashion: {
        id: "MaxFashion",
        name: "Max Fashion",
        category: "Fashion",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Lifestyle: {
        id: "Lifestyle",
        name: "Lifestyle",
        category: "Fashion",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    ShoppersStop: {
        id: "ShoppersStop",
        name: "Shoppers Stop",
        category: "Fashion",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Pantaloons: {
        id: "Pantaloons",
        name: "Pantaloons",
        category: "Fashion",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Levis: {
        id: "Levis",
        name: "Levi's",
        category: "Fashion",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Decathlon: {
        id: "Decathlon",
        name: "Decathlon",
        category: "Fashion",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    FirstCry: {
        id: "FirstCry",
        name: "FirstCry",
        category: "Fashion",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    /* ==================================================
       ELECTRONICS
    ================================================== */

    Croma: {
        id: "Croma",
        name: "Croma",
        category: "Electronics",
        logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Croma_logo.png",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    RelianceDigital: {
        id: "RelianceDigital",
        name: "Reliance Digital",
        category: "Electronics",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    VijaySales: {
        id: "VijaySales",
        name: "Vijay Sales",
        category: "Electronics",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    IKEA: {
        id: "IKEA",
        name: "IKEA",
        category: "Home",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Pepperfry: {
        id: "Pepperfry",
        name: "Pepperfry",
        category: "Home",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    /* ==================================================
       FOOD
    ================================================== */

    Domino: {
        id: "Domino",
        name: "Domino's",
        category: "Food",
        logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Domino%27s_pizza_logo.svg",
        fixedDiscount: 15,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Zomato: {
        id: "Zomato",
        name: "Zomato",
        category: "Food",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Swiggy: {
        id: "Swiggy",
        name: "Swiggy",
        category: "Food",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Haldirams: {
        id: "Haldirams",
        name: "Haldiram's",
        category: "Food",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    /* ==================================================
       GROCERY
    ================================================== */

    BigBasket: {
        id: "BigBasket",
        name: "bigbasket",
        category: "Grocery",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Blinkit: {
        id: "Blinkit",
        name: "Blinkit",
        category: "Grocery",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Zepto: {
        id: "Zepto",
        name: "Zepto",
        category: "Grocery",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    /* ==================================================
       ENTERTAINMENT
    ================================================== */

    BookMyShow: {
        id: "BookMyShow",
        name: "BookMyShow",
        category: "Entertainment",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    PVR: {
        id: "PVR",
        name: "PVR",
        category: "Entertainment",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Spotify: {
        id: "Spotify",
        name: "Spotify",
        category: "Entertainment",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Netflix: {
        id: "Netflix",
        name: "Netflix",
        category: "Entertainment",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    SonyLIV: {
        id: "SonyLIV",
        name: "Sony LIV",
        category: "Entertainment",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    ZEE5: {
        id: "ZEE5",
        name: "ZEE5",
        category: "Entertainment",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    /* ==================================================
       TRAVEL
    ================================================== */

    Uber: {
        id: "Uber",
        name: "Uber",
        category: "Travel",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    MakeMyTrip: {
        id: "MakeMyTrip",
        name: "MakeMyTrip",
        category: "Travel",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Cleartrip: {
        id: "Cleartrip",
        name: "Cleartrip",
        category: "Travel",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    EaseMyTrip: {
        id: "EaseMyTrip",
        name: "EaseMyTrip",
        category: "Travel",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    AirIndia: {
        id: "AirIndia",
        name: "Air India",
        category: "Travel",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    /* ==================================================
       BEAUTY & PERSONAL CARE
    ================================================== */

    Nykaa: {
        id: "Nykaa",
        name: "Nykaa",
        category: "Beauty",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Tira: {
        id: "Tira",
        name: "Tira",
        category: "Beauty",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    TheBodyShop: {
        id: "TheBodyShop",
        name: "The Body Shop",
        category: "Beauty",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Tata1mg: {
        id: "Tata1mg",
        name: "Tata 1mg",
        category: "Health",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Netmeds: {
        id: "Netmeds",
        name: "Netmeds",
        category: "Health",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    CultFit: {
        id: "CultFit",
        name: "Cult.fit",
        category: "Health",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    /* ==================================================
       JEWELLERY & WATCHES
    ================================================== */

    Fastrack: {
        id: "Fastrack",
        name: "Fastrack",
        category: "Jewellery",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Titan: {
        id: "Titan",
        name: "Titan",
        category: "Jewellery",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    CaratLane: {
        id: "CaratLane",
        name: "CaratLane",
        category: "Jewellery",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    MiaByTanishq: {
        id: "MiaByTanishq",
        name: "Mia by Tanishq",
        category: "Jewellery",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    /* ==================================================
       GIFTS & BOOKS
    ================================================== */

    Archies: {
        id: "Archies",
        name: "Archies",
        category: "Gifts",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Hamleys: {
        id: "Hamleys",
        name: "Hamleys",
        category: "Gifts",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    Crossword: {
        id: "Crossword",
        name: "Crossword",
        category: "Books",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    /* ==================================================
       APPAREL
    ================================================== */

    MarksAndSpencer: {
        id: "MarksAndSpencer",
        name: "Marks & Spencer",
        category: "Fashion",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    VanHeusen: {
        id: "VanHeusen",
        name: "Van Heusen",
        category: "Fashion",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    AllenSolly: {
        id: "AllenSolly",
        name: "Allen Solly",
        category: "Fashion",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },

    PeterEngland: {
        id: "PeterEngland",
        name: "Peter England",
        category: "Fashion",
        logo: "",
        fixedDiscount: 5,
        customDiscount: 5,
        fixedValues: [500, 1000, 2000, 5000],
        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    }

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
        brand =>
            brand.category === category
    );

}


function getBrandDiscount(
    brandId,
    mode = "fixed"
) {

    const brand =
        getBrand(brandId);

    if (!brand) {
        return 0;
    }

    return mode === "custom"
        ? brand.customDiscount
        : brand.fixedDiscount;

       }
