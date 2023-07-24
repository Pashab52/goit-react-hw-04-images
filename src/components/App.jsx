import { useState, useEffect} from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { fetchImg } from "Service/image-service";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import Notiflix from 'notiflix';
import '../Utils/Notify'



export function App() {
  
  const [searchValue, setSearchValue] = useState('');
  const [imagesData, setImagesData] = useState([]);
  const [page, setPage] = useState(1);
  const [showBtnLoadMore, setShowBtnLoadMore] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);



  useEffect(() => {
    
    if (searchValue === '') {
      
      return;
    };

      fetch();
    
    async function fetch() {
  
       const imgData = await fetchImg(searchValue, page);
       const normImageData = normlazizeImagesData(imgData.hits);
      // console.log(normImageData);

      if (imgData.totalHits !== 0 && page === 1) {
        Notiflix.Notify.success(`Hooray! We find ${imgData.totalHits} images`);
      }

      if (imgData.totalHits === 0) {
        Notiflix.Notify.failure('Sorry. There are no images ... 😭');
      }

      if (page === Math.ceil(imgData.totalHits / 20)) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }

      setImagesData(prevState => [...prevState, ...normImageData]);
      setShowBtnLoadMore(page < Math.ceil(imgData.totalHits / 20));
      setShowLoader(false);
    }
 
      
    
  },[page, searchValue])
    


  const handleOnSubmit = (sValue) => {
    setSearchValue(sValue);
    setImagesData([]);
    setPage(1);
    setShowBtnLoadMore(false);
    setShowLoader(true);
  }



   function normlazizeImagesData(imagesData) {
    return imagesData.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  }

  const handleOnLoadMoreBtn = () => {

    setPage(prevState => prevState + 1);
    setShowLoader(true)

  };


 const handleImageClick=(modalSrc, alt)=>{ 
 
   setModalData({ src: modalSrc, alt: alt });
   setShowModal(true)
   
  }
  

  const closeModal=()=> {
   setShowModal(false)
  }


    return (
      <div>
        <Searchbar handleOnSubmit={handleOnSubmit}
        prevSearchValue= {searchValue}
        />
        {imagesData && (
          <ImageGallery
            images={imagesData}
            onImgClick={handleImageClick}
          />
        )}
        {showLoader && <Loader />}

        {showBtnLoadMore &&
          imagesData.length > 0 &&
          !showLoader && (
            <Button onClick={handleOnLoadMoreBtn} />
          )}

        {showModal && (
          <Modal onModalClose={closeModal}>
            <img
              className="modal"
              src={modalData.src}
              alt={modalData.alt}
            />
          </Modal>
        )}
      </div>
    );
};

