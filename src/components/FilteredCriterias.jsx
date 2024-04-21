'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import data from '../data';

const categories = data.categories;
const ratings = data.ratings;
const talentTypes = data.talentTypes;
// const regions = data.regions.map((el) => el.countriesList);

function FilteredCriterias() {
	const [filteredCriterias, setFilteredCriterias] = useState([]);
	const [showClearAllBtn, setShowClearAllBtn] = useState(false);

	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const pathname = usePathname();
	const { replace } = useRouter();

	const keys = [...params.keys()];
	const values = [...params.values()].join(',');
	const countries = params.get('loc')?.split(',');

	useEffect(() => {
		const map = [];

		categories.map(
			(category) =>
				values.includes(category.value) &&
				map.unshift(['Category: ', category.name, category.key])
		);

		ratings.map(
			(rating) =>
				keys.includes(rating.key) && map.unshift(['', rating.name, rating.key])
		);

		talentTypes.map(
			(el) =>
				values.includes(el.value) &&
				map.unshift(['Talent type: ', el.name, el.key])
		);

		map.push(['Location: ', countries, 'loc']);

		setFilteredCriterias(map);

		keys.length && setShowClearAllBtn(true);
	}, [searchParams]);

	function removeParam(key) {
		params.delete(key);
		replace(`${pathname}?${params.toString()}`);
	}

	function removeAllParams() {
		const keys = [...params.keys()];
		keys.map((key) => {
			params.delete(key);
		});

		replace(`${pathname}?${params.toString()}`);
		setShowClearAllBtn(false);
	}

	console.log(filteredCriterias);

	return (
		<div className='filtered-criterieas'>
			{filteredCriterias?.map((el) =>
				el[0] === 'Location: ' ? (
					el[1]?.map((loc) => (
						<div key={loc} onClick={() => removeParam(el[2])}>
							<span>
								{el[0]}
								{loc}
							</span>
							<span>X</span>
						</div>
					))
				) : (
					<div key={el[1]} onClick={() => removeParam(el[2])}>
						<span>
							{el[0]}
							{el[1]}
						</span>
						<span>X</span>
					</div>
				)
			)}
			{showClearAllBtn && (
				<button onClick={removeAllParams}>Clear Filters</button>
			)}
		</div>
	);
}

export default FilteredCriterias;
