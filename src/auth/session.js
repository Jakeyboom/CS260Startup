export function confirmSession() {
  return localStorage.getItem('session') !== null;
}

export function handleUnauthorized(navigate) {
    localStorage.removeItem('session');
    localStorage.removeItem('inspirationalQuotes');
    alert("Your session has expired. Please log in again.");
    navigate('/');

}