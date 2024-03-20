import { DataTable } from '@/components/data-table';
import { createClient } from '@/lib/supabase/server';
import { Grade, gradeColumns } from './columns';

export default async function Page({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: string;
		sort?: string;
	};
}) {
	const { query = '', page = '1', sort = '' } = searchParams ?? {};
	const currentPage = parseInt(page);

	const supabase = createClient();

	// LEVEL 1: Step 1: Fetchati podatke iz baze

	// LEVEL 3: Step 2: Fetchati ukupan broj stranica

	return (
		<div className='grid min-h-screen w-full overflow-hidden'>
			<div className='flex flex-col'>
				<header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-900/40'>
					<h1 className='font-semibold text-lg'>EduTrack</h1>
				</header>
				<main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
					{/* LEVEL 1: Step 2: Prikaži DataTable komponentu */}
				</main>
			</div>
		</div>
	);
}
