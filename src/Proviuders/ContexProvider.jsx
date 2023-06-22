

import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from './firebase';
import { createContext, useEffect, useState } from 'react';

const auth = getAuth(app)

export const contexM = createContext(null)






const ContexProvider = ({ children }) => {

    const [loading, SetLoading] = useState(true)

    const handleCrate = (email, password) => {
        SetLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }


    // here is the singin method

    const handleSingin = (email, password) => {
        SetLoading(true)

        return signInWithEmailAndPassword(auth, email, password)

    }

    const provider = new GoogleAuthProvider()

    const popup = () => {

        return signInWithPopup(auth, provider)


    }



    // here is the sing out method 

    const HandleSigOut = () => {
        SetLoading(true)

        return signOut(auth)
    }

    const UpdateUser = (name, PhotoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: PhotoUrl
        })
    }

    const [user, SetUser] = useState(null)

    useEffect(() => {

        const off = onAuthStateChanged(auth, watch => {
            console.log(watch);
            SetUser(watch)
            SetLoading(false)

        })
        return (() => {
            off
        })

    }), []


    const userInfos = {
        handleCrate,
        HandleSigOut,
        handleSingin,
        user,
        loading,
        UpdateUser,
        popup

    }


    return <contexM.Provider value={userInfos}>\
        {children}
    </contexM.Provider>


};

export default ContexProvider;