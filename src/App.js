import "./App.css";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import {
  getAuth,
  signOut,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import initialiseAuth from "./Firebase/Firebase.init";
import { useState } from "react";
initialiseAuth();
const providerGoogle = new GoogleAuthProvider();
const providerGithub = new GithubAuthProvider();

function App() {
  const auth = getAuth();
  const [userGoogle, setUserGoogle] = useState({});
  const [userData, setUserData] = useState({});
  const [loginOrRegister, setloginOrRegister] = useState(false);

  const { displayName, email, photoURL } = userGoogle;

  const handlerGoogle = () => {
    signInWithPopup(auth, providerGoogle).then((result) => {
      const { displayName, email, photoURL } = result.user;
      const userInfo = {
        displayName,
        email,
        photoURL,
      };
      setUserGoogle(userInfo);
    });
  };

  const handlerGithub = () => {
    signInWithPopup(auth, providerGithub).then((result) => {
      const { displayName, email, photoURL } = result.user;
      const userInfo = {
        displayName,
        email,
        photoURL,
      };
      setUserGoogle(userInfo);
    });
  };
  const logOut = () => {
    signOut(auth).then(() => {
      setUserGoogle({});
    });
  };

  // //////////////////////////////
  const handlerValue = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handlerSudmit = (e) => {
    e.preventDefault();
    const { email, password } = userData;
    loginOrRegister ? login(email, password) : userRegistion(email, password);
  };

  const userRegistion = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        alert("Your  userRegistion successfully: ");
      })
      .catch((error) => {
        alert("Your Not userRegistion: ");
      });
  };

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUserGoogle(result.user);
        alert("Your  login successfully: ");
      })
      .catch((error) => {
        alert("Your Not login: ");
      });
  };
  const toggleOnOff = (e) => {
    setloginOrRegister(e.target.checked);
  };
  return (
    <div className="App m-5">
      <h1>Plz {loginOrRegister ? "Login" : "Register"} </h1>
      <div className="row row-cols-md-2 text-start">
        <form onSubmit={handlerSudmit} className=" mx-auto card p-5">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              onBlur={handlerValue}
              name="email"
              required
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              onBlur={handlerValue}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              onChange={toggleOnOff}
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Already you are login?
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-25">
            {loginOrRegister ? "Login" : "Register"}
          </button>
        </form>
      </div>
      {/* /////////////////////////////////// */}

      <br />
      <br />
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {email ? (
          <div className="card mx-auto ">
            <img src={photoURL} className="card-img-top" alt="..." />
            <div className="card-body">
              <h1 className="card-text">{displayName}</h1>
              <p className="card-text">{email}</p>
              <button
                className="btn btn-lg btn-outline-danger"
                onClick={logOut}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="card mx-auto "></div>
        )}
      </div>
      <button
        type="button"
        onClick={handlerGoogle}
        className="btn btn-lg m-5 btn-outline-primary"
      >
        Google
      </button>
      <button
        type="button"
        onClick={handlerGithub}
        className="btn btn-lg m-5 btn-outline-secondary"
      >
        Github
      </button>
    </div>
  );
}

export default App;
