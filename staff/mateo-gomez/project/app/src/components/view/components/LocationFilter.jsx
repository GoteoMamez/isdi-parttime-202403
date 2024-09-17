import React, { useState } from "react"
import Button from "../../../../components/core/Button"



function LocationFilter({ posts, onFilteredChange }) {
    const [selectedLocation, setSelectedLocation] = useState('')
    const [isComponentOpen, setIsComponentOpen] = useState(false)

    const locations = [...new Set(posts.map(post => post.city))]

    const handleLocationClick = (city) => {
        setSelectedLocation(city)
        onFilteredChange(city)
        setIsComponentOpen(false)
    }
    const toggleOpen = () => {
        setIsComponentOpen(!isComponentOpen)
    }


    return (
        <div className="CityFilter">
            <div className="LocationFilterHeader" onClick={toggleOpen}>
                <span>{selectedLocation || 'Select a city'}</span>
                <span className="DropdownIcon">{isComponentOpen ? '▲' : '▼'}</span>
            </div>
            {isComponentOpen && (
                <ul className="LocationsList">
                    <li
                        className={!selectedLocation ? 'selected' : ''}
                        onClick={() => handleLocationClick('')}
                    >
                        <Button className='LocationButton All'>All Cities</Button>

                    </li>
                    {locations.map((city, index) => (
                        <li
                            key={index}
                            className={selectedLocation === city ? 'selected' : ''}
                            onClick={() => handleLocationClick(city)}
                        >
                            <Button className='LocationButton'>{city}</Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default LocationFilter