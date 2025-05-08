import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();

// authProvider
export const AuthProvide = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // register a user with username
  const registerUser = async (email, password, username) => {
    try {
      // First create the user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Then update the profile to add the username as displayName
      await updateProfile(userCredential.user, {
        displayName: username
      });
      
      return userCredential.user;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  }

  // login the user
  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
  }
  
  // sign up with google
  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider)
  }

  // logout the user
  const logout = () => {
    return signOut(auth)
  }

  // manage user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

      if(user) {
        const {email, displayName, photoURL} = user;
        const userData = {
          email, 
          username: displayName, 
          photo: photoURL
        }
        // You can use userData here if needed
      }
    })

    return () => unsubscribe();
  }, [])

  const value = {
    currentUser,
    loading,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout
  }

  return(
    <AuthContext.Provider value={value}>
      {!loading ? children : null}
    </AuthContext.Provider>
  )
}