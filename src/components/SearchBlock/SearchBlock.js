import { useRef, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const SearchBlock = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('');

  const inputRef = useRef();

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 1000),
    [] );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const onClickClear = () => {
    setValue('');
    dispatch(setSearchValue(''));
    inputRef.current.focus();
  };

  return (
    <div className="search-block">
      <svg
        className="search-block__icon-search"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <title />
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        className="search-block__input"
        type="text"
        placeholder="Поиск пиццы..."
        onChange={onChangeInput}
        value={value}
      />
      {value && (
        <svg
          className="search-block__icon-x"
          fill="none"
          height="28"
          viewBox="0 0 28 28"
          width="28"
          xmlns="http://www.w3.org/2000/svg"
          onClick={onClickClear}>
          <path
            d="M2.32129 2.32363C2.72582 1.9191 3.38168 1.9191 3.78621 2.32363L25.6966 24.234C26.1011 24.6385 26.1011 25.2944 25.6966 25.6989C25.2921 26.1035 24.6362 26.1035 24.2317 25.6989L2.32129 3.78854C1.91676 3.38402 1.91676 2.72815 2.32129 2.32363Z"
            fill="black"
          />
          <path
            d="M25.6787 2.30339C25.2742 1.89887 24.6183 1.89887 24.2138 2.30339L2.30339 24.2138C1.89887 24.6183 1.89887 25.2742 2.30339 25.6787C2.70792 26.0832 3.36379 26.0832 3.76831 25.6787L25.6787 3.76831C26.0832 3.36379 26.0832 2.70792 25.6787 2.30339Z"
            fill="black"
          />
        </svg>
      )}
    </div>
  );
};

export default SearchBlock;
