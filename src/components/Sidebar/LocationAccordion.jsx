'use client';
import { useEffect, useState } from 'react';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import Image from 'next/image';
import caret from '../../../public/caret.svg';
import search from '../../../public/search.svg';
import data from '../../../public/data';

const regions = data.regions;

function LocationAccordion() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const pathname = usePathname();

	const [openBody, setOpenBody] = useState(true);
	const [openLocations, setOpenLocations] = useState(false);
	const [selectedRegions, setSelectedRegions] = useState([]);
	const [filteredRegions, setFilteredRegions] = useState([]);

	function selectLocation(data, region) {
		const hasRegion = data.includes(region);

		const updatedRegions = hasRegion
			? data.filter((item) => item !== region)
			: [...data, region];

		return updatedRegions;
	}

	function setLocationParams(e) {
		const newLoc = e.target.value;
		const regions = selectLocation(selectedRegions, newLoc);
		setSelectedRegions(regions);

		const values = regions.map((el) => el).join(',');
		if (values) {
			params.set('loc', `${values}`);
		} else {
			params.delete('loc');
		}
		router.replace(`${pathname}?${params.toString()}`);
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

	useEffect(() => {
		if (params.get('loc')) {
			const selectedReg = params.get('loc').split(',');
			setSelectedRegions(selectedReg);
		} else {
			setSelectedRegions([]);
			setOpenLocations(false);
		}
	}, [searchParams]);

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
					<div>
						{selectedRegions.length
							? selectedRegions.map((region, index) =>
									index > 0 ? (
										<span key={index}>
											{', '}
											{region}
										</span>
									) : (
										<span key={index}>{region}</span>
									)
							  )
							: 'Select talent location'}
					</div>
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
							{regions.map((el) => (
								<li className='locations__container' key={el.title}>
									<p>{el?.title}</p>

									<ul>
										{filteredRegions.length
											? el?.countriesList
													.filter((region) => filteredRegions.includes(region))
													.map((country) => (
														<li key={country}>
															<label htmlFor={country}>
																<input
																	type='checkbox'
																	id={country}
																	value={country}
																	checked={selectedRegions.includes(country)}
																	onChange={setLocationParams}
																/>
																{country}
															</label>
														</li>
													))
											: el?.countriesList.map((country) => (
													<li key={country}>
														<label htmlFor={country}>
															<input
																type='checkbox'
																id={country}
																value={country}
																checked={selectedRegions.includes(country)}
																onChange={setLocationParams}
															/>
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
