import { Fragment } from "react";
import postDetailsStyle from "./PostDetails.module.css";

export default () => {
	return (
		<Fragment>
			<div id={postDetailsStyle.detailsContainer}>
				<div className={postDetailsStyle.detailsHeader}>
					<h1>Details</h1>
				</div>
				<div className={postDetailsStyle.contentWrapper}>
					<img
						src="https://randomwordgenerator.com/img/picture-generator/57e1d14a4e55af14f1dc8460962e33791c3ad6e04e5074417c2e7dd19349c5_640.jpg"
						alt=""
					/>
				</div>
			</div>
		</Fragment>
	);
};
