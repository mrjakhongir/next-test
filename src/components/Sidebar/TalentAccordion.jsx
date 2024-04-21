'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import caret from '../../../public/caret.svg';
import rate from '../../../public/rate.svg';
import data from '../../data';

const ratings = data.ratings;

function TalentAccordion() {
	const [openBody, setOpenBody] = useState(true);
	const [queries, setQueries] = useState([]);

	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const getUpdatedQueries = (data, key) => {
		const hasKey = data?.includes(key);
		const updated = hasKey
			? data.filter((item) => item !== key)
			: [...data, key];

		return updated;
	};

	const setTalentParams = (key, value) => {
		const params = new URLSearchParams(searchParams);
		const ratings = getUpdatedQueries(queries, key);
		setQueries(ratings);

		if (!ratings.includes(key)) {
			params.delete(key);
		} else {
			params.set(key, value);
		}

		replace(`${pathname}?${params.toString()}`);
	};

	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		if (params != {}) {
			let arr = [...params.keys()];

			setQueries(arr);
		}
	}, [searchParams]);

	return (
		<div className='talent-accordion'>
			<div className='accordion__label' onClick={() => setOpenBody(!openBody)}>
				<span>
					Talent badge <span className='label__question'>?</span>
				</span>
				<Image
					className={`${openBody && 'rotate-caret'}`}
					src={caret}
					alt='caret'
				/>
			</div>
			<div className={`accordion__body ${openBody && 'accordion__body_open'}`}>
				<ul className='accordion__body_inner'>
					{ratings.map((rating) => (
						<li key={rating.name} className='accordion__rate'>
							<label htmlFor={rating.name}>
								<input
									type='checkbox'
									id={rating.name}
									onChange={() => setTalentParams(rating.key, rating.value)}
									checked={queries.includes(rating.key)}
								/>
								<Image src={rate} alt='rating badge' />
								<span>{rating.name}</span>
							</label>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default TalentAccordion;
