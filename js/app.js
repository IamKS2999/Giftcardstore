window.GCS = window.GCS || {};

document.addEventListener("DOMContentLoaded", function() {

    GCS.renderProducts();
    GCS.updateHeader();

    document.getElementById("loginButton")
        .addEventListener("click", GCS.openLogin);

    document.getElementById("accountButton")
        .addEventListener("click", GCS.openAccount);

    document.getElementById("search")
        .addEventListener("input", GCS.searchCards);

    document.querySelectorAll(".category")
        .forEach(button => {
            button.addEventListener("click", function() {
                GCS.filterCategory(
                    button.textContent.trim(),
                    button
                );
            });
        });

});
