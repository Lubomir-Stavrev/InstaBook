import mainContantStyle from "./MainContant.module.css";
import { Fragment, useEffect, useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import services from "../../server/services";
import PostDetails from "../Pages/PostDetails.js";

export default () => {
	const [allPosts, setAllPosts] = useState([]);

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
					e.target.parentNode.lastChild.innerHTML =
						Number(e.target.parentNode.lastChild.innerHTML) + 1;
					e.target.parentNode.firstChild.style.color = "purple";
				} else {
					e.target.parentNode.lastChild.innerHTML =
						Number(e.target.parentNode.lastChild.innerHTML) - 1;
					e.target.parentNode.firstChild.style.color = "grey";
				}
			});
		}
	}
	return (
		<Fragment>
			<div id={mainContantStyle.mainContainer}>
				<div id={mainContantStyle.stories}>
					<div
						style={{
							width: "65px",
							height: "65px",
							border: "none"
						}}>
						<img
							src="https://icon-library.com/images/icon-plus-sign/icon-plus-sign-25.jpg"
							alt=""
						/>
					</div>
					<div>
						<img
							src="https://randomwordgenerator.com/img/picture-generator/53e4d2464a56a914f1dc8460962e33791c3ad6e04e507440722d7cd39345c1_640.jpg"
							alt=""
						/>
					</div>
					<div></div>
					<div></div>

					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div id={mainContantStyle.postsContainer}>
					{Object.keys(allPosts).length !== 0 ? (
						Object.entries(allPosts).map((el) => {
							return (
								<div
									key={el[1].postId}
									className={mainContantStyle.postContainer}>
									<div>Posted by: {el[1].title}</div>

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
											<span>
												{el[1].likedUsers
													? el[1].likedUsers.length
													: 0}
											</span>
										</div>
									</div>

									<div
										className={
											mainContantStyle.commentsContainer
										}>
										<div
											className={
												mainContantStyle.commentSection
											}>
											<span>Hello there</span>
											<span>wwowoow</span>
											<span>wwowoasd asd asd </span>
											<span>wwowoasd asd asd </span>
											<span>wwowoasd asd asd </span>
											<span>lorem asdasd0 </span>
											<span>Hello there</span>
											<span>Hello there</span>
											<span>wwowoasd asd asd </span>
											<span>lorem asdasd0 </span>
											<span>lorem asdasd0 </span>
										</div>
										<input
											type="text"
											placeholder="Add a comment..."
										/>
									</div>
								</div>
							);
						})
					) : (
						<div /* className={profile.emptyPageContainer} */>
							<h1>No Rotines Yet!</h1>
						</div>
					)}
				</div>
			</div>
		</Fragment>
	);
};
