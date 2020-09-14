import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './components/home';
import Register from './components/register';
import Login from './components/login';
import Profile from './components/profile';
import Feed from './components/feed';
import Post from './components/post';
import Logout from './components/logout';
import Footer from './components/Footer';


function App() {
  const [isLoggedIn, setBoolean] = useState(false);
  useEffect(() =>  {
    if(localStorage.getItem("coolbeans")) {
      setBoolean(true);
    }
  },[]);

  return (
    <div>
    <Router>
     <Nav isLoggedIn={isLoggedIn}></Nav>
        <div className="bigContainer">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/feed" component={Feed} />
          <Route exact path="/post" component={Post} />
          <Route exact path="/logout" component={Logout} />
        </Switch>
      </div>
    </Router>
    <Footer></Footer>
  </div>
  );
}

export default App;
