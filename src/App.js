import './App.css';
import firebase from './firebase';
import { useState, useEffect } from 'react';
import Auth from './components/Auth';

function App() {
  const { auth, db } = firebase;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => { user ? setUser(user) : setUser(null) });
    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="App">
      <header>
        <p>diwallet</p>
        <p>auth</p>
      </header>
      { user ? (<button onClick={() => auth().signOut()}>Sign Out</button>) : (<Auth />)}
    </div>
  );
}

export default App;
