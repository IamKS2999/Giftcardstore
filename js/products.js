/* =====================================================
   GIFT CARD STORE — PRODUCT ENGINE
   Brick 11
===================================================== */


/* =====================================================
   PRICE CALCULATION
===================================================== */

function calculatePrice(
    amount,
    discount
) {

    if (!amount || amount <= 0) {
        return 0;
    }

    return Math.round(
        amount *
        (1 - discount / 100)
    );

}


/* =====================================================
   SAVINGS CALCULATION
===================================================== */

function calculateSavings(
    amount,
    discount
) {

    if (!amount || amount <= 0) {
        return 0;
    }

    return Math.round(
        amount *
        (discount / 100)
    );

}


/* =====================================================
   PRODUCT OBJECT
===================================================== */

function createProduct(
    brandId,
    value,
    mode = "fixed"
) {

    const brand =
        getBrand(brandId);

    if (!brand) {
        return null;
    }

    const discount =
        getBrandDiscount(
            brandId,
            mode
        );

    return {

        brandId:
            brand.id,

        brand:
            brand.name,

        category:
            brand.category,

        logo:
            brand.logo,

        value:
            value,

        mode:
            mode,

        discount:
            discount,

        price:
            calculatePrice(
                value,
                discount
            ),

        savings:
            calculateSavings(
                value,
                discount
            )

    };

}


/* =====================================================
   FIXED PRODUCTS
===================================================== */

function getFixedProducts(
    brandId
) {

    const brand =
        getBrand(brandId);

    if (!brand) {
        return [];
    }

    return brand.fixedValues.map(
        value =>
            createProduct(
                brandId,
                value,
                "fixed"
            )
    );

}


/* =====================================================
   ALL PRODUCTS
===================================================== */

function getAllProducts() {

    const products = [];

    getAllBrands().forEach(
        brand => {

            products.push(
                ...getFixedProducts(
                    brand.id
                )
            );

        }
    );

    return products;

}


/* =====================================================
   CUSTOM PRODUCT
===================================================== */

function getCustomProduct(
    brandId,
    amount
) {

    const brand =
        getBrand(brandId);

    if (
        !brand ||
        !brand.custom.enabled
    ) {
        return null;
    }

    if (
        amount < brand.custom.min ||
        amount > brand.custom.max
    ) {
        return null;
    }

    return createProduct(
        brandId,
        amount,
        "custom"
    );

}


/* =====================================================
   PRODUCT VALIDATION
===================================================== */

function isValidProductValue(
    brandId,
    amount,
    mode
) {

    const brand =
        getBrand(brandId);

    if (!brand) {
        return false;
    }

    if (mode === "fixed") {

        return brand.fixedValues.includes(
            Number(amount)
        );

    }

    if (mode === "custom") {

        return (
            brand.custom.enabled &&
            Number(amount) >= brand.custom.min &&
            Number(amount) <= brand.custom.max
        );

    }

    return false;

}
