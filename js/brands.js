const BRANDS = {};

function addBrand(
    id,
    name,
    category,
    domain,
    discount,
    acquisitionRate,
    values = [],
    custom = false
) {
    BRANDS[id] = {
        id,
        name,
        category,
        domain,
        logo: `https://www.google.com/s2/favicons?domain=${domain}&sz=256`,
        fixedDiscount: discount,
        customDiscount: discount,
        acquisitionRate,
        fixedValues: values,
        custom: {
            enabled: custom,
            min: custom ? 100 : 0,
            max: custom ? 10000 : 0
        }
    };
}


/* =========================
   REAL BRAND CATALOG
========================= */

addBrand("Zepto", "Zepto", "Grocery", "zepto.in", 1, 1.5);

addBrand(
    "AmazonShopping",
    "Amazon Shopping Voucher",
    "Shopping",
    "amazon.in",
    0.5,
    1
);

addBrand("Uber", "Uber", "Travel", "uber.com", 3, 4.5);

addBrand("BigBasket", "Bigbasket", "Grocery", "bigbasket.com", 2, 3);

addBrand("Flipkart", "Flipkart", "Shopping", "flipkart.com", 1.5, 2);

addBrand("Zomato", "Zomato", "Food", "zomato.com", 1, 2);

addBrand("Lenskart", "Lenskart", "Fashion", "lenskart.com", 8, 10);

addBrand("AJIO", "AJIO", "Fashion", "ajio.com", 4.5, 6.5);

addBrand("Swiggy", "Swiggy", "Food", "swiggy.com", 1, 1.75);

addBrand("Myntra", "Myntra", "Fashion", "myntra.com", 1, 2);

addBrand("Snitch", "Snitch", "Fashion", "snitch.co.in", 5, 6.5);

addBrand("Starbucks", "Starbucks", "Food", "starbucks.in", 8, 12);

addBrand(
    "Dominos",
    "Domino's",
    "Food",
    "dominos.co.in",
    12,
    17,
    [],
    true
);

addBrand("Nykaa", "Nykaa", "Beauty", "nykaa.com", 3.5, 5);

addBrand(
    "TataCLiQFashion",
    "Tata CLiQ Fashion",
    "Fashion",
    "tatacliq.com",
    5,
    8
);

addBrand("FirstCry", "FirstCry", "Kids", "firstcry.com", 4, 6);

addBrand(
    "NykaaFashion",
    "Nykaa Fashion",
    "Fashion",
    "nykaafashion.com",
    4,
    5.5
);

addBrand("Milton", "Milton", "Home", "milton.in", 7.5, 10.5);

addBrand(
    "BookMyShow",
    "BookMyShow",
    "Entertainment",
    "bookmyshow.com",
    2,
    3.5
);

addBrand("Croma", "Croma", "Electronics", "croma.com", 1, 1.5);

addBrand("PizzaHut", "Pizza Hut", "Food", "pizzahut.co.in", 6, 8.5);

addBrand("KFC", "KFC", "Food", "kfc.co.in", 4, 6);

addBrand("Subway", "Subway", "Food", "subway.com", 7.5, 10.5);

addBrand(
    "RelianceTrends",
    "Reliance Trends",
    "Fashion",
    "reliancetrends.com",
    3.5,
    5.5
);

addBrand("TajHotels", "Taj Hotels", "Travel", "tajhotels.com", 9, 12);

addBrand("TacoBell", "Taco Bell", "Food", "tacobell.co.in", 6.5, 8.5);

addBrand("Bagline", "Bagline", "Fashion", "bagline.com", 10, 13.5);

addBrand(
    "WorldOfTitan",
    "World of Titan",
    "Fashion",
    "titan.co.in",
    5,
    7
);

addBrand(
    "Birkenstock",
    "Birkenstock",
    "Fashion",
    "birkenstock.in",
    7,
    10
);

addBrand(
    "TitanEyePlus",
    "Titan Eye Plus",
    "Fashion",
    "titaneyeplus.com",
    5,
    6.5
);

addBrand(
    "PVR",
    "PVR",
    "Entertainment",
    "pvrcinemas.com",
    15,
    20
);

addBrand(
    "District",
    "District",
    "Entertainment",
    "district.in",
    2.5,
    3.75
);

addBrand(
    "Eatsure",
    "Eatsure",
    "Food",
    "eatsure.com",
    9.5,
    9
);

addBrand(
    "IKEA",
    "IKEA",
    "Home",
    "ikea.com",
    4,
    6,
    [1000, 2000, 5000, 10000]
);

addBrand(
    "Tire",
    "Tire",
    "Shopping",
    "tire.co.in",
    4,
    6,
    [500, 1000, 1500, 2000, 3000, 5000, 10000]
);

addBrand(
    "Decathlon",
    "Decathlon",
    "Sports",
    "decathlon.in",
    2,
    4
);

addBrand(
    "MuscleBlaze",
    "MuscleBlaze",
    "Fitness",
    "muscleblaze.com",
    8,
    11,
    [1000, 2000, 5000]
);


/* =========================
   ACCESSORS
========================= */

function getBrand(brandId) {
    return BRANDS[brandId] || null;
}

function getAllBrands() {
    return Object.values(BRANDS);
}

function getBrandDiscount(brandId, mode = "fixed") {
    const brand = getBrand(brandId);

    if (!brand) return 0;

    return mode === "custom"
        ? brand.customDiscount
        : brand.fixedDiscount;
}


window.BRANDS = BRANDS;
window.getBrand = getBrand;
window.getAllBrands = getAllBrands;
window.getBrandDiscount = getBrandDiscount;
