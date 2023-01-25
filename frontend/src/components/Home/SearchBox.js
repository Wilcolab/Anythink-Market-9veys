import React from 'react';

const SearchBox = () => {
    return (
        <div>
            <input type="text" class="form-control" placeholder="What is it that you truly desire?" aria-label="search-box" aria-describedby="basic-addon1"/>
            {/* when user inputs text, search database for partial matches*/}
            {/* when partial matches are found, show items with partial matches for every character change */}
        </div>
    );
};

export default SearchBox;