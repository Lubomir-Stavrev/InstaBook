import { Fragment, useEffect, useState } from "react";
import profileStyle from "./Profile.module.css";
import Header from "../Header/Header.js";
import services from "../../server/services";
import PostDetails from "../Pages/PostDetails.js";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../redux/postState";

function ViewUserProfile(param, { history }) {
	const [profileInfo, setProfileInfo] = useState({});
	const [profilePosts, setProfilePosts] = useState({});

	const [getProfileId, setProfileId] = useState({});
	const [getPostId, setPostId] = useState({});

	const { viewState } = useSelector((state) => state.postState);
	const dispatch = useDispatch();

	useEffect(() => {
		async function setProfile() {
			let profileId = param.location.pathname.split("/")[2];

			let data = await getProfileData(profileId);
			if (data) {
				setProfilePosts(data.posts);
				console.log(data);
				setProfileInfo({
					username: data.username,
					uid: data.uid,
					profileImage: data.profileImage
				});
			}
		}
		setProfile();
	}, []);

	function getProfileData(id) {
		return services.getProfile(id).then((res) => {
			return res;
		});
	}
	function handleViewPost(e) {
		e.preventDefault();

		let profileId = param.location.pathname.split("/")[2];
		let postId = e.target.parentNode.getAttribute("data-index");

		setProfileId(profileId);
		setPostId(postId);

		dispatch(increment("block"));
	}
	return (
		<Fragment>
			<Header />
			{viewState == "block" ? (
				<div style={{ display: viewState }}>
					<PostDetails profileId={getProfileId} postId={getPostId} />
				</div>
			) : (
				""
			)}
			<div id={profileStyle.profileContainer}>
				<div id={profileStyle.profileInfoContainer}>
					<div className={profileStyle.profileImage}>
						{profileInfo.profileImage ? (
							<img src={profileInfo?.profileImage} alt="" />
						) : (
							<img
								src="https://library.mu-varna.bg/wp-content/uploads/2017/04/default-user-img.jpg"
								alt=""
							/>
						)}
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
								data-index={el[0]}
								onClick={(e) => handleViewPost(e)}
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
