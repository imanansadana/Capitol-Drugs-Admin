import React from 'react';
import { Route } from 'react-router-dom';
import Utilities from './routes/utilities';
import AddUtilities from './routes/utilities/add';
import EditUtilities from './routes/utilities/edit';
import Categories from './routes/categories';
import AddCategories from './routes/categories/add';
import EditCategories from './routes/categories/edit';
import SubCategories from './routes/subCategories';
import AddSubCategories from './routes/subCategories/add';
import EditSubCategories from './routes/subCategories/edit';

const Shop = ({ match }) => (
  <div>
    <Route exact path={`${match.url}`} component={Utilities} />
    <Route exact path={`${match.url}/add`} component={AddUtilities} />
    <Route exact path={`${match.url}/edit`} component={EditUtilities} />
    <Route exact path={`${match.url}/categories`} component={Categories} />
    <Route path={`${match.url}/categories/add`} component={AddCategories} />
    <Route path={`${match.url}/categories/edit`} component={EditCategories} />
    <Route exact path={`${match.url}/sub-categories`} component={SubCategories} />
    <Route path={`${match.url}/sub-categories/add`} component={AddSubCategories} />
    <Route path={`${match.url}/sub-categories/edit`} component={EditSubCategories} />
  </div>
);

export default Shop;
