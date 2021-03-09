import React from 'react';
import { OrderInfoCard } from '../../../../components/Cards';
import Listing from './Listing';

class Page extends React.Component {
  render() {
    return (
      <>
        <OrderInfoCard />
        <section className="container-fluid container-mw-xxl no-breadcrumb chapter">
          <Listing />
        </section>
      </>
    );
  }
}

export default Page;
