import { React } from 'react';
import { MemoryRouter as Router, Routes, Route, Navigate, useNavigate as navigateTo } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import HomePage from './HomePage.js';

describe('Unit: Find a Bathroom link works', () => {
    test('Testing if Find a Bathroom links to the bathroom list page', () => {
        render(
            <Router>
                <HomePage/>
            </Router>
        );

        //click Find a Bathroom User button 
        userEvent.click('Find a Bathroom');

        expect(screen.getByText("Search!")).toBeInTheDocument();

    });

});