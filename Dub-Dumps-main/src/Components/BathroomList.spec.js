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
        const data = [
            { id: 1, 'building': 'RAI', 'floor': 'First Floor', 'location': 'North' },
            { id: 2, 'building': 'RAI', 'floor': 'Second Floor', 'location': 'West' },
            { id: 3, 'building': 'ODE', 'floor': 'Second Floor', 'location': 'North' }
        ]
        render(
            <Router>
                <BathroomList data={data} />
            </Router>
        );
        const numBathroomCards = screen.getAllByTestId('bathroom-card')
        expect(numBathroomCards.length).toBe(3)

    });
});