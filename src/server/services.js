import userModel from './firebaseConfig.js'

const usersURL = 'https://instabook-7b05e-default-rtdb.europe-west1.firebasedatabase.app/users.json';
const db = 'https://instabook-7b05e-default-rtdb.europe-west1.firebasedatabase.app/';


export default {

    async login(email, password) {

        return await userModel.signInWithEmailAndPassword(email, password)
            .then(async function(data) {
                fetch(db + '/users/.json')
                    .then(res => res.json())
                    .then(userData => {
                        Object.values(userData)
                            .forEach(userElement => {
                                if (userElement.uid === data.user.uid) {
                                    localStorage.setItem('auth', JSON.stringify({
                                        uid: data.user.uid,
                                        email,
                                        username: userElement.username
                                    }));
                                }
                            })
                    })
            }).catch(async err => {
                let error = {};
                error.err = err;
                return await error;
            })
    },
    async register(username, email, password) {

        return await userModel.createUserWithEmailAndPassword(email, password)
            .then(async function(data) {
                console.log(data.user.uid);
                await fetch(usersURL, {
                    method: 'POST',
                    body: JSON.stringify({
                        username,
                        email,
                        uid: data.user.uid
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
    signOut() { localStorage.removeItem('auth'); },
    makePost(title, description, imageUrl) {

        return fetch(db + '.json', {
            method: 'POST',
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                uid: JSON.parse(localStorage.getItem('auth')).uid
            })
        }).then(res => res.json());
    },
    async getAllPosts() {

        let allPosts = [];
        await fetch(db + '.json')
            .then(res => res.json())
            .then(data => {
                Object.entries(data).forEach(el => {
                    if (el[1].likedUsers) {
                        el[1].likedUsers.forEach(likedUserEl => {
                            if (likedUserEl === this.getCurrentUserData().uid) {
                                el[1].isLiked = true;
                            }
                        })

                    }
                    el[1].postId = el[0];
                    allPosts.push(el[1])

                })
            });
        let usersPosts = await Object.assign({}, allPosts);
        return await usersPosts;

    },
    getCurrentUserData() {
        let data;
        if (localStorage.getItem('auth')) {
            data = {
                uid: JSON.parse(localStorage.getItem('auth')).uid,
                email: JSON.parse(localStorage.getItem('auth')).email,
                username: JSON.parse(localStorage.getItem('auth')).username,

            }
        }
        return data;
    },
    updateLike(postId, uid) {

        return fetch(db + `${postId}/.json`)
            .then(res => res.json())
            .then(data => {
                let likedUsers = [];
                let isLiked = false;
                if (data.likedUsers) {
                    likedUsers = data.likedUsers;
                    likedUsers.forEach(likedUserId => {
                        if (likedUserId == uid) {
                            isLiked = true;

                        }
                    })
                }
                if (!isLiked) {
                    likedUsers.push(uid)
                } else {
                    likedUsers.splice(likedUsers.indexOf(uid), 1);

                }

                fetch(db + `${postId}/.json`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        likedUsers,
                    })
                })
                return { isAlreadyLiked: isLiked };
            });
    }
}