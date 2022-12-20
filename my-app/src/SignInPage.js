import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { EmailAuthProvider, getAuth } from "firebase/auth";

// code mostly taken from Au 2022 INFO 340 Lecture Recording (2021-12-06)
const firebaseUIConfig = {
    signInOptions: [
        {
            provider: EmailAuthProvider.PROVIDER_ID,
            disableSignUp: {
                status: true
            }
        }
    ],
    signInFlow: 'popup', // don't redirect to authenticate
    credentialHelper: 'none',
    callbacks: {
        signInSuccessWithAuthResult: () => {
            return false; // don't redirect on your own
        }
    }
}

// taken from older project (https://github.com/info340-au21/habit-tracker/blob/52e71f2086bfb1fc529ad5610d96a7b7401153dd/src/components/SignInPage.js)
export default function SignInPage(props) {
    let auth = getAuth();
    return (
        <div className="sign-in">
            <StyledFirebaseAuth
              uiConfig={firebaseUIConfig}
              firebaseAuth={auth}
              aria-label="sign in"
            />
        </div>  
    );
}