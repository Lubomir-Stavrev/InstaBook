import { Fragment, useEffect, useState } from "react";
import profileStyle from "./Profile.module.css";
import Header from "../Header/Header.js";
import services from "../../server/services";

function ViewUserProfile(param, { history }) {
	const [profileInfo, setProfileInfo] = useState({});
	const [profilePosts, setProfilePosts] = useState({});

	useEffect(() => {
		async function setProfile() {
			let profileId = param.location.pathname.split("/")[2];

			let data = await getProfileData(profileId);
			if (data) {
				setProfilePosts(data.posts);
				setProfileInfo({ username: data.username, uid: data.uid });
			}
		}
		setProfile();
	}, []);

	function getProfileData(id) {
		return services.getProfile(id).then((res) => {
			return res;
		});
	}
	return (
		<Fragment>
			{console.log(profileInfo.username)}
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
							{profileInfo.username
								? profileInfo.username
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
			</div>
		</Fragment>
	);
}

export default ViewUserProfile;
