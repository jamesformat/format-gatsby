/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { defaultSpacing, formatGreen } from '../variables';
import Content, { HTMLContent } from '../components/Content';

const PrivacyWrapper = styled.div`
  @media screen and (max-width: 769px) {
  }
  .page-header {
    padding-bottom: 9px;
    margin: 0 0 ${defaultSpacing};
    border-bottom: 1px solid #eee;
  }
  h1 {
    color: ${formatGreen};
  }
  
`;

export const PrivacyPageTemplate = ({
  frontmatter,
  content,
  contentComponent,
}) => {
  const { companyName, title } = frontmatter;
  const PostContent = contentComponent || Content;
  return (
    <section className="section">
      <div className="container">
        <div className="content">
          <PrivacyWrapper>
            <h2>{companyName}</h2>
            <h1>{title}</h1>
            <PostContent content={content} />
          </PrivacyWrapper>
        </div>
      </div>
    </section>
  );
};

PrivacyPageTemplate.propTypes = {
  frontmatter: PropTypes.shape({
    companyName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    privacyText: PropTypes.string.isRequired,
  }).isRequired,
  content: PropTypes.any,
  contentComponent: PropTypes.any,
};

const PrivacyPage = ({ data }) => {
  const { markdownRemark: { frontmatter, html } } = data;
  return (
    <Layout>
      <Helmet title="Contant | Format Extend" />
      <PrivacyPageTemplate
        content={html}
        contentComponent={HTMLContent}
        frontmatter={frontmatter}
      />
    </Layout>
  );
};

PrivacyPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }).isRequired,
};

export default PrivacyPage;

export const pageQuery = graphql`
  query PrivacyPageTemplate {
    markdownRemark(frontmatter: {templateKey: {eq: "privacy-page"}}) {
      id
      html
      frontmatter {
        companyName
        title
        privacyText
      }
    }
  }
`;
