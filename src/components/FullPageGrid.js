import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Layout from './Layout';
import { formatGreen } from '../variables';

const PostItem = styled.div`
  /* outline: 1px solid ${formatGreen}; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  position: relative;
  .post-title {
    position: absolute;
    opacity: 0;
    bottom: 0;
    left: 0;
    display: block;
    right: 0;
    z-index: 10;
    color: white;
    background: ${formatGreen};
    padding: 9px;
    width: 100%;
    margin-bottom: 0;
  }
  a:hover > .post-title {
    opacity: 1;
  }
`;
const FullPageGridStyles = styled.div`
  margin: 70px 0;
  grid-gap: 70px;
  justify-content: space-around;
  display: grid;
  grid-template-columns: repeat(4, 202px);
  transition: opacity 0.5s ease-in-out;
  @media screen and (max-width: 1000px) {
    margin: 40px 0;
    grid-gap: 60px;
    grid-template-columns: repeat(3, 202px);
  }
  @media screen and (max-width: 750px) {
    grid-gap: 40px;
    grid-template-columns: repeat(2, 202px);
  }
  @media screen and (max-width: 450px) {
    grid-template-columns: repeat(1, 202px);
  }
`;

const EmptyPostsStyles = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const FullPageGridTemplate = ({ title, featuredimage, slug }) => {
  const friendlyTitle = title.length > 30 ? `${title.slice(0, 30)}...` : title;
  console.log({ featuredimage });
  return (
    <PostItem className="post-item">
      <Link to={slug}>
        {featuredimage && (
          <>
            <Img
              fixed={featuredimage.childImageSharp.thumbnail}
              title={title}
              style={{ width: '200px' }}
              sizes={{
                aspectRatio:
                  featuredimage.childImageSharp.thumbnail.aspectRatio,
                src: featuredimage.childImageSharp.thumbnail.src,
                srcSet: featuredimage.childImageSharp.thumbnail.srcSet,
                sizes: '100% 100%',
              }}
            />
            <h4 className="post-title">{friendlyTitle}</h4>
          </>
        )}
      </Link>
    </PostItem>
  );
};

const FullPageGrid = ({ posts }) => (
  <Layout>
    <FullPageGridStyles className="full-page-grid">
      {posts
        && posts.map(({ node: post }) => (
          <FullPageGridTemplate
            key={post.id}
            featuredimage={post.frontmatter.featuredimage}
            title={post.frontmatter.title}
            slug={post.fields.slug}
          />
        ))}
    </FullPageGridStyles>
    {(!posts || !posts.length) && (
      <EmptyPostsStyles>
        <h4>Sorry, it looks as though there are no posts here</h4>

        <Link to="/" className="home-link">
          <h5>Head back home</h5>
        </Link>
      </EmptyPostsStyles>
    )}
  </Layout>
);

FullPageGrid.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default FullPageGrid;

FullPageGridTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  featuredimage: PropTypes.shape({
    childImageSharp: PropTypes.object,
  }).isRequired,
};
