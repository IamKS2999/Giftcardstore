/* =====================================================
   GIFT CARD STORE — CUSTOMER ACCOUNT
   Brick 12
   Prototype-only local account system
===================================================== */


/* =====================================================
   STORAGE
===================================================== */

const ACCOUNT_STORAGE_KEY =
    "giftCardCustomer";


/* =====================================================
   ACCOUNT STATE
===================================================== */

function getCurrentUser() {

    const stored =
        localStorage.getItem(
            ACCOUNT_STORAGE_KEY
        );

    if (!stored) {
        return null;
    }

    try {

        return JSON.parse(stored);

    } catch (error) {

        localStorage.removeItem(
            ACCOUNT_STORAGE_KEY
        );

        return null;

    }

}


function isLoggedIn() {

    return getCurrentUser() !== null;

}


/* =====================================================
   SAVE / LOGOUT
===================================================== */

function saveUser(user) {

    localStorage.setItem(
        ACCOUNT_STORAGE_KEY,
        JSON.stringify(user)
    );

    updateAccountUI();

}


function logoutUser() {

    localStorage.removeItem(
        ACCOUNT_STORAGE_KEY
    );

    updateAccountUI();

    alert(
        "You have been logged out."
    );

}


/* =====================================================
   ACCOUNT UI
===================================================== */

function updateAccountUI() {

    const loginButton =
        document.querySelector(
            ".login"
        );

    if (!loginButton) {
        return;
    }


    const user =
        getCurrentUser();


    if (user) {

        loginButton.textContent =
            "Account";

        loginButton.onclick =
            function() {

                openAccountPanel();

            };

    }

    else {

        loginButton.textContent =
            "Login";

        loginButton.onclick =
            function() {

                openLoginPanel();

            };

    }

}


/* =====================================================
   CREATE ACCOUNT MODAL
===================================================== */

function createAccountModal() {

    if (
        document.getElementById(
            "accountOverlay"
        )
    ) {

        return;

    }


    const overlay =
        document.createElement(
            "div"
        );


    overlay.id =
        "accountOverlay";

    overlay.className =
        "overlay";


    overlay.innerHTML = `

        <div class="panel">

            <div class="panel-header">

                <h2 id="accountTitle">
                    Login
                </h2>

                <button
                    class="close"
                    onclick="closeAccountPanel()"
                >
                    ×
                </button>

            </div>


            <div id="loginArea">

                <p class="account-description">
                    Login to continue your purchase
                    and access your orders.
                </p>


                <label for="accountEmail">
                    Email Address
                </label>

                <input
                    class="email"
                    id="accountEmail"
                    type="email"
                    inputmode="email"
                    autocomplete="email"
                    placeholder="you@example.com"
                >


                <p
                    class="email-error"
                    id="accountEmailError"
                >
                    Please enter a valid email address.
                </p>


                <button
                    class="confirm"
                    onclick="loginCustomer()"
                >
                    Continue with Email
                </button>


                <p class="note">
                    Prototype account system.
                    No real authentication is used.
                </p>

            </div>


            <div
                id="accountArea"
                style="display:none;"
            >

                <div class="account-profile">

                    <div class="account-avatar">
                        👤
                    </div>

                    <h3 id="accountName">
                        Customer
                    </h3>

                    <p id="accountEmailDisplay">
                        customer@example.com
                    </p>

                </div>


                <button
                    class="confirm"
                    onclick="openOrdersFromAccount()"
                >
                    View My Orders
                </button>


                <button
                    class="account-logout"
                    onclick="logoutUser()"
                >
                    Logout
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(
        overlay
    );


    overlay.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                overlay
            ) {

                closeAccountPanel();

            }

        }
    );

}


/* =====================================================
   OPEN LOGIN
===================================================== */

function openLoginPanel() {

    createAccountModal();


    const overlay =
        document.getElementById(
            "accountOverlay"
        );


    const loginArea =
        document.getElementById(
            "loginArea"
        );


    const accountArea =
        document.getElementById(
            "accountArea"
        );


    document.getElementById(
        "accountTitle"
    ).textContent =
        "Login";


    loginArea.style.display =
        "block";


    accountArea.style.display =
        "none";


    overlay.style.display =
        "flex";


    setTimeout(
        function() {

            document.getElementById(
                "accountEmail"
            ).focus();

        },
        100
    );

}


/* =====================================================
   ACCOUNT PANEL
===================================================== */

function openAccountPanel() {

    createAccountModal();


    const user =
        getCurrentUser();


    if (!user) {

        openLoginPanel();

        return;

    }


    const overlay =
        document.getElementById(
            "accountOverlay"
        );


    document.getElementById(
        "accountTitle"
    ).textContent =
        "My Account";


    document.getElementById(
        "loginArea"
    ).style.display =
        "none";


    document.getElementById(
        "accountArea"
    ).style.display =
        "block";


    document.getElementById(
        "accountName"
    ).textContent =
        user.name ||
        "Customer";


    document.getElementById(
        "accountEmailDisplay"
    ).textContent =
        user.email;


    overlay.style.display =
        "flex";

}


/* =====================================================
   CLOSE ACCOUNT
===================================================== */

function closeAccountPanel() {

    const overlay =
        document.getElementById(
            "accountOverlay"
        );


    if (overlay) {

        overlay.style.display =
            "none";

    }

}


/* =====================================================
   LOGIN CUSTOMER
===================================================== */

function loginCustomer() {

    const input =
        document.getElementById(
            "accountEmail"
        );


    const error =
        document.getElementById(
            "accountEmailError"
        );


    const email =
        input.value.trim();


    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


    if (
        !pattern.test(email)
    ) {

        input.classList.add(
            "error"
        );

        error.style.display =
            "block";

        return;

    }


    input.classList.remove(
        "error"
    );


    error.style.display =
        "none";


    const existingUser =
        getCurrentUser();


    const user = {

        name:
            existingUser?.name ||
            email.split("@")[0],

        email:
            email,

        loginDate:
            new Date().toISOString()

    };


    saveUser(user);


    closeAccountPanel();


    alert(
        "Login successful."
    );


    /* If checkout was waiting for login,
       continue directly to checkout. */

    if (
        window.checkoutWaitingForLogin
    ) {

        window.checkoutWaitingForLogin =
            false;

        openCheckout();

    }

}


/* =====================================================
   LOGIN REQUIRED
===================================================== */

function requireLogin(
    action
) {

    if (
        isLoggedIn()
    ) {

        if (
            typeof action ===
            "function"
        ) {

            action();

        }

        return true;

    }


    window.checkoutWaitingForLogin =
        true;


    openLoginPanel();


    return false;

}


/* =====================================================
   ORDERS FROM ACCOUNT
===================================================== */

function openOrdersFromAccount() {

    closeAccountPanel();

    openOrders();

}


/* =====================================================
   STARTUP
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        createAccountModal();

        updateAccountUI();

    }
);
