'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import caret from '../../public/caret.svg';
import search from '../../public/search.svg';

const data = [
	{
		title: 'Regions',
		countriesList: [
			'Africa',
			'Americas',
			'Antarctica',
			'Europe',
			'Asia',
			'Oceania',
		],
	},
	{
		title: 'Countries',
		countriesList: ['Uzbekistan', 'Albania', 'Algeria', 'USA', 'Germany', 'UK'],
	},
];

function LocationAccordion() {
	const [openBody, setOpenBody] = useState(false);
	const [openLocations, setOpenLocations] = useState(false);
	const [selectedRegions, setSelectedRegions] = useState([]);
	const [filteredRegions, setFilteredRegions] = useState([]);

	function selectLocation(e) {
		const newLoc = e.target.dataset.country;

		if (selectedRegions.includes(newLoc)) {
			console.log(selectedRegions);
			selectedRegions.splice(selectedRegions.indexOf(newLoc), 1);
			const newArr = selectedRegions;
			setSelectedRegions([]);
			setSelectedRegions([...newArr]);
		} else {
			setSelectedRegions([...selectedRegions, newLoc]);
		}
	}

	function findMatches(e) {
		const word = e.target.value;
		const regions = [...data[0].countriesList, ...data[1].countriesList];

		const arr = regions.filter((place) => {
			const regex = new RegExp(word, 'gi');
			return place.match(regex);
		});
		if (word && arr.length) {
			setFilteredRegions(arr);
		} else if (word) {
			setFilteredRegions([word]);
		} else {
			setFilteredRegions([]);
		}
	}

	return (
		<div className='location-accordion'>
			<div className='accordion__label' onClick={() => setOpenBody(!openBody)}>
				<span>Location</span>
				<Image
					className={`${openBody && 'rotate-caret'}`}
					src={caret}
					alt='caret'
				/>
			</div>
			<div className={`accordion__body ${openBody && 'accordion__body_open'}`}>
				<div
					className='select-btn'
					onClick={() => setOpenLocations((prevState) => !prevState)}>
					<span>
						{selectedRegions.length
							? selectedRegions.map((region, index) =>
									index > 0 ? ', ' + region : region
							  )
							: 'Select talent location'}
					</span>
					<Image src={caret} alt='caret' />
				</div>
				<div className={`locations ${openLocations && 'locations_open'}`}>
					<div className='locations__search_wrapper'>
						<div className='locations__search'>
							<Image src={search} alt='caret' />
							<input type='text' placeholder='' onChange={findMatches} />
						</div>
					</div>
					<div>
						<ul>
							{data.map((el) => (
								<li className='locations__container' key={el.title}>
									<p>{el.title}</p>

									<ul>
										{filteredRegions.length
											? el.countriesList
													.filter((region) => filteredRegions.includes(region))
													.map((country) => (
														<li key={country}>
															<input type='checkbox' id={country} />
															<label
																htmlFor={country}
																onClick={selectLocation}
																data-country={country}>
																{country}
															</label>
														</li>
													))
											: el.countriesList.map((country) => (
													<li key={country}>
														<input type='checkbox' id={country} />
														<label
															htmlFor={country}
															onClick={selectLocation}
															data-country={country}>
															{country}
														</label>
													</li>
											  ))}
									</ul>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LocationAccordion;
