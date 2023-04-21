import { React, Router } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BathroomPage from '../Dub-Dumps-main/src/Components';

describe('BathroomPage', () => {
    test('text content matches', () => {
        render(
            <Router>
                <BathroomPage />
            </Router>
        );
        const text = BathroomPage(null);
        expect("No bathroom specified").toBeInTheDocument()
    });
});