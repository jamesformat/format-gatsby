import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { withPrefix, Link } from 'gatsby';
import CookieConsent from 'react-cookie-consent';
import Navbar from './Navbar';
import './all.scss';
import 'bulma/css/bulma.css';
import useSiteMetadata from './SiteMetadata';

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <CookieConsent
        buttonText="Accept"
        declineButtonText="Decline"
      >
        This website uses cookies to enhance the user experience.
        {' '}
        <Link to="/privacy">Read our Privacy Policy</Link>
      </CookieConsent>
      <Helmet>
        <html data-theme="light" lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
      </Helmet>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
TemplateWrapper.defaultProps = {
  children: null,
};
export default TemplateWrapper;
