import { Fragment, useEffect, useState } from "react";
import profileStyle from "./Profile.module.css";
import Header from "../Header/Header.js";
import services from "../../server/services";
import PostDetails from "../Pages/PostDetails.js";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../redux/postState";
import noPosts from "../../images/noPostsYet.png";

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
				setProfileInfo({
					username: data.username,
					uid: data.uid,
					profileImage: data.profileImage,
					isFollowed: data.isFollowed,
					followers: data.followers,
					following: data.following,
					postsNum: data.posts
						? Object.entries(data?.posts)?.length
						: 0
				});
			}
		}
		setProfile();
	}, []);

	async function getProfileData(id) {
		return await services.getProfile(id).then(async (res) => {
			if (res.followers) {
				Object.entries(res.followers).forEach((el) => {
					if (services.getCurrentUserData().userDbKey === el[0]) {
						res.isFollowed = true;
					}
				});
			}
			console.log(await res);
			return await res;
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
	function handleFollowProfile(e) {
		let profileId = param.location.pathname.split("/")[2];
		services.followUser(profileId).then(async (res) => {
			let data = await getProfileData(profileId);
			setProfileInfo(await data);
		});
	}
	function handleUnfollowProfile(e) {
		let profileId = param.location.pathname.split("/")[2];
		services.unfollowUser(profileId).then(async (res) => {
			let data = await getProfileData(profileId);
			setProfileInfo(await data);
		});
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
						<div className={profileStyle.profileInfoHeader}>
							<span style={{ fontSize: "1.9rem" }}>
								{profileInfo.username
									? profileInfo.username
									: "No username error"}
							</span>
							<div>
								<button className="defaultButton">
									Message
								</button>
								{!profileInfo.isFollowed ? (
									<button
										onClick={(e) => handleFollowProfile(e)}
										className="defaultButton">
										Follow
									</button>
								) : (
									<button
										onClick={(e) =>
											handleUnfollowProfile(e)
										}
										className="defaultButton">
										Unfollow
									</button>
								)}
							</div>
						</div>
						<div className={profileStyle.profileInfoFooter}>
							<span>{profileInfo?.postsNum} posts</span>
							<span>
								{profileInfo?.followers
									? Object.entries(profileInfo?.followers)
											?.length
									: 0}{" "}
								followers
							</span>
							<span>
								{profileInfo?.following
									? Object.entries(profileInfo?.following)
											?.length
									: 0}{" "}
								following
							</span>
						</div>
						<h4>I have telonym can you beleive that</h4>
					</div>
				</div>
				<div className={profileStyle.profileStats}>
					<span>{profileInfo?.postsNum} posts</span>
					<span>
						{profileInfo?.followers
							? Object.entries(profileInfo?.followers)?.length
							: 0}{" "}
						followers
					</span>
					<span>
						{profileInfo?.following
							? Object.entries(profileInfo?.following)?.length
							: 0}{" "}
						following
					</span>
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
						<div className={profileStyle.noPostsContainer}>
							<img src={noPosts} alt="" />
						</div>
					)}
				</div>
			</div>
		</Fragment>
	);
}

export default ViewUserProfile;
