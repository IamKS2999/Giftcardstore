/* =====================================================
   GIFT CARD STORE — BRAND DATABASE
   Brick 11
===================================================== */

const BRANDS = {

    Amazon: {
        id: "Amazon",
        name: "Amazon",
        category: "Shopping",

        logo:
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Amazon_2024.svg",

        fixedDiscount: 3,
        customDiscount: 3,

        fixedValues: [
            500,
            1000,
            2000,
            5000
        ],

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

        logo:
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Flipkart_logo_(2026).svg",

        fixedDiscount: 3.5,
        customDiscount: 3.5,

        fixedValues: [
            500,
            1000,
            2000,
            5000
        ],

        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },


    Myntra: {
        id: "Myntra",
        name: "Myntra",
        category: "Fashion",

        logo:
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/65c5da9f878952603e370d03_Myntra-Logo_1.svg",

        fixedDiscount: 5,
        customDiscount: 5,

        fixedValues: [
            500,
            1000,
            2000,
            5000
        ],

        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },


    Croma: {
        id: "Croma",
        name: "Croma",
        category: "Electronics",

        logo:
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Croma_logo.png",

        fixedDiscount: 5,
        customDiscount: 5,

        fixedValues: [
            500,
            1000,
            2000,
            5000
        ],

        custom: {
            enabled: true,
            min: 100,
            max: 10000
        }
    },


    Domino: {
        id: "Domino",
        name: "Domino's",
        category: "Food",

        logo:
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Domino%27s_pizza_logo.svg",

        fixedDiscount: 15,
        customDiscount: 5,

        fixedValues: [
            500,
            1000,
            2000,
            5000
        ],

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
