import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { fetchImg } from "Service/image-service";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import Notiflix from 'notiflix';
import '../Utils/Notify'



export class App extends Component {
  state = {
    searchValue: '',
    imagesData: null,
    page: 1,
    showBtnLoadMore: false,
    showLoader: false,
    showModal: false,
    modalData:null
  };

  async componentDidUpdate(prevProps, prevState) {
 
    if (
      prevState.searchValue !== this.state.searchValue ||
      // this.state.searchValue !== ''
      prevState.page !== this.state.page
    ) {

      const imagesData = await fetchImg(
        this.state.searchValue,
        this.state.page
      );
      const normImageData = this.normlazizeImagesData(imagesData.hits);
        
      if (imagesData.totalHits !== 0 && this.state.page ===1) {
          Notiflix.Notify.success(
            `Hooray! We find ${imagesData.totalHits} images`
          );
        }

      if (imagesData.totalHits === 0) {
        Notiflix.Notify.failure('Sorry. There are no images ... 😭');
      }
      if (this.state.page === Math.ceil(imagesData.totalHits / 12)){
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
      

        this.setState(prevState => ({
          imagesData: [...prevState.imagesData, ...normImageData],
          showBtnLoadMore:
            this.state.page < Math.ceil(imagesData.totalHits / 12),
          showLoader: false,
        }));
      
    }
    
  }

  

  handleOnSubmit = searchValue =>
    this.setState({
      searchValue,
      imagesData: [],
      page: 1,
      showBtnLoadMore: false,
      showLoader: true,
    });

  normlazizeImagesData(imagesData) {
    return imagesData.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  }

  handleOnLoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      showLoader: true,
    }));
  };


  handleImageClick=(modalSrc, alt)=>{ 
    this.setState({
      modalData: { src: modalSrc, alt: alt },
      showModal: true,
    });
  }

  closeModal=()=> {
   this.setState({ showModal: false})
  }


  render() {
    return (
      <div>
        <Searchbar handleOnSubmit={this.handleOnSubmit}
        prevSearchValue= {this.state.searchValue}
        />
        {this.state.imagesData && (
          <ImageGallery
            images={this.state.imagesData}
            onImgClick={this.handleImageClick}
          />
        )}
        {this.state.showLoader && <Loader />}

        {this.state.showBtnLoadMore &&
          this.state.imagesData.length > 0 &&
          !this.state.showLoader && (
            <Button onClick={this.handleOnLoadMoreBtn} />
          )}

        {this.state.showModal && (
          <Modal onModalClose={this.closeModal}>
            <img
              className="modal"
              src={this.state.modalData.src}
              alt={this.state.modalData.alt}
            />
          </Modal>
        )}
      </div>
    );
  }
};

