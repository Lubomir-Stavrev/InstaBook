import { Fragment, useEffect, useState } from "react";
import postDetailsStyle from "./PostDetails.module.css";
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
			setPost(data[1]);
		}
		getPostDetails();
	}, [props]);

	function hidePostDetails(e) {
		e.preventDefault();

		let detailsPostWrapper = e.target.parentNode.parentNode;
		dispatch(increment("none"));
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
						class="_8-yf5 "
						fill="#ffffff"
						height="24"
						role="img"
						viewBox="0 0 48 48"
						width="24">
						<path
							clip-rule="evenodd"
							d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z"
							fill-rule="evenodd"></path>
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
							className={
								postDetailsStyle.commentsDetailsContainer
							}>
							<div
								className={
									postDetailsStyle.commentDetailsSection
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
							<div className={postDetailsStyle.postDetailsFeed}>
								<div>
									<i
										style={{ color: "purple" }}
										/* onClick={(e) => likePost(e)} */
										className="fa fa-thumbs-up"></i>

									<span>4</span>
								</div>
							</div>
							<input type="text" placeholder="Add a comment..." />
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};
