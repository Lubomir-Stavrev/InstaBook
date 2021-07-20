import { Fragment } from "react";
import SideMenu from "../SideMenu/SideMenu.js";
import Header from "../Header/Header.js";
import MainContant from "../MainContant/MainContant.js";

function Home() {
	return (
		<Fragment>
			<Header />
			<SideMenu />
			<MainContant />
		</Fragment>
	);
}

export default Home;
