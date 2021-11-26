import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Authentication.css";
import { Button, Container, Grid } from "@material-ui/core";
import GoogleIcon from "./google.png";
import { auth, provider, db } from "../Files/firebase";
import firebase from "firebase";
import { useStateValue } from "../Files/StateProvider";

const Authentication = () => {
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  let [{ user }, dispatch] = useStateValue();

  let history = useHistory();

  const signUpHandler = async (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authResponse) => {
        db.collection("users").doc(authResponse?.user.uid).set({
          userID: authResponse?.user.uid,
          displayName: displayName,
          email: email,
          password: password,
          registeredSince: firebase.firestore.FieldValue.serverTimestamp(),
        });
        if (authResponse) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  const continueWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((user) => {
        if (user) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="authentication__page">
      <Container maxWidth="xs">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          className="authentication__contentContainer"
        >
          <Grid item xs="12">
            <div className="authentication__cont flexColumn between center">
              <h1 className="auth__taglineUp">Register</h1>

              <form
                onSubmit={signUpHandler}
                className="flexColumn evenly center"
              >
                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  type="text"
                  placeholder="Your fullname"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                />
                <input
                  className="auth__btns signup"
                  type="submit"
                  value="Signup"
                />
              </form>
              <a
                onClick={continueWithGoogle}
                className="googleSign flexRow between center pointer"
              >
                <img src={GoogleIcon} alt="Google_Logo" /> Continue with Google
              </a>
            </div>
          </Grid>
          <div className="authAction__btns flexColumn evenly center">
            <Link to="/auth/login">Logn Instead</Link>
          </div>
          <Grid container justifyContent="center">
            <Link className="skip" to="/">
              Skip
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Authentication;
