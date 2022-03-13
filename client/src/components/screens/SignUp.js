import React from 'react'
import {Link} from "react-router-dom"
export default function SignUp() {
  return (
    <div className="mycard">
			<div className="card card__auth">
				<h2>BekkiGram</h2>
				<div class="input-field col s6">
					<i class="material-icons prefix">verified_user</i>
					<input id="icon_prefix" type="text" class="validate" />
					<label for="icon_prefix">Name</label>
				</div>
				<div class="input-field col s6">
					<i class="material-icons prefix">email</i>
					<input id="icon_prefix" type="email" class="validate" />
					<label for="icon_prefix">Email Address</label>
				</div>
				<div class="input-field col s6">
					<i class="material-icons prefix">password</i>
					<input id="icon_prefix" type="password" class="validate" />
					<label for="icon_prefix">Password</label>
				</div>
				<button class="waves-effect waves-light btn blue-darken-4">Sign up</button>
        <p>
          <Link to="/signin">Already have an account?</Link>
        </p>
			</div>
		</div>
  )
}
