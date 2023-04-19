import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from '../Dub-Dumps-main/src/Components';

describe('HomePage', () => {
    test('renders a heading and a button', () => {
        render(<HomePage />);
        screen.debug();
        expect(screen.getByText("Find a Bathroom!")).toBeInTheDocument(); //assertion
    });
});