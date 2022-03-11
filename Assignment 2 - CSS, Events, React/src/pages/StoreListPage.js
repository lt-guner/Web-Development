import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function StoreListPage({stores}) {
  
  // this takes in store and breaks the components of the JSON array into columns
  // the .map function breaks up each JSON array into separate elements and places them in the table
  const storeRender = (stores) => {
    return(
      <tr>
        <td>{stores.id}</td>
        <td>{stores.city}</td>
        <td>{stores.state}</td>
        <td>{stores.zipCode}</td>
      </tr>
    );
  }

  // this is used to capture the state of the zip code that is entered into the input box
  // is is then displayed in an alert in with the information that is entered in the html below
  const [zip, setZip] = useState('');
  
  return (
    <>
      <h1 align="center">Store Locations</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
          </tr>
        </thead>
        <tbody>
          {stores.map(storeRender)}
        </tbody>
      </table>
      <p>
        <form align="center">
          <fieldset>
            <legend align="left">Zip Code Entry</legend>
            <label>Please enter the zip code: <input type="text" size="5" maxlength="5" placeholder="12345" value={zip} onChange={e => setZip(e.target.value)} /></label>
            <br></br>
            <button onClick={e => {setZip(e.target.value);alert(`The zip code you entered is ${zip}`);e.preventDefault();}}>Submit</button>  
          </fieldset>
        </form>
      </p>
      <p align="center">
        <Link to="/">Go to the Home Page </Link>
      </p>
    </>
  );
}

export default StoreListPage;