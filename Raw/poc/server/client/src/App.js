import React, { useEffect, useState } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import axios from "axios";
function App() {
  let [isAuthnsign, setAuth] = useState({
    isAuth: false,
    isSign: true
  });
  const handleAuth = () => {
    window.location = "/auth/google";
  }
  useEffect(() => {
    {
      axios.get("/user").then(
        (res) => {
          let { data } = res;
          if(data.status && data.status == "success"){
            setAuth({
              isAuth: true,
              isSign: true
            });
          }else{
            console.log("Please Login");
          }
        }
      )
    }
  })
  return (
    <div className="App">
      <h1>Hello Oauth</h1>
      <Link to="/home">Home</Link>
      <Link to="/setting">Setting</Link>
      { 
        isAuthnsign.isSign == false ? <Redirect to="/signup"></Redirect> : <Redirect to="/"></Redirect> 
      }
      <Switch>
        <Route path="/" exact>
          <LoginPage>handleAuth={handleAuth} isAuth={isAuthnsign.isAuth}</LoginPage>
        </Route>
        <Route path="/signup">
          <SignUp></SignUp>
        </Route>
        <Route path="/home" render={(props) => {
          return(
            isAuthnsign.isAuth == true ? <Home {...props}></Home>:<Redirect to="/"></Redirect>
          )
        }}></Route>
        <Route path="/setting" render={(props) => {
          return(
            isAuthnsign.isAuth == true ? <Setting {...props}></Setting> : <Redirect to="/"></Redirect>
          )
        }}></Route>
      </Switch>
    </div>
  );
}
function LoginPage(props){
  let { isAuth, handleAuth } = props;
  return(
    <React.Fragment>
      <button onClick={handleAuth}>{isAuth==true ? <span>Logout</span> : <span>Login</span>}</button>
    </React.Fragment>
  ) 
}
function Home(){
  return <h1>Home Page</h1>
}
function Setting(){
  return <h1>Setting Page</h1>
}
function SignUp(){
  return <h1>SignUp Page</h1>
}
export default App;
