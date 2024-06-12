import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import app from './firebase'
import { createContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'


const auth = getAuth(app)

export const contexM = createContext(null)
console.log({ contexM });


const ContexProvider = ({ children }) => {

    // loader
    const [loader, Setloader] = useState(true)

    // ends



    // create user
    const createuser = (email, pass) => {
        Setloader(true)
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    // login user

    const login = (email, password) => {
        Setloader(true)
        return signInWithEmailAndPassword(auth, email, password)


    }

    // logout user
    const logout = () => {
        Setloader(true)

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

            if (watch) {
                axios.post(`https://api.ecom-bd.com/jwt`, { email: watch.email })
                    .then(data => {
                        console.log(data);
                        localStorage.setItem('jwt', data.data.token)
                    })
            }

            else {
                localStorage.removeItem('jwt')
            }

            // loader
            Setloader(false)

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
        user,
        loader

    }


    return <contexM.Provider value={userInfos}>
        {children}
    </contexM.Provider>
};


export default ContexProvider