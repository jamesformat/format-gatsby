import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import simpleId from 'simple-id';
import Styled from 'styled-components';
import {
  formatGreen,
  formatBlue,
  formatGray,
  formatGreenTranslucent,
} from '../variables';

const backgroundColors = [formatGray, formatGreen, formatBlue];

const GridItem = Styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  background: ${formatGreenTranslucent};
  grid-row: span 1;
  grid-column: span 1;
  position: relative;
  box-shadow: 0px 0px 1px formatGray;
  img {
    position: absolute;
    top: 0;
    bottom:0;
    right: 0;
    left: 0;
    width: 100%;
  }
  a:hover:after {
    content: '';
    background: ${formatGreenTranslucent};
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left:0;
    right:0;
  }
  &:before{ 
    content: '';
    display: block;
    width: 1px;
    height: 0;
    padding-bottom: 100%;
  }
  .item:nth-child(1) {
    grid-row-start: 1;
    grid-column-start: 1;
  }
  &:hover {
    .grid-item__title {
      visibility: visible;
    }
  }
  .grid-item__link, .grid-item__linkless {
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .gatsby-image-wrapper {
    height: 100%;
  }
`;

class GridItems extends Component {
  constructor(props) {
    super(props);
    this.gridColorIndex = 0;
    this.state = {
      blocks: null,
    };
  }

  componentDidMount() {
    const blocks = new Array(10).fill(null);
    const blankSpaces = [3, 6, 7];
    const { gridItems } = this.props;

    blankSpaces.forEach((blankSpace) => {
      blocks[blankSpace] = { blank: true };
    });

    Object.keys(gridItems).forEach((key) => {
      const gridItem = gridItems[key];

      const emptyBlockIndex = blocks.findIndex((block) => block === null);
      blocks[emptyBlockIndex] = gridItem;
    });

    this.setState({ blocks });
  }

  fetchBackgroundColor = () => {
    const color = backgroundColors[this.gridColorIndex];
    this.gridColorIndex = this.gridColorIndex >= backgroundColors.length - 1
      ? 0
      : this.gridColorIndex + 1;
    return color;
  };

  showBlocks = () => {
    const { blocks } = this.state;
    return blocks.map((block, index) => {
      const key = simpleId();
      if (!block || block.isBlank || !block.image) {
        const blockStyle = { backgroundColor: this.fetchBackgroundColor() };
        return (
          <div
            key={`block-${key}`}
            className={`grid-item grid-item--blank grid-item-${index + 1}`}
            style={blockStyle}
          />
        );
      }
      return (
        <GridItem key={key} className={`grid-item grid-item-${index + 1}`}>
          {block.link && (
            <Link className="grid-item__link" to={`/${block.link}`}>
              {block.image && block.image.childImageSharp ? (
                <Img
                  fixed={block.image.childImageSharp.thumbnail}
                  title={block.title}
                  sizes={{
                    aspectRatio: 1,
                    src: block.image.childImageSharp.thumbnail.src,
                    srcSet: block.image.childImageSharp.thumbnail.srcSet,
                    sizes: '200px 200px',
                  }}
                />
              ) : null}
              {block.title && block.title.replace(' ', '').length > 0 && (
                <h5 className="grid-item__title">{block.title}</h5>
              )}
            </Link>
          )}
          {!block.link && block.image && block.image.childImageSharp ? (
            <div className="grid-item__linkless">
              <Img
                fixed={block.image.childImageSharp.thumbnail}
                title={block.title}
                sizes={{
                  aspectRatio: 1,
                  src: block.image.childImageSharp.thumbnail.src,
                  srcSet: block.image.childImageSharp.thumbnail.srcSet,
                  sizes: '135px 135px',
                }}
              />
            </div>
          ) : null}
        </GridItem>
      );
    });
  };

  render() {
    const { blocks } = this.state;
    return blocks && <>{this.showBlocks()}</>;
  }
}

GridItems.propTypes = {
  gridItems:
    PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
      image: PropTypes.object,
    })).isRequired,
};

export default GridItems;
