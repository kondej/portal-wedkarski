import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { lowiskoAPI } from '../../services/Api';
import { useAuth } from '../../services/Auth';
import { useTranslation } from 'react-i18next';

const LowiskoList = () => {
    const { t } = useTranslation();
    const [lowiska, setLowiska] = useState([]);
    const { isAdmin } = useAuth();
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });

    useEffect(() => {
        fetchLowiska();
    }, [pagination.page]);

    const fetchLowiska = async () => {
        try {
            const response = await lowiskoAPI.getAll({
                page: pagination.page,
                limit: pagination.limit
            });
            setLowiska(response.data.lowiska);
            setPagination(prev => ({
                ...prev,
                total: response.data.pagination.total,
                totalPages: response.data.pagination.totalPages
            }));
        } catch (error) {
            console.error('Błąd podczas pobierania danych o łowiskach!');
        }
    };

    const handleDelete = async (id) => {
        try {
            await lowiskoAPI.delete(id);
            fetchLowiska();
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
            <h2>{t('fisheries.title')}</h2>
            {isAdmin() && (
                <Link to="/lowiska/nowe" role="button" className='btn-primary'>{t('fisheries.addFisheryButton')}</Link>
            )}

            { lowiska.length > 0 ? (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>{t('fisheries.fisheryNameHeader')}</th>
                            <th>{t('fisheries.fisheryTypeHeader')}</th>
                            {isAdmin() && <th>{t('fisheries.actionsHeader')}</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {lowiska.map(lowisko => (
                            <tr key={lowisko.id}>
                                <td>
                                    <Link to={`/lowiska/${lowisko.id}`}>
                                        {lowisko.nazwa}
                                    </Link>
                                </td>
                                <td>{lowisko.typ_lowiska}</td>

                                {isAdmin() && (
                                    <td>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <Link className="btn-primary" to={`/lowiska/edytuj/${lowisko.id}`}>
                                                {t('fisheries.editButton')}
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(lowisko.id)}
                                                className="btn-delete"
                                            >
                                                {t('fisheries.deleteButton')}
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
                    <h3>{t('fisheries.noRecords')}</h3>
                </div>
            )}
        </article>
    );
};

export default LowiskoList;