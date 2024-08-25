import React, { useState , useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { productsApi } from '../../../service/base';

const Search = () => {
  const { searchTerm } = useParams();
  const term = useSelector((state) => state.search.term);
  const [results, setResults] = useState([]);
  const [mockData , setMockData] = useState([])
useEffect(()=>{
  if(term){
    productsApi.getAllProduct().then(res=>setMockData(res))
}},[])
  useEffect(() => {
        const filteredResults = mockData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (searchTerm) {
      
    setResults(filteredResults);
    }


  }, [searchTerm]);

    return (
      <div className="search-results-container">
        {results.length === 0 ? (
          <p className="no-results">No results found</p>
        ) : (
          results.map((result, index) => (
            <div key={index} className="search-result-item">
              <h2 className="result-title">{result.title}</h2>
              <p className="result-snippet">{result.image}</p>
              <Link href={result.link} className="result-link">
                Read more
              </Link>
            </div>
          ))
        )}
      </div>
    );
};

export default Search;
