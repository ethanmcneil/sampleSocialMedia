import React from 'react';

function Nav({ isLoggedIn }) {
	/*let show1 = checkForLogin();
  let show2 = checkForLogin2();
  function checkForLogin() {
    if (localStorage.getItem("coolbeans")) {
     return "show";
    }
    else {
      return "noShow";
    }
  };
  function checkForLogin2() {
    if (localStorage.getItem("coolbeans")) {
      return "show";
    }
    else {
      return "noShow";
    }
  }; */
	if (isLoggedIn) {
		return (
			<nav role="navigation">
				<ul className="nav-tabs">
					<li id="homeItem">
						<a href="/"> Home</a>
					</li>
					<li id="profileItem" >
						<a href="/profile">Your Profile</a>
					</li>
					<li id="postItem" >
						<a href="/feed">View Posts</a>
					</li>
					<li id="createItem" >
						<a href="/post">Create Post</a>
					</li>
					<li id="logoutItem" >
						<a href="/logout">Logout</a>
					</li>
				</ul>
			</nav>
		);
  }
  return (
    <nav role="navigation">
				<ul className="nav-tabs">
					<li id="homeItem">
						<a href="/"> Home</a>
					</li>
					<li id="registerItem" >
						<a href="/register">Register</a>
					</li>
					<li id="loginItem" >
						<a href="/login">Login</a>
					</li>
				</ul>
			</nav>
		);
}
export default Nav;
