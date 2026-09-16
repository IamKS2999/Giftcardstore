/* =====================================================
   GIFTCARDSTORE — EXTENDED CATALOG
   BATCH RELEASE
===================================================== */

(function () {
    const extraBrands = [
        ["Zomato","Zomato","Food","https://commons.wikimedia.org/wiki/Special:Redirect/file/Zomato_logo.svg",6],
        ["Swiggy","Swiggy","Food","https://commons.wikimedia.org/wiki/Special:Redirect/file/Swiggy_logo.svg",5],
        ["Uber","Uber","Travel","https://commons.wikimedia.org/wiki/Special:Redirect/file/Uber_logo_2018.svg",4],
        ["BookMyShow","BookMyShow","Entertainment","https://commons.wikimedia.org/wiki/Special:Redirect/file/BookMyShow_Logo.svg",5],
        ["PVR","PVR","Entertainment","https://commons.wikimedia.org/wiki/Special:Redirect/file/PVR_Cinemas_logo.svg",5],
        ["Nykaa","Nykaa","Beauty","https://commons.wikimedia.org/wiki/Special:Redirect/file/Nykaa_New_Logo.svg",5],
        ["AJIO","AJIO","Fashion","https://commons.wikimedia.org/wiki/Special:Redirect/file/Ajio_Logo.svg",5],
        ["Westside","Westside","Fashion","https://commons.wikimedia.org/wiki/Special:Redirect/file/Westside_logo.svg",5],
        ["MaxFashion","Max Fashion","Fashion","https://commons.wikimedia.org/wiki/Special:Redirect/file/Max_Fashion_logo.svg",5],
        ["TataCliq","Tata CLiQ","Shopping","https://commons.wikimedia.org/wiki/Special:Redirect/file/Tata_Cliq_Logo.svg",4],
        ["Meesho","Meesho","Shopping","https://commons.wikimedia.org/wiki/Special:Redirect/file/Meesho_Logo_Full.svg",4],
        ["BigBasket","bigbasket","Food","https://commons.wikimedia.org/wiki/Special:Redirect/file/BigBasket_Logo.svg",5],
        ["Blinkit","Blinkit","Food","https://commons.wikimedia.org/wiki/Special:Redirect/file/Blinkit_logo.svg",5],
        ["Zepto","Zepto","Food","https://commons.wikimedia.org/wiki/Special:Redirect/file/Zepto_Logo.svg",4],
        ["RelianceDigital","Reliance Digital","Electronics","https://commons.wikimedia.org/wiki/Special:Redirect/file/Reliance_Digital_Logo.svg",4],
        ["VijaySales","Vijay Sales","Electronics","https://commons.wikimedia.org/wiki/Special:Redirect/file/Vijay_Sales_logo.svg",4],
        ["IKEA","IKEA","Shopping","https://commons.wikimedia.org/wiki/Special:Redirect/file/Ikea_logo.svg",5],
        ["Lifestyle","Lifestyle","Fashion","https://commons.wikimedia.org/wiki/Special:Redirect/file/Lifestyle_Stores_logo.svg",5],
        ["ShoppersStop","Shoppers Stop","Fashion","https://commons.wikimedia.org/wiki/Special:Redirect/file/Shoppers_Stop_Logo.svg",5],
        ["Pantaloons","Pantaloons","Fashion","https://commons.wikimedia.org/wiki/Special:Redirect/file/Pantaloons_logo.svg",5],
        ["Levis","Levi's","Fashion","https://commons.wikimedia.org/wiki/Special:Redirect/file/Levi%27s_logo.svg",4],
        ["Decathlon","Decathlon","Shopping","https://commons.wikimedia.org/wiki/Special:Redirect/file/Decathlon_Logo.svg",4],
        ["FirstCry","FirstCry","Shopping","https://commons.wikimedia.org/wiki/Special:Redirect/file/FirstCry_logo.svg",4],
        ["Pepperfry","Pepperfry","Shopping","https://commons.wikimedia.org/wiki/Special:Redirect/file/Pepperfry_logo.svg",4],
        ["Tata1mg","Tata 1mg","Shopping","https://commons.wikimedia.org/wiki/Special:Redirect/file/1mg_Logo.svg",4],
        ["Netmeds","Netmeds","Shopping","https://commons.wikimedia.org/wiki/Special:Redirect/file/Netmeds_logo.svg",4],
        ["CultFit","Cult.fit","Entertainment","https://commons.wikimedia.org/wiki/Special:Redirect/file/Cult.fit_logo.svg",4],
        ["Spotify","Spotify","Entertainment","https://commons.wikimedia.org/wiki/Special:Redirect/file/Spotify_logo_without_text.svg",4],
        ["Netflix","Netflix","Entertainment","https://commons.wikimedia.org/wiki/Special:Redirect/file/Netflix_2015_logo.svg",3],
        ["SonyLiv","Sony LIV","Entertainment","https://commons.wikimedia.org/wiki/Special:Redirect/file/SonyLIV_Logo.svg",4],
        ["Zee5","ZEE5","Entertainment","https://commons.wikimedia.org/wiki/Special:Redirect/file/ZEE5_logo.svg",4],
        ["MakeMyTrip","MakeMyTrip","Travel","https://commons.wikimedia.org/wiki/Special:Redirect/file/MakeMyTrip_Logo.svg",5],
        ["Cleartrip","Cleartrip","Travel","https://commons.wikimedia.org/wiki/Special:Redirect/file/Cleartrip_Logo.svg",4],
        ["EaseMyTrip","EaseMyTrip","Travel","https://commons.wikimedia.org/wiki/Special:Redirect/file/EaseMyTrip_Logo.svg",4],
        ["AirIndia","Air India","Travel","https://commons.wikimedia.org/wiki/Special:Redirect/file/Air_India_Logo.svg",3],
        ["Tira","Tira","Beauty","https://commons.wikimedia.org/wiki/Special:Redirect/file/Tira_Beauty_logo.svg",5],
        ["TheBodyShop","The Body Shop","Beauty","https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Body_Shop_logo.svg",4],
        ["Fastrack","Fastrack","Fashion","https://commons.wikimedia.org/wiki/Special:Redirect/file/Fastrack_logo.svg",4],
        ["Titan","Titan","Fashion","https://commons.wikimedia.org/wiki/Special:Redirect/file/Titan_Company_Logo.svg",4],
        ["CaratLane","CaratLane","Shopping","https://commons.wikimedia.org/wiki/Special:Redirect/file/CaratLane_logo.svg",4],
        ["Mia","Mia by Tanishq","Shopping","https://commons.wikimedia.org/wiki/Special:Redirect/file/Mia_by_Tanishq_logo.svg",4],
        ["Archies","Archies","Shopping","https://commons.wikimedia.org/wiki/Special:Redirect/file/Archies_logo.svg",4],
        ["Hamleys","Hamleys","Shopping","https://commons.wikimedia.org/wiki/Special:Redirect/file/Hamleys_logo.svg",4],
        ["Crossword","Crossword","Shopping","https://commons.wikimedia.org/wiki/Special:Redirect/file/Crossword_Bookstores_logo.svg",4],
        ["ShoppersStop2","Shoppers Stop","Shopping","https://commons.wikimedia.org/wiki/Special:Redirect/file/Shoppers_Stop_Logo.svg",4],
        ["MarksSpencer","Marks & Spencer","Fashion","https://commons.wikimedia.org/wiki/Special:Redirect/file/Marks_and_Spencer_logo.svg",4],
        ["VanHeusen","Van Heusen","Fashion","https://commons.wikimedia.org/wiki/Special:Redirect/file/Van_Heusen_logo.svg",4],
        ["AllenSolly","Allen Solly","Fashion","https://commons.wikimedia.org/wiki/Special:Redirect/file/Allen_Solly_logo.svg",4],
        ["PeterEngland","Peter England","Fashion","https://commons.wikimedia.org/wiki/Special:Redirect/file/Peter_England_logo.svg",4],
        ["Haldirams","Haldiram's","Food","https://commons.wikimedia.org/wiki/Special:Redirect/file/Haldiram%27s_logo.svg",4],
        ["Dominos2","Domino's","Food","https://commons.wikimedia.org/wiki/Special:Redirect/file/Domino%27s_pizza_logo.svg",15]
    ];

    const defaultValues = [500, 1000, 2000, 5000];

    extraBrands.forEach(function (item) {
        const id = item[0];
        if (BRANDS[id]) return;

        BRANDS[id] = {
            id: id,
            name: item[1],
            category: item[2],
            logo: item[3],
            fixedDiscount: item[4],
            customDiscount: Math.min(item[4], 5),
            fixedValues: defaultValues.slice(),
            custom: { enabled: true, min: 100, max: 10000 }
        };
    });
})();
