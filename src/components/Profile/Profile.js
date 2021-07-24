import { Fragment } from "react";
import profileStyle from "./Profile.module.css";
import Header from "../Header/Header.js";
import services from "../../server/services";

function Profile({ history }) {
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
							src="https://lh3.googleusercontent.com/j47al-nxXbjW2ZiRuhT7VDFOgZntl2r_QwDMB116TJ_qos7B8zJiUo1VhoSzNwAvr7LF9p0=s85"
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
					<div className={profileStyle.postContainer}>
						<img
							src="https://randomwordgenerator.com/img/picture-generator/54e5d4444c57af14f1dc8460962e33791c3ad6e04e507441722a72dc924ac5_640.jpg"
							alt=""
						/>
					</div>
					<div className={profileStyle.postContainer}>
						<img
							src="https://randomwordgenerator.com/img/picture-generator/55e3d3404c57a914f1dc8460962e33791c3ad6e04e507440702d79d39f44cc_640.jpg"
							alt=""
						/>
					</div>
					<div className={profileStyle.postContainer}>
						<img
							src="https://randomwordgenerator.com/img/picture-generator/57e2d74a4251b10ff3d8992cc12c30771037dbf85254794177277dd3934c_640.jpg"
							alt=""
						/>
					</div>
					<div className={profileStyle.postContainer}>
						<img
							src="https://randomwordgenerator.com/img/picture-generator/5fe2d5474352b10ff3d8992cc12c30771037dbf852547941762a7ed79f44_640.jpg"
							alt=""
						/>
					</div>
					<div className={profileStyle.postContainer}>
						<img
							src="https://randomwordgenerator.com/img/picture-generator/yns-plt-6dJ4fApKPk8-unsplash.jpg"
							alt=""
						/>
					</div>
					<div className={profileStyle.postContainer}>
						<img
							src="https://randomwordgenerator.com/img/picture-generator/57e0dd414a56a414f1dc8460962e33791c3ad6e04e50744172297bd49749cc_640.jpg"
							alt=""
						/>
					</div>
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
