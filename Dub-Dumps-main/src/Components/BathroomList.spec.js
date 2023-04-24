import { React } from 'react';
import { MemoryRouter as Router, Routes, Route, Navigate, useNavigate as navigateTo } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import BathroomList from './BathroomList';

describe('Unit: BathroomList', () => {
    test('No results message shows when there are no matching bathrooms', () => {
        render(
            <Router>
                <BathroomList data={[]} />
            </Router>
        );
        expect(screen.getByTestId('no-results')).toBeInTheDocument();
    });

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
        const numBathroomCards = screen.getAllByTestId('bathroom-card');
        expect(numBathroomCards.length).toBe(3);
    });

    test('Bathroom cards render correct image', () => {
        const data = [
            { id: 1, 'src': 'bathroom1.jpg', 'building': 'RAI', 'floor': 'First Floor', 'location': 'North' }
        ]
        render(
            <Router>
                <BathroomList data={data} />
            </Router>
        );
        const renderedImg = document.querySelector('img')
        expect(renderedImg.src).toContain('bathroom1.jpg')
    });
});