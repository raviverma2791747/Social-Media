import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import Main from "./components/Main";
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from './components/Signup'
import Header from './components/Header'
import Profile from './components/Profile'
import NotFound from "./components/NotFound";
import Settings from './components/Settings';
import PostView from './components/PostView'
import Test from './components/Test'
import { accountIsAuthenticated, profileCurrentUser, } from './api/Api'


export const userContext = React.createContext();

function App() {

  const [authenticate, setAuthenticate] = React.useState(false);
  const [username, setUsername] = React.useState(null);

  React.useEffect(() => {
    if (!authenticate) {
      accountIsAuthenticated().then((data) => {
        if (data['status'] === 'success') {
          setUsername(data['data']['username'])
          setAuthenticate(true);
        }
      })
    }
  
  },[authenticate]);




return (
  <Router>
    <userContext.Provider value={{ authenticate, setAuthenticate, username, setUsername }}>
      <div>
        <Switch>
          <Route path="/" exact>
            <Main brandName="Social Media" />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/profile/:username" exact>
            <Profile />
          </Route>
          <Route path="/post/:post_id">
            <PostView />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path='/test'>
            <Test />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </userContext.Provider>
  </Router>
);
}

export default App;
