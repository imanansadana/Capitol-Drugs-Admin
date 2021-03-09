import React from 'react';
import { Route } from 'react-router-dom';
import Customers from './routes/customers';
import AddCustomers from './routes/customers/add';
import EditCustomers from './routes/customers/editCustomer';
import SubAdmin from './routes/subAdmin';
import SubAdminAdd from './routes/subAdmin/add';
import SubAdminEdit from './routes/subAdmin/edit';
import Admin from './routes/admin';
import AdminChangePassword from './routes/admin/changePassword';
import AccountPreview from './routes/accountPreview';

const Shop = ({ match }) => (
  <>
    <Route exact path={`${match.url}/customers`} component={Customers} />
    <Route path={`${match.url}/customers/preview`} component={AccountPreview} />
    <Route path={`${match.url}/sub-admin/preview`} component={AccountPreview} />
    <Route path={`${match.url}/customers/add`} component={AddCustomers} />
    <Route path={`${match.url}/customers/edit`} component={EditCustomers} />
    <Route exact path={`${match.url}/sub-admin`} component={SubAdmin} />
    <Route path={`${match.url}/sub-admin/add`} component={SubAdminAdd} />
    <Route path={`${match.url}/sub-admin/edit`} component={SubAdminEdit} />
    <Route exact path={`${match.url}/admin`} component={Admin} />
    <Route path={`${match.url}/admin/change-password`} component={AdminChangePassword} />
  </>
);

export default Shop;
