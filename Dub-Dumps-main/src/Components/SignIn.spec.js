import React from 'react';
const { createMemoryHistory } = require("history");
import { Router } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import App from './App';
import SignIn from './SignIn';

// Initialize Firebase app with local emulator suite configuration
const app = initializeApp({
    projectId: 'test-dub-dumps',
    apiKey: 'test',
    databaseURL: 'http://localhost:9000/?ns=test-dub-dumps',
});

// Get Firebase authentication instance
// const auth = getAuth();
// connectAuthEmulator(auth, "http://localhost:9099");

const history = createMemoryHistory();

describe('User is signed in', () => {
    test('User is given indication that they are already logged in', () => {
        act(() => {
            render(
                <Router location={history.location} navigator={history}>
                    <SignIn currentUser={{ userId: 'Meghan' }} />
                </Router>
            );
        })
        const loggedInText = screen.getByText('You are already logged in!')
        expect(loggedInText).toBeInTheDocument;
    });
});

describe('User not signed in', () => {
    test('User is prompted to sign in', () => {
        act(() => {
            render(
                <Router location={history.location} navigator={history}>
                    <SignIn currentUser={{userID: null}} />
                </Router>
            );
        });
        const loggedInText = screen.getByText('Sign in here!')
        expect(loggedInText).toBeInTheDocument;
    });
});