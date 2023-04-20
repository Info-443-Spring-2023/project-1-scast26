import { React, Router } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from '../Dub-Dumps-main/src/Components';

describe('HomePage', () => {
    test('text content matches', () => {
        render(
            <Router>
                <HomePage />
            </Router>
        );
        const text = screen.getByText('Find a Bathroom!')
        expect(text).toBeInTheDocument()
    });
});