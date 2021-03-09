import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import { AccountDetailCard } from '../../../../components/Cards';

const AccountPreview = props => {
  const { match, history, location } = props;
  const { state } = location;
  const backLink = match.url
    .split('/')
    .slice(0, -1)
    .join('/');

  return (
    <section>
      <div className="form-card__body p-lg-5 p-4">
        <Link to={backLink} className="ant-btn ant-btn-primary">
          <Icon type="caret-left" /> Back
        </Link>
        <AccountDetailCard {...state} />
      </div>
    </section>
  );
};

export default withRouter(AccountPreview);
