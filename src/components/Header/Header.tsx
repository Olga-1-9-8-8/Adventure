import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__item}>
        <NavLink to="/">Писать Глаголы</NavLink>
      </div>
      <div className={styles.header__item}>
        <NavLink to="/painting">Рисовать прямоугольники</NavLink>
      </div>
    </header >
  );
};
