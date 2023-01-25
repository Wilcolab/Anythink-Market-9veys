import React, { useState } from 'react';

const SearchBox = () => {
    const [searchValue, setSearchValue] = useState('');
    
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    }

    return (
        <div>
            <input type="text" class="form-control" placeholder="What is it that you truly desire?" aria-label="search-box" aria-describedby="basic-addon1" value={searchValue} onChange={handleSearchChange}/>
            {/* notes */}
            {/* when user inputs text, search database for partial matches*/}
            {/* when partial matches are found, show items with partial matches for every character change */}
            {/* useEffect for a database search whenever searchValue is changed? */}
        </div>
    );
};

export default SearchBox;