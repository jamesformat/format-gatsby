import PropTypes from 'prop-types';
import React from 'react';
import { useStaticQuery, graphql, StaticQuery } from 'gatsby';
import FullPageGrid from '../components/FullPageGrid';

const ProjectsPage = () => {
  const data = useStaticQuery(graphql`
    query ProjectsQuery {
      allMarkdownRemark(
        sort: {frontmatter: {date: DESC}}
        filter: {frontmatter: {tags: {in: ["projects", "project"]}}}
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
                  thumbnail: gatsbyImageData(width: 200, height: 150, quality: 90, layout: FIXED)
                }
              }
            }
          }
        }
      }
    }
  `);

  return (
    <FullPageGrid posts={data.allMarkdownRemark.edges} />
  );
};

export default ProjectsPage;
