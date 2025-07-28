import React from 'react';
import ReactDOM from 'react-dom';
import CanadaMap from './components/Map/CanadaMap';
import './styles/map.css';

const container = document.getElementById('map-root');
const root = ReactDOM.createRoot(container);
root.render(<CanadaMap />);
