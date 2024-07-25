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