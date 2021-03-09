import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Icon } from 'antd';
const OrderInfroCard = () => {
  const infoCardData = [
    {
      color: 'primary',
      iconClassName: 'far fa-calendar',
      title: 'Date',
      value: '05/07/2020',
    },
    {
      color: 'success',
      iconClassName: 'far fa-money-bill-alt',
      title: 'Total',
      value: '₹20.90',
    },
    {
      color: 'danger',
      iconClassName: 'fas fa-comments',
      title: 'Messages',
      value: '$0.00',
    },
    {
      color: 'info',
      iconClassName: 'fas fa-shopping-bag',
      title: 'Products',
      value: '1',
    },
  ];
  return (
    <div className="box box-v1 mb-4">
      <Row style={{ marginTop: '-1rem' }}>
        {infoCardData.map(({ color, title, iconClassName, value }) => (
          <Col sm={6} xl={3} key={title} className="mt-3">
            <div className="order-info-card">
              <div className="icon text-info">
                <i className={`text-${color} ${iconClassName}`} />
              </div>
              <div className="content">
                <h2 className="title">{title}</h2>
                <p className={`value text-${color}`}>{value}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OrderInfroCard;
