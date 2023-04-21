import { React } from 'react';
import { MemoryRouter as Router, Routes, Route, Navigate, useNavigate as navigateTo } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import StructuredSearch from './StructuredSearch';
import App from './App.js'

describe('Unit: Structured Search', () => {
    test('to render without errors', () => {
        render(
            <Router>
                <StructuredSearch data={[]} />
            </Router>
        );

        expect(screen.getByTestId("search-wrapper")).toBeInTheDocument();
    });

    // i think this one (and all the filter tests) is gonna have to be an 
    // integration test, aka we have to import bathroomlist.js in addition
    // app.js -- OH NO MEGHAN!! WE NEED TO MOCK FIREBASE SINCE APP.JS
    // REQUIRES FIREBASE AUTH!! WE HAVE TO MOCK IT!!
    test('Building filter works correctly', () => {
        const data = [
            { id: 1, 'building': 'RAI', 'floor': 'First Floor', 'location': 'North' },
            { id: 2, 'building': 'RAI', 'floor': 'Second Floor', 'location': 'West' },
            { id: 3, 'building': 'ODE', 'floor': 'Second Floor', 'location': 'North' }
        ]
        render(
            <App data={data} />
        );
        screen.debug();
    })
});