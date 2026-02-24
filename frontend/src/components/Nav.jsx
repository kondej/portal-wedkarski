import { NavLink } from 'react-router-dom';
import { useAuth} from '../services/Auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Nav = () => {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            {t('nav.home')}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/lowiska" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            {t('nav.fisheries')}
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/gatunki" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            {t('nav.species')}
          </NavLink>
        </li>

        {isAuthenticated() ? (
          <>
            <li>
              <NavLink 
                to="/polowy" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {t('nav.myCatches')}
              </NavLink>
            </li>
            {isAdmin() && (
                <li>
                    <NavLink 
                        to="/polowy-wszystkie" 
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        {t('nav.allCatches')}
                    </NavLink>
                </li>
            )}
            <li>
              <div className='user-container'>
                <h3>{user.imie} {user.nazwisko}
                {user.rola === 'administrator' && ' (Admin)'}</h3>
              </div>
              <button onClick={handleLogout}>{t('nav.logout')}</button>
            </li>
          </>
        ) : (
          <>
            <div className='user-container'>
              <li>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  {t('nav.login')}
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/register" 
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  {t('nav.register')}
                </NavLink>
              </li>
            </div>
          </>
        )}

        
        <li className="lang-container">
            <button onClick={() => changeLanguage('pl')} disabled={i18n.language === 'pl'}>PL</button>
            <button onClick={() => changeLanguage('en')} disabled={i18n.language === 'en'}>EN</button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;