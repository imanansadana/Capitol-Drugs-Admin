import React from 'react';
import { Route } from 'react-router-dom';
import Orders from './routes/orders';
import OrderDetails from './routes/orders/OrderDetail';

const Shop = ({ match }) => (
  <>
    <Route exact path={`${match.url}`} component={Orders} />
    <Route path={`${match.url}/details`} component={OrderDetails} />
  </>
);

export default Shop;
