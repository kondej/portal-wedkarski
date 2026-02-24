import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { polowAPI } from '../../services/Api';
import { useTranslation } from 'react-i18next';

const PolowList = ({ all = false }) => {
    const [polowy, setPolowy] = useState([]);
    const { t } = useTranslation();
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });

    useEffect(() => {
        setPagination(prev => ({ ...prev, page: 1 }));
    }, [all]);

    useEffect(() => {
        fetchPolowy();
    }, [all, pagination.page]);

    const fetchPolowy = async () => {
        try {
            let response;

            if (all) {
                response = await polowAPI.getAll({
                    page: pagination.page,
                    limit: pagination.limit,
                });
            } else {
                response = await polowAPI.getAllUser({
                    page: pagination.page,
                    limit: pagination.limit,
                });
            }
            
            setPolowy(response.data.polowy);
            setPagination(prev => ({
                ...prev,
                ...response.data.pagination
            }));
        } catch (error) {
            console.error('Błąd podczas pobierania danych o połowach!');
        }
    };

    const handleDelete = async (id) => {
        try {
            await polowAPI.delete(id);
            fetchPolowy();
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, page: newPage }));
        }
    };

    return (
        <article>
            <h2>{t('catches.title')}</h2>
            <Link to="/polowy/nowy" role="button" className='btn-primary'>{t('catches.addCatchButton')}</Link>

            { polowy.length > 0 ? (
                <>
                <table>
                    <thead>
                        <tr>
                            <th>{t('catches.dateHeader')}</th>
                            <th>{t('catches.speciesHeader')}</th>
                            <th>{t('catches.weightHeader')}</th>
                            <th>{t('catches.fisheryHeader')}</th>
                            {all && <th>{t('catches.userHeader')}</th>}
                            <th>{t('catches.actionsHeader')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {polowy.map(polow => (
                            <tr key={polow.id}>
                                <td>{new Date(polow.data).toLocaleDateString()}</td>
                                <td>{polow.gatunek_nazwa}</td>
                                <td>{polow.waga}</td>
                                <td>
                                    <Link to={`/lowiska/${polow.Lowisko_id}`}>
                                        {polow.lowisko_nazwa}
                                    </Link>
                                </td>
                                {all && <td>{`${polow.imie} ${polow.nazwisko}`}</td>}
                                <td>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <Link className="btn-primary" to={`/polowy/edytuj/${polow.id}`}>
                                            {t('catches.editButton')}
                                        </Link>
                                        <button 
                                            className="btn-delete"
                                            onClick={() => handleDelete(polow.id)} 
                                        >
                                            {t('catches.deleteButton')}
                                        </button>
                                    </div>
                                </td>
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
                    <h3>{t('catches.noRecords')}</h3>
                </div>
            )}
        </article>
    );
};

export default PolowList;