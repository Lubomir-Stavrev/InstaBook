import headerStyle from "./Header.module.css";
import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

export default () => {
	const [dropDownCondition, setDropDownCondition] = useState("none");

	function showDropDown(e) {
		e.preventDefault();

		setDropDownCondition((state) => {
			if (state === "none") {
				return "block";
			} else {
				return "none";
			}
		});
	}
	return (
		<Fragment>
			<div id={headerStyle.headerContainer}>
				<div id={headerStyle.title}>
					<Link to="/home">
						<span>Insta</span>
						<span>book</span>
					</Link>
				</div>
				<div id={headerStyle.searchContainer}>
					<input
						className={headerStyle.search}
						type="text"
						placeholder="Search"
					/>
				</div>
				<div id={headerStyle.options}>
					<Link to="/">
						<span>Home</span>
					</Link>
					<span>Messages</span>

					<span onClick={(event) => showDropDown(event)}>
						Profile
					</span>
				</div>
			</div>
			<div
				id={headerStyle.dropDown}
				style={{ display: dropDownCondition }}>
				<div className={headerStyle.arrowEffect}></div>
				<Link to="/profile">
					<li>View Profile</li>
				</Link>
				<Link to="/friends">
					<li>Friends</li>
				</Link>
				<hr />
				<Link to="/logout">
					<li>Sign Out</li>
				</Link>
			</div>
		</Fragment>
	);
};