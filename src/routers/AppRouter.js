import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { login } from '../actions/auth';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if(user?.uid) {
                dispatch(
                    login(user.uid, user.displayName)
                );
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]);
    
    if(checking) {
        return (
            <h1>Please wait for...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={()=>(
                        <PrivateRouter isAuthenticated={isLoggedIn}>
                            <JournalScreen />
                        </PrivateRouter>
                        )}
                    />
                    <Route
                        path="/auth"
                        render={()=>(
                        <PublicRouter isAuthenticated={isLoggedIn}>
                            <AuthRouter />
                        </PublicRouter>
                        )}
                    />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
};
