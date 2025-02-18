import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../Redux/store';
import { setButtonFilter } from '../Redux/filtersState/FiltersState';
import styles from './TicketsFilters.module.scss';
import '../../public/fonts/fonts.scss';

const TicketsFilters: FC = () => {
  const dispatch = useAppDispatch();
  const filterButton = useSelector(
    (state: RootState) => state.inputFilters.filtersButton,
  );
  return (
    <>
      <button
        type="button"
        className={
          filterButton === 'cheap' ? styles.buttonActive : styles.buttonFilter
        }
        onClick={() => dispatch(setButtonFilter('cheap'))}
      >
        Самый дешевый
      </button>
      <button
        type="button"
        className={
          filterButton === 'fast' ? styles.buttonActive : styles.buttonFilter
        }
        onClick={() => dispatch(setButtonFilter('fast'))}
      >
        Самый быстрый
      </button>
      <button
        type="button"
        className={
          filterButton === 'optimal' ? styles.buttonActive : styles.buttonFilter
        }
        onClick={() => dispatch(setButtonFilter('optimal'))}
      >
        Оптимальный
      </button>
    </>
  );
};

export const TicketsFiltersComponent = memo(TicketsFilters);
