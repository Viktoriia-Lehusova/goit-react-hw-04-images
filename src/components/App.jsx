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

  // render() {
  //   const {
  //     imageGallery,
  //     isVisible,
  //     imageValue,
  //     loading,
  //     isEmpty,
  //     error,
  //     largeImage,
  //     tag,
  //   } = this.state;

  //   const { handleFormSubmit, loadMore, openModal, closeModal } = this;

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

// class App extends Component {
//   state = {
//     imageValue: '',
//     imageGallery: [],
//     loading: false,
//     page: 1,
//     error: null,
//     isVisible: false,
//     isEmpty: false,
//     largeImage: null,
//     tag: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.imageValue !== this.state.imageValue) this.resetState();

//     if (
//       prevState.imageValue !== this.state.imageValue ||
//       prevState.page !== this.state.page
//     )
//       this.imgGalleryList(this.state.imageValue, this.state.page);
//   }
//   imgGalleryList = async (imageValue, page) => {
//     this.setState({ loading: true });
//     try {
//       const { hits, totalHits } = await fetchGallery(imageValue, page);

//       if (hits.length === 0) {
//         this.setState({ isEmpty: true });
//       }
//       this.setState(prev => ({
//         imageGallery: [...prev.imageGallery, ...hits],
//         isVisible: page < Math.ceil(totalHits / 12),
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ loading: false });
//     }
//   };
//   resetState = () => {
//     this.setState({
//       imageGallery: [],
//       page: 1,
//       loading: false,
//       error: null,
//       isVisible: false,
//       isEmpty: false,
//     });
//   };
//   handleFormSubmit = inputValue => {
//     const { imageValue } = this.state;
//     if (imageValue !== inputValue) this.setState({ imageValue: inputValue });
//   };
//   loadMore = () => {
//     this.setState(prev => ({ page: prev.page + 1 }));
//   };

//   closeModal = () => {
//     this.setState({ largeImage: null, tag: null });
//   };
//   openModal = (url, alt) => this.setState({ largeImage: url, tag: alt });

//   render() {
//     const {
//       imageGallery,
//       isVisible,
//       imageValue,
//       loading,
//       isEmpty,
//       error,
//       largeImage,
//       tag,
//     } = this.state;

//     const { handleFormSubmit, loadMore, openModal, closeModal } = this;

//     return (
//       <Box>
//         <Searchbar onSubmit={handleFormSubmit} />

//         {imageValue && (
//           <ImageGallery imageGallery={imageGallery} onOpenModal={openModal} />
//         )}

//         {largeImage && (
//           <Modal url={largeImage} alt={tag} onClose={closeModal} />
//         )}

//         {loading && <Container> {Loader()} </Container>}

//         {isVisible && <ButtonLoader loadMore={loadMore} />}

//         {error && <h2>Something went wrong. Try again.</h2>}

//         {isEmpty && <h1> Sorry. There are no images ... </h1>}

//         <ToastContainer />
//       </Box>
//     );
//   }
// }

// export default App;
