/* =====================================================
   GIFTCARDSTORE — EXTENDED CATALOG
   Batch upgrade: safer logo loading + fallback
===================================================== */

(function () {
    const extraBrands = [
        ["Zomato","Zomato","Food","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/zomato.svg",6],
        ["Swiggy","Swiggy","Food","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/swiggy.svg",5],
        ["Uber","Uber","Travel","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/uber.svg",4],
        ["BookMyShow","BookMyShow","Entertainment","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/bookmyshow.svg",5],
        ["PVR","PVR","Entertainment","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/pvr.svg",5],
        ["Nykaa","Nykaa","Beauty","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nykaa.svg",5],
        ["AJIO","AJIO","Fashion","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ajio.svg",5],
        ["Westside","Westside","Fashion","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/westside.svg",5],
        ["MaxFashion","Max Fashion","Fashion","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/maxfashion.svg",5],
        ["TataCliq","Tata CLiQ","Shopping","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tatacliq.svg",4],
        ["Meesho","Meesho","Shopping","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/meesho.svg",4],
        ["BigBasket","bigbasket","Food","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/bigbasket.svg",5],
        ["Blinkit","Blinkit","Food","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/blinkit.svg",5],
        ["Zepto","Zepto","Food","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/zepto.svg",4],
        ["RelianceDigital","Reliance Digital","Electronics","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/reliancedigital.svg",4],
        ["VijaySales","Vijay Sales","Electronics","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/vijaysales.svg",4],
        ["IKEA","IKEA","Shopping","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ikea.svg",5],
        ["Lifestyle","Lifestyle","Fashion","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/lifestyle.svg",5],
        ["ShoppersStop","Shoppers Stop","Fashion","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/shoppersstop.svg",5],
        ["Pantaloons","Pantaloons","Fashion","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/pantaloons.svg",5],
        ["Levis","Levi's","Fashion","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/levis.svg",4],
        ["Decathlon","Decathlon","Shopping","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/decathlon.svg",4],
        ["FirstCry","FirstCry","Shopping","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/firstcry.svg",4],
        ["Pepperfry","Pepperfry","Shopping","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/pepperfry.svg",4],
        ["Tata1mg","Tata 1mg","Shopping","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tata1mg.svg",4],
        ["Netmeds","Netmeds","Shopping","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/netmeds.svg",4],
        ["CultFit","Cult.fit","Entertainment","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/cultfit.svg",4],
        ["Spotify","Spotify","Entertainment","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/spotify.svg",4],
        ["Netflix","Netflix","Entertainment","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/netflix.svg",3],
        ["SonyLiv","Sony LIV","Entertainment","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/sonyliv.svg",4],
        ["Zee5","ZEE5","Entertainment","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/zee5.svg",4],
        ["MakeMyTrip","MakeMyTrip","Travel","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/makemytrip.svg",5],
        ["Cleartrip","Cleartrip","Travel","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/cleartrip.svg",4],
        ["EaseMyTrip","EaseMyTrip","Travel","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/easemytrip.svg",4],
        ["AirIndia","Air India","Travel","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/airindia.svg",3],
        ["Tira","Tira","Beauty","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tira.svg",5],
        ["TheBodyShop","The Body Shop","Beauty","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/thebodyshop.svg",4],
        ["Fastrack","Fastrack","Fashion","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/fastrack.svg",4],
        ["Titan","Titan","Fashion","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/titan.svg",4],
        ["CaratLane","CaratLane","Shopping","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/caratlane.svg",4],
        ["Mia","Mia by Tanishq","Shopping","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/mia.svg",4],
        ["Archies","Archies","Shopping","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/archies.svg",4],
        ["Hamleys","Hamleys","Shopping","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/hamleys.svg",4],
        ["Crossword","Crossword","Shopping","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/crossword.svg",4],
        ["ShoppersStop2","Shoppers Stop","Shopping","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/shoppersstop.svg",4],
        ["MarksSpencer","Marks & Spencer","Fashion","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/marksandspencer.svg",4],
        ["VanHeusen","Van Heusen","Fashion","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/vanheusen.svg",4],
        ["AllenSolly","Allen Solly","Fashion","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/allensolly.svg",4],
        ["PeterEngland","Peter England","Fashion","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/peterengland.svg",4],
        ["Haldirams","Haldiram's","Food","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/haldirams.svg",4],
        ["Dominos2","Domino's","Food","https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/dominos.svg",15]
    ];

    const defaultValues = [500, 1000, 2000, 5000];

    extraBrands.forEach(function (item) {
        const id = item[0];
        if (BRANDS[id]) return;

        BRANDS[id] = {
            id,
            name: item[1],
            category: item[2],
            logo: item[3],
            fixedDiscount: item[4],
            customDiscount: Math.min(item[4], 5),
            fixedValues: defaultValues.slice(),
            custom: {
                enabled: true,
                min: 100,
                max: 10000
            }
        };
    });

    /*
     * Never leave a broken-image icon visible.
     * The fallback is intentionally local and does not alter
     * the brand data or checkout logic.
     */
    function fallbackLogo(img) {
        if (!img || img.dataset.fallbackApplied === "1") return;

        img.dataset.fallbackApplied = "1";

        const domains = {
            "Zomato":"zomato.com", "Swiggy":"swiggy.com", "Uber":"uber.com",
            "BookMyShow":"bookmyshow.com", "PVR":"pvrcinemas.com", "Nykaa":"nykaa.com",
            "AJIO":"ajio.com", "Westside":"westside.com", "Max Fashion":"maxfashion.in",
            "Tata CLiQ":"tatacliq.com", "Meesho":"meesho.com", "bigbasket":"bigbasket.com",
            "Blinkit":"blinkit.com", "Zepto":"zeptonow.com", "Reliance Digital":"reliancedigital.in",
            "Vijay Sales":"vijaysales.com", "IKEA":"ikea.com", "Lifestyle":"lifestylestores.com",
            "Shoppers Stop":"shoppersstop.com", "Pantaloons":"pantaloons.com", "Levi's":"levi.com",
            "Decathlon":"decathlon.in", "FirstCry":"firstcry.com", "Pepperfry":"pepperfry.com",
            "Tata 1mg":"1mg.com", "Netmeds":"netmeds.com", "Cult.fit":"cult.fit",
            "Spotify":"spotify.com", "Netflix":"netflix.com", "Sony LIV":"sonyliv.com",
            "ZEE5":"zee5.com", "MakeMyTrip":"makemytrip.com", "Cleartrip":"cleartrip.com",
            "EaseMyTrip":"easemytrip.com", "Air India":"airindia.com", "Tira":"tirabeauty.com",
            "The Body Shop":"thebodyshop.in", "Fastrack":"fastrack.in", "Titan":"titan.co.in",
            "CaratLane":"caratlane.com", "Mia by Tanishq":"m.tanishq.co.in", "Archies":"archiesonline.com",
            "Hamleys":"hamleys.in", "Crossword":"crossword.in", "Marks & Spencer":"marksandspencer.com",
            "Van Heusen":"vanheusenindia.com", "Allen Solly":"allensolly.com", "Peter England":"peterengland.com",
            "Haldiram's":"haldirams.com", "Domino's":"dominos.co.in"
        };

        const domain = domains[img.alt] || (String(img.alt || "").toLowerCase().replace(/[^a-z0-9]/g, "") + ".com");
        const favicon = "https://www.google.com/s2/favicons?domain=" + encodeURIComponent(domain) + "&sz=128";

        img.onerror = function () {
            img.onerror = null;
            const label = (img.alt || "GC").replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase() || "GC";
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"><rect width="320" height="180" rx="24" fill="#f5f3fb"/><text x="160" y="105" text-anchor="middle" font-family="Arial,sans-serif" font-size="58" font-weight="800" fill="#713cf3">${label}</text></svg>`;
            img.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
        };

        img.src = favicon;
    }

    function watchImages() {
        document.querySelectorAll("img.brand-logo, #productLogo, .owned-gift-logo img")
            .forEach(img => {
                if (img.dataset.logoGuard !== "1") {
                    img.dataset.logoGuard = "1";
                    img.addEventListener("error", function () {
                        fallbackLogo(this);
                    });
                }
            });
    }

    document.addEventListener("DOMContentLoaded", function () {
        watchImages();

        const observer = new MutationObserver(watchImages);
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
})();
