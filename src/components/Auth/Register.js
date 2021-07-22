import { Fragment, useEffect, useState } from "react";

import authStyle from "./Auth.module.css";
import { Link } from "react-router-dom";
import service from "../../server/services.js";
import isStrongPassword from "validator/lib/isStrongPassword";

function Register({ history }) {
	const [errorMessage, setErrorMessage] = useState("");

	function handleRegister(e) {
		e.preventDefault();

		let registerEmail = e.target.email;
		let registerPassword = e.target.password;
		let registerRePassword = e.target.rePassword;

		if (registerPassword.value !== registerRePassword.value) {
			registerPassword.value = "";
			registerRePassword.value = "";
			setErrorMessage("Passwords should match!");
			return;
		}

		if (!isStrongPassword(registerPassword.value)) {
			setErrorMessage(
				"The password is too week! It should contains at least one s$mbol, one lower case letter,one upper case letter!"
			);
			return;
		}

		service
			.register(registerEmail.value, registerPassword.value)
			.then((res) => {
				if (res?.err) {
					console.log(res.err.message);
					setErrorMessage(res.err.message);
					return;
				}
				history.push("/login");
			})
			.catch((err) => {
				console.log(err);
				setErrorMessage(err.message);
				return;
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
				onSubmit={(e) => handleRegister(e)}>
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
				<label htmlFor="rePassword">Repeat Password</label>
				<input
					type="password"
					name="rePassword"
					className={authStyle.inputDefault}
				/>
				<br />
				<button className="defaultButton" type="submit">
					Register
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
				<Link to="/login" className={authStyle.authRedirect}>
					<span>I already have an account.</span>
				</Link>
			</form>
		</div>
	);
}

export default Register;
