import PropTypes from 'prop-types';
import React from 'react';
import { useStaticQuery, graphql, StaticQuery } from 'gatsby';
import FullPageGrid from '../components/FullPageGrid';

const ProjectsPage = () => {
  // const { edges: posts } = data.allMarkdownRemark;
  console.log(8);
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

ProjectsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.any,
    }),
  }).isRequired,
};

export default ProjectsPage;

// export default () => (
//   <StaticQuery
//     query={graphql`query ProjectsQuery {
//   allMarkdownRemark(
//     sort: {frontmatter: {date: DESC}}
//     filter: {frontmatter: {tags: {in: ["projects", "project"]}}}
//   ) {
//     edges {
//       node {
//         id
//         html
//         fields {
//           slug
//         }
//         frontmatter {
//           title
//           tags
//           date(formatString: "MMMM DD, YYYY")
//           featuredimage {
//             childImageSharp {
//               thumbnail: gatsbyImageData(width: 200, height: 150, quality: 90, layout: FIXED)
//             }
//           }
//         }
//       }
//     }
//   }
// }`}
//     render={(data, count) => <ProjectsPage data={data} count={count} />}
//   />
// );
