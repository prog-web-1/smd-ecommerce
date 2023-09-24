export function isAuthenticated() {
    const user = localStorage.getItem("token");
    const token = localStorage.getItem("user");

    return token && user;
}