import { getValue } from "https://jscroot.github.io/element/croot.js";

function postRegister(target_url, data, responseFunction) {

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        redirect: 'follow'
    };

    fetch(target_url, requestOptions)
        .then(response => response.text())
        .then(result => responseFunction(JSON.parse(result)))
        .catch(error => console.log('error', error));
}

const Register = () => {
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
    
    postRegister(target_url, data, responseData);
}

function showLoadingOverlay() {
    document.getElementById('loader-wrapper').style.display = 'flex';
  }
  
  function hideLoadingOverlay() {
    document.getElementById('loader-wrapper').style.display = 'none';
  }

function responseData (result) {
  hideLoadingOverlay();
    if (result.error === undefined || !result.error) {
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

  // Menghilangkan overlay saat halaman selesai dimuat
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      setTimeout(function () {
        document.getElementById('loader-wrapper').style.display = 'none';
      }, 2000); // Sesuaikan timeout dengan durasi animasi CSS
    }
  };

document.getElementById("regisbutton").addEventListener("click", Register);

  