import { React } from 'react';
import { MemoryRouter as Router, Routes, Route, Navigate, useNavigate as navigateTo } from 'react-router-dom';
import { render, screen, fireEvent, getAllByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import StructuredSearch from './StructuredSearch';
import App from './App.js'
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// Initialize Firebase app with local emulator suite configuration
const app = initializeApp({
    projectId: 'test-dub-dumps',
    apiKey: 'test',
    databaseURL: 'http://localhost:9000/?ns=test-dub-dumps',
});

// Get Firebase authentication instance
const auth = getAuth();
connectAuthEmulator(auth, "http://localhost:9099");

const data = [
    { id: 1, 'building': 'RAI', 'floor': 'First Floor', 'location': 'North' },
    { id: 2, 'building': 'RAI', 'floor': 'Second Floor', 'location': 'West' },
    { id: 3, 'building': 'ODE', 'floor': 'Second Floor', 'location': 'North' }
]

describe('Structured Search', () => {
    // test('to render without errors', () => {
    //     render(
    //         <Router>
    //             <StructuredSearch data={[]} />
    //         </Router>
    //     );
    //     expect(screen.getByTestId("search-wrapper")).toBeInTheDocument();
    // });

    test('Building filter works correctly', () => {
        render(
            <App data={data} />
        );

        // Navigate to Bathroom List page
        const findABathroomButton = screen.getByTestId('toSearchPage');
        fireEvent.click(findABathroomButton);

        // Select building
        const buildingSelect = screen.getByTestId('buildingSelect');
        const applyButton = screen.getByText('Search!');

        fireEvent.change(buildingSelect, { target: { value: 'ODE' } });
        fireEvent.click(applyButton);

        const bathroomList = screen.getAllByTestId("bathroom-card");
        expect(bathroomList.length).toBe(1);
    });

    test('Floor filter works correctly', () => {
        render(
            <App data={data} />
        );
    
        // For some reason, app isn't starting on the home page
        // const findABathroomButton = screen.getByTestId('toSearchPage');
        // fireEvent.click(findABathroomButton);

        // Select building
        const floorSelect = screen.getByTestId('floorSelect');
        const applyButton = screen.getByText('Search!');

        fireEvent.change(floorSelect, { target: { value: 'Second Floor' } });
        fireEvent.click(applyButton);

        const bathroomList = screen.getAllByTestId("bathroom-card");
        expect(bathroomList.length).toBe(2);
    });

    test('Location filter works correctly', () => {
        render(
            <App data={data} />
        );
    
        // For some reason, app isn't starting on the home page
        // const findABathroomButton = screen.getByTestId('toSearchPage');
        // fireEvent.click(findABathroomButton);

        // Select building
        const locationSelect = screen.getByTestId('locationSelect');
        const applyButton = screen.getByText('Search!');

        fireEvent.change(locationSelect, { target: { value: 'North' } });
        fireEvent.click(applyButton);

        const bathroomList = screen.getAllByTestId("bathroom-card");
        expect(bathroomList.length).toBe(2);
    });
});