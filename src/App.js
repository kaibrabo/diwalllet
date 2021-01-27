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
        
        { user ? (<button className="signOut" onClick={() => auth().signOut()}>sign out</button>) : (<p>auth</p>)}
      </header>
      { user ? (<div className=""></div>) : (<Auth />)}

      <footer>Made with Aloha 2021</footer>
    </div>
  );
}

export default App;
