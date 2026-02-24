import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { lowiskoAPI } from '../../services/Api';
import { useTranslation } from 'react-i18next';

const LowiskoForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        nazwa: '',
        lokalizacja: '',
        typ: '',
        opis: ''
    });

    const [lowiskaTypy, setLowiskaTypy] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const lowiskaTypyRes = await Promise.all([
                    lowiskoAPI.getTypes()
                ]);

                setLowiskaTypy(lowiskaTypyRes[0].data.typy);

                if(isEdit) {
                    const response = await lowiskoAPI.get(id);
                    const lowisko = response.data.lowisko;

                    setFormData({
                        nazwa: lowisko.nazwa,
                        lokalizacja: lowisko.lokalizacja,
                        typ: lowisko.Typy_Lowisk_id,
                        opis: lowisko.opis || ''
                    });
                }
                
            } catch (error) {
                console.error('Błąd podczas ładowania danych:', error);
                if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                    navigate('/lowiska');
                }
            }
        }

        loadData();
    }, [id, isEdit, navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (isEdit) {
                await lowiskoAPI.update(id, formData);
            } else {
                await lowiskoAPI.create(formData);
            }
            navigate('/lowiska');
        }
        catch (error) {
            alert(error.response.data.error);
            console.error('Błąd podczas zapisywania danych:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <article>
            <form onSubmit={handleSubmit}> 
                <label htmlFor="nazwa">{t('fisheries.fisheryNameHeader')}:</label>
                <input
                    type="text"
                    id="nazwa"
                    name="nazwa"
                    value={formData.nazwa}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="lokalizacja">{t('fisheries.locationHeader')}:</label>
                <input
                    type="text"
                    id="lokalizacja"
                    name="lokalizacja"
                    value={formData.lokalizacja}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="typ">{t('fisheries.fisheryTypeHeader')}:</label>
                <select
                    id="typ"
                    name="typ"
                    value={formData.typ}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>-- {t('fisheries.selectTypePlaceholder')} --</option>
                    {lowiskaTypy.map((typ) => (
                        <option key={typ.id} value={typ.id}>
                            {typ.nazwa}
                        </option>
                    ))}
                </select>

                <label htmlFor="opis">{t('fisheries.descriptionHeader')}:</label>
                <textarea
                    id="opis"
                    name="opis"
                    value={formData.opis}
                    onChange={handleChange}
                />

                <input 
                    type="submit" 
                    className="btn-primary"
                    value={isEdit ? t('fisheries.editButton') : t('fisheries.addFisheryButton')}
                />
                <Link to="/lowiska" role="button" className="btn-primary">{t('nav.cancelButton')}</Link>
            </form>
        </article>
    );
};

export default LowiskoForm;