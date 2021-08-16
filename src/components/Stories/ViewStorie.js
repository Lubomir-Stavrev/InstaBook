import { Fragment, useEffect, useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import services from "../../server/services";
import storieStyle from "./Stories.module.css";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../redux/storieState";
import arrow from "../../images/next.png";

export default ({ param }) => {
	const [getStories, setStories] = useState();
	const dispatch = useDispatch();
	const [currStorieIndex, setCurrStorieIndex] = useState(0);
	const [storieImgIndex, setStorieImgIndex] = useState(0);

	useEffect(() => {
		async function getAllStories() {
			let allStories = await services.getStories();
			setStories(await allStories);
			setCurrStorieIndex(Number(param));
		}
		getAllStories();
	}, []);

	function hidePostDetails(e) {
		e.preventDefault();

		dispatch(increment("none"));
	}
	function changeImgViewIndex(e) {
		let index = e.target.getAttribute("data-index");
		[...e.target.parentNode.children].forEach((el) => {
			el.style.backgroundColor = "white";
		});
		e.target.style.backgroundColor = "#52006a";
		setCurrStorieIndex(index - 1);
	}
	function nextImg(e) {
		let currentUserStoriesLength = Object.values(
			getStories[currStorieIndex]?.posts
		).length;
		if (storieImgIndex < currentUserStoriesLength - 1) {
			setStorieImgIndex((prev) => {
				return Number(prev) + 1;
			});
		} else {
			setCurrStorieIndex((prev) => {
				setStorieImgIndex(0);
				return Number(prev) + 1;
			});
		}
		let storiesContainer = e.target.parentNode.parentNode.children[3];
		let storieIndexes = storiesContainer.children[0].children;
		[...storieIndexes].forEach((el) => {
			let index = el.getAttribute("data-index");

			setStorieImgIndex((prev) => {
				if (index == prev + 1) {
					el.style.backgroundColor = "#52006a";
				} else {
					el.style.backgroundColor = "white";
				}

				return prev;
			});
		});
	}
	function previouseImg(e) {
		if (storieImgIndex > 0) {
			setStorieImgIndex((prev) => {
				return Number(prev) - 1;
			});
		} else {
			setCurrStorieIndex((prev) => {
				setStorieImgIndex(0);
				return Number(prev) - 1;
			});
		}

		let storiesContainer = e.target.parentNode.parentNode.children[3];
		let storieIndexes = storiesContainer.children[0].children;
		[...storieIndexes].forEach((el) => {
			let index = el.getAttribute("data-index");
			if (index == storieImgIndex) {
				el.style.backgroundColor = "#52006a";
			} else {
				el.style.backgroundColor = "white";
			}
		});
	}

	return (
		<Fragment>
			<div id={storieStyle.storieWrapper}>
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
				{getStories?.length > 1 ? (
					<Fragment>
						<div
							onClick={(e) => previouseImg(e)}
							id={storieStyle.previousArrow}>
							<img src={arrow} alt="" />
						</div>
						<div
							onClick={(e) => nextImg(e)}
							id={storieStyle.nextArrow}>
							<img src={arrow} alt="" />
						</div>
					</Fragment>
				) : (
					""
				)}

				<div id={storieStyle.storieContainer}>
					<div id={storieStyle.storieImageCounter}>
						{getStories
							? Object.entries(
									getStories[currStorieIndex]?.posts
							  ).map((e, i) => {
									i++;
									return (
										<div
											onClick={(e) =>
												changeImgViewIndex(e)
											}
											data-index={i}></div>
									);
							  })
							: ""}
					</div>
					{getStories ? (
						<div className={storieStyle.imgContainer}>
							{Object.values(getStories[currStorieIndex]?.posts)
								.length > 0
								? Object.values(
										getStories[currStorieIndex]?.posts
								  ).map((el, i) => {
										if (el.postURL && i == storieImgIndex) {
											return (
												<>
													<span
														style={{
															position: "fixed",
															left: "15px",
															top: "0px"
														}}>
														{el?.username}
													</span>
													<img
														src={el.postURL}
														alt=""
													/>
												</>
											);
										}
								  })
								: null}
						</div>
					) : (
						""
					)}
				</div>
			</div>
		</Fragment>
	);
};
