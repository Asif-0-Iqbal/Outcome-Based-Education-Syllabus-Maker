import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

// CustomDropdown component
const CustomDropdown = ({ options, initialSelectedOption, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(initialSelectedOption); // Set initial selected option
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option) => {
        onSelect(option); // Update selected option
        setSearchTerm(option); // Update searchTerm to show selected option
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                onFocus={() => setIsOpen(true)}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FontAwesomeIcon
                icon={faAngleDown}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" // Position the down arrow icon
            />
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto bg-white rounded-md shadow-lg border-black">
                    {filteredOptions.map((option) => (
                        <div
                            key={option}
                            value={option}
                            className="cursor-pointer py-1 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
