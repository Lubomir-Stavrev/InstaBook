import mainContantStyle from "./MainContant.module.css";
import { Fragment, useEffect, useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import services from "../../server/services";

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
	return (
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
								key={el[0]}
								className={mainContantStyle.postContainer}>
								<div>Posted by: {el[1].title}</div>
								<Link
									className="linkWithoutStyle"
									to={`/posts/${el[1].postId}`}>
									<div
										className={
											mainContantStyle.postContant
										}>
										<img src={el[1].imageUrl} alt="" />
									</div>
								</Link>
								<div className={mainContantStyle.postFeed}>
									<div>
										<i className="fa fa-thumbs-up"></i>
									</div>
									<div>
										<i className="fa fa-thumbs-down"></i>
									</div>
									<div></div>
								</div>
								<div
									className={mainContantStyle.commentSection}>
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
	);
};
