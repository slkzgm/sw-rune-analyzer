import React, { useState, useMemo } from 'react';
import Filter from './Filter';
import RuneDetails from './RuneDetails';
import Pagination from './Pagination';
import './styles/RuneTable.css';

const RuneTable = ({ results }) => {
    const [page, setPage] = useState(0);
    const [selectedRune, setSelectedRune] = useState(null);
    const [openSections, setOpenSections] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: 'efficiency.max', direction: 'desc' });
    const [filters, setFilters] = useState({ set: '', slot: '', ancient: '' });

    const runesPerPage = 25;
    const numPages = Math.ceil(results.length / runesPerPage);

    const resultsWithRank = useMemo(() => {
        return results.map((rune, index) => ({ ...rune, rank: index + 1 }));
    }, [results]);

    const uniqueSets = useMemo(() => {
        const sets = resultsWithRank.map(rune => rune.best.set);
        return [...new Set(sets)].sort();
    }, [resultsWithRank]);

    const uniqueSlots = useMemo(() => {
        const slots = resultsWithRank.map(rune => rune.best.slot);
        return [...new Set(slots)].sort((a, b) => a - b);
    }, [resultsWithRank]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const resetFilters = () => {
        setFilters({ set: '', slot: '', ancient: '' });
    };

    const filteredResults = useMemo(() => {
        return resultsWithRank.filter(rune => {
            return (
                (filters.set === '' || rune.best.set === filters.set) &&
                (filters.slot === '' || rune.best.slot === parseInt(filters.slot)) &&
                (filters.ancient === '' || (filters.ancient === 'Yes' ? rune.best.ancient : !rune.best.ancient))
            );
        });
    }, [resultsWithRank, filters]);

    const toggleSection = (section) => {
        setOpenSections((prevOpenSections) => ({
            ...prevOpenSections,
            [section]: !prevOpenSections[section],
        }));
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedResults = useMemo(() => {
        return [...filteredResults].sort((a, b) => {
            let aValue = a.best;
            let bValue = b.best;

            if (sortConfig.key === 'rank') {
                aValue = a.rank;
                bValue = b.rank;
            } else if (sortConfig.key.includes('.')) {
                const keys = sortConfig.key.split('.');
                aValue = keys.reduce((obj, key) => obj[key], a.best);
                bValue = keys.reduce((obj, key) => obj[key], b.best);
            } else {
                aValue = a.best[sortConfig.key];
                bValue = b.best[sortConfig.key];
            }

            if (sortConfig.key === 'efficiency.max' || sortConfig.key === 'rank' || sortConfig.key === 'level') {
                aValue = parseFloat(aValue);
                bValue = parseFloat(bValue);
            } else {
                aValue = String(aValue);
                bValue = String(bValue);
            }

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [filteredResults, sortConfig]);

    const renderSecondary = (secondary) => {
        return secondary.map((effect, index) => (
            <span key={index} style={{ color: effect.includes('⟳') ? '#ff7300' : 'inherit' }}>
                {`${index === 0 ? '' : ' '}${effect}${index === secondary.length - 1 ? '' : ','}`}
            </span>
        ));
    };

    const currentRunes = sortedResults.slice(page * runesPerPage, (page + 1) * runesPerPage);

    return (
        <div className="rune-table-container">
            <Filter
                filters={filters}
                uniqueSets={uniqueSets}
                uniqueSlots={uniqueSlots}
                handleFilterChange={handleFilterChange}
                resetFilters={resetFilters}
            />
            <table className="rune-table">
                <thead>
                <tr>
                    <th onClick={() => handleSort('rank')}>Rank</th>
                    <th onClick={() => handleSort('set')}>Set</th>
                    <th onClick={() => handleSort('slot')}>Slot</th>
                    <th>Ancient</th>
                    <th>Stars</th>
                    <th onClick={() => handleSort('level')}>Level</th>
                    <th>Quality</th>
                    <th>Primary</th>
                    <th>Innate</th>
                    <th>Secondary</th>
                    <th onClick={() => handleSort('efficiency.max')}>Potential</th>
                </tr>
                </thead>
                <tbody>
                {currentRunes.map((runeConfig, index) => (
                    <tr key={index} onClick={() => setSelectedRune(runeConfig)}>
                        <td>{runeConfig.rank}</td>
                        <td>{runeConfig.best.set}</td>
                        <td>{runeConfig.best.slot}</td>
                        <td>{runeConfig.best.ancient ? 'Yes' : 'No'}</td>
                        <td>{runeConfig.best.stars}</td>
                        <td>{runeConfig.best.level}</td>
                        <td>{runeConfig.best.quality}</td>
                        <td>{runeConfig.best.primary}</td>
                        <td>{runeConfig.best.innate}</td>
                        <td>{renderSecondary(runeConfig.best.secondary)}</td>
                        <td>{runeConfig.best.efficiency.max}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                page={page}
                setPage={setPage}
                numPages={numPages}
            />
            {selectedRune && (
                <RuneDetails
                    selectedRune={selectedRune}
                    toggleSection={toggleSection}
                    openSections={openSections}
                />
            )}
        </div>
    );
};

export default RuneTable;