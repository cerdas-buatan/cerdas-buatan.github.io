document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://asia-southeast2-proven-wavelet-401905.cloudfunctions.net/loginai';
  
    document.getElementById('loginBtn').addEventListener('click', function() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      const loginData = {
        username: username,
        password: password
      };
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      };
  
      fetch(apiUrl, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Handle successful login
          console.log('Login successful:', data);
          alert('Login successful!');
          // You can redirect to another page like this:
          // window.location.href = 'dashboard.html';
        })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
          document.getElementById('error-message').textContent = 'Login failed. Please check your username and password.';
        });
    });
  });
  