import React, { useState, useEffect } from 'react';

const Rates = () => {
    const [rates, setRates] = useState({});
    const [updateDate, setUpdateDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://api.frankfurter.dev/latest')
            .then(res => {
                if (!res.ok) throw new Error('Erreur lors de la récupération des taux');
                return res.json();
            })
            .then(data => {
                setRates(data.rates);
                setUpdateDate(data.date);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Tri alphabétique des devises
    const sortedCurrencies = Object.keys(rates).sort();

    return (
        <section className="currency-rates-area pt-70">
            <div className="container">
                <div className="section-title">
                    <h2>Taux de Change</h2>
                    <div className="bar"></div>
                    <p>Derniers taux de change basés sur <strong>EUR</strong> (source : Banque Centrale Européenne)</p>
                </div>

                {loading && <p>Chargement des taux...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {!loading && !error && (
                    <div className="table-responsive currency-rates-table">
                        <table className="table">
                            <thead>
                                <tr>
                                    {sortedCurrencies.map(currency => (
                                        <th key={currency} scope="col">{currency}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {sortedCurrencies.map(currency => (
                                        <td key={currency}>{rates[currency].toFixed(4)}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

               <div className="row currency-rates-info">
                        <div className="col-lg-6 col-md-6 col-6">
                            <a href="https://exchangeratesapi.io/" target="_blank">Source</a>
                        </div>

                        <div className="col-lg-6 col-md-6 col-6 text-right">
                            <p>Date: {updateDate}</p>
                        </div>
                    </div>
            </div>
        </section>
    );
}

export default Rates;