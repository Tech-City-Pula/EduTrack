import { DataTable } from '@/components/data-table';
import { createClient } from '@/lib/supabase/server';
import { Grade, gradeColumns } from './columns';
import Search from '@/components/ui/search';
import Pagination from '@/components/ui/pagination';

export default async function Page({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: string;
		sort?: string;
	};
}) {
	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;
	const sort = searchParams?.sort || 'desc';
	const supabase = createClient();

	const res = await supabase
		.rpc('complex_search', {
			query: query,
			page: currentPage,
			sort: sort,
		})
		.select('*, student!inner(*), subject!inner(*)')
		.returns<Grade[]>();

	if (res.error) {
		throw new Error(res.error.message);
	}

	const resTotalPages = await supabase
		.rpc('calculate_total_pages', {
			query: query,
			page_size: 10,
		})
		.returns<number>();

	if (resTotalPages.error) {
		throw new Error(resTotalPages.error.message);
	}

	const totalPages = resTotalPages.data;

	return (
		<div className='grid min-h-screen w-full overflow-hidden'>
			<div className='flex flex-col'>
				<header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-900/40'>
					<div className='w-full'>
						<h1 className='font-semibold text-lg'>EduTrack</h1>
					</div>
				</header>
				<main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
					<div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
						<Search placeholder='Search...' />
					</div>
					<div className='shadow-sm'>
						<DataTable columns={gradeColumns} data={res.data} />
					</div>
					<div>
						<Pagination totalPages={totalPages} />
					</div>
				</main>
			</div>
		</div>
	);
}
