import { useState, useRef } from "react";
//import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { BG_URL, USER_AVATAR } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";
import {  Loader2 } from "lucide-react";

const Login = () => {

  // State variables
  const [isSignInForm, setIsSignInForm] = useState(true); // true = sign in, false = sign up
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  // References to form inputs
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

 // const navigate = useNavigate();
  const dispatch = useDispatch();

  // Helper function to add user data to Redux store
  const addUserToStore = (user) => {
    const { uid, email, displayName, photoURL } = user;
    dispatch(
      addUser({
        uid: uid,
        email: email,
        displayName: displayName,
        photoURL: photoURL,
      })
    );
  };

  const handleButtonClick = async () => {
    try {

      // 1. First validate the form data
      const message = checkValidData(emailRef.current.value, passwordRef.current.value);

      setErrorMessage(message);
      setLoading(true);
      
      if (message) return;

      if (!isSignInForm) {

        // 2A. Sign Up Flow
        // - Create account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passwordRef.current.value
        );

        // - Update profile with name and photo
        await updateProfile(userCredential.user, {
          displayName: nameRef.current.value,
          photoURL: USER_AVATAR,
        });

        // - Add user data to Redux store
        addUserToStore(auth.currentUser);
        setLoading(false);
        
      } else {
        // 2B. Sign In Flow
        const userCredential = await signInWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passwordRef.current.value
        );

        setLoading(false);
        // - Add user data to Redux store
        addUserToStore(userCredential.user);
      }

      // 3. Navigate to browse page after successful sign in/up
      
     // navigate("/browse");

    } catch (error) {
      setErrorMessage(error.message);
    }finally {
      setLoading(false);
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(""); // Clear any previous errors
  };

  return (
    <div className="min-h-screen relative">
      <Header />
      
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          className="w-full h-full object-cover"
          src={BG_URL} 
          alt="background" 
        />
      </div>

      {/* Form container */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-11/12 md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {/* Name input - only show for sign up */}
        {!isSignInForm && (
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded"
          />
        )}

        {/* Email and password inputs */}
        <input
          ref={emailRef}
          type="email"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 rounded"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded"
        />

        {/* Show error message if any */}
        {errorMessage && (
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        )}

        {/* Submit button */}
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg flex items-center justify-center"
          onClick={handleButtonClick}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Sign " + (isSignInForm ? "In" : "Up")}
        </button>

        {/* Toggle between sign in and sign up */}
        <p 
          className="py-4 cursor-pointer" 
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;