/* eslint-disable import/no-extraneous-dependencies */
import { FC } from 'react';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import { useSelector } from 'react-redux';
import { FiltersComponent } from '../Filters/Filters';
import { TicketsFiltersComponent } from '../TicketsFilters/TicketsFilters';
import { Tickets } from '../Tickets/Tickets';
import { ButtonMoreComponent } from '../ButtonMore/ButtonMore';
import { RootState } from '../Redux/store';
import styles from './App.module.scss';
import '../../public/fonts/fonts.scss';

export const App: FC = () => {
  const progress = useSelector((state: RootState) => state.tickets.progress);
  const filter = useSelector((state: RootState) => state.inputFilters.filters);
  const filterCheck =
    !filter.all &&
    !filter.noStops &&
    !filter.oneStops &&
    !filter.twoStops &&
    !filter.threeStops;
  return (
    <>
      <LinearProgress variant="determinate" value={Math.floor(progress)} />
      <div className={styles.container}>
        <img
          src="/public/image/Logo.svg"
          alt="AviaSales"
          className={styles.image}
        />
        <div className={styles.layout}>
          <FiltersComponent />
          <div className={styles.main}>
            <TicketsFiltersComponent />
          </div>
          <div className={styles.footer}>
            <Tickets />
            {!filterCheck ? (
              <ButtonMoreComponent />
            ) : (
              <div className={styles.noFilters}>
                Рейсов, подходящих под заданные фильтры, не найдено
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
