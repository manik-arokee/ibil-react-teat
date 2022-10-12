import React, { useState, useEffect } from "react";
import { gapi, loadAuth2 } from "gapi-script";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";

export const Login = () => {
  const [user, setUser] = useState(null);

  const updateUser = (currentUser: any) => {
    const name = currentUser.getBasicProfile().getName();
    const profileImg = currentUser.getBasicProfile().getImageUrl();
    setUser(...[name, profileImg]);
  };
  const attachSignin = (element: any, auth2: any) => {
    auth2.attachClickHandler(
      element,
      {},
      (googleUser: any) => {
        updateUser(googleUser);
      },
      (error: any) => {
        console.log(JSON.stringify(error));
      }
    );
  };

  useEffect(() => {
    const setAuth2 = async (client_id: any) => {
      const auth2 = await loadAuth2(gapi, client_id, "");
      if (auth2.isSignedIn.get()) {
        updateUser(auth2.currentUser.get());
      } else {
        attachSignin(document.getElementById("customBtn"), auth2);
      }
    };
    setAuth2(process.env.REACT_APP_GOOGLE_CLIENT_ID);
  }, []);

  useEffect(() => {
    if (!user) {
      const setAuth2 = async (client_id: any) => {
        const auth2 = await loadAuth2(gapi, client_id, "");
        attachSignin(document.getElementById("customBtn"), auth2);
      };
      setAuth2(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    }
  }, [user]);

  const signOut = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      setUser(null);
      console.log("User signed out.");
    });
  };

  if (user) {
    return <Redirect to="/" />;
    /*
    return (
      <div className="container">
        <Button type="button" variant="contained" onClick={signOut}>
          Logout
        </Button>
      </div>
    ); */
  }

  return (
    <div className="container">
      <Button type="button" variant="contained" id="customBtn">
        Login with Google
      </Button>
    </div>
  );
};
