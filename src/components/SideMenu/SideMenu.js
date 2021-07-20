import sideMenuStyle from "./SideMenu.module.css";

export default () => {
	return (
		<div id={sideMenuStyle.menuContainer}>
			<div id={sideMenuStyle.profileInfo}>
				<h2>Lubomir Stavrev</h2>
			</div>
			<div className={sideMenuStyle.friendList}>
				<span>Hester Duncan</span>
				<span>Bradlee Vickers</span>
				<span>Umayr Munoz</span>
				<span>Syeda Best</span>
				<span>Taine Espinosa</span>
				<span>Ruby Allison</span>
				<span>Anil Richard</span>
				<span>Annalise Clemons</span>
				<span>Gordon Crowther</span>
				<span>Anaya Wickens</span>
			</div>
		</div>
	);
};
