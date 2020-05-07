import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { navigate } from 'gatsby-link';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { defaultSpacing, formatGreen } from '../variables';

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 769px) {
    flex-direction: column;
    .contact-page__form, .contact-page__details {
      width: 100%;
    }
    .contact-page__details {
      padding-top: ${defaultSpacing}
    }
  }
  >div {
    padding: 0 10px;
    width: 50%;
  }
  .page-header {
    padding-bottom: 9px;
    margin: 0 0 ${defaultSpacing};
    border-bottom: 1px solid #eee;
  }
  .page-header h1, .contact-page__details {
    color: ${formatGreen};
  }
  
  div.contact-page__details {
    a {
      margin-bottom: ${defaultSpacing};
    }
    p {
      margin-bottom: 0;
    }
  }
  @media screen and (min-width: 770px) {
    .contact-page__form {
    width: 60%;
    }
    .contact-page__details {
      width: 40%;
      padding-left: calc(${defaultSpacing} * 3);
    }
  }
`;

export const ContactPageTemplate = ({
  frontmatter: {
    title,
    emailAddress,
    companyName,
    addressLine1,
    addressLine2,
    postCode,
    phoneNumber,
  },
}) => {
  const [formState, setFormState] = useState({});
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...formState,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => console.error(error));
  };

  return (
    <section className="section">
      <div className="container">
        <div className="content">
          <ContactWrapper>
            <div className="contact-page__form">
              <form
                name="contact"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                {/* The `form-name` hidden field is required to support
                form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label htmlFor="bot-field">
                    Don’t fill this out:
                    {' '}
                    <input name="bot-field" onChange={handleChange} />
                  </label>
                </div>
                <div className="field">
                  <label className="label" htmlFor="name">
                    Your name
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        id="name"
                        required
                      />
                    </div>
                  </label>
                </div>
                <div className="field">
                  <label className="label" htmlFor="email">
                    Email
                    <div className="control">
                      <input
                        className="input"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        id="email"
                        required
                      />
                    </div>
                  </label>
                </div>
                <div className="field">
                  <label className="label" htmlFor="message">
                    Message
                    <div className="control">
                      <textarea
                        className="textarea"
                        name="message"
                        onChange={handleChange}
                        id="message"
                        required
                      />
                    </div>
                  </label>
                </div>
                <div className="field">
                  <button className="button is-link" type="submit">
                    Send
                  </button>
                </div>
              </form>
            </div>
            <div className="contact-page__details">
              <div className="page-header">
                <h1>{title}</h1>
              </div>
              <a href={`mailto:${emailAddress}`}>
                {emailAddress}
              </a>
              <p>{companyName}</p>
              <p>{addressLine1}</p>
              <p>{addressLine2}</p>
              <p>{postCode}</p>
              <p>{phoneNumber}</p>
            </div>
          </ContactWrapper>
        </div>
      </div>
    </section>
  );
};

ContactPageTemplate.propTypes = {
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    addressLine1: PropTypes.string.isRequired,
    addressLine2: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    postCode: PropTypes.string.isRequired,
  }).isRequired,
};

const ContactPage = ({ data }) => {
  const { markdownRemark: { frontmatter } } = data;
  return (
    <Layout>
      <Helmet title="Contant | Format Extend" />
      <ContactPageTemplate
        frontmatter={frontmatter}
      />
    </Layout>
  );
};

ContactPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }).isRequired,
};

export default ContactPage;

export const pageQuery = graphql`
  query ContactPageTemplate {
    markdownRemark(frontmatter: {templateKey: {eq: "contact-page"}}) {
      frontmatter {
        title
        emailAddress
        companyName
        addressLine1 
        addressLine2
        phoneNumber
        postCode
      }
    }
  }
`;
