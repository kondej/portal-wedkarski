import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { gatunekAPI } from '../../services/Api';
import { useTranslation } from 'react-i18next';

const GatunekForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        nazwa: ''
    });

    useEffect(() => {
        if (isEdit) {
            fetchGatunek();
        }
    }, [id]);

    const fetchGatunek = async () => {
        try {
            const response = await gatunekAPI.get(id);
            const gatunek = response.data.gatunek;
            setFormData({
                nazwa: gatunek.nazwa,
            });
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (isEdit) {
                await gatunekAPI.update(id, formData);
            } else {
                await gatunekAPI.create(formData);
            }
            navigate('/gatunki');
        } catch (error) {
            alert(error.response.data.error);
            console.error('Błąd podczas zapisywania danych:', error);
        }
    };

    return (
        <article>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nazwa">{t('newSpecies.speciesNamePlaceholder')}:</label>
                <input
                    type="text"
                    id="nazwa"
                    name="nazwa"
                    value={formData.nazwa}
                    onChange={(e) => setFormData({ ...formData, nazwa: e.target.value })}
                    required
                />

                <input 
                    type="submit" 
                    className="btn-primary"
                    value={isEdit ? t('editSpecies.submitButton') : t('newSpecies.submitButton')}
                />
                <Link to="/gatunki" role="button" className="btn-primary">{t('nav.cancelButton')}</Link>
            </form>
        </article>
    );
}

export default GatunekForm;