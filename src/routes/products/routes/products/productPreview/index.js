import React from 'react';
import productImage from '../../../../../assets/images/productImage.png';
import { ProductDetailCard } from '../../../../../components/Cards';
import { Link, withRouter } from 'react-router-dom';
import { Icon } from 'antd';
const ProductPreview = props => {
  // const data = {
  //   name:
  //     'Dymatize Elite XT 4 lbs Protein Powder for Muscle Building, Strength and Support, Chocolate, 52 Servings, 1.81 kg',
  //   dec:
  //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  //   customer: 'Jhon',
  //   image: productImage,
  //   method: 'Visa',
  //   status: 'Pending',
  // };
  const { match, history, location } = props;
  const { state } = location;
  // let viewData = false;
  // if (state.viewData) {
  //   viewData = state.viewData;
  // }
  // debugger;
  const backLink = match.url
    .split('/')
    .slice(0, -1)
    .join('/');
  // if (!viewData) {
  //   history.push(backLink);
  //   return null;
  // }

  // debugger;
  return (
    <section>
      <div className="form-card__body p-lg-5 p-4">
        <Link to={backLink} className="ant-btn ant-btn-primary">
          <Icon type="caret-left" /> Back
        </Link>
        <ProductDetailCard {...state} />
      </div>
    </section>
  );
};

export default withRouter(ProductPreview);
