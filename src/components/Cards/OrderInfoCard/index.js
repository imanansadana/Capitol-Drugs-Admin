import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Icon } from 'antd';
const OrderInfroCard = () => {
  const infoCardData = [
    {
      color: 'info',
      iconClassName: 'fas fa-shopping-cart',
      title: 'Total number of orders',
      // day: '30 Days',
      value: '50',
    },
    {
      color: 'muted',
      iconClassName: 'fas fa-tasks',
      title: 'In-Progess Amount',
      // day: 'Today',
      value: '$329',
    },
    {
      color: 'danger',
      iconClassName: 'fas fa-store-slash',
      title: 'Cancelled Order Amount',
      // day: '30 Days',
      value: '$0.00',
    },
    {
      color: 'warning',
      iconClassName: 'far fa-calendar-alt',
      title: 'Average monthly order amount',
      // day: '30 Days',
      value: '$0.00',
    },
    {
      color: 'success',
      iconClassName: 'far fa-money-bill-alt',
      title: 'Totla Revenue',
      // day: '30 Days',
      value: '$1000',
    },
  ];
  return (
    <section className="chapter pt-5">
      <Container fluid>
        <article className="article pb-0">
          <h2 className="main-title pt-0">Orders</h2>

          <div className="box box-v1 mb-4">
            <Row style={{ marginTop: '-1rem' }}>
              {infoCardData.map(({ color, title, iconClassName, day, value }) => (
                <Col sm={6} xl={3} key={title} className="mt-3">
                  <div className="order-info-card">
                    <div className="icon text-info">
                      <i className={`text-${color} ${iconClassName}`} />
                    </div>
                    <div className="content">
                      <h2 className="title">{title}</h2>
                      <p className="day">{day}</p>
                      <p className={`value text-${color}`}>{value}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </article>
      </Container>
    </section>
  );
};

export default OrderInfroCard;
