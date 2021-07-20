import { Fragment } from "react";
import authStyle from "./Auth.module.css";
import { Link } from "react-router-dom";

function Login() {
	return (
		<div className={authStyle.formContainer}>
			<div className={authStyle.goHomeButton}>
				<Link to="/">
					<i>🡠</i>
				</Link>
				<span className={authStyle.tooltiptext}>Go Home</span>
			</div>
			<form
				className={authStyle.formDefault}
				onSubmit={(e) => handleLogin(e)}>
				<label htmlFor="username">Username</label>
				<input
					className={authStyle.inputDefault}
					name="username"
					placeholder="pesho"
					type="text"
				/>
				<br />
				<label htmlFor="email">Email</label>
				<input
					className={authStyle.inputDefault}
					name="email"
					placeholder="example@email.com"
					type="text"
				/>
				<br />
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					className={authStyle.inputDefault}
				/>
				<br />
				<button className="defaultButton" type="submit">
					Login
				</button>
				<br />

				<Link to="/register" className={authStyle.authRedirect}>
					<span>Don't have an account yet?</span>
				</Link>
			</form>
		</div>
	);
}

export default Login;
