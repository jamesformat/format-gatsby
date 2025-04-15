import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Styled from 'styled-components';
import Layout from '../components/Layout';

const TagRouteStyles = Styled.section`
`;

const TagRoute = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges;
  const postLinks = posts.map((post) => (
    <li className="taglist__item" key={post.node.fields.slug}>
      <Link to={post.node.fields.slug}>
        <h3 className="is-size-3">{post.node.frontmatter.title}</h3>
      </Link>
    </li>
  ));
  const { tag } = pageContext;
  const { title } = data.site.siteMetadata;
  const { totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with “${tag}”`;

  return (
    <Layout>
      <Helmet title={`${tag} | ${title}`} />
      <TagRouteStyles className="section">
        <div className="container content">
          <div className="columns">
            <div
              className="column is-10 is-offset-1"
              style={{ marginBottom: '6rem' }}
            >
              <h2 className="title is-size-3 is-bold-light">{tagHeader}</h2>
              <ul className="taglist tag-page__taglist">{postLinks}</ul>
              <p>
                <Link to="/tags/">Browse all tags</Link>
              </p>
            </div>
          </div>
        </div>
      </TagRouteStyles>
    </Layout>
  );
};

TagRoute.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.object,
    site: PropTypes.object,
  }).isRequired,
  pageContext: PropTypes.shape({
    tag: PropTypes.string,
  }).isRequired,
};

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: {frontmatter: {date: DESC}}
      filter: {frontmatter: {tags: {in: [$tag]}}}
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
