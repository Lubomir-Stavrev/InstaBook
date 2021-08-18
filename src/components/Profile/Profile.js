import { Fragment, useEffect, useState } from "react";
import profileStyle from "./Profile.module.css";
import Header from "../Header/Header.js";
import services from "../../server/services";
import noPosts from "../../images/noPostsYet.png";

function Profile({ history }) {
	const [profilePosts, setProfilePosts] = useState({});
	const [getProfileData, setProfileData] = useState({});

	const [getProfileImageContainer, setProfileImageContainer] =
		useState("none");

	useEffect(() => {
		async function setProfile() {
			let data = await services.getCurrentUserPosts();
			let profileData = await services.getProfile(
				services.getCurrentUserData().uid
			);
			if (data) {
				setProfilePosts(data);
			}
			if (profileData) {
				setProfileData(profileData);
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

	function showPostProfileImage(e) {
		e.preventDefault();
		setProfileImageContainer("block");
	}
	function updateProfileImage(e) {
		e.preventDefault();
		let input = e.target.parentNode.children[2];

		if (!input.value) {
			input.style.border = "1px solid red";
			return;
		}

		services.updateProfile(input.value).then((res) => {
			setProfileImageContainer("none");
			services
				.getProfile(services.getCurrentUserData().uid)
				.then((res) => {
					if (res) {
						setProfileData(res);
					}
				});
		});
	}
	return (
		<Fragment>
			<Header />
			<div id={profileStyle.profileContainer}>
				<div
					style={{ display: getProfileImageContainer }}
					id={profileStyle.addImageContainer}>
					<div
						onClick={(e) => setProfileImageContainer("none")}
						style={{
							right: "10px",
							top: "10px",
							cursor: "pointer",
							position: "fixed"
						}}>
						<svg
							aria-label="Close"
							fill="#202020"
							height="24"
							role="img"
							viewBox="0 0 48 48"
							width="24">
							<path
								clipRule="evenodd"
								d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z"
								fillRule="evenodd"></path>
						</svg>
					</div>
					<label htmlFor="">Image URL</label>
					<input type="url" placeholder="https://image.jpg" />
					<br />
					<button
						onClick={(e) => updateProfileImage(e)}
						className="defaultButton">
						Add
					</button>
				</div>
				<div id={profileStyle.profileInfoContainer}>
					<div className={profileStyle.profileImage}>
						<div
							onClick={(e) => showPostProfileImage(e)}
							className={profileStyle.addImageButtonContainer}>
							<span>+</span>
							{getProfileData?.profileImage ? (
								<img
									src={getProfileData?.profileImage}
									alt=""
								/>
							) : (
								<img
									src="https://library.mu-varna.bg/wp-content/uploads/2017/04/default-user-img.jpg"
									alt=""
								/>
							)}
						</div>
					</div>
					<div className={profileStyle.profileInfo}>
						<div className={profileStyle.profileInfoHeader}>
							<span style={{ fontSize: "1.9rem" }}>
								{services.getCurrentUserData()
									? services.getCurrentUserData().username
									: "No username error"}
							</span>
						</div>
						<div className={profileStyle.profileInfoFooter}>
							<span>14 posts</span>
							<span>104 followers</span>
							<span>56 following</span>
						</div>
						<h4>I have telonym can you beleive that</h4>
					</div>
				</div>
				<div className={profileStyle.profileStats}>
					<span>14 posts</span>
					<span>104 followers</span>
					<span>56 following</span>
				</div>
				{console.log(Object.entries(profilePosts).length)}
				<div id={profileStyle.postsContainer}>
					{Object.entries(profilePosts).length > 0 ? (
						Object.entries(profilePosts).map((el) => (
							<div
								key={el[0]}
								className={profileStyle.postContainer}>
								<img src={el[1].imageUrl} alt="" />
							</div>
						))
					) : (
						<div className={profileStyle.noPostsContainer}>
							<img src={noPosts} alt="" />
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
