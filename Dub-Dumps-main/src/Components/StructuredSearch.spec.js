import { React, useState } from 'react';
import { MemoryRouter as Router, Routes, Route, Navigate, useNavigate as navigateTo } from 'react-router-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import StructuredSearch from './StructuredSearch';

const data = [
    { id: 1, 'building': 'RAI', 'floor': 'First Floor', 'location': 'North' },
    { id: 2, 'building': 'RAI', 'floor': 'Second Floor', 'location': 'West' },
    { id: 3, 'building': 'ODE', 'floor': 'Second Floor', 'location': 'North' }
]

function applyFilter(bldgName, floorName, locationSelected) {
    let bldgCards = data
    if (bldgName !== '') {
        bldgCards = bldgCards.filter(card => (card.building === bldgName))
    }
    if (floorName !== '') {
        bldgCards = bldgCards.filter(card => (card.floor === floorName))
    }
    if (locationSelected !== '') {
        bldgCards = bldgCards.filter(card => (card.location === locationSelected))
    }
    return bldgCards;
}

describe('Structured Search renders correctly', () => {
    test('to render without errors', () => {
        render(
            <Router>
                <StructuredSearch data={[]} />
            </Router>
        );
        expect(screen.getByTestId("search-wrapper")).toBeInTheDocument();
    });
});

describe('Filters have correct default value', () => {
    test('Building filter has correct default value', () => {
        const callbackFn = jest.fn();

        render(
            <Router>
                <StructuredSearch data={data} filterCallback={callbackFn} />
            </Router>
        );
        const defaultValue = screen.getByTestId('currBuildingValue')
        expect(defaultValue.textContent).toBe('Building')
    });

    test('Floor filter has correct default value', () => {
        const callbackFn = jest.fn();

        render(
            <Router>
                <StructuredSearch data={data} filterCallback={callbackFn} />
            </Router>
        );
        const defaultValue = screen.getByTestId('currFloorValue')
        expect(defaultValue.textContent).toBe('Floor')
    });

    test('Location filter has correct default value', () => {
        const callbackFn = jest.fn();

        render(
            <Router>
                <StructuredSearch data={data} filterCallback={callbackFn} />
            </Router>
        );
        const defaultValue = screen.getByTestId('currLocValue')
        expect(defaultValue.textContent).toBe('Location')
    });
});

describe('Filter values can be changed', () => {
    test('Building filter can be changed', () => {
        const callbackFn = jest.fn();
        render(
            <Router>
                <StructuredSearch data={data} filterCallback={callbackFn} />
            </Router>
        );
        const buildingSelect = screen.getByTestId('buildingSelect');
        expect(buildingSelect).toHaveTextContent('Building');

        fireEvent.change(buildingSelect, { target: { value: 'RAI' } })
        expect(buildingSelect).toHaveTextContent('RAI');
    });

    test('Floor filter can be changed', () => {
        const callbackFn = jest.fn();
        render(
            <Router>
                <StructuredSearch data={data} filterCallback={callbackFn} />
            </Router>
        );
        const floorSelect = screen.getByTestId('floorSelect');
        expect(floorSelect).toHaveTextContent('Floor');

        fireEvent.change(floorSelect, { target: { value: 'First Floor' } })
        expect(floorSelect).toHaveTextContent('First Floor');
    });

    test('Location filter can be changed', () => {
        const callbackFn = jest.fn();
        render(
            <Router>
                <StructuredSearch data={data} filterCallback={callbackFn} />
            </Router>
        );
        const locationSelect = screen.getByTestId('locationSelect');
        expect(locationSelect).toHaveTextContent('Location');

        fireEvent.change(locationSelect, { target: { value: 'North' } })
        expect(locationSelect).toHaveTextContent('North');
    });
});

describe('Filters work correctly', () => {
    test('Building filter works correctly', () => {
        render(
            <Router>
                <StructuredSearch data={data} filterCallback={applyFilter} />
            </Router>
        );

        // Select building
        const buildingSelect = screen.getByTestId('buildingSelect');
        const applyButton = screen.getByText('Search!');

        act(() => {
            fireEvent.change(buildingSelect, { target: { value: 'ODE' } });
            fireEvent.click(applyButton);
        })
        const filteredData = applyFilter('ODE', '', '');
        expect(filteredData.length).toBe(1);
    });

    test('Floor filter works correctly', () => {
        render(
            <Router>
                <StructuredSearch data={data} filterCallback={applyFilter} />
            </Router>
        );

        // Select floor
        const floorSelect = screen.getByTestId('floorSelect');
        const applyButton = screen.getByText('Search!');

        act(() => {
            fireEvent.change(floorSelect, { target: { value: 'Second Floor' } });
            fireEvent.click(applyButton);
        })

        const filteredData = applyFilter('', 'Second Floor', '')
        expect(filteredData.length).toBe(2);
    });

    test('Location filter works correctly', () => {
        render(
            <Router>
                <StructuredSearch data={data} filterCallback={applyFilter} />
            </Router>
        );

        // Select location
        const locationSelect = screen.getByTestId('locationSelect');
        const applyButton = screen.getByText('Search!');

        act(() => {
            fireEvent.change(locationSelect, { target: { value: 'North' } });
            fireEvent.click(applyButton);
        });

        const filteredData = applyFilter('', '', 'North')
        expect(filteredData.length).toBe(2);
    });
});