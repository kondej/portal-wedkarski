import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();

  return (
    <article>
      <h2>{t('home.title')}</h2>

      <h3>{t('home.description')}</h3>

      <img src="https://media.istockphoto.com/id/467709845/photo/fisher-holding-a-big-atlantic-salmon-fish.jpg?s=612x612&w=0&k=20&c=CacG23rUCpS3Zfw1owv_qXSoDWuAWUkwUdszHSwI8PY=" alt="Wędkarz z rybą" />
    </article>
  );
};

export default Home;