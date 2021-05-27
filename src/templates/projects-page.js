import PropTypes from 'prop-types';
import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import FullPageGrid from '../components/FullPageGrid';

const ProjectsPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <FullPageGrid posts={posts} />
  );
};

ProjectsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.any,
    }),
  }).isRequired,
};

export { ProjectsPage };

export default () => (
  <StaticQuery
    query={graphql`
      query ProjectsQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { tags: { in: ["projects", "project"] } } }
        ) {
          edges {
            node {
              id
              html
              fields {
                slug
              }
              frontmatter {
                title
                tags
                date(formatString: "MMMM DD, YYYY")
                featuredimage {
                  childImageSharp {
                    thumbnail: fixed(width: 200, height: 150, quality: 90) {
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
      }
    `}
    render={(data, count) => <ProjectsPage data={data} count={count} />}
  />
);
