import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/Auth';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        haslo: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await login(formData);
            navigate('/polowy');
        } catch (error) {
            alert(error.response.data.error);
            console.error('Błąd podczas logowania!', error);
        }
    };

    return (
        <article>
            <h2>{t('login.title')}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">{t('login.emailPlaceholder')}:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="haslo">{t('login.passwordPlaceholder')}:</label>
                <input
                    type="password"
                    id="haslo"
                    name="haslo"
                    value={formData.haslo}
                    onChange={handleChange}
                    required
                />

                <input className='btn-primary' type="submit" value={t('login.submitButton')} />
            </form>
            <p>{t('login.noAccountText')}</p>
             <Link to="/register" className='btn-primary'>{t('login.registerLink')}</Link>
        </article>
    );
}

export default Login;