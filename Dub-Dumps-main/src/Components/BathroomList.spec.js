import { React } from 'react';
import { MemoryRouter as Router, Routes, Route, Navigate, useNavigate as navigateTo } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import BathroomList from './BathroomList';

describe('Unit: BathroomPage', () => {

    
    test('No results message shows when there are no matching bathrooms', () => {
        render(
            <Router>
                <BathroomList data={[]} />
            </Router>
        );
        expect(screen.getByTestId('no-results')).toBeInTheDocument()
    });


    // write a line that says to expect (all data ) to be equal to the data , fix line 28 to fit "no filters are applied"
    test('When no filters are applied, show all bathrooms', () => {
        render(
            <Router>
                <BathroomList data={displayedData} />
            </Router>
        );
        expect(displayedData.length).toBe(bathrooms.length)

        
    });
});