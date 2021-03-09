import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Icon, Card } from 'antd';
import ReactHtmlParser from 'react-html-parser';

const OrderDetailCard = props => {
  const tempData = {
    subcategory: 'subcategoryNamw1',
    store: 'storeName1',
    category: 'categoryName1',
    name: 'PName dnsfj',
    description: 'Lorem Ipsome dnwjsw rngtr r erjnjew rewrjn 3j rn3jwnr nj3rfnj3n',
    price: '6595',
    unit: '66',
    status: 0,

    ingredients: ['dwswsew', 'regtergt', 'wttesf'],
    directions_to_use: ['dsrfe', 'erfew', 'ewfre'],
  };
  const {
    image,
    subcategory = '',
    store = '',
    category = '',
    name = '',
    description = '',
    price = '',
    status = 0,
    unit = '',
    sku = '',
    ingredients = [],
    directions_to_use = [],
    history,
    match,
  } = props;

  const backLink = match.url
    .split('/')
    .slice(0, -1)
    .join('/');
  if (name === '') {
    history.push(backLink);
    return null;
  }
  return (
    <section className="chapter pt-3">
      <article className="article pb-0">
        <h2 className="main-title pt-0">Product Details</h2>

        <div className="box box-v1 mb-4">
          <Row>
            <Col md={6} lg={4}>
              <img src={image} alt={name} className="w-100" />
            </Col>
            <Col md={6} lg={8}>
              <h3>{name}</h3>

              <p className="mb-2">
                <b>Status: </b>
                <b className={`text-${status === 0 ? 'success' : 'danger'}`}>
                  {status === 0 ? 'In Stock' : 'Out Of Stock'}
                </b>
              </p>
              <p className="mb-2">
                <b>Store Name: </b>
                {store}
              </p>
              <p className="mb-2">
                <b>Category: </b>
                {category}
              </p>
              <p className="mb-2">
                <b>Subcategory: </b>
                {subcategory}
              </p>

              <p className="mb-2">
                <b>SKU: </b>
                {sku}
              </p>
              <p className="mb-2">
                <b>Unit: </b>
                {unit}
              </p>
              <p>
                <b>Price: </b>${price}
              </p>
            </Col>
          </Row>
          <Card>
            <h4>Description</h4>
            <hr />
            <div>{ReactHtmlParser(description)}</div>
          </Card>
          <Card>
            <Row>
              <Col lg={6}>
                <h4>Ingredients</h4>
                <hr />
                <div>{ReactHtmlParser(ingredients)}</div>
                {/* <ol>
                  {ingredients.map((data, index) => (
                    <li key={index}>{data}</li>
                  ))}
                </ol> */}
              </Col>
              <Col lg={6}>
                <h4>How to use:</h4>
                <hr />
                <div>{ReactHtmlParser(directions_to_use)}</div>
                {/* <ol>
                  {directions_to_use.map((data, index) => (
                    <li key={index}>{data}</li>
                  ))}
                </ol> */}
              </Col>
            </Row>
          </Card>
        </div>
      </article>
    </section>
  );
};

export default withRouter(OrderDetailCard);
