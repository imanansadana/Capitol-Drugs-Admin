import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Icon } from 'antd';
const ProducInfoCard = props => {
  const { store, total = 0, active = 0, inactive = 0, totalProducts = 0 } = props;
  const infoCardData = [
    {
      color: 'info',
      iconClassName: 'fas fa-gift',
      title: 'Total Offers',
      // day: '30 Days',
      value: total,
    },
    {
      color: 'success',
      iconClassName: 'fab fa-audible',
      title: 'Active Offers',
      // day: 'Today',
      value: active,
    },
    {
      color: 'danger',
      iconClassName: 'fas fa-exclamation-circle',
      title: 'Inactive Offers',
      // day: '30 Days',
      value: inactive,
    },
    {
      color: 'primary',
      iconClassName: 'fas fa-store',
      title: 'Total Products',
      // day: '30 Days',
      value: totalProducts,
    },
  ];
  return (
    <section className="chapter pt-5">
      <Container fluid>
        <article className="article pb-0">
          <div className="d-flex justify-content-between">
            <div>
              <h2 className="main-title pt-0">Discounts</h2>
            </div>
            <div>{store}</div>
          </div>

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

export default ProducInfoCard;
