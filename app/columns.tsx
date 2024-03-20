'use client';

import { Tables } from '@/db-types';
import { Column, ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

function SortButton({
	column,
	columnName,
}: {
	column: Column<Grade>;
	columnName: string;
}) {
	// LEVEL 2: Step 3: Koristiti 'useSearchParams' i 'usePathname' za dohvačanje trenutne parametre i putanju
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	// LEVEL 2: Step 4: Dopuniti handleSort funckiju da postavi 'sort' parametar u URL
	const handleSort = () => {
		const isAsc = column.getIsSorted() === 'asc';
		const sortDirection = isAsc ? 'desc' : 'asc';
		const params = new URLSearchParams(searchParams);
		params.set('sort', sortDirection);
		replace(`${pathname}?${params.toString()}`);
		column.toggleSorting(isAsc);
	};

	return (
		<Button variant='ghost' onClick={handleSort}>
			{columnName}
			<ArrowUpDown className='ml-2 h-4 w-4' />
		</Button>
	);
}

const formatter = Intl.DateTimeFormat('en-US', {
	dateStyle: 'full',
});

export type Grade = Pick<Tables<'grade'>, 'id' | 'created_at' | 'grade'> & {
	student: Tables<'student'>;
} & {
	subject: Tables<'subject'>;
};

export const gradeColumns: ColumnDef<Grade>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
	},
	{
		accessorKey: 'student',
		accessorFn(row) {
			return row.student.name;
		},
		// LEVEL 2: Step 5: Zamijeniti 'header' sa SortButton komponentom
		//header: 'Student',
		header: ({ column }) => <SortButton column={column} columnName='Student' />,
	},
	{
		accessorKey: 'grade',
		header: 'Grade',
	},
	{
		accessorKey: 'subject',
		header: 'Subject',
		accessorFn(row) {
			return row.subject.name;
		},
	},
	{
		accessorKey: 'created_at',
		header: 'Date',
		accessorFn(row) {
			return formatter.format(new Date(row.created_at));
		},
	},
];
