import React, { useState } from 'react';
import './main.scss';

const Main = () => {
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const fetchCountriesData = async () => {
        try {
            const response = await fetch(
                `https://restcountries.com/v3.1/name/${inputValue}?fullText=true`
            );
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setData(data[0]);
                setError(null);
            } else {
                setError('Failed to fetch country data');
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <div className="container">
            <div className="search-bar">
                <input
                    onChange={handleChange}
                    type="search"
                    placeholder="Search Country"
                    value={inputValue}
                    required
                />
                <button onClick={fetchCountriesData}>Search</button>
            </div>
            <div className="display-card">
                {error ? (
                    <div className="error-message"><h1>Please Select another country</h1></div>
                ) : (
                    <div className="card-items">
                        <h3>flag:<img src={data?.flags?.png} width={50} height={50} alt={data?.flags?.alt} /> </h3>
                        <h3>Name: <span>{data?.name?.common}</span> </h3>
                        <h3>
                            Currency: <span>{data?.currencies?.[Object.keys(data?.currencies)[0]]?.name}</span>
                        </h3>
                        <h3>
                            Currency Symbol: <span>{data?.currencies?.[Object.keys(data?.currencies)[0]]?.symbol}</span>
                        </h3>
                        <h3>Population: <span>{data?.population}</span></h3>
                        <h3>Language: <span>{data?.languages?.[Object.keys(data?.languages)[0]]}</span></h3>
                        <h3>Capital: <span>{data?.capital}</span></h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;
