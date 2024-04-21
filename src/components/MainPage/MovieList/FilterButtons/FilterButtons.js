import React, { useState } from "react";
import './FilterButtons.css'

const FilterButtons = ({ handleFilterChange }) => {
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedRating, setSelectedRating] = useState("");

    const handleClick = (type) => {
        handleFilterChange(type); 
    };

    const handleYearChange = (year) => {
        setSelectedYear(year);
        handleFilterChange("date", year);
    };
    
    
    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
        handleFilterChange("rating", rating); 
    };
    

    return (
        <div className="select-buttons">

<select onChange={(e) => handleRatingChange(e.target.value)}>
                <option value="">Выберите рейтинг</option>
                <option value="10">10+</option>
                <option value="9">9+</option>
                <option value="8">8+</option>
                <option value="7">7+</option>
                <option value="6">6+</option>
                <option value="5">5+</option>
                <option value="4">4+</option>
                <option value="3">3+</option>
                <option value="2">2+</option>
                <option value="1">1+</option>
            </select>


            <select  onChange={(e) => handleYearChange(e.target.value)}>
                <option value="">Выберите год</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option> 
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
            </select>
           
        </div>
    );
};

export default FilterButtons;
