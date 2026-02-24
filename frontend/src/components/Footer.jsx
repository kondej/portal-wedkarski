import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      &copy; 2026 {t('footer.copyright')}
    </footer>
  );
};
export default Footer;