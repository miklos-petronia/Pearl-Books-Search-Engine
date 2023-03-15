// utilize this to decode a token and obtain the user's information 
import decode from 'jwt-decode';
import { getUser } from "../utils/auth"

// Developing a new class to launch for a user
class AuthService {
    // obatin a user data information
    getProfile() {
        return decode(this.getToken());
    }

    // Search if user is logged in
    loggedIn() {
        // search if there is a saved token and if it is still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token); // handwaiving here
    }

    // Search if the token is expired/finished
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    }
}

export default new AuthService();