import { FC, memo } from 'react';
import '../../public/fonts/fonts.scss';
import styles from './ButtonMore.module.scss';
import { useAppDispatch } from '../Redux/store';
import { setLengthTickets } from '../Redux/filtersState/FiltersState';

const ButtonMore: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => dispatch(setLengthTickets(5))}
    >
      Показать еще 5 билетов!
    </button>
  );
};

export const ButtonMoreComponent = memo(ButtonMore);
