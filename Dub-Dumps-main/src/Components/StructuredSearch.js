import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Nav, Navbar } from "react-bootstrap";

//'bldgSelected', 'floorSelected', and 'locationSelected' all are used to store the currently selected values for in the search
// 'setBldg', 'setFloor', and 'setLocation' all are functions used to set the corresponding values using the useState() function to manage the state of these values
// throughout the site

export function StructuredSearch(props) {
    const [bldgSelected, setBldg] = useState('');
    const [floorSelected, setFloor] = useState('');
    const [locationSelected, setLocation] = useState('');

    const changeBldg = evt => {
        setBldg(evt.target.value);
    }

    const changeFloor = evt => {
        setFloor(evt.target.value);
    }

    const changeLocation = evt => {
        setLocation(evt.target.value);
    }

    const handleClick = evt => {
        props.filterCallback(bldgSelected, floorSelected, locationSelected);
    }

    // Returns an array of content for a specific filter
    function createFilterSet(contentType) {
        const uniqueContent = props.data
            .map(item => item[contentType])  // map to get an array of the specific content type
            .filter((value, index, self) => self.indexOf(value) === index);  // filter to remove duplicates

        return uniqueContent.map((contentType) => {
            return <option key={contentType} value={contentType}>{contentType}</option>
        })
    }

    // Array of buildings
    const buildings = createFilterSet("building")

    // Array of floors
    const floors = createFilterSet("floor")

    // Array of locations
    const locations = createFilterSet("location")


    return (
    //returns the nav bars used to select the builidng, floor, or location, and the search button 
        <div data-testid="search-wrapper">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-filters-bathrooms" className="hamburger" />
                <Navbar.Collapse id="responsive-navbar-nav navBar">
                    <Nav className="mr-auto">
                        <select id="buildingSelect" className="navDropDown" data-testid='buildingSelect' onChange={changeBldg} >
                            <option value="" data-testid="currBuildingValue">Building</option>
                            {buildings}
                        </select>
                        <select id="floorSelect" className="navDropDown" data-testid='floorSelect' onChange={changeFloor} >
                            <option value="" data-testid="currFloorValue">Floor</option>
                            {floors}
                        </select>
                        <select id="locationSelect" className="navDropDown" data-testid='locationSelect' onChange={changeLocation} >
                            <option value="" data-testid="currLocValue">Location</option>
                            {locations}
                        </select>
                        <div className="col-auto">
                            <Link to="/search" id="submitButton" type="submit" className="btn btn-warning" onClick={handleClick}>Search!</Link>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Outlet />
        </div >
    )
}

export default StructuredSearch;