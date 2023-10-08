import React, { useEffect, useState } from "react";

const SearchBar = ({handleSearch}) => {
    const [search, setSearch] = useState("");

    const handleOnChange = (event) => {
        handleSearch(event.target.value);
        setSearch(event.target.value);
    }
    return (
        <div className="search w-full flex items-center justify-end">
            <div className="w-1/4 items-center justify-center">
                <input type="text" value={search} placeholder="Search here..."
                onChange={handleOnChange} className="w-full px-4 mb-2 outline-none rounded border border-black h-10" />
            </div>
        </div>
    )
}

export default SearchBar;