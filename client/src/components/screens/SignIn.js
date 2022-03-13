import React, { useState, useEffect } from "react";
import "./css/SignIn.css";
import M from "materialize-css";
import Login from './LoginPage/Login'

export default function SignIn() {

	const [regName, setRegName] = useState("");
	const [regEmail, setRegEmail] = useState("");
	const [regPassword, setRegPassword] = useState("");
	const [logEmail, setLogEmail] = useState("")
	const [logPassword, setLogPassword] = useState("")
	const [clicked, setClicked] = useState(false);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [image, setImage] = useState(undefined);
	const [url, setUrl] = useState("");

	const uploadPicture = () => {
		const data = new FormData();
		data.append("file", image);
		data.append("upload_preset", "bekkiGram");
		data.append("cloud_name", "bolibek");
		fetch("https://api.cloudinary.com/v1_1/bolibekjnfjenfjnfjnfpjnfjnfenkjfwjf/image/upload", {
			method: "post",
			body: data,
		})
			.then((res) => res.json())
			.then((data) => {
        console.log(data)
				setUrl(data.url);
			})
			.catch((err) => {
				console.log(err);
			});
	};


	const ourFields = () => {
		if (
			// eslint-disable-next-line
			!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				regEmail
			)
		) {
			M.toast({
				html: "Email manzilingizni tog'ri kiriting",
				classes: "#ff1744 red accent-3",
			});
			return;
		}
		fetch("/signup", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: regName,
				password: regPassword,
				email: regEmail,
				pic: url,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.error) {
					M.toast({ html: data.error, classes: "#ff1744 red accent-3" });
				} else {
					M.toast({ html: data.msg, classes: "#2e7d32 green darken-3" });
					setClicked(!clicked);
				}
			});
	};

	const postData = () => {
		if (image) {
			uploadPicture();
		} else {
			ourFields();
		}
	};

	useEffect(() => {
		if (url) {
			ourFields();
		}
		// eslint-disable-next-line
	}, [url]);
	return (
		<>
			<section>
				<div className={clicked ? "container active" : "container"}>
					<div className="user signinBx">
						<div className="imgBx">
							<img
								src="https://images.unsplash.com/photo-1510243755-8d08c88677ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fG1hbiUyMG5pZ2h0fGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=500&q=60"
								alt="SignIn"
							/>
						</div>
						<div className="formBx">
							<Login
								logEmail={logEmail}
								logPassword={logPassword}
								setLogEmail={setLogEmail}
								setLogPassword={setLogPassword}
								clicked={clicked}
								setClicked={setClicked}
							/>

						</div>
					</div>
					<div className="user signupBx">
						<div className="formBx">
							<div className="form">
								<h2 style={{ margin: 0 }}>Ro'yhatdan o'tish</h2>
								<div class="containers">
									<img
										src="https://res.cloudinary.com/bolibekjnfjenfjnfjnfpjnfjnfenkjfwjf/image/upload/v1647139365/User_Avatar_2_zic9un.png"
										alt="Avatar"
										class="images"
									/>
									<div class="middles">
										<button
											onClick={() => setIsOpenModal(true)}
											className="btn #0d47a1 blue darken-4"
										>
											<i className="material-icons">add_a_photo</i>
										</button>
									</div>
								</div>
								<input
									type="text"
									name=""
									placeholder="Username"
									value={regName}
									onChange={(e) => setRegName(e.target.value)}
								/>
								<input
									type="email"
									name=""
									placeholder="Email Id"
									value={regEmail}
									onChange={(e) => setRegEmail(e.target.value)}
								/>
								<input
									type="password"
									name=""
									placeholder="Create Password"
									value={regPassword}
									onChange={(e) => setRegPassword(e.target.value)}
								/>

								<input
									type="submit"
									onClick={() => postData()}
									name=""
									value="Sign Up"
								/>
								<p className="signup">
									Already have an account?{/* eslint-disable-next-line */}
									<a href="#" onClick={() => setClicked(!clicked)}>
										{" "}
										Sign In{" "}
									</a>
								</p>
							</div>
						</div>
						<div className="imgBx">
							<img
								src="https://images.unsplash.com/photo-1586638554452-b119495e7d0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
								alt="signup"
							/>
						</div>
					</div>
				</div>
				{isOpenModal ? (
					<div className="modalS" onClick={() => setIsOpenModal(false)}>
						<div
							className="modalS__content"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="modalHeader">
								<h4>Add Your Accaunt Photo</h4>
								<i
									style={{ cursor: "pointer", color: "#0d47a1" }}
									onClick={() => setIsOpenModal(false)}
									className="small material-icons "
								>
									close
								</i>
							</div>
							<div className="modalConten">
								<div class="file-field input-field">
									<div class="btn #0d47a1 blue darken-4">
										<span>
											<i className="material-icons">add_a_photo</i>
										</span>
										<input
											type="file"
											onChange={(e) => setImage(e.target.files[0])}
										/>
									</div>
									<div class="file-path-wrapper">
										<input
											class="file-path validate"
											type="text"
											placeholder="You Photo"
										/>
									</div>
								</div>
							</div>
							<div className="modalFooter">
								<button
									className="btn #0d47a1 blue darken-4"
									onClick={() => setIsOpenModal(false)}
								>
									Save Image
								</button>
							</div>
						</div>
					</div>
				) : null}
			</section>
		</>
	);
}
