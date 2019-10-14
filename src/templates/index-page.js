import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Styled from "styled-components";
import ReactMarkdown from "react-markdown";

import Layout from "../components/Layout";
import GridImages from "../components/GridImages";

const primaryColor = "rgba(28, 178, 191)";
const LandingPageText = Styled.div`
  color: #1cb2bf;
  font-size: 1.25rem;
`;
const LandingPage = Styled.div`
  .column--text {
    display: flex;
    align-items: center;
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

export const IndexPageTemplate = ({ landingPageText, gridImages }) => {
  return (
    <LandingPage>
      <section className="section section--gradient">
        <div className="section">
          <div className="columns">
            <div className="column column-is-6 column--grid">
              <div className="landing-page__grid">
                {gridImages && (
                  <GridImages gridImages={gridImages}></GridImages>
                )}
              </div>
            </div>
            <div className="column is-6 column--text">
              <div className="content">
                <LandingPageText className="content">
                  <ReactMarkdown source={landingPageText}></ReactMarkdown>
                </LandingPageText>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LandingPage>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  landingPageText: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array
  })
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        landingPageText={frontmatter.landingPageText}
        gridImages={frontmatter.gridImages}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        landingPageText
        gridImages {
          title
          link
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
