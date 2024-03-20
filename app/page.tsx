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

	const dataTableResponse = await supabase
		.rpc('get_grades', {
			query,
			page: currentPage,
			sort,
		})
		.select('*, student!inner(*), subject!inner(*)')
		.returns<Grade[]>();

	if (dataTableResponse.error) {
		throw new Error(dataTableResponse.error.message);
	}

	const totalPagesResponse = await supabase
		.rpc('calculate_total_pages', {
			query,
			page_size: 10,
		})
		.returns<number>();

	if (totalPagesResponse.error) {
		throw new Error(totalPagesResponse.error.message);
	}

	return (
		<div className='grid min-h-screen w-full overflow-hidden'>
			<div className='flex flex-col'>
				<header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-900/40'>
					<h1 className='font-semibold text-lg'>EduTrack</h1>
				</header>
				<main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
					<DataTable
						columns={gradeColumns}
						data={dataTableResponse.data}
						totalPages={totalPagesResponse.data}
					/>
				</main>
			</div>
		</div>
	);
}
