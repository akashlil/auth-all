import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.config";

const initialiseAuth = () => {
  initializeApp(firebaseConfig);
};

export default initialiseAuth;
