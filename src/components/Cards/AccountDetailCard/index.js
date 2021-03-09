import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Icon, Card } from 'antd';
import avatar from '../../../assets/images/avatar.jpg';

const AccountDetailCard = props => {
  // const tempData = {
  //   address: 'Roma, Metropolitan City of Rome, Italy',
  //   address2: 'Explicabo Enim simi',
  //   city: 'Accusantium aliquid ',
  //   country: 'Nisi exercitationem ',
  //   country_code: '+91',
  //   date: '2020-08-22T00:04:42.804Z',
  //   email: 'dekosigy@mailinator.com',
  //   first_name: 'Tatum',
  //   last_name: 'Gordon',
  //   latitude: '41.9027835',
  //   longitude: '12.4963655',
  //   personState: 'Labore esse vel pla',
  //   phone: '1047258369',
  //   postal_code: 'Eum blanditiis repud',
  //   profile_image: '',
  //   status: 0,
  // };
  const {
    address = '',
    address2 = '',
    city = '',
    personState = '',
    postal_code = '',
    country_code = '',
    date = '',
    email = '',
    country = '',
    first_name = '',
    last_name = '',
    latitude = '',
    longitude = '',
    phone = '',
    profile_image = '',
    status = 0,
    history,
    match,
  } = props;
  // console.log('rrrr props', tempData);
  const backLink = match.url
    .split('/')
    .slice(0, -1)
    .join('/');
  if (first_name === '') {
    history.push(backLink);
    return null;
  }
  return (
    <section className="chapter pt-3">
      <article className="article pb-0">
        <h2 className="main-title pt-0 text-center">Profile Details</h2>

        <div className="box box-v1 mb-4">
          <Card className="text-center mb-4">
            <img
              src={profile_image || avatar}
              alt={first_name}
              className="mb-4"
              style={{ maxHeight: 100 }}
            />

            <p className="mb-2">
              <b>Status: </b>
              <b className={`text-${status === 0 ? 'success' : 'danger'}`}>
                {status === 0 ? 'Active' : 'Inactive'}
              </b>
            </p>
          </Card>

          <Row>
            <Col md={6}>
              <p>
                <b>First Name: </b>
                {first_name}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <b>Last Name: </b>
                {last_name}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <b>Email: </b>
                {email}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <b>Phone: </b>
                {country_code}
                {phone}
              </p>
            </Col>
            <Col md={12}>
              <p>
                <b>Address: </b>
                {address}
              </p>
            </Col>
            {address2 && (
              <Col md={12}>
                <p>
                  <b>Address 2: </b>
                  {address2}
                </p>
              </Col>
            )}
            <Col md={6}>
              <p>
                <b>City: </b>
                {city}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <b>State: </b>
                {personState}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <b>Postal Code: </b>
                {postal_code}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <b>Country: </b>
                {country}
              </p>
            </Col>
          </Row>
        </div>
      </article>
    </section>
  );
};

export default withRouter(AccountDetailCard);
