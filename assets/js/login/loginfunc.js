import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";
import { setCookieWithExpireHour } from "https://jscroot.github.io/cookie/croot.js";

export default function Login() {
  // Display loading overlay
  showLoadingOverlay();

  let target_url = "https://asia-southeast2-proven-wavelet-401905.cloudfunctions.net/loginai";
  let tokenkey = "token";
  let tokenvalue = "349e564380011196a9668a17d67c3611c51b1343c44ec0a8c259932f3809b655";
  let datainjson = {
    "username": getValue("username"),
    "password": getValue("password")
  };

  postWithToken(target_url, tokenkey, tokenvalue, datainjson, responseData);
}

function showLoadingOverlay() {
  // Show loading overlay
  document.getElementById('loader-wrapper').style.display = 'flex';
}

function hideLoadingOverlay() {
  // Hide loading overlay
  document.getElementById('loader-wrapper').style.display = 'none';
}

function responseData(result) {
  // Hide loading overlay when response is received
  hideLoadingOverlay();

  if (result.status === true) {
    setCookieWithExpireHour("token", result.token, 2);

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: result.message,
      showConfirmButton: false,
      timer: 1000,
    }).then(() => {
      window.location.href = "../index.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: result.message,
      showConfirmButton: false,
      timer: 1000,
    });
  }
}