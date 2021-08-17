import firebase from './firebaseConfig.js'

const usersURL = 'https://instabook-7b05e-default-rtdb.europe-west1.firebasedatabase.app/users.json';
const db = 'https://instabook-7b05e-default-rtdb.europe-west1.firebasedatabase.app/';


export default {

    async login(email, password) {

        return await firebase.userModel.signInWithEmailAndPassword(email, password)
            .then(async function(data) {
                fetch(db + '/users/.json')
                    .then(res => res.json())
                    .then(userData => {
                        Object.entries(userData)
                            .forEach(userElement => {

                                if (userElement[1].uid === data.user.uid) {

                                    localStorage.setItem('auth', JSON.stringify({
                                        uid: data.user.uid,
                                        email,
                                        username: userElement[1].username,
                                        profileImage: userElement[1].profileImage ? userElement[1].profileImage : "https://library.mu-varna.bg/wp-content/uploads/2017/04/default-user-img.jpg",
                                        userDbKey: userElement[0]
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

        return await firebase.userModel.createUserWithEmailAndPassword(email, password)
            .then(async function(data) {

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

        return fetch(db + 'allPosts/.json', {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                    uid: JSON.parse(localStorage.getItem('auth')).uid,
                    username: this.getCurrentUserData().username
                })
            }).then(res => res.json())
            .then(data => {
                return fetch(db + `users/${this.getCurrentUserData().userDbKey}/posts/.json`, {
                    method: "POST",
                    body: JSON.stringify({
                        title,
                        description,
                        imageUrl,
                        postId: data.name,
                        uid: JSON.parse(localStorage.getItem('auth')).uid,
                        username: this.getCurrentUserData().username
                    })
                })
            })
            .then(res => res.json());
    },
    async getAllPosts() {

        let allPosts = [];
        await fetch(db + 'allPosts/.json')
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
                    if (el[1].uid !== this.getCurrentUserData().uid) {
                        allPosts.push(el[1])
                    }

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
                userDbKey: JSON.parse(localStorage.getItem('auth')).userDbKey,
                profileImage: JSON.parse(localStorage.getItem('auth')).profileImage,

            }
        }
        return data;
    },
    updateLike(postId, uid) {
        console.log(postId)
        return fetch(db + `allPosts/${postId}/.json`)
            .then(res => res.json())
            .then(data => {
                let likedUsers = [];
                let isLiked = false;
                console.log(data);
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

                fetch(db + `allPosts/${postId}/.json`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        likedUsers,
                    })
                }).then(res => {
                    this.updateLikesInProfile(postId, uid, likedUsers)
                })
                return { isAlreadyLiked: isLiked };
            });
    },
    updateLikesInProfile(postId, uid, likedUsers) {
        let userDataBaseId = '';
        let postDataBaseId = '';

        return fetch(db + `users/.json`)
            .then(res => res.json())
            .then(data => {
                Object.entries(data).forEach(user => {
                    if (user[1].posts) {
                        Object.entries(user[1].posts).forEach(postInfo => {
                            if (postInfo[1].postId === postId) {
                                userDataBaseId = user[0];
                                postDataBaseId = postInfo[0];

                            }
                        })
                    }
                })
            }).then(res => {
                fetch(db + `users/${userDataBaseId}/posts/${postDataBaseId}.json`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        likedUsers,
                    })
                })
            });
    },
    getProfile(id) {
        return fetch(db + `users/.json`)
            .then(res => res.json())
            .then(allUsers => {
                let userToReturn;
                Object.entries(allUsers)
                    .forEach(user => {

                        if (user[1].uid === id) {
                            userToReturn = user[1];
                        } else if (user[0] === id) {
                            userToReturn = user[1];
                        }
                    })
                return userToReturn;
            })
    },
    getCurrentUserPosts() {
        return fetch(db + `users/${this.getCurrentUserData().userDbKey}/posts/.json`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data;
            })
    },
    sendComment(idPost, comment) {

        return fetch(db + `allPosts/${idPost}/commentSection.json`, {
                method: 'POST',
                body: JSON.stringify({

                    comment,
                    profileEmail: this.getCurrentUserData().email,
                    profileName: this.getCurrentUserData().username,
                    profileDbKey: this.getCurrentUserData().userDbKey,


                })
            }).then(res => res.json())
            .then(dataRes => {
                let userDataBaseId = '';
                let postDataBaseId = '';

                return fetch(db + `users/.json`)
                    .then(res => res.json())
                    .then(data => {
                        Object.entries(data).forEach(user => {
                            if (user[1].posts) {
                                Object.entries(user[1].posts).forEach(postInfo => {

                                    if (postInfo[1].postId === idPost) {
                                        userDataBaseId = user[0];
                                        postDataBaseId = postInfo[0];

                                    }
                                })
                            }
                        })
                    }).then(res => {
                        fetch(db + `users/${userDataBaseId}/posts/${postDataBaseId}/comments/.json`, {
                            method: 'POST',
                            body: JSON.stringify({

                                comment,
                                profileEmail: this.getCurrentUserData().email,
                                profileName: this.getCurrentUserData().username,
                                profileDbKey: this.getCurrentUserData().userDbKey,


                            })
                        })
                    });
            })

    },
    async getAllComments(idPost) {
        let comments = [];
        await fetch(db + `allPosts/${idPost}/commentSection.json`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    Object.entries(data).forEach(el => {
                        comments.push({
                            comment: el[1].comment,
                            profileEmail: el[1].profileEmail,
                            profileName: el[1].profileName,
                            profileDbKey: el[1].profileDbKey,

                        })
                    })
                }
            })
        return await comments;
    },
    getPostFromUser(userId, postId) {


        return fetch(db + `users/.json`)
            .then(res => res.json())
            .then(users => {
                let postInfo = {};
                Object.entries(users).forEach(user => {
                    if (user[1].uid == userId) {
                        Object.entries(user[1].posts).forEach(post => {
                            if (post[1].likedUsers) {
                                post[1].likedUsers.forEach(likedUserEl => {
                                    if (likedUserEl === this.getCurrentUserData().uid) {
                                        post[1].isLiked = true;
                                    }
                                })

                            }
                            if (post[0] == postId) {
                                postInfo = post
                            }
                        })
                    }
                })
                return postInfo
            })
    },
    postStorie(imagesArray) {
        let userId = this.getCurrentUserData().userDbKey;


        return fetch(db + `stories/${this.getCurrentUserData().userDbKey}.json`, {
                method: 'POST',
                body: JSON.stringify({
                    postURL: imagesArray,
                    username: this.getCurrentUserData().username,
                    imageProfile: this.getCurrentUserData().profileImage,
                    userId
                })
            }).then(res => res.json())
            .catch(err => {
                console.log(err)
            })
    },
    async getStories() {
        let allStories = [];

        let res = await fetch(db + `stories/.json`)
        res = await res.json()
        if (await res) {
            Object.entries(await res).forEach((storie, i) => {
                let imageProfile = "";
                Object.values(storie[1]).forEach(el => {
                    if (el.imageProfile) {
                        imageProfile = el.imageProfile;
                        return;
                    }
                })
                let obj = { posts: storie[1], uid: storie[0], imageProfile, index: i }
                allStories.push(obj);
            })
        }
        allStories.sort((a, b) => a.index - (b.index))
        return await allStories;


    },
    updateProfile(imgUrl) {
        return fetch(db + `users/${this.getCurrentUserData().userDbKey}/.json`, {
            method: "PATCH",
            body: JSON.stringify({
                profileImage: imgUrl
            })
        }).then(data => {
            localStorage.setItem('auth', JSON.stringify({
                uid: this.getCurrentUserData().uid,
                email: this.getCurrentUserData().email,
                username: this.getCurrentUserData().username,
                profileImage: imgUrl,
                userDbKey: this.getCurrentUserData().userDbKey
            }));

        }).catch(err => {
            console.log(err)
        })
    }

}