import './App.css';
import firebase from './firebase';
import { useState, useEffect } from 'react';

function App() {
  const { auth, db } = firebase;

  const [user, setUser] = useState(null);

  const signIn = () => {
    const provider = new auth.GoogleAuthProvider();
    auth()
      .signInWithRedirect(provider)
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => { user ? setUser(user) : setUser(null) });
    return () => unsubscribe();
  }, []);


  return (
    <div className="App">
      <h1>diwallet</h1>
      { user ? (
          <button onClick={() => auth().signOut()} >Sign Out</button>
        )
        : (
          <button onClick={signIn}>Sign In with Google</button>
        )
      }
    </div>
  );
}

export default App;
