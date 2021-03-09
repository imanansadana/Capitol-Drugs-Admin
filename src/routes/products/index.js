import React from 'react';
import { Route } from 'react-router-dom';

import ProductsListing from './routes/products/productListing';
import ProductsAdd from './routes/products/addProduct';
import ProductsEdit from './routes/products/editProduct';
import ProductPreview from './routes/products/productPreview';
import Categories from './routes/categories';
import AddCategories from './routes/categories/add';
import EditCategories from './routes/categories/edit';
import SubCategories from './routes/subCategories';
import AddSubCategories from './routes/subCategories/add';
import EditSubCategories from './routes/subCategories/edit';
import Discount from './routes/discount';
import AddDiscount from './routes/discount/add';
import EditDiscount from './routes/discount/edit';

const Shop = ({ match }) => (
  <>
    <Route exact path={`${match.url}/product`} component={ProductsListing} />
    <Route path={`${match.url}/product/add`} component={ProductsAdd} />
    <Route path={`${match.url}/product/edit`} component={ProductsEdit} />
    <Route path={`${match.url}/product/preview`} component={ProductPreview} />
    <Route exact path={`${match.url}/categories`} component={Categories} />
    <Route path={`${match.url}/categories/add`} component={AddCategories} />
    <Route path={`${match.url}/categories/edit`} component={EditCategories} />
    <Route exact path={`${match.url}/sub-categories`} component={SubCategories} />
    <Route path={`${match.url}/sub-categories/add`} component={AddSubCategories} />
    <Route path={`${match.url}/sub-categories/edit`} component={EditSubCategories} />
    <Route exact path={`${match.url}/discount`} component={Discount} />
    <Route path={`${match.url}/discount/add`} component={AddDiscount} />
    <Route path={`${match.url}/discount/edit`} component={EditDiscount} />
  </>
);

export default Shop;
