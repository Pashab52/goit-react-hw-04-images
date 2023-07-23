import { useState, useEffect, useRef } from "react";
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

const firstRender = useRef(true);

  useEffect(() => {
    // if (
    //   prevState.searchValue !== this.state.searchValue ||
    //   // this.state.searchValue !== ''
    //   prevState.page !== this.state.page
    // ) {
    
     if (firstRender.current) {
       // console.log('рендер 1', contacts);
       
       return;
     }
    async function fetch() {
       const imgData = await fetchImg(searchValue, page);
       const normImageData = normlazizeImagesData(imgData.hits);
   console.log(normImageData);
      setImagesData(prevState => [...prevState, ...normImageData]);
      //  setImagesData([...imagesData, ...normImageData]);
       setShowBtnLoadMore(page < Math.ceil(imgData.totalHits / 12));
       setShowLoader(false);
    }
     
    fetch();

    
  },[page, searchValue, showLoader])
    



  // async componentDidUpdate(prevProps, prevState) {
 
  //   if (
  //     prevState.searchValue !== this.state.searchValue ||
  //     // this.state.searchValue !== ''
  //     prevState.page !== this.state.page
  //   ) {

  //     const imagesData = await fetchImg(
  //       this.state.searchValue,
  //       this.state.page
  //     );
  //     const normImageData = this.normlazizeImagesData(imagesData.hits);
        
  //     if (imagesData.totalHits !== 0 && this.state.page ===1) {
  //         Notiflix.Notify.success(
  //           `Hooray! We find ${imagesData.totalHits} images`
  //         );
  //       }

  //     if (imagesData.totalHits === 0) {
  //       Notiflix.Notify.failure('Sorry. There are no images ... 😭');
  //     }
  //     if (this.state.page === Math.ceil(imagesData.totalHits / 12)){
  //       Notiflix.Notify.info(
  //         "We're sorry, but you've reached the end of search results."
  //       );
  //     }
      

  //       this.setState(prevState => ({
  //         imagesData: [...prevState.imagesData, ...normImageData],
  //         showBtnLoadMore:
  //           this.state.page < Math.ceil(imagesData.totalHits / 12),
  //         showLoader: false,
  //       }));
  //   }
  // }

  

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
 
   setModalData(modalSrc, alt);
  //  {}
  
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

