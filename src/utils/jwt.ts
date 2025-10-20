import { jwtDecode } from "jwt-decode";

function autoClearExpiredToke() {
  const token = sessionStorage.getItem("accessToken");
  if (!token) return;
  if (token) {
    const decoded = jwtDecode(token);
    console.log("jwt", decoded.exp);
    const isExpired = decoded.exp ? decoded.exp * 1000 < Date.now() : true;
    if (isExpired) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("user");
    }
  }
}

autoClearExpiredToke();
setInterval(autoClearExpiredToke, 60 * 1000);
