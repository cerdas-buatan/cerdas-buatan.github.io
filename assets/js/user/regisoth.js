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