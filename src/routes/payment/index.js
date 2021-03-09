import React from 'react';
import { Route } from 'react-router-dom';
import PaymentInfo from './routes/paymentInfo';
import PaymentInfoEdit from './routes/paymentInfo/components/Listing/editCustomer';
import PurchaseList from './routes/purchaseList';
import Orders from './routes/orders';

const Shop = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/info`} component={PaymentInfo} />
    <Route path={`${match.url}/info/edit`} component={PaymentInfoEdit} />
    <Route path={`${match.url}/purchase-list`} component={PurchaseList} />
    <Route path={`${match.url}/orders`} component={Orders} />
  </div>
);

export default Shop;
