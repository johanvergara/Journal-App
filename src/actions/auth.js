import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { googleAuthProvider, signInWithPopup, getAuth } from '../firebase/firebaseConfig';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';

export const startLogininEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(
                    login(user.uid, user.displayName)
                );
            }).catch( err => {
                console.log(err);
                Swal.fire('Error', err.message, 'error');
            }).finally( () => {
                dispatch(finishLoading());
            })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return(dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then( async({user}) => {
                console.log(user);
                await updateProfile(user, {displayName: name});
                dispatch( 
                    login(user.uid, user.displayName) 
                )
            })
            .catch( err => {
                console.log(err);
                Swal.fire('Error', err.message, 'error');
            })
    }
}

export const startGoogleLogin = () =>{
    return (dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) => {
                dispatch( login(user.uid, user.displayName) )
            })
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const startLogout = () => {
    return async (dispatch) => {
        const auth = getAuth();
        await signOut(auth);

        dispatch( logout() );
        dispatch( noteLogout() );
    }
}

export const logout = () => ({
    type: types.logout
});