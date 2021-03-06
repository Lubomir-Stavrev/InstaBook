import { Fragment, useEffect, useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import services from "../../server/services";
import storieStyle from "./Stories.module.css";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../redux/storieState";
import arrow from "../../images/next.png";
import storage from "../../server/firebaseConfig.js";

export default () => {
	const [getImg, setImg] = useState({ file: null });
	const [getImageFiles, setImageFiles] = useState({ file: null });
	const dispatch = useDispatch();
	const [currImgIndex, setCurrImgIndex] = useState(0);

	function readFile(event) {
		let urlArray = [];
		let fileArray = [];
		for (let i = 0; i < event.target.files.length; i++) {
			urlArray.push(URL.createObjectURL(event.target.files[i]));
			fileArray.push(event.target.files[i]);
		}
		setImg({
			file: urlArray
		});
		setImageFiles(fileArray);
	}
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
		setCurrImgIndex(index - 1);
	}
	function nextImg(e) {
		setCurrImgIndex((prev) => {
			return prev + 1;
		});
		let storiesContainer = e.target.parentNode.parentNode.children[3];
		let storieIndexes = storiesContainer.children[0].children;
		[...storieIndexes].forEach((el) => {
			let index = el.getAttribute("data-index");
			if (index == currImgIndex + 2) {
				el.style.backgroundColor = "#52006a";
			} else {
				el.style.backgroundColor = "white";
			}
		});
	}
	function previouseImg(e) {
		setCurrImgIndex((prev) => {
			return prev - 1;
		});
		let storiesContainer = e.target.parentNode.parentNode.children[3];
		let storieIndexes = storiesContainer.children[0].children;
		[...storieIndexes].forEach((el) => {
			let index = el.getAttribute("data-index");
			if (index == currImgIndex) {
				el.style.backgroundColor = "#52006a";
			} else {
				el.style.backgroundColor = "white";
			}
		});
	}

	async function postStories(e) {
		e.preventDefault();

		let storieArray = [];
		let currentUserId = services.getCurrentUserData().userDbKey;
		for (let i = 0; i < getImageFiles.length; i++) {
			const uploadTask = storage.storage
				.ref(`images/${currentUserId}/${getImageFiles[i].name}`)
				.put(getImageFiles[i]);

			uploadTask.on(
				"state_changed",
				(snapshot) => {},
				(error) => {
					console.log(error);
				},
				() => {
					storage.storage
						.ref(`images/${currentUserId}`)
						.child(getImageFiles[i].name)
						.getDownloadURL()
						.then((url) => {
							let urlAsString = url.toString();

							services.postStorie(urlAsString);
						});
				}
			);
		}
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
				{getImg?.file?.length > 1 ? (
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
						{getImg?.file
							? getImg?.file.map((e, i) => {
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

					{getImg?.file ? (
						<div className={storieStyle.imgContainer}>
							<img src={getImg?.file[currImgIndex]} />
							<button
								className="defaultButton"
								onClick={(e) => setImg({ file: null })}
								type="submit">
								Back
							</button>
							<button
								className="defaultButton"
								onClick={(e) => postStories(e)}
								type="submit">
								Post
							</button>
						</div>
					) : (
						<form action="">
							<label className={storieStyle.customFileUpload}>
								<input
									onChange={(e) => readFile(e)}
									accept="image/gif, image/jpeg, image/png"
									type="file"
									multiple
								/>
								<div>
									<span>Click To Upload</span>
								</div>
							</label>
							<br />
						</form>
					)}
				</div>
			</div>
		</Fragment>
	);
};
