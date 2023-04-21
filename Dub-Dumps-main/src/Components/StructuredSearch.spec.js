import { React } from 'react';
import { MemoryRouter as Router, Routes, Route, Navigate, useNavigate as navigateTo } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import StructuredSearch from './StructuredSearch';

describe('Unit: Structured Search', () => {
    test('to render without errors', () => {
        render(
            <Router>
                <StructuredSearch data={[]} />
            </Router>
        );

        expect(screen.getByTestId("search-wrapper")).toBeInTheDocument();
    });
});