import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BarChart from '../views/components/Dashboard/BarChart/BarChart';
import { ResponsiveBar } from '@nivo/bar';

// mocks a ResponsiveBar to use in testing
jest.mock('@nivo/bar', () => ({
    ResponsiveBar: jest.fn(() => <div>Mocked BarChart</div>),
}));

describe('BarChart Component', () => {
    const testData=[
        {'protected_attribute': 'sender_gender', 'score': 0.03}, 
        {'protected_attribute': 'sender_race', 'score': 0.03}]
 
    beforeEach(() => {
        render(<BarChart data={testData} height={''} width={''}/>);
    })

    // checks if mock renders correctly
    test("renders barchart", () => {
        const barElement = screen.getByText(/Mocked BarChart/i);
        expect(barElement).toBeInTheDocument();

    })

    test("renders data correctly", () => {
        // check if the data is passed correctly 
        expect(ResponsiveBar).toHaveBeenCalledWith(
            expect.objectContaining({
                data: testData,
            }),
            {}
        );
    });
    
})