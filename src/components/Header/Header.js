import headerStyle from "./Header.module.css";
import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import services from "../../server/services";
import logo from "../../images/instabookLogo.png";

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
				<div id={headerStyle.titleLogo}>
					<Link to="/home">
						<span>
							<img src={logo} alt="" />
						</span>
					</Link>
				</div>
				{window.location.pathname.includes("home") ? (
					<div id={headerStyle.searchContainer}>
						<input
							className={headerStyle.search}
							type="text"
							placeholder="Search"
						/>
					</div>
				) : (
					<div
						style={{ visibility: "hidden" }}
						id={headerStyle.searchContainer}>
						<input
							className={headerStyle.search}
							type="text"
							placeholder="Search"
						/>
					</div>
				)}
				<div id={headerStyle.options}>
					<Link to="/home">
						<span>Home</span>
					</Link>
					<span>Messages</span>

					<span onClick={(event) => showDropDown(event)}>
						Profile
					</span>
				</div>
				<div
					className={headerStyle.barsContainer}
					onClick={(e) => showDropDown(e)}>
					<div className={headerStyle.bar1}></div>
					<div className={headerStyle.bar2}></div>
					<div className={headerStyle.bar3}></div>
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
				<Link style={{ display: "none" }} to="/messages">
					<li>Messages</li>
				</Link>
				<hr />
				<Link onClick={(e) => services.signOut()} to="/">
					<li>Sign Out</li>
				</Link>
			</div>
		</Fragment>
	);
};
