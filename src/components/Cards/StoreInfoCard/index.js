import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Icon } from 'antd';
const StoreInfoCard = props => {
  const { dateFilter } = props;
  const infoCardData = [
    {
      color: 'info',
      iconClassName: 'fas fa-sort-amount-up-alt',
      title: 'Conversion Rate',
      day: '30 Days',
      value: '0%',
    },
    {
      color: 'danger',
      iconClassName: 'fas fa-shopping-cart',
      title: 'Abandoned Carts',
      day: 'Today',
      value: '0%',
    },
    {
      color: 'primary',
      iconClassName: 'far fa-money-bill-alt',
      title: 'Average Order Value',
      day: '30 Days',
      value: '$0.00',
    },
    {
      color: 'success',
      iconClassName: 'fas fa-user',
      title: 'Net Profit per Visit',
      day: '30 Days',
      value: '$0.00',
    },
  ];
  return (
    <section className="chapter pt-5">
      <Container fluid>
        <article className="article pb-0">
          <div className="d-flex justify-content-between">
            <div>
              <h2 className="main-title pt-0">Stores</h2>
            </div>
            {dateFilter}
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

export default StoreInfoCard;
