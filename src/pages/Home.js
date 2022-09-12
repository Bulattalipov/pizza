import { useEffect, useRef, useCallback } from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';

import { setCategoriesId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const categoriesId = useSelector((state) => state.filter.categoriesId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const searchValue = useSelector((state) => state.filter.searchValue);

  const {items, status} = useSelector((state) => state.pizza);

  const getPizzas = async () => {
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoriesId > 0 ? `&category=${categoriesId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      }),
    );
  };

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );

      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoriesId, sortType, searchValue, currentPage]);

  // Если измении параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoriesId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoriesId, sortType, currentPage]);

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const onChangeCategory = useCallback((id) => {
    console.log('onChangeCategory');
    dispatch(setCategoriesId(id));
  }, []);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoriesId={categoriesId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title"> Все пиццы </h2>
      {
        status === 'error' ? (
          <div className='content__error-info'>
            <h2>Произошла ошибка</h2>
            <p>К сожелению, не удалось получить пиццы</p>
          </div>
        ) : (
          <div className="content__items"> {status === 'loading' ? skeleton : pizzas} </div>
        )
      }
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
