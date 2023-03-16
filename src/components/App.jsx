import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { fetchGallery } from '../fetch/fetch';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonLoader } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Container } from './App.styled';

export default function App() {
  const [imageValue, setImageValue] = useState('');
  const [imageGallery, setImageGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [tag, setTag] = useState(null);

  useEffect(() => {
    if (!imageValue) return;
    const imgGalleryList = async ({ imageValue, page }) => {
      setLoading(true);
      try {
        const { hits, totalHits } = await fetchGallery(imageValue, page);

        if (hits.length === 0) {
          setIsEmpty(true);
        }
        setImageGallery(prevImageGallery => [...prevImageGallery, ...hits]);
        setIsVisible(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    imgGalleryList({ imageValue, page });
  }, [imageValue, page]);

  useEffect(() => {
    setImageGallery([]);
    setPage(1);
    setLoading(false);
    setError(null);
    setIsVisible(false);
    setIsEmpty(false);
  }, [imageValue]);
  const handleFormSubmit = inputValue => {
    if (imageValue !== inputValue) setImageValue(inputValue);
  };
  const loadMore = () => {
    setPage(page + 1);
  };

  const closeModal = () => {
    setLargeImage(null);
    setTag(null);
  };
  const openModal = (url, alt) => {
    setLargeImage(url);
    setTag(alt);
  };

  return (
    <Box>
      <Searchbar onSubmit={handleFormSubmit} />

      {imageValue && (
        <ImageGallery imageGallery={imageGallery} onOpenModal={openModal} />
      )}

      {largeImage && <Modal url={largeImage} alt={tag} onClose={closeModal} />}

      {loading && <Container> {Loader()} </Container>}

      {isVisible && <ButtonLoader loadMore={loadMore} />}

      {error && <h2>Something went wrong. Try again.</h2>}

      {isEmpty && <h1> Sorry. There are no images ... </h1>}

      <ToastContainer />
    </Box>
  );
}
