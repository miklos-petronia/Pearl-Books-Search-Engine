// utilize this to decode a token and obtain the user's information 
import decode from 'jwt-decode';

// Developing a new class to launch for a user
class AuthService {
    // obatin a user data information
    getProfile() {
        return decode(this.getToken());
    }
