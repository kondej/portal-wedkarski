import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();
  return (
    <header>
      <h1>{t('header.title')}</h1>
    </header>
  );
};
export default Header;