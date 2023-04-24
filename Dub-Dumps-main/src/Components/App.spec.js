import React, { useState, useEffect } from 'react';
import { Router } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, onAuthStateChanged } from 'firebase/auth';
const { createMemoryHistory } = require("history");
import App from './App';

// Initialize Firebase app with local emulator suite configuration
const app = initializeApp({
    projectId: 'test-dub-dumps',
    apiKey: 'test',
    databaseURL: 'http://localhost:9000/?ns=test-dub-dumps',
});

// Get Firebase authentication instance
const auth = getAuth();
connectAuthEmulator(auth, "http://localhost:9099");

const history = createMemoryHistory();

describe('App component', () => {
    test('User can successfully log in', () => {
        // render(
        //     <App data={[]} />
        // );

        const firebaseUser = {
            //fill in userid
            //fill in Display name
            //fill in email
        };

        //need to define the user trying to sign in?
        const user = ;

        onAuthStateChanged({}, firebaseUser, setCurrentUser);

        const loggedInText = screen.getByText('Find a Bathroom!');
        expect(loggedInText).toBeInTheDocument;

    });


    test('User cannot successfully log in', () => {
      

        const firebaseUser = {
            //fill in userid
            //fill in Display name
            //fill in email
        };

        //need to define the user trying to sign in?
        const user = ;

        onAuthStateChanged({}, firebaseUser, setCurrentUser);

        const loggedInText = screen.getByText('Create account');
        expect(loggedInText).toBeInTheDocument;

    });
});