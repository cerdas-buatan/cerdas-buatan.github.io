// Utility function to delete a cookie by name
function deleteCookie(name) {
    document.cookie = name + '=; expires=' + new Date().toUTCString() + '; path=/;';
}

// Utility function to get cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
