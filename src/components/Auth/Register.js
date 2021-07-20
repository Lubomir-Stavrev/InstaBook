import { Fragment } from "react";
import authStyle from "./Auth.module.css";
import { Link } from "react-router-dom";

function Register() {
	return (
		<div className={authStyle.formContainer}>
			<div className={authStyle.goHomeButton}>
				<Link to="/">
					<i>🡠</i>
				</Link>
				<span className={authStyle.tooltiptext}>Go Home</span>
			</div>
			<form className={authStyle.formDefault}>
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
				<Link to="/login" className={authStyle.authRedirect}>
					<span>I already have an account.</span>
				</Link>
			</form>
		</div>
	);
}

export default Register;
