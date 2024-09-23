import React, { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { productsApi } from '../../../service/base';

const Search = () => {
  const { searchTerm } = useParams();
  // const dispatch = useDispatch()
  // const term = useSelector((state) => state.search.term);
  const [results, setResults] = useState([]);
  // const [mockData , setMockData] = useState([])
  const products = useSelector((state)=>state.products.items)
// useEffect(()=>{
//   if(term){
//     productsApi.getAllProduct().then(res=>setMockData(res))
// }},[dispatch])
  useEffect(() => {
        const filteredResults = products.filter((item) =>
      item?.title.toLowerCase().includes(searchTerm.toLowerCase())
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
              <p className="result-snippet">{result.images[0]}</p>
              {/* <Link href={resul} className="result-link">
                Read more
              </Link> */}
            </div>
          ))
        )}
      </div>
    );
};

export default Search;
