'use client';

import CategoryAccordion from './CategoryAccordion';
import LocationAccordion from './LocationAccordion';
import TalentAccordion from './TalentAccordion';
import TalentTypeAccordion from './TalentTypeAccordion';

function Sidebar() {
	return (
		<aside className='sidebar'>
			<TalentAccordion />
			<LocationAccordion />
			<TalentTypeAccordion />
			<CategoryAccordion />
		</aside>
	);
}

export default Sidebar;
