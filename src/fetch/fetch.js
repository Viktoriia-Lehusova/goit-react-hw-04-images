import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32843972-0ea5b72fd9aa7da412e1885f6';

export const fetchGallery = async (searchQuery, page) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
