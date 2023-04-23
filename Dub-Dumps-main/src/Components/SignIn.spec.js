import { React } from 'react';
import { MemoryRouter as Router, Routes, Route, Navigate, useNavigate as navigateTo } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'

import SignIn from './SignIn.js';
import HomePage from './HomePage.js'

describe('Unit: Sign In button works', () => {
    test('Sign In leads to Sign in Page', () => {
        render(
            <Router>
                <HomePage/>
            </Router>
        );

        //click SIgn in button 
        userEvent.click(SignIn);

        expect(screen.getByText("Sign in here!")).toBeInTheDocument();

    });

});