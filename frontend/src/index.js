import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import firebase from 'firebase/app'
import 'firebase/auth'
import { ReactReduxFirebaseProvider, reactReduxFirebase, getFirebase } from 'react-redux-firebase'
{/* <ReactReduxFirebaseProvider {...rrfProps}></ReactReduxFirebaseProvider> */}

const fbConfig = {
    apiKey: "AIzaSyCk8Q4as8CA18gwupiJGBYOojt3wTxhmiU",
    authDomain: "cs-554-the-rookies-project.firebaseapp.com",
    databaseURL: "https://cs-554-the-rookies-project.firebaseio.com",
    projectId: "cs-554-the-rookies-project",
    storageBucket: "cs-554-the-rookies-project.appspot.com",
    messagingSenderId: "696002771488",
    appId: "1:696002771488:web:e82ce3f1ea654fd2401a45",
    measurementId: "G-BFB6BJ8Q3H"
}

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

//Initialize firebase instance
firebase.initializeApp(fbConfig)

// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState, applyMiddleware(thunk.withExtraArgument(getFirebase)));
    // compose(
    //   applyMiddleware(thunk.withExtraArgument({getFirebase})),
    //   reactReduxFirebase(fbConfig) // redux binding for firebase
      
    // )

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
}

ReactDOM.render(<Provider store={store}><ReactReduxFirebaseProvider {...rrfProps}><App /></ReactReduxFirebaseProvider></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
