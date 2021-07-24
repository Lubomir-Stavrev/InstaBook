import { Fragment, useEffect, useState } from "react";
import authStyle from "./Auth.module.css";
import { Link } from "react-router-dom";
import service from "../../server/services";
import isStrongPassword from "validator/lib/isStrongPassword";

function Login({ history }) {
	const [errorMessage, setErrorMessage] = useState("");
	function handleLogin(e) {
		e.preventDefault();

		let loginEmail = e.target.email.value;
		let loginPassword = e.target.password.value;

		service.login(loginEmail, loginPassword).then((res) => {
			if (res?.err) {
				console.log(res.err.message);
				setErrorMessage(res.err.message);
				return;
			}
			return history.push("/home");
		});
	}
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
				{errorMessage ? (
					setTimeout(function () {
						setErrorMessage((old) => {
							return "";
						});
					}, 3000) && (
						<Fragment>
							<div className={authStyle.errorMessage}>
								<span>{errorMessage}</span>
							</div>
							<br />
						</Fragment>
					)
				) : (
					<br />
				)}

				<Link to="/register" className={authStyle.authRedirect}>
					<span>Don't have an account yet?</span>
				</Link>
			</form>
		</div>
	);
}

export default Login;
