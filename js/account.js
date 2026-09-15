window.GCS = window.GCS || {};

GCS.getAccount = function() {
    try {
        return JSON.parse(localStorage.getItem("gcsAccount")) || null;
    } catch {
        return null;
    }
};

GCS.isLoggedIn = function() {
    return !!GCS.getAccount();
};

GCS.saveAccount = function(name, email) {
    const account = {
        name: name.trim(),
        email: email.trim().toLowerCase()
    };

    localStorage.setItem(
        "gcsAccount",
        JSON.stringify(account)
    );

    return account;
};

GCS.logout = function() {
    localStorage.removeItem("gcsAccount");
    GCS.closeAllOverlays();
    GCS.updateHeader();
};

GCS.validEmail = function(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
};

GCS.openLogin = function() {
    GCS.closeAllOverlays();
    document.getElementById("loginOverlay").style.display = "flex";
};

GCS.closeLogin = function() {
    document.getElementById("loginOverlay").style.display = "none";
};

GCS.submitLogin = function() {
    const email = document.getElementById("loginEmail").value.trim();

    if (!GCS.validEmail(email)) {
        document.getElementById("loginEmail").classList.add("error");
        document.getElementById("loginError").style.display = "block";
        return;
    }

    GCS.saveAccount(
        email.split("@")[0],
        email
    );

    GCS.closeLogin();
    GCS.updateHeader();

    if (GCS.pendingCheckout) {
        GCS.pendingCheckout = false;
        GCS.openCheckout();
    }
};

GCS.submitSignup = function() {
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();

    if (name.length < 2 || !GCS.validEmail(email)) {
        document.getElementById("signupError").style.display = "block";
        return;
    }

    GCS.saveAccount(name, email);

    GCS.closeSignup();
    GCS.updateHeader();

    if (GCS.pendingCheckout) {
        GCS.pendingCheckout = false;
        GCS.openCheckout();
    }
};

GCS.openSignup = function() {
    GCS.closeLogin();
    document.getElementById("signupOverlay").style.display = "flex";
};

GCS.closeSignup = function() {
    document.getElementById("signupOverlay").style.display = "none";
};

GCS.updateHeader = function() {
    const loginButton = document.getElementById("loginButton");
    const accountButton = document.getElementById("accountButton");

    if (!loginButton || !accountButton) return;

    if (GCS.isLoggedIn()) {
        loginButton.style.display = "none";
        accountButton.style.display = "block";
    } else {
        loginButton.style.display = "";
        accountButton.style.display = "none";
    }
};

GCS.openAccount = function() {
    const account = GCS.getAccount();

    if (!account) {
        GCS.openLogin();
        return;
    }

    document.getElementById("accountName").textContent = account.name;
    document.getElementById("accountEmail").textContent = account.email;

    const initial = account.name.charAt(0).toUpperCase();
    document.getElementById("accountAvatar").textContent = initial;

    document.getElementById("accountOverlay").style.display = "flex";
};

GCS.closeAccount = function() {
    document.getElementById("accountOverlay").style.display = "none";
};
