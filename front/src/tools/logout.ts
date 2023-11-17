export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("admin");
  localStorage.removeItem("token");
  localStorage.removeItem("expire_token");
  window.location.pathname = "home";
}
