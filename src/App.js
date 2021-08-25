import React, { useEffect, useState } from "react";
import Homepage from "./Pages/Homepage";
import Authentication from "./Pages/Authentication";
import Login from "./Pages/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useStateValue } from "./Files/StateProvider";
import { auth, db } from "./Files/firebase";

const App = () => {
  const [{ currentUser }, dispatch] = useStateValue();
  const [fetchedData, setFetchedData] = useState();
  const [secureData, setSecureData] = useState({});

  const [user, setUser] = useState({});

  useEffect(() => {
    console.log("CURRENT LOGGED IN USER ->>>>", currentUser);
  }, [currentUser]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
        localStorage.setItem("userID", authUser?.uid);
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  useEffect(() => {
    const fetchDataFromDB = () => {
      const docRef = db.collection("users").doc(user?.uid);

      docRef.get().then((doc) => {
        setFetchedData(doc.data());
        dispatch({
          type: "SET_FETCHED_DETAILS",
          fetchedData: doc.data(),
        });
      });
    };

    fetchDataFromDB();
  }, [user]);

  useEffect(() => {
    setSecureData({
      displayName: fetchedData?.displayName,
      userID: fetchedData?.userID,
      email: fetchedData?.email,
    });
  }, [fetchedData]);

  useEffect(() => {
    localStorage.setItem("fetchedData", JSON.stringify(secureData));
  }, [secureData]);

  return (
    <Router>
      {currentUser && <Redirect to="/" />}
      {!currentUser && <Redirect to="/auth" />}

      <div className="app__cont">
        <Switch>
          <Route path="/auth/login">
            <Login />
          </Route>
          <Route path="/auth">
            <Authentication />
          </Route>
          <Route path="/">
            <Homepage displayName={fetchedData?.displayName} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
