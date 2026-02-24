import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gatunekAPI } from '../../services/Api';
import { useAuth } from '../../services/Auth';
import { useTranslation } from 'react-i18next';

const GatunekList = () => {
    const { t } = useTranslation();
    const [gatunki, setGatunki] = useState([]);
    const { isAdmin } = useAuth();
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });

    useEffect(() => {
        fetchGatunki();
    }, [pagination.page]);

    const fetchGatunki = async () => {
        try {
            const response = await gatunekAPI.getAll({
                page: pagination.page,
                limit: pagination.limit
            });
            setGatunki(response.data.gatunki);
            setPagination(prev => ({
                ...prev,
                total: response.data.pagination.total,
                totalPages: response.data.pagination.totalPages
            }));
        } catch (error) {
            console.error('Błąd podczas pobierania danych o gatunkach!');
        }
    };

    const handleDelete = async (id) => {
        try {
            const result = await gatunekAPI.delete(id);
            fetchGatunki();
        } catch (error) {
            alert(error.response.data.error);
            console.error("Błąd usuwania:", error);
        }
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    return (
        <article>
            <h2>{t('species.title')}</h2>
            {isAdmin() && (
                <Link to="/gatunki/nowy" role="button" className="btn-primary">{t('species.addSpeciesButton')}</Link>
            )}

            { gatunki.length > 0 ? (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>{t('species.speciesNameHeader')}</th>
                            {isAdmin() && <th>{t('species.actionsHeader')}</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {gatunki.map(gatunek => (
                            <tr key={gatunek.id}>
                                <td>{gatunek.nazwa}</td>

                                {isAdmin() && (
                                    <td>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <Link className="btn-primary" to={`/gatunki/edytuj/${gatunek.id}`}>
                                                {t('species.editButton')}
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(gatunek.id)}
                                                className="btn-delete"
                                            >
                                                {t('species.deleteButton')}
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {pagination.totalPages > 1 && (
                    <div className="pagination">
                        <button 
                            disabled={pagination.page <= 1}
                            onClick={() => handlePageChange(pagination.page - 1)}
                        >
                            {t('nav.previousPageButton')}
                        </button>

                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(pageNum => (
                            <button
                                key={pageNum}
                                disabled={pageNum === pagination.page}
                                onClick={() => handlePageChange(pageNum)}
                                className={pageNum === pagination.page ? 'active' : ''}
                            >
                                {pageNum}
                            </button>
                        ))}

                        <button 
                            disabled={pagination.page >= pagination.totalPages}
                            onClick={() => handlePageChange(pagination.page + 1)}
                        >
                            {t('nav.nextPageButton')}
                        </button>
                    </div>
                )}
            </>
            ) : (
                <div>
                    <h3>{t('species.noRecords')}</h3>
                </div>
            )}
        </article>
    );
};

export default GatunekList;