import React from 'react';

import Listing from './Listing';

class Page extends React.Component {
  render() {
    return (
      <section className="container-fluid container-mw-xxl no-breadcrumb chapter">
        <Listing {...this.props} />
      </section>
    );
  }
}

export default Page;
