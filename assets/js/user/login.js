import { getValue } from "https://jscroot.github.io/element/croot.js";

function postLogin(target_url, data, responseFunction) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
    redirect: "follow",
  };

  fetch(target_url, requestOptions)
    .then((response) => response.text())
    .then((result) => responseFunction(JSON.parse(result)))
    .catch((error) => console.log("error", error));
}

const Login = () => {
  // Display loading overlay
  showLoadingOverlay();
  const target_url =
    "https://asia-southeast2-proven-wavelet-401905.cloudfunctions.net/loginai";

  const data = {
    email: getValue("username"),
    password: getValue("password"),
  };

  postLogin(target_url, data, responseData);
};

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
  if (result.error === undefined || !result.error) {
    document.cookie = `Authorization=${encodeURIComponent(
      result.token
    )}; path=/;`;

    Swal.fire({
      icon: "success",
      title: "Login Successful",
    }).then(() => {
      window.location.href = "./chat.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
    });
  }
}

  // Menghilangkan overlay saat halaman selesai dimuat
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      setTimeout(function () {
        document.getElementById('loader-wrapper').style.display = 'none';
      }, 2000); // Sesuaikan timeout dengan durasi animasi CSS
    }
  };

document.getElementById("button").addEventListener("click", Login);
  

  