import React from "react";
import { Button, Container, Grid } from "@material-ui/core";
import GoogleIcon from "./google.png";
import { actionTypes } from "../Files/reducer";
import { Link, useHistory } from "react-router-dom";
import { auth, provider } from "../Files/firebase";
import { useStateValue } from "../Files/StateProvider";
import "./Authentication.css";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  let [{}, dispatch] = useStateValue();

  let history = useHistory();

  let signIn = () => {
    console.log("Visitors Email =>", email, "Visitors Password", password);

    auth
      .signInWithEmailAndPassword(email, password)
      .then((authResponse) => {
        if (authResponse) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  const continueWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Container maxWidth="xs">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          className="login__contentContainer"
        >
          <Grid item xs="12">
            <div className="login__cont flexColumn evenly center">
              <h1>LOGIN</h1>
              <form className="login__form flexColumn evenly center">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Your Email"
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Create a strong Password"
                />
              </form>
              <Button
                onClick={signIn}
                variant="outlined"
                className="auth__btns loginBtn"
              >
                LogIn
              </Button>
              <Link to="/auth">
                <Button variant="outlined" className="loginPage">
                  Signup Instead
                </Button>
              </Link>
              <a
                onClick={continueWithGoogle}
                className="logIn__googleSignIn flexRow between center pointer"
              >
                <img src={GoogleIcon} /> Continue with Google
              </a>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
