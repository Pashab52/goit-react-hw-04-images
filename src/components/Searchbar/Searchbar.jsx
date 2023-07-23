import {useState } from "react";
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';


export function Searchbar(props) {
 
  const [searchValue, setSearchValue] = useState('');
  
    


  const handleOnChangeInput = event => {
     setSearchValue(event.currentTarget.value); 
  };

 
  const handleOnSubmit = event => {
    event.preventDefault();
    if (
      this.props.prevSearchValue === this.state.searchValue &&
      this.state.searchValue !== ''
    ) {
      Notiflix.Notify.info(
        'Нou already searched for this, please enter a different search word'
      );
    } else {
      const searchValue = this.state.searchValue.trim();

      if (searchValue === '') {
        Notiflix.Notify.info('Please fill out this field');
      }
      if (searchValue !== '') {
        this.props.handleOnSubmit(searchValue);
      }
    }
    this.setState({ searchValue: '' });
  };


    return (
      <header className="searchbar">
        <form className="form" onSubmit={handleOnSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleOnChangeInput}
            value={searchValue}
          />
        </form>
      </header>
    );
  }

 Searchbar.propTypes = {
    handleOnSubmit: PropTypes.func.isRequired,
  };