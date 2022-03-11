import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <h1 align="center">Oregon State Bevear Store</h1>
      <ul align="center">
        <li><Link to="/shoppinglist">Items for Sale</Link></li>
        <li><Link to="/storelist">Store Locations</Link></li>
      </ul>
    </>
  );
}

export default HomePage;