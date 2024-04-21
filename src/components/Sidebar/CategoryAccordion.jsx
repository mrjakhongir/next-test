'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import caret from '../../../public/caret.svg';
import data from '../../../public/data';

const categories = data.categories;

function CategoryAccordion() {
	const [openBody, setOpenBody] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState('');

	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams.toString());
	const pathname = usePathname();
	const { replace } = useRouter();

	function selectCategory(key, value, name) {
		params.set(key, value);
		replace(`${pathname}?${params.toString()}`);
		setSelectedCategory(name);
		setOpenBody(!openBody);
	}

	useEffect(() => {
		const selectedCat = params.get('category');
		if (selectedCat) {
			const cat = categories.filter(
				(category) => category.value === selectedCat
			);
			setSelectedCategory(cat[0].name);
		} else {
			setOpenBody(true);
		}
	}, [searchParams]);

	return (
		<div className='category-accordion'>
			<div className='accordion__label' onClick={() => setOpenBody(!openBody)}>
				<span>Category</span>
				<Image
					className={`${openBody && 'rotate-caret'}`}
					src={caret}
					alt='caret'
				/>
			</div>
			{!openBody && (
				<button
					className='selected-category'
					onClick={() => setOpenBody(!openBody)}>
					{selectedCategory}
				</button>
			)}
			<div className={`accordion__body ${openBody && 'accordion__body_open'}`}>
				<ul className='accordion__body_inner'>
					{categories.map((category) => (
						<li key={category.name}>
							<button
								onClick={() =>
									selectCategory(category.key, category.value, category.name)
								}>
								{category.name}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default CategoryAccordion;
