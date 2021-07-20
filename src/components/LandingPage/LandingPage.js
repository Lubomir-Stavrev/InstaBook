import landingPageStyle from "./LandingPage.module.css";
import { Link } from "react-router-dom";
import { Fragment } from "react";

export default () => {
	return (
		<Fragment>
			<div id={landingPageStyle.wrapper}>
				<div id={landingPageStyle.titleContainer}>
					Welcome to
					<span className={landingPageStyle.highlightOne}>
						{" "}
						Insta
					</span>
					<span className={landingPageStyle.highlightTwo}>Book</span>.
				</div>
				<div id={landingPageStyle.buttonContainer}>
					<Link to="/login">
						<button>Next »</button>
					</Link>
				</div>
			</div>
		</Fragment>
	);
};
