import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { polowAPI, lowiskoAPI, gatunekAPI } from '../../services/Api';
import { useTranslation } from 'react-i18next';

const PolowForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        gatunek: '',
        waga: '',
        lowisko: '',
        data: '',
        uzytkownik: ''
    });

    const [lowiska, setLowiska] = useState([]);
    const [gatunki, setGatunki] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [lowiskaRes, gatunkiRes] = await Promise.all([
                    lowiskoAPI.getAll(),
                    gatunekAPI.getAll()
                ]);

                setLowiska(lowiskaRes.data.lowiska);
                setGatunki(gatunkiRes.data.gatunki);

                if (isEdit) {
                    const response = await polowAPI.get(id);
                    const polow = response.data.polow;

                    const userStr = localStorage.getItem('user');
                    if (userStr) {
                        const currentUser = JSON.parse(userStr);
                        if (currentUser.rola !== 'administrator' && polow.Uzytkownik_id!== currentUser.id) {
                            alert("To nie jest Twój połów!");
                            navigate('/polowy');
                            return;
                        }
                    }

                    setFormData({
                        gatunek: polow.Gatunek_id,
                        waga: polow.waga,
                        lowisko: polow.Lowisko_id,
                        data: polow.data.split('T')[0],
                        uzytkownik: polow.Uzytkownik_id
                    });
                }
            } catch (error) {
                console.error('Błąd podczas ładowania danych:', error);
                if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                    navigate('/polowy');
                }
            }
        };

        loadData();
    }, [id, isEdit, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const user = localStorage.getItem('user');
            formData.uzytkownik = JSON.parse(user).id;

            if (isEdit) {
                await polowAPI.update(id, formData);
            } else {
                await polowAPI.create(formData);
            }
            navigate(-1);
        } catch (error) {
            console.error('Błąd podczas zapisywania danych:', error);
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <article>
            <form onSubmit={handleSubmit}>
                <label for="gatunek">{t('species.speciesNameHeader')}:</label>
                <select 
                    id="gatunek" 
                    name="gatunek" 
                    required
                    value={formData.gatunek}
                    onChange={handleChange}
                >
                    <option value="" disabled>-- {t('catches.selectSpeciesPlaceholder')} --</option>
                    {gatunki.map((gatunek) => (
                        <option key={gatunek.id} value={gatunek.id}>
                            {gatunek.nazwa}
                        </option>
                    ))}
                </select>

                <label for="waga">{t('catches.weightHeader')}:</label>
                <input 
                    type="number" 
                    id="waga" 
                    name="waga" 
                    step="1" 
                    min="0"
                    value={formData.waga}
                    onChange={handleChange} 
                    required />

                <label for="data">{t('catches.dateHeader')}:</label>
                <input 
                    type="date" 
                    id="data" 
                    name="data" 
                    required 
                    value={formData.data}
                    onChange={handleChange}
                />

                <label for="lowisko">{t('catches.fisheryHeader')}:</label>
                <select 
                    id="lowisko" 
                    name="lowisko" 
                    required
                    value={formData.lowisko}
                    onChange={handleChange}
                >
                    <option value="" disabled>-- {t('catches.selectFisheryPlaceholder')} --</option>
                    {lowiska.map((lowisko) => (
                        <option key={lowisko.id} value={lowisko.id}>
                            {lowisko.nazwa} - {lowisko.lokalizacja}
                        </option>
                    ))}
                </select>
                

                <input 
                    type="submit" 
                    className="btn-primary"
                    value={isEdit ? t('catches.editButton') : t('catches.addCatchButton')}
                />
                <Link to="/polowy" role="button" className="btn-primary">{t('nav.cancelButton')}</Link>
            </form>
        </article>
    );
};

export default PolowForm;