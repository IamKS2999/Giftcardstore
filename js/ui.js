/* =====================================================
   GIFTCARDSTORE — UI CORE
   Visual styling is handled entirely by style.css
===================================================== */

window.GCS = window.GCS || {};

GCS.pendingCheckout = false;

GCS.closeAllOverlays = function () {
    document.querySelectorAll(".overlay").forEach(function (overlay) {
        overlay.style.display = "none";
    });
};

window.closeAllOverlays = GCS.closeAllOverlays;

window.showNotice = function (message, title = "GiftCardStore", type = "info") {

    if (typeof createNoticeSystem === "function" &&
        typeof closeNotice === "function") {

        createNoticeSystem();

        const overlay = document.getElementById("siteNoticeOverlay");
        const titleEl = document.getElementById("noticeTitle");
        const messageEl = document.getElementById("noticeMessage");
        const icon = document.getElementById("noticeIcon");

        if (!overlay) return;

        titleEl.textContent = title;
        messageEl.textContent = message;

        overlay.className = "site-notice-overlay notice-" + type;

        icon.textContent =
            type === "success" ? "✓" :
            type === "error" ? "!" : "i";

        overlay.style.display = "flex";

        clearTimeout(window.__gcsNoticeTimer);

        window.__gcsNoticeTimer = setTimeout(function () {
            closeNotice();
        }, 3000);

        return;
    }

    let old = document.getElementById("gcsNotice");
    if (old) old.remove();

    const n = document.createElement("div");

    n.id = "gcsNotice";
    n.className = "gcs-notice " + type;

    n.innerHTML = `
        <b class="gcs-ni">
            ${type === "success" ? "✓" : type === "error" ? "!" : "i"}
        </b>

        <div>
            <strong>${String(title)}</strong>
            <span>${String(message)}</span>
        </div>

        <button type="button" aria-label="Close">×</button>
    `;

    n.querySelector("button").onclick = function () {
        n.remove();
    };

    document.body.appendChild(n);

    setTimeout(function () {
        if (n.parentNode) n.remove();
    }, 3000);
};

document.addEventListener("keydown", function (event) {

    if (event.key !== "Escape") return;

    const overlays = Array.from(
        document.querySelectorAll(".overlay")
    );

    const active = overlays.reverse().find(function (overlay) {
        return getComputedStyle(overlay).display !== "none";
    });

    if (active) {
        active.style.display = "none";
    }
});

document.addEventListener("click", function (event) {

    if (
        event.target &&
        event.target.classList &&
        event.target.classList.contains("overlay")
    ) {
        event.target.style.display = "none";
    }

});
