import { Fragment, useEffect, useState } from "react";
import postDetailsStyle from "./PostDetails.module.css";
import { Link, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../redux/postState";
import services from "../../server/services";

export default (props) => {
	const { viewState } = useSelector((state) => state.postState);
	const dispatch = useDispatch();

	const [getPost, setPost] = useState({});

	useEffect(() => {
		async function getPostDetails() {
			let data = await services.getPostFromUser(
				props.profileId,
				props.postId
			);
			console.log(await data);
			setPost(data[1]);
		}
		getPostDetails();
	}, [props]);

	function hidePostDetails(e) {
		e.preventDefault();

		dispatch(increment("none"));
	}

	function likePost(e) {
		e.preventDefault();
		let postId = e.target.parentNode.parentNode.getAttribute("data-index");

		let userId = services.getCurrentUserData().uid;

		if (postId && userId) {
			services.updateLike(postId, userId).then((data) => {
				let likeElement =
					e.target.parentNode.parentNode.children[3].firstChild
						.innerHTML;
				if (!data.isAlreadyLiked) {
					let currLikes = likeElement.split(" ")[0];

					e.target.parentNode.parentNode.children[3].firstChild.innerHTML =
						Number(currLikes) + 1 + " likes";
					e.target.parentNode.firstChild.style.color = "purple";
				} else {
					let currLikes = likeElement.split(" ")[0];

					e.target.parentNode.parentNode.children[3].firstChild.innerHTML =
						Number(currLikes) - 1 + " likes";
					e.target.parentNode.firstChild.style.color = "grey";
				}
			});
		}
	}
	function getAllPosts() {
		return services.getPostFromUser(props.profileId, props.postId);
	}
	function handlePostComment(e) {
		e.preventDefault();

		let comment = e.target.parentNode.children[3].value;

		if (!comment) {
			return;
		}

		let postId = e.target.parentNode.getAttribute("data-index");
		services.sendComment(postId, comment).then((res) => {
			e.target.parentNode.children[3].value = "";
			getAllPosts().then((data) => {
				if (data) {
					setPost(data[1]);
				}
			});
		});
	}
	function activateMessageInput(e) {
		e.preventDefault();

		let commentWrapper =
			e.target.parentNode.parentNode.parentNode.parentNode.children[3];

		commentWrapper.focus();
	}

	return (
		<Fragment>
			<div id={postDetailsStyle.detailsWrapper}>
				<div
					onClick={(e) => hidePostDetails(e)}
					style={{
						float: "right",
						fontSize: "2.5rem",
						marginRight: "20px",
						cursor: "pointer"
					}}>
					<svg
						aria-label="Close"
						fill="#ffffff"
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
				<div id={postDetailsStyle.detailsContainer}>
					<div className={postDetailsStyle.contentWrapper}>
						<img src={getPost ? getPost.imageUrl : ""} alt="" />
					</div>
					<div className={postDetailsStyle.rightInfo}>
						<div className={postDetailsStyle.detailsHeader}>
							<span>{getPost ? getPost.title : ""}</span>
						</div>
						<hr />

						<div
							data-index={getPost?.postId}
							className={
								postDetailsStyle.commentsDetailsContainer
							}>
							<div
								className={
									postDetailsStyle.commentDetailsSection
								}>
								{getPost?.comments ? (
									Object.entries(getPost.comments).map(
										(comm) => {
											return (
												<span
													key={comm[0]}
													data-index={
														comm[1].profileDbKey
													}>
													{comm[1].profileDbKey ==
													services.getCurrentUserData()
														.userDbKey ? (
														<Link
															style={{
																color: "black",
																fontSize:
																	"1.2rem"
															}}
															to={`/profile`}>
															{
																comm[1]
																	.profileName
															}
														</Link>
													) : (
														<Link
															style={{
																color: "black",
																fontSize:
																	"1.2rem"
															}}
															to={`/profile/${comm[1].profileDbKey}`}>
															{
																comm[1]
																	.profileName
															}
														</Link>
													)}
													: {comm[1].comment}
												</span>
											);
										}
									)
								) : (
									<span>No Comments :(</span>
								)}
							</div>
							<div
								data-index={getPost?.postId}
								className={postDetailsStyle.postDetailsFeed}>
								<div>
									{getPost?.isLiked ? (
										<i
											style={{ color: "purple" }}
											onClick={(e) => likePost(e)}
											className="fa fa-thumbs-up"></i>
									) : (
										<i
											onClick={(e) => likePost(e)}
											className="fa fa-thumbs-up"></i>
									)}
								</div>
								<div>
									<i onClick={(e) => activateMessageInput(e)}>
										<svg
											fill="grey"
											height="23"
											role="img"
											viewBox="0 0 48 48"
											width="27">
											<path d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"></path>
										</svg>
									</i>
								</div>
								<div>
									<i>
										<svg
											fill="grey"
											height="23"
											role="img"
											viewBox="0 0 48 48"
											width="27">
											<path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
										</svg>
									</i>
								</div>
								<div>
									<span>
										{getPost?.likedUsers
											? getPost.likedUsers.length
											: 0}{" "}
										likes
									</span>
								</div>
							</div>
							<hr />
							<input type="text" placeholder="Add a comment..." />
							<i
								id={postDetailsStyle.postCommentButton}
								onClick={(e) => handlePostComment(e)}>
								Post
							</i>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};
