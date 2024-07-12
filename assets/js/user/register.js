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

function responseData (result) {
    if (result.error === undefined || !result.error) {
        Swal.fire({
            icon: "success",
            title: "Register Successful",
        }).then(() => {
            window.location.href = "./login.html";
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Register Failed",
        });
    }
}

document.getElementById("regisbutton").addEventListener("click", Register);

  