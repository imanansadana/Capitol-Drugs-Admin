import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import Form from './form';
export default class EditRecord extends React.Component {
  render() {
    const { recordData } = this.props;
    const { match } = this.props;
    const backUrl = match.url
      .split('/')
      .slice(0, -1)
      .join('/');
    return (
      <>
        <section className="form-card h-100">
          <div className="form-card__body ">
            <Link
              style={{ textDecoration: 'none' }}
              to={backUrl}
              className="ant-btn btn-cta ant-btn-primary text-white"
            >
              <Icon type="left" theme="outlined" /> Back
            </Link>
            <section className="form-v1-container">
              <h2>Change Password</h2>
              <p className="lead col-lg-10 mx-lg-auto">
                Discovering and connecting with creative talent around the globe.
              </p>
              <Form />
            </section>
          </div>
        </section>
      </>
    );
  }
}
