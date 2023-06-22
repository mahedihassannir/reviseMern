import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import app from './firebase'
import { createContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const auth = getAuth(app)

export const contexM = createContext(null)
console.log({ contexM });




const ContexProvider = ({ children }) => {



    // create user
    const createuser = (email, pass) => {

        return createUserWithEmailAndPassword(auth, email, pass)
    }

    // login user

    const login = (email, password) => {

        return signInWithEmailAndPassword(auth,email,password)


    }

    // logout user
    const logout = () => {


        return signOut(auth)

    }
    // ends

    // user state
    const [user, Setuser] = useState(null)
    // ends

    // user observer
    useEffect(() => {
        const off = onAuthStateChanged(auth, watch => {

            Setuser(watch)


        })

        return (() => {

            off

        })

    }, [])
    // ends

    /**
     * 
     * const UpdateUser = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
        })
    }
    
     */

    const userInfos = {


        createuser,
        login,
        logout,
        user

    }


    return <contexM.Provider value={userInfos}>
        {children}
    </contexM.Provider>
};


export default ContexProvider