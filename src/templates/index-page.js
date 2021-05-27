import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import Layout from '../components/Layout';
import GridItems from '../components/GridItems';

const LandingPageText = Styled.div`
  color: #1cb2bf;
  font-size: 1.25rem;
`;
const LandingPage = Styled.div`
  .column--grid {
    display: flex;
    align-items: center;
    .landing-page__grid {
      width: 100%;
    }
  }
  .column--text {
    display: flex;
    align-items: center;
  }
  .landing-page__grid-wrapper {
    min-height: 460px;
  }
  .landing-page__grid, .column--text .content {
    max-width: 600px;
  }
  @media screen and (max-width: 768px) {
    section{
      padding-top: 0;
    } 
    .column--grid {
      order: 2; 
    }
    .column--text {
      order: 1;
    }
  }
`;

export const IndexPageTemplate = ({ landingPageText, gridItems }) => (
  <LandingPage>
    <section className="section section--gradient">
      <div className="section">
        <div className="columns">
          <div className="landing-page__grid-wrapper column column-is-6 column--grid">
            <div className="landing-page__grid">
              {gridItems && <GridItems gridItems={gridItems} />}
            </div>
          </div>
          <div className="column is-6 column--text">
            <div className="content">
              <LandingPageText className="content">
                <ReactMarkdown children={landingPageText} />
              </LandingPageText>
            </div>
          </div>
        </div>
      </div>
    </section>
  </LandingPage>
);

IndexPageTemplate.propTypes = {
  landingPageText: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  gridItems: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.any,
    link: PropTypes.string,
    title: PropTypes.string,
  })),
};
IndexPageTemplate.defaultProps = {
  gridItems: [],
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Layout>
      <IndexPageTemplate
        // image={frontmatter.image}
        // title={frontmatter.title}
        // heading={frontmatter.heading}
        // subheading={frontmatter.subheading}
        landingPageText={frontmatter.landingPageText}
        gridItems={frontmatter.gridItems}
      // description={frontmatter.description}
      // intro={frontmatter.intro}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }).isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        landingPageText
        gridItems {
          title
          link
          image {
            childImageSharp {
              fixed(width: 200, height: 200, quality: 100) {
                ...GatsbyImageSharpFixed
                src
                aspectRatio
              }
              thumbnail: fixed(width: 200, height: 200, quality: 90) {
                ...GatsbyImageSharpFixed
                src
                aspectRatio
              }
            }
          }
        }
      }
    }
  }
`;
