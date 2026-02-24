import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { lowiskoAPI } from '../../services/Api';
import { useTranslation } from 'react-i18next';

const LowiskoDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [lowisko, setLowisko] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLowisko();
    }, [id]);

    const fetchLowisko = async () => {
        try {
            const response = await lowiskoAPI.get(id);
            setLowisko(response.data.lowisko);
        } catch (error) {
            setError('Błąd podczas pobierania danych łowiska.');
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <article>
            <h2>{t('detailsFishery.title')}</h2>
            {lowisko ? (
                <div>
                    <p><strong>{t('detailsFishery.fisheryNameHeader')}:</strong> {lowisko.nazwa}</p>
                    <p><strong>{t('detailsFishery.locationHeader')}:</strong> {lowisko.lokalizacja}</p>
                    <p><strong>{t('detailsFishery.fisheryTypeHeader')}:</strong> {lowisko.typ_lowiska}</p>
                    <p><strong>{t('detailsFishery.descriptionHeader')}:</strong> {lowisko.opis || 'Brak opisu'}</p>
                </div>
            ) : (
                <p>{t('detailsFishery.notFoundText')}</p>
            )}
            <button 
                type="button" 
                onClick={() => navigate(-1)} 
                className="btn-back"
            >
                {t('detailsFishery.backButton')}
            </button>
        </article>
    );
};

export default LowiskoDetails;