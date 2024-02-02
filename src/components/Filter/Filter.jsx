import css from './filter.module.css';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/filter/filter-actions';

const Filter = () => {
  const dispatch = useDispatch();

  const filterValue = e => {
    const key = e.target.value.toLowerCase().trim();
    dispatch(setFilter(key));
  };

  return (
    <input
      className={`form-control me-2 ${css.search}`}
      type="search"
      placeholder="Search"
      aria-label="Search"
      onChange={filterValue}
    />
  );
};

export default Filter;
