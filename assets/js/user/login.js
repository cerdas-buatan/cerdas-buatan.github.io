import { getValue } from "https://jscroot.github.io/element/croot.js";

async function postLogin(target_url, data) {
  try {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: "follow",
    };

    const response = await fetch(target_url, requestOptions);
    const result = await response.text();
    return JSON.parse(result);
  } catch (error) {
    console.error("Error:", error);
    return { error: true, message: "Failed to connect to the server." };
  }
}

const Login = async () => {
  showLoadingOverlay();
  const target_url = "https://asia-southeast2-proven-wavelet-401905.cloudfunctions.net/loginai";

  const data = {
    email: getValue("username"),
    password: getValue("password"),
  };

  const result = await postLogin(target_url, data);
  responseData(result);
};

function showLoadingOverlay() {
  document.getElementById('loader-wrapper').style.display = 'flex';
}

function hideLoadingOverlay() {
  document.getElementById('loader-wrapper').style.display = 'none';
}

function responseData(result) {
  hideLoadingOverlay();
  if (!result.error) {
    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: result.message,
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.href = "./home.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: result.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

// Hide overlay when the page is fully loaded
document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    setTimeout(function () {
      document.getElementById('loader-wrapper').style.display = 'none';
    }, 2000); // Adjust timeout to match CSS animation duration
  }
};

document.getElementById("button").addEventListener("click", Login);
