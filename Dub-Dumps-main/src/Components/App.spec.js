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
        render(
            <App data={[]} />
        );
    });
});