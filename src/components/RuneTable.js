import React, { useState, useMemo } from 'react';

const RuneTable = ({ results }) => {
    const [page, setPage] = useState(0);
    const [selectedRune, setSelectedRune] = useState(null);
    const [openSections, setOpenSections] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: 'efficiency.max', direction: 'desc' });

    const runesPerPage = 25;
    const numPages = Math.ceil(results.length / runesPerPage);

    const resultsWithRank = useMemo(() => {
        return results.map((rune, index) => ({ ...rune, rank: index + 1 }));
    }, [results]);

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
        return [...resultsWithRank].sort((a, b) => {
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

            if (sortConfig.key === 'efficiency.max' || sortConfig.key === 'rank') {
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
    }, [resultsWithRank, sortConfig]);

    const renderSecondary = (secondary) => {
        return secondary.map((effect, index) => (
            <span key={index} style={{ color: effect.includes('⟳') ? '#ff7300' : 'inherit' }}>
                {`${index === 0 ? '' : ' '}${effect}${index === secondary.length - 1 ? '' : ','}`}
            </span>
        ));
    };

    const renderRuneDetails = (runes) => (
        <table>
            <thead>
            <tr>
                <th>Set</th>
                <th>Slot</th>
                <th>Ancient</th>
                <th>Stars</th>
                <th>Level</th>
                <th>Quality</th>
                <th>Primary</th>
                <th>Innate</th>
                <th>Secondary</th>
                <th>Potential</th>
            </tr>
            </thead>
            <tbody>
            {runes.map((rune, index) => (
                <tr key={index}>
                    <td>{rune.set}</td>
                    <td>{rune.slot}</td>
                    <td>{rune.ancient ? 'Yes' : 'No'}</td>
                    <td>{rune.stars}</td>
                    <td>{rune.level}</td>
                    <td>{rune.quality}</td>
                    <td>{rune.primary}</td>
                    <td>{rune.innate}</td>
                    <td>{renderSecondary(rune.secondary)}</td>
                    <td>{rune.efficiency.max}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );

    const currentRunes = sortedResults.slice(page * runesPerPage, (page + 1) * runesPerPage);

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th onClick={() => handleSort('rank')}>Rank</th>
                    <th onClick={() => handleSort('set')}>Set</th>
                    <th onClick={() => handleSort('slot')}>Slot</th>
                    <th>Ancient</th>
                    <th>Stars</th>
                    <th>Level</th>
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
            <div>
                <button onClick={() => setPage(0)} disabled={page === 0}>
                    First
                </button>
                <button onClick={() => setPage(page - 1)} disabled={page === 0}>
                    Previous
                </button>
                <button onClick={() => setPage(page + 1)} disabled={page === numPages - 1}>
                    Next
                </button>
                <button onClick={() => setPage(numPages - 1)} disabled={page === numPages - 1}>
                    Last
                </button>
            </div>
            {selectedRune && (
                <div>
                    <h2>Rune Details</h2>
                    {['base', 'percents', 'speed', 'flat', 'others'].map((section) => (
                        <div key={section} className="accordion-section">
                            <h3
                                className="accordion-header"
                                onClick={() => toggleSection(section)}
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)} {section === 'base' ? '' : 'Gems'}
                            </h3>
                            {openSections[section] && selectedRune[section] && (
                                <div className={`accordion-content ${openSections[section] ? 'open' : ''}`}>
                                    {renderRuneDetails(selectedRune[section])}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RuneTable;