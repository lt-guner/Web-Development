import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Quantity from '../Quantity';


function ShoppingListPage({items}) {
  
  // the const type function breaks the items JSON into separate cells by each JSON array
  // .map is used to render each row from items dynamically
  // the user has the option to increment and decrement the quantity of each item from Quantity component
  const itemRender = (items) => {
    let count = 0;
    return(
      <tr>
        <td>{items.name}</td>
        <td>{items.id}</td>
        <td>{items.price}</td>
        <td><Quantity/></td>
      </tr>
    );
  }

  return (
    <div>
      <h1 align="center">Beaver Store Items</h1>
      <table>
        <caption>
          Items For Sale
        </caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map(itemRender)}
        </tbody>
      </table>
      <p align="center">
        <Link to="/">Go to the Home Page</Link>
      </p>
    </div>
  );
}

export default ShoppingListPage;