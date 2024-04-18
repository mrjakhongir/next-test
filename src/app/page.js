import CategoryAccordion from '@/components/CategoryAccordion';
import LocationAccordion from '@/components/LocationAccordion';
import TalentAccordion from '@/components/TalentAccordion';
import TalentTypeAccordion from '@/components/TalentTypeAccordion';

export default function Home() {
	return (
		<main>
			<TalentAccordion />
			<LocationAccordion />
			<TalentTypeAccordion />
			<CategoryAccordion />
		</main>
	);
}
