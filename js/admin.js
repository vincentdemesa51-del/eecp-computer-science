async function checkLogin() {
    try {
        const { data, error } =
            await window.supabaseClient.auth.getUser();

        if (error || !data.user) {
            window.location.replace("admin-login.html");
            return;
        }

        const { data: adminRecord, error: adminError } =
            await window.supabaseClient
                .from("admins")
                .select("user_id")
                .eq("user_id", data.user.id)
                .maybeSingle();

        if (adminError) {
            console.error("Admin verification failed:", adminError);
            alert("Unable to verify admin access. Check the browser console.");
            return;
        }

        if (!adminRecord) {
            await window.supabaseClient.auth.signOut();
            window.location.replace("admin-login.html");
            return;
        }

        const emailElement = document.getElementById("adminEmail");

        if (emailElement) {
            emailElement.textContent = data.user.email || "Admin";
        }
    } catch (error) {
        console.error("Login check failed:", error);
        window.location.replace("admin-login.html");
    }
}

checkLogin();
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("adminLoginForm");
    const emailInput = document.getElementById("adminEmail");
    const passwordInput = document.getElementById("adminPassword");
    const loginButton = document.getElementById("loginButton");
    const loginMessage = document.getElementById("loginMessage");

    console.log("auth.js loaded");

    if (!loginForm) {
        console.error("Login form not found.");
        return;
    }

    function showMessage(message, type = "error") {
        loginMessage.textContent = message;
        loginMessage.className = "login-message " + type;
    }

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        console.log("Sign In button clicked.");

        if (!window.supabaseClient) {
            showMessage("Supabase is not connected. Check js/config.js.");
            console.error("window.supabaseClient is missing.");
            return;
        }

        loginButton.disabled = true;
        loginButton.textContent = "Signing in...";

        try {
            const { data, error } =
                await window.supabaseClient.auth.signInWithPassword({
                    email: emailInput.value.trim(),
                    password: passwordInput.value
                });

            if (error) throw error;

            showMessage("Login successful! Opening dashboard...", "success");
            window.location.href = "dashboard.html";

        } catch (error) {
            console.error("Login error:", error);
            showMessage(error.message || "Login failed.");
        } finally {
            loginButton.disabled = false;
            loginButton.textContent = "Sign In";
        }
    });
});