import React, { useState } from "react";
import './FilterButtons.css'

const FilterButtons = ({ handleFilterChange }) => {
    const [selectedFilter, setSelectedFilter] = useState("all"); // Изначально выбран "Все фильмы"
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedRating, setSelectedRating] = useState("");

    const handleFilterTypeChange = (filterType) => {
        setSelectedFilter(filterType);
        // Очистим выбранные значения при смене типа фильтрации
        setSelectedYear("");
        setSelectedRating("");
    };

    const handleYearChange = (year) => {
        setSelectedYear(year);
        handleFilterChange("date", year); // Передаем тип и значение фильтрации по дате обратно в родительский компонент
    };

    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
        handleFilterChange("rating", rating); // Передаем тип и значение фильтрации по рейтингу обратно в родительский компонент
    };

    return (
        <div className="select-wrapper">
            <div className="select-descr">
                <p className="select-title">Выберете тип фильтрации:</p>
                <div className="select-buttons">
                    <button onClick={() => handleFilterTypeChange("date")} className={selectedFilter === "date" ? "active" : ""}>По году</button>
                    <button onClick={() => handleFilterTypeChange("rating")} className={selectedFilter === "rating" ? "active" : ""}>По рейтингу</button>
                </div>
            </div>

            {/* Показываем ползунок только при выборе типа фильтрации */}
            {selectedFilter === "date" && (
                <select onChange={(e) => handleYearChange(e.target.value)} value={selectedYear}>
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
            )}

            {selectedFilter === "rating" && (
                <select onChange={(e) => handleRatingChange(e.target.value)} value={selectedRating}>
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
            )}
        </div>
    );
};

export default FilterButtons;