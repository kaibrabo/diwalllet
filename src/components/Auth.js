import './Auth.css';
import firebase from '../firebase';
import { useState } from 'react';

function Auth(props) {
    const { auth } = firebase;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const inputSignIn = (e) => {
        e.preventDefault();
        auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => console.log(err));
    };

    const googleSignIn = () => {
        const provider = new auth.GoogleAuthProvider();
        auth()
            .signInWithRedirect(provider)
            .catch(err => console.log(err));
    };

    const forgotPassword = (e) => {
        e.preventDefault();
        if (email) {
            auth().sendPasswordResetEmail(email).then(() => {
                alert(`Password Reset sent to ${email}.  Please check your email and follow the instructions to recover your login.`);
            }).catch(err => { console.log(err); alert("Something went wrong.. Try again.") });
        } else {
            alert("Please enter your email associated with this account.")
        }
    }

    return (
        <div className="auth__container">
            <p>Sign in to Diwallet</p>
            <div className="auth__box">
                <form onSubmit={inputSignIn} className="auth__boxForm">
                    <label>Email</label>
                    <input type='text' className="email" value={email} onChange={e => setEmail(e.target.value)} required></input>
                    <label>Password</label>
                    <input type='password' className="password" placeholder="&#9702;&#9702;&#9702;&#9702;&#9702;&#9702;&#9702;" value={password} onChange={e => setPassword(e.target.value)}></input>
                    <div className="auth__boxFormBtns">
                        <button onClick={forgotPassword} className="auth__forgotPassword">Forgot Password?</button>
                        <button type='submit' className="auth__submit">Sign In</button>
                    </div>
                </form>
                <hr />
                <p>or sign in with</p>
                <button onClick={googleSignIn} className="auth__box__google">Google</button>
            </div>
        </div>
    )
}

export default Auth;
