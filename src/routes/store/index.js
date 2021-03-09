import React from 'react';
import { Route } from 'react-router-dom';
import Stores from './routes/stores';
import AddStore from './routes/stores/add';
import EditStore from './routes/stores/edit';

const Shop = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/stores`} component={Stores} />
    <Route path={`${match.url}/stores/add`} component={AddStore} />
    <Route path={`${match.url}/stores/edit`} component={EditStore} />
  </div>
);

export default Shop;
