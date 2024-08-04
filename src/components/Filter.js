import React from 'react';

const Filter = ({ filters, uniqueSets, uniqueSlots, handleFilterChange, resetFilters }) => (
    <div className="filter-container">
        <label>
            Set:
            <select
                name="set"
                value={filters.set}
                onChange={handleFilterChange}
            >
                <option value="">All</option>
                {uniqueSets.map((set, index) => (
                    <option key={index} value={set}>{set}</option>
                ))}
            </select>
        </label>
        <label>
            Slot:
            <select
                name="slot"
                value={filters.slot}
                onChange={handleFilterChange}
            >
                <option value="">All</option>
                {uniqueSlots.map((slot, index) => (
                    <option key={index} value={slot}>{slot}</option>
                ))}
            </select>
        </label>
        <label>
            Ancient:
            <select
                name="ancient"
                value={filters.ancient}
                onChange={handleFilterChange}
            >
                <option value="">All</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
        </label>
        <button onClick={resetFilters} className="reset-button">Reset Filters</button>
    </div>
);

export default Filter;