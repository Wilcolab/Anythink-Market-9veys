import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchBox = () => {
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    }
    
    useEffect(() => {
     if (searchValue.length >= 3) {
        getData();
     }
    }, [searchValue]);
    

    const getData = async () => {
        await axios.get(`http://localhost:3000/api/items?title=${searchValue}`)
        .then(res => {
            const titles = res.data;
            setSuggestions(titles);
        })
    }
    return (
        <div>
            <input type="text" class="form-control" placeholder="What is it that you truly desire?" aria-label="search-box" aria-describedby="basic-addon1" value={searchValue} result={suggestions} onChange={handleSearchChange}/>
        </div>
    );
};

export default SearchBox;