import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles.footer__text}>@Приложение сделано Королевой Ольгой</span>
    </footer>
  );
};
