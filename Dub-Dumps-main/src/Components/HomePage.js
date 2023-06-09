import React from 'react'; //import React Component
import Map from './Map.js';
import { Link } from 'react-router-dom';

export default function HomePage(props) {
    return (
        <div>
            <Link className="map-link" to="/search" data-testid='toSearchPage'>
                <h2 className="map-title" data-testid="map-title">Find a Bathroom!</h2>
            </Link>
            <Map />
        </div>
    )
}