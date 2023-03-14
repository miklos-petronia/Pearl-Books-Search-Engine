// utilize this to decode a token and obtain the user's information 
import decode from 'jwt-decode';

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
