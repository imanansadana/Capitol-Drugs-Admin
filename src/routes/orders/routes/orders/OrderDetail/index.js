import React from 'react';
import { Modal, Button } from 'antd';
import productImage from '../../../../../assets/images/productImage.png';
import { OrderDetailCard } from '../../../../../components/Cards';
export default class DeleteProduct extends React.Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  render() {
    const data = {
      name:
        'Dymatize Elite XT 4 lbs Protein Powder for Muscle Building, Strength and Support, Chocolate, 52 Servings, 1.81 kg',
      dec:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      customer: 'Jhon',
      image: productImage,
      method: 'Visa',
      status: 'Pending',
    };

    return (
      <section className="container-fluid container-mw-xxl no-breadcrumb chapter">
        <OrderDetailCard {...data} />
      </section>
    );
  }
}
