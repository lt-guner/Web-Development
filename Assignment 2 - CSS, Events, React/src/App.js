import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import stores from './data/stores';
import items from './data/items';
import React from 'react';
import HomePage from './pages/HomePage';
import ShoppingListPage from './pages/ShoppingListPage';
import StoreListPage from './pages/StoreListPage';

function App() {  

  return (
    <div className="Body">
      <Router>
        <header className="App-header">
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/shoppinglist">
            <ShoppingListPage items={items}/>
          </Route>
          <Route path="/storelist">
            <StoreListPage stores={stores}/>
          </Route>
        </header>
      </Router>
    </div>
  );
}

export default App;
