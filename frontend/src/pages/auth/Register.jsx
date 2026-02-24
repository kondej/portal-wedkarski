import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/Auth';
import { useTranslation } from 'react-i18next';

const Register = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        haslo: '',
        imie: '',
        nazwisko: ''
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
            await register(formData);
            navigate('/login');
        } catch (error) {
            alert(error.response.data.errors[0].msg);
            console.error('Błąd podczas rejestracji:', error);
        }
    };

    return (
        <article>
            <h2>{t('register.title')}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="imie">{t('register.firstNamePlaceholder')}:</label>
                <input
                    type="text"
                    id="imie"
                    name="imie"
                    value={formData.imie}
                    onChange={handleChange}
                    required
                />


                <label htmlFor="nazwisko">{t('register.lastNamePlaceholder')}:</label>
                <input
                    type="text"
                    id="nazwisko"
                    name="nazwisko"
                    value={formData.nazwisko}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">{t('register.emailPlaceholder')}:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="haslo">{t('register.passwordPlaceholder')}:</label>
                <input
                    type="password"
                    id="haslo"
                    name="haslo"
                    value={formData.haslo}
                    onChange={handleChange}
                    required
                />

                <input type="submit" value={t('register.submitButton')} />
            </form>
            <p>{t('register.haveAccountText')}</p>
                <Link to="/login">{t('register.loginLink')}</Link>
            
        </article>
    );
}

export default Register;