import React, { useEffect, useState } from 'react';
import ItemList from '../ItemList';

const SearchBox = () => {
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    let content;

    if (suggestions.length && searchValue) {
      content = <ItemList items={suggestions}/>
    } else if (suggestions.length === 0 && searchValue) { 
      content = <p id='empty'> No items found for {searchValue} </p>
    } else {
      content = null;
    }

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    }
    
    useEffect(() => {
     if (searchValue.length >= 3) {
        getData();
     }
    }, [searchValue]);
    

    const getData = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/items?title=${searchValue}`);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          setSuggestions(data.items);
        } catch (error) {
          console.error(error);
        }
      };
      

    return (
        <div> 
          <input id="search-box" type="text" class="form-control" placeholder="What is it that you truly desire?" aria-label="search-box" aria-describedby="basic-addon1" value={searchValue} onChange={handleSearchChange}/>
          {content}
        </div>
    );
};

export default SearchBox;