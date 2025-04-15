import React from "react";
import Layout from "../../components/Layout";
import { Link } from "gatsby";

export default Thanks = () => (
  <Layout>
    <section className="section">
      <div className="container">
        <div className="content">
          <h1>Thank you!</h1>
          <p>We'll get back to you promptly</p>
          <button className="button">
            <Link to="/">← Home</Link>
          </button>
        </div>
      </div>
    </section>
  </Layout>
);
