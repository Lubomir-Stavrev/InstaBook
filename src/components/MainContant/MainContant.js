import mainContantStyle from "./MainContant.module.css";

export default () => {
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
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div id={mainContantStyle.postsContainer}>
				<div className={mainContantStyle.postContainer}>
					<div>Posted by: LbomirStavrev</div>
					<div className={mainContantStyle.postContant}>
						<img
							src="https://randomwordgenerator.com/img/picture-generator/50e8d2444a4faa0df7c5d57bc32f3e7b1d3ac3e456587049722b79d59e_640.jpg"
							alt=""
						/>
					</div>
					<div className={mainContantStyle.postFeed}>
						<div>
							<i className="fa fa-thumbs-up"></i>
						</div>
						<div>
							<i className="fa fa-thumbs-down"></i>
						</div>
						<div></div>
					</div>
					<div className={mainContantStyle.commentSection}>
						<input type="text" placeholder="Add a comment..." />
					</div>
				</div>
				<div className={mainContantStyle.postContainer}>
					<div>Posted by: LbomirStavrev</div>
					<div className={mainContantStyle.postContant}>
						<img
							src="https://randomwordgenerator.com/img/picture-generator/54e6d4454851a814f1dc8460962e33791c3ad6e04e507440762879dc974fcd_640.jpg"
							alt=""
						/>
					</div>
					<div className={mainContantStyle.postFeed}>
						<div>
							<i className="fa fa-thumbs-up"></i>
						</div>
						<div>
							<i className="fa fa-thumbs-down"></i>
						</div>
						<div></div>
					</div>
					<div className={mainContantStyle.commentSection}>
						<input type="text" placeholder="Add a comment..." />
					</div>
				</div>
				<div className={mainContantStyle.postContainer}>
					<div>Posted by: LbomirStavrev</div>
					<div className={mainContantStyle.postContant}>
						<img
							src="https://randomwordgenerator.com/img/picture-generator/5fe3d7444d52b10ff3d8992cc12c30771037dbf85257714b752d72dd964f_640.jpg"
							alt=""
						/>
					</div>
					<div className={mainContantStyle.postFeed}>
						<div>
							<i className="fa fa-thumbs-up"></i>
						</div>
						<div>
							<i className="fa fa-thumbs-down"></i>
						</div>
						<div></div>
					</div>
					<div className={mainContantStyle.commentSection}>
						<input type="text" placeholder="Add a comment..." />
					</div>
				</div>
				<div className={mainContantStyle.postContainer}>
					<div>Posted by: LbomirStavrev</div>
					<div className={mainContantStyle.postContant}>
						<img
							src="https://randomwordgenerator.com/img/picture-generator/57e3d6424351ad14f1dc8460962e33791c3ad6e04e507440772d7cdd9144c4_640.jpg"
							alt=""
						/>
					</div>
					<div className={mainContantStyle.postFeed}>
						<div>
							<i className="fa fa-thumbs-up"></i>
						</div>
						<div>
							<i className="fa fa-thumbs-down"></i>
						</div>
						<div></div>
					</div>
					<div className={mainContantStyle.commentSection}>
						<input type="text" placeholder="Add a comment..." />
					</div>
				</div>
			</div>
		</div>
	);
};
