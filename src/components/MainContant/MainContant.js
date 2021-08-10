import mainContantStyle from "./MainContant.module.css";
import { Fragment, useEffect, useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import services from "../../server/services";
import PostStorie from "../Stories/Stories.js";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../redux/storieState";

export default () => {
	const [allPosts, setAllPosts] = useState([]);
	const dispatch = useDispatch();
	const { viewState } = useSelector((state) => state.storieState);

	useEffect(() => {
		async function setPosts() {
			let data = await getAllPosts();
			if (data) {
				setAllPosts(data);
			}
		}
		setPosts();
	}, []);

	function getAllPosts() {
		return services
			.getAllPosts()
			.then((res) => {
				return res;
			})
			.catch((err) => {
				console.log(err);
			});
	}
	function likePost(e) {
		e.preventDefault();
		let postId = e.target.parentNode.parentNode.id;
		let userId = services.getCurrentUserData().uid;

		if (postId && userId) {
			services.updateLike(postId, userId).then((data) => {
				if (!data.isAlreadyLiked) {
					let likeElement =
						e.target.parentNode.parentNode.parentNode.children[3]
							.firstChild.innerHTML;

					let currLikes = likeElement.split(" ")[0];

					e.target.parentNode.parentNode.parentNode.children[3].firstChild.innerHTML =
						Number(currLikes) + 1 + " likes";
					e.target.parentNode.firstChild.style.color = "purple";
				} else {
					let likeElement =
						e.target.parentNode.parentNode.parentNode.children[3]
							.firstChild.innerHTML;

					let currLikes = likeElement.split(" ")[0];

					e.target.parentNode.parentNode.parentNode.children[3].firstChild.innerHTML =
						Number(currLikes) - 1 + " likes";
					e.target.parentNode.firstChild.style.color = "grey";
				}
			});
		}
	}

	function handlePostComment(e) {
		e.preventDefault();

		let comment = e.target.parentNode.children[2].value;

		if (!comment) {
			return;
		}

		let postId = e.target.parentNode.parentNode.getAttribute("data-index");
		services.sendComment(postId, comment).then((res) => {
			e.target.parentNode.children[2].value = "";
			getAllPosts().then((data) => {
				if (data) {
					setAllPosts(data);
				}
			});
		});
	}
	function activateMessageInput(e) {
		e.preventDefault();

		let commentWrapper =
			e.target.parentNode.parentNode.parentNode.parentNode.lastChild;
		commentWrapper.children[2].focus();
	}

	function handleMakeStorie(e) {
		e.preventDefault();

		dispatch(increment("block"));
	}
	return (
		<Fragment>
			<div id={mainContantStyle.mainContainer}>
				{viewState == "block" ? (
					<div style={{ display: viewState }}>
						<PostStorie></PostStorie>
					</div>
				) : (
					""
				)}
				<div id={mainContantStyle.stories}>
					<div
						onClick={(e) => handleMakeStorie(e)}
						className={mainContantStyle.addStorieButton}>
						<div className={mainContantStyle.horizontalLine}></div>
						<div className={mainContantStyle.verticleLine}></div>
					</div>
					<div>
						<img
							src="https://randomwordgenerator.com/img/picture-generator/53e4d2464a56a914f1dc8460962e33791c3ad6e04e507440722d7cd39345c1_640.jpg"
							alt=""
						/>
					</div>
					<div></div>
				</div>
				<div id={mainContantStyle.postsContainer}>
					{Object.keys(allPosts).length !== 0 ? (
						Object.entries(allPosts).map((el) => {
							return (
								<div
									key={el[1].postId}
									data-index={el[1].postId}
									className={mainContantStyle.postContainer}>
									<div
										className={
											mainContantStyle.userContainer
										}>
										<Link to={`/profile/${el[1].uid}`}>
											<span>{el[1].username}</span>
										</Link>
									</div>

									<div
										className={
											mainContantStyle.postContant
										}>
										<img src={el[1].imageUrl} alt="" />
									</div>

									<div
										id={el[1].postId}
										className={mainContantStyle.postFeed}>
										<div>
											{el[1].isLiked ? (
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
											<i
												onClick={(e) =>
													activateMessageInput(e)
												}>
												<svg
													fill="grey"
													height="27"
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
													height="27"
													role="img"
													viewBox="0 0 48 48"
													width="27">
													<path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
												</svg>
											</i>
										</div>
									</div>
									<div style={{ marginLeft: "14px" }}>
										<span>
											{el[1].likedUsers
												? el[1].likedUsers.length
												: 0}{" "}
											likes
										</span>
									</div>

									<div
										className={
											mainContantStyle.commentsContainer
										}>
										<div
											className={
												mainContantStyle.commentSection
											}>
											{el[1].commentSection ? (
												Object.entries(
													el[1].commentSection
												).map((comm) => {
													return (
														<span
															key={comm[0]}
															data-index={
																comm[1]
																	.profileDbKey
															}>
															{comm[1]
																.profileDbKey ==
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
												})
											) : (
												<div
													className={
														mainContantStyle.noCommentsMessage
													}>
													<span>No Comments :(</span>
													<span>
														Be the first to comment
														on this post.
													</span>
												</div>
											)}
										</div>
										<hr />
										<input
											type="text"
											placeholder="Add a comment..."
										/>
										<i
											className={
												mainContantStyle.postButton
											}
											onClick={(e) =>
												handlePostComment(e)
											}>
											Post
										</i>
									</div>
								</div>
							);
						})
					) : (
						<div>
							<h1>No Rotines Yet!</h1>
						</div>
					)}
				</div>
			</div>
		</Fragment>
	);
};
