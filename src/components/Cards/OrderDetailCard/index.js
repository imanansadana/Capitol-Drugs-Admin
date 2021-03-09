import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import { Icon } from 'antd';
import OrderDetailInfoCard from '../OrderDetailInfoCard';
const OrderDetailCard = props => {
  const { name, customer, image, method, status, dec } = props;
  // name: 'Elite Xt',
  //       customer: 'Jhon',
  //       image: productImage,
  //       method: 'Visa',

  return (
    <section className="chapter">
      <Container fluid>
        <article className="article pb-0">
          <h2 className="main-title pt-0">Orders Details</h2>

          <OrderDetailInfoCard />
          <div className="box box-v1 mb-4">
            <Row>
              <Col md={6} lg={4}>
                <img src={image} alt={name} className="w-100" />
              </Col>
              <Col md={6} lg={8}>
                <h3>{name}</h3>
                <p>{dec}</p>
                <p className="mb-2">
                  <b>Customer Name: </b>
                  {customer}
                </p>
                <p className="mb-2">
                  <b>Payment Method: </b>
                  {method}
                </p>
                <p className="mb-2">
                  <b>Status: </b>
                  {status}
                </p>
              </Col>
            </Row>
          </div>
        </article>
      </Container>
    </section>
  );
};

export default OrderDetailCard;
