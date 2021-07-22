import userModel from './firebaseConfig.js'

const usersURL = 'https://instabook-7b05e-default-rtdb.europe-west1.firebasedatabase.app/users.json';
const db = 'https://instabook-7b05e-default-rtdb.europe-west1.firebasedatabase.app/';


export default {

    async login(email, password, username) {

        return await userModel.signInWithEmailAndPassword(email, password)
            .then(async function(data) {

                localStorage.setItem('auth', JSON.stringify({ uid: data.user.uid, email, username }));
            }).catch(async err => {
                let error = {};
                error.err = err;
                return await error;
            })
    },
    async register(email, password) {

        return await userModel.createUserWithEmailAndPassword(email, password)
            .then(async function(data) {
                await fetch(usersURL, {
                    method: 'POST',
                    body: JSON.stringify({
                        admin: false,
                        email,
                    })
                })
            }).catch(async err => {
                let error = {};
                error.err = err;
                return await error;
            })
    },
    isLogged() {

        if (localStorage.getItem('auth')) {
            return true;
        }
        return false;
    },
    signOut() { localStorage.removeItem('auth'); }
}