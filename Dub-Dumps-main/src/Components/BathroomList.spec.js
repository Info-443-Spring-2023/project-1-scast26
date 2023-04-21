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
});