import { getValue } from "https://jscroot.github.io/element/croot.js";

async function postRegister(target_url, data) {
  try {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow'
    };

    const response = await fetch(target_url, requestOptions);
    const result = await response.text();
    return JSON.parse(result);
  } catch (error) {
    console.error('Error:', error);
    return { error: true, message: "Failed to connect to the server." };
  }
}

const Register = async () => {
  showLoadingOverlay();
  const target_url = "https://asia-southeast2-proven-wavelet-401905.cloudfunctions.net/registeraii";
  
  const username = getValue("username");
  const email = getValue("email");
  const password = getValue("password");

  const data = {
    username: username,
    akun: {
      email: email,
      password: password
    }
  };

  const result = await postRegister(target_url, data);
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
      title: "Register Successful",
      text: result.message,
      showConfirmButton: false,
      timer: 1000,
    }).then(() => {
      window.location.href = "./login.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Register Failed",
      text: result.message,
      showConfirmButton: false,
      timer: 1000,
    });
  }
}

// Hide overlay when the page is fully loaded
document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    setTimeout(function () {
      document.getElementById('loader-wrapper').style.display = 'none';
    }, 1000); // Adjust timeout to match CSS animation duration
  }
};

document.getElementById("regisbutton").addEventListener("click", Register);
