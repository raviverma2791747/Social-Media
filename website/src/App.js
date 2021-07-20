import Main from "./components/Main";
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from './components/Signup'
import Header from './components/Header'
import Feed from './components/Feed'
import Profile from './components/Profile'
import NotFound from "./components/NotFound";
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="vh-100">
        <Switch>
          <Route path="/" exact>
            <Main brandName="Social Med" />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route>
            <NotFound/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
