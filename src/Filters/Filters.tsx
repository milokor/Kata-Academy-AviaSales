/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-curly-newline */
import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { CheckIcon } from '../UI/CheckIcon';
import {
  setFilter,
  setAllFilters,
  type FilterInputKeys,
} from '../Redux/filtersState/FiltersState';
import styles from './Filters.module.scss';
import '../../public/fonts/fonts.scss';
import { selectFilters } from '../Redux/filtersState/selectors';
import { useAppDispatch } from '../Redux/store';

const Filters: FC = () => {
  const dispatch = useAppDispatch();
  const handleCheckboxChange = (filterName: FilterInputKeys): void => {
    dispatch(setFilter(filterName));
  };
  const filters = useSelector(selectFilters);
  return (
    <div className={styles.filterContainer}>
      <h2 className={styles.title}>Количество пересадок</h2>
      <label className={styles.customCheckbox} htmlFor="Все">
        <input
          id="Все"
          type="checkbox"
          className={styles.visuallyHidden}
          onChange={(e) => dispatch(setAllFilters(e.target.checked))}
          checked={filters.all}
        />
        <span className={styles.checkmark}>
          <CheckIcon />
        </span>
        Все
      </label>
      <label className={styles.customCheckbox} htmlFor="Без пересадок">
        <input
          id="Без пересадок"
          type="checkbox"
          className={styles.visuallyHidden}
          onChange={() => handleCheckboxChange('noStops')}
          checked={filters.noStops}
        />
        <span className={styles.checkmark}>
          <CheckIcon />
        </span>
        Без пересадок
      </label>
      <label className={styles.customCheckbox} htmlFor="1 пересадка">
        <input
          id="1 пересадка"
          type="checkbox"
          className={styles.visuallyHidden}
          onChange={() => handleCheckboxChange('oneStops')}
          checked={filters.oneStops}
        />
        <span className={styles.checkmark}>
          <CheckIcon />
        </span>
        1 пересадка
      </label>
      <label className={styles.customCheckbox} htmlFor="2 пересадки">
        <input
          id="2 пересадки"
          type="checkbox"
          className={styles.visuallyHidden}
          onChange={() => handleCheckboxChange('twoStops')}
          checked={filters.twoStops}
        />
        <span className={styles.checkmark}>
          <CheckIcon />
        </span>
        2 пересадки
      </label>
      <label className={styles.customCheckbox} htmlFor="3 пересадки">
        <input
          id="3 пересадки"
          type="checkbox"
          className={styles.visuallyHidden}
          onChange={() => handleCheckboxChange('threeStops')}
          checked={filters.threeStops}
        />
        <span className={styles.checkmark}>
          <CheckIcon />
        </span>
        3 пересадки
      </label>
    </div>
  );
};

export const FiltersComponent = memo(Filters);
