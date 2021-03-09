import React from 'react';
import Form from './form';

const Article = () => {
  return (
    <section className="container-fluid container-mw-xxl no-breadcrumb chapter h-100 d-flex align-items-center justify-content-center">
      <article className="article">
        <h2 className="main-title text-center  pt-0">Admin</h2>
        <Form />
      </article>
    </section>
  );
};

export default Article;
