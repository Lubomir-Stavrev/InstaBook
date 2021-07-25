import { Fragment, useEffect, useState } from "react";
import profileStyle from "./Profile.module.css";
import Header from "../Header/Header.js";
import services from "../../server/services";

function ViewUserProfile(param, { history }) {
	const [profileInfo, setProfileInfo] = useState({});

	useEffect(() => {
		async function setProfile() {
			let profileId = param.location.pathname.split("/")[2];

			let data = await getProfileData(profileId);
			if (data) {
				setProfileInfo(data);
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
			</div>
		</Fragment>
	);
}

export default ViewUserProfile;
