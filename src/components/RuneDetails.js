import React from 'react';
import './styles/RuneDetails.css';

const renderSecondary = (secondary) => {
    return secondary.map((effect, index) => (
        <span key={index} style={{ color: effect.includes('⟳') ? '#ff7300' : 'inherit' }}>
            {`${index === 0 ? '' : ' '}${effect}${index === secondary.length - 1 ? '' : ','}`}
        </span>
    ));
};

const renderRuneDetails = (runes) => (
    <table className="rune-details-table">
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

const RuneDetails = ({ selectedRune, toggleSection, openSections }) => (
    <div>
        <h2>Rune Details</h2>
        <div className="rune-info">
            <div><strong>ID:</strong> {selectedRune.base[0].id}</div>
            <div className="location"><strong>Location:</strong> {selectedRune.base[0].location}</div>
        </div>
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
);

export default RuneDetails;