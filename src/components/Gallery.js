import React, { useState } from 'react';
import Img from 'gatsby-image';
import { chunk, sum } from 'lodash';
import PropTypes from 'prop-types';
import Carousel, { Modal, ModalGateway } from 'react-images';

import styled from 'styled-components';

const GalleryContent = styled.div`
  grid-template-columns: repeat(3, 1fr);
  display: grid;
  gap: 5px;
  @media screen and (min-width: 52em) {
    margin-bottom: 0rem;
  }
  @media screen and (min-width: 64em) {
  }
  h2 {
    margin: 0;
  }
`;

const Gallery = ({ title, images, itemsPerRow: itemsPerRowByBreakpoints }) => {
  const aspectRatios = images.map((image) => 1);
  const rowAspectRatioSumsByBreakpoints = itemsPerRowByBreakpoints.map(
    (itemsPerRow) => chunk(aspectRatios, itemsPerRow).map((rowAspectRatios) => sum(rowAspectRatios)),
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalCurrentIndex, setModalCurrentIndex] = useState(0);

  const closeModal = () => setModalIsOpen(false);
  const openModal = (imageIndex) => {
    setModalCurrentIndex(imageIndex);
    setModalIsOpen(true);
  };

  return (
    <GalleryContent className="gallery-content">
      {images.map((image, index) => {
        if (!image) return false;
        if (index >= itemsPerRowByBreakpoints[0]) return false;
        return (
          <a key={image.fluid.src} onClick={() => openModal(index)}>
            <Img
              fluid={image.fluid}
              title={image.title}
              aspectRatio={1}
              sizes={{
                src: image.thumbnail.src,
                aspectRatio: 1,
              }}
              style={{
                objectFit: 'cover',
                maxWidth: '100%',
              }}
            />
          </a>
        );
      })}
      {ModalGateway && (
        <ModalGateway>
          {modalIsOpen && (
            <Modal
              onClose={closeModal}
              styles={{
                blanket: (base) => ({
                  ...base,
                  backgroundColor: '#36484ae6',
                  zIndex: 900,
                }),
                dialog: (base) => ({ ...base, width: '100%' }),
                positioner: (base) => ({ ...base, zIndex: 901 }),
              }}
            >
              <Carousel
                views={images.map(({ fluid }) => ({
                  source: fluid.src,
                }))}
                currentIndex={modalCurrentIndex}
                components={{ FooterCount: () => null }}
                styles={{
                  footer: (base) => ({
                    ...base,
                    background: 'none !important',
                    color: '#666',
                    padding: 0,
                    paddingTop: 20,
                    position: 'static',
                    '& a': { color: 'black' },
                  }),
                  header: (base) => ({
                    ...base,
                    background: 'none !important',
                    padding: 0,
                    paddingBottom: 10,
                    position: 'static',
                  }),
                  headerClose: (base) => ({
                    ...base,
                    color: '#666',
                    ':hover': { color: '#DE350B' },
                  }),
                  view: (base) => ({
                    ...base,
                    overflow: 'hidden',
                    objectFit: 'contain',
                    '& > img': {
                      maxHeight: '75vh',
                      height: 'auto',
                      width: 'auto',
                      margin: '0 auto',
                    },
                  }),
                }}
              />
            </Modal>
          )}
        </ModalGateway>
      )}
    </GalleryContent>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      fluid: PropTypes.shape({
        aspectRatio: PropTypes.number,
        base64: PropTypes.string,
        sizes: PropTypes.string,
        src: PropTypes.string,
        srcSet: PropTypes.string,
      }),
      title: PropTypes.string,
      thumbnail: PropTypes.shape({
        aspectRatio: PropTypes.number,
        base64: PropTypes.string,
        sizes: PropTypes.string,
        src: PropTypes.string,
        srcSet: PropTypes.string,
      }),
    }),
  ),
  itemsPerRow: PropTypes.oneOfType(
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ),
  title: PropTypes.string,
  // slug: string
};
export default Gallery;
