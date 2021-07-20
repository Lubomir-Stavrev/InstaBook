import { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage.js";
import Home from "./components/Pages/Home.js";
import Profile from "./components/Profile/Profile.js";
import Login from "./components/Auth/Login.js";
import Register from "./components/Auth/Register.js";

function App() {
	return (
		<Fragment>
			<Switch>
				<Route path="/" exact component={LandingPage} />
				<Route path="/home" exact component={Home} />
				<Route path="/profile" exact component={Profile} />
				<Route path="/login" exact component={Login} />
				<Route path="/register" exact component={Register} />
			</Switch>
		</Fragment>
	);
}

export default App;