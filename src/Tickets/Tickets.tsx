/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-one-expression-per-line */
// eslint-disable-next-line import/no-extraneous-dependencies
import { FC, JSX, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import { format, addMinutes } from 'date-fns';
import styles from './Tickets.module.scss';
import '../../public/fonts/fonts.scss';
import { selectFilterToggle } from '../Redux/filtersState/selectFilterToggle';
import {
  fetchSearchId,
  fetchTickets,
} from '../Redux/TicketsApiState/TicketApiState';
import { RootState, useAppDispatch } from '../Redux/store';

export const Tickets: FC = () => {
  const activeFilters = useSelector(selectFilterToggle);
  const { searchId } = useSelector((state: RootState) => state.tickets);
  const dispatch = useAppDispatch();
  const controller = new AbortController();

  useEffect(() => {
    dispatch(fetchSearchId());
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (searchId) {
      dispatch(fetchTickets(searchId));
    }
    return () => {
      controller.abort();
    };
  }, [searchId, dispatch]);

  const renderTickets = (): JSX.Element[] =>
    activeFilters.map((ticket) => (
      <div className={styles.container} key={nanoid()}>
        <div className={styles.leftBlock}>
          <span className={styles.price}>{ticket.price} Р</span>
          <span className={styles.route}>
            {ticket.segments[0].origin} -{ticket.segments[0].destination}
          </span>
          <span className={styles.time}>
            {`${format(new Date(ticket.segments[0].date), 'HH:mm')} - 
            ${format(
              addMinutes(
                new Date(ticket.segments[0].date),
                ticket.segments[0].duration,
              ),
              'HH:mm',
            )}`}
          </span>
          <span className={styles.route}>
            {ticket.segments[1].origin} -{ticket.segments[1].destination}
          </span>
          <span className={styles.time}>
            {`${format(new Date(ticket.segments[1].date), 'HH:mm')} - 
            ${format(
              addMinutes(
                new Date(ticket.segments[1].date),
                ticket.segments[1].duration,
              ),
              'HH:mm',
            )}`}
          </span>
        </div>
        <div className={styles.middleBlock}>
          <span className={styles.label}>В пути</span>
          <span className={styles.duration}>
            {`${Math.floor(ticket.segments[0].duration / 60)}ч ${ticket.segments[0].duration % 60}м`}
          </span>
          <span className={styles.label}>В пути</span>
          <span className={styles.duration}>
            {`${Math.floor(ticket.segments[1].duration / 60)}ч ${ticket.segments[1].duration % 60}м`}
          </span>
        </div>
        <div className={styles.endGroup}>
          <img
            src={`https://pics.avs.io/99/36/${ticket.carrier}.png`}
            alt="logo"
            className={styles.logo}
          />
          <span className={styles.transfers}>
            {ticket.segments[0].stops.length} пересадки
          </span>
          <span className={styles.airports}>
            {ticket.segments[0].stops.length
              ? ticket.segments[0].stops.join(', ')
              : 'Нет пересадок'}
          </span>
          <span className={styles.transfers}>
            {ticket.segments[1].stops.length} пересадка
          </span>
          <span className={styles.airports}>
            {ticket.segments[1].stops.length
              ? ticket.segments[1].stops.join(', ')
              : 'Нет пересадок'}
          </span>
        </div>
      </div>
    ));
  return <>{renderTickets()}</>;
};
