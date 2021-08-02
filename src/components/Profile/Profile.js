import { Fragment, useEffect, useState } from "react";
import profileStyle from "./Profile.module.css";
import Header from "../Header/Header.js";
import services from "../../server/services";

function Profile({ history }) {
	const [profilePosts, setProfilePosts] = useState({});

	useEffect(() => {
		async function setProfile() {
			let data = await services.getCurrentUserPosts();
			if (data) {
				setProfilePosts(data);
			}
		}
		setProfile();
	}, []);

	function activePostElement(e) {
		e.preventDefault();
		e.target.innerHTML = e.target.innerHTML === "+" ? "-" : "+";
		let postContainer = e.target.parentNode.firstChild;
		postContainer.style.display =
			postContainer.style.display === "none" ? "block" : "none";
	}

	function handlePost(e) {
		e.preventDefault();
		let title = e.target.postTitle.value;
		let description = e.target.postDescription.value;
		let imageUrl = e.target.imageUrl.value;

		services.makePost(title, description, imageUrl).then((res) => {
			if (res?.err) {
				console.log(res.err.message);

				return;
			}
			services.getCurrentUserPosts().then((data) => {
				setProfilePosts(data);
			});
			e.target.parentNode.style.display = "none";
			return history.push("/profile");
		});
	}
	return (
		<Fragment>
			<Header />
			<div id={profileStyle.profileContainer}>
				<div id={profileStyle.profileInfoContainer}>
					<div className={profileStyle.profileImage}>
						<img
							src="https://library.mu-varna.bg/wp-content/uploads/2017/04/default-user-img.jpg"
							alt=""
						/>
					</div>
					<div className={profileStyle.profileInfo}>
						<h2>
							{services.getCurrentUserData()
								? services.getCurrentUserData().username
								: "No username error"}
						</h2>
						<span>14 posts</span>
						<span>104 followers</span>
						<span>56 following</span>
						<h4>I have telonym can you beleive that</h4>
					</div>
				</div>
				<div id={profileStyle.postsContainer}>
					{profilePosts ? (
						Object.entries(profilePosts).map((el) => (
							<div
								key={el[0]}
								className={profileStyle.postContainer}>
								<img src={el[1].imageUrl} alt="" />
							</div>
						))
					) : (
						<div>
							<h1>No POSTS</h1>
						</div>
					)}
				</div>
				<div id={profileStyle.addPostContainer}>
					<div style={{ display: "none" }} id={profileStyle.addPost}>
						<form action="" onSubmit={(e) => handlePost(e)}>
							<label htmlFor="username">Post Title</label>
							<input
								name="postTitle"
								placeholder="...."
								type="text"
							/>
							<br />
							<label htmlFor="email">Post Description</label>
							<input
								name="postDescription"
								placeholder=".........."
								type="text"
							/>
							<br />
							<label htmlFor="imageUrl">Img Url</label>
							<input
								type="url"
								placeholder="https://randomImage.jpg"
								name="imageUrl"
							/>
							<br />
							<button className="defaultButton" type="submit">
								Post
							</button>
							<br />
						</form>
					</div>
					<button onClick={(event) => activePostElement(event)}>
						+
					</button>
				</div>
			</div>
		</Fragment>
	);
}

export default Profile;
