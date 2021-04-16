import React , {useState,useEffect} from "react"
import { Fragment } from "react";
import LoginSignin from "./Login_signin";
import Mainpage from "./mainPage";
import { Route, Switch} from "react-router-dom";
import {UserContext} from "./context";


const App = () => {

  const [user, setUser] = useState();
return (
  <UserContext.Provider value={{user,setUser}} >
  <Switch>
    <Route path='/' component={LoginSignin} exact/>
    <Route  path='/memesworld' component={Mainpage} exact/>
   </Switch>
   </UserContext.Provider>
)
  
}

export default App;
