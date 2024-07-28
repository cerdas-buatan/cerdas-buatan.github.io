// forgot-password.js
async function PostForgotPassword() {
    const email = document.getElementById('forgot-email').value;
    const errorMessage = document.getElementById('forgot-error-message');

    if (!email) {
        errorMessage.textContent = 'Please enter your email address.';
        return;
    }

    try {
        const response = await fetch('/api/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            throw new Error('Failed to send password reset email.');
        }

        Swal.fire({
            title: 'Success!',
            text: 'Password reset email sent successfully. Please check your inbox.',
            icon: 'success',
            confirmButtonText: 'OK'
        });

    } catch (error) {
        errorMessage.textContent = error.message;
    }
}
