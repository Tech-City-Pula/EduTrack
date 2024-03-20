'use client';

import * as React from 'react';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	SortingState,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import Pagination from './ui/pagination';
import Search from './ui/search';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	totalPages?: number;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	totalPages,
}: DataTableProps<TData, TValue>) {
	// LEVEL 2: Step 1: Kreirati 'sorting' hook
	const [sorting, setSorting] = React.useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		// LEVEL 2: Step 2: Dodati 'onSortingChange' i 'getSortedRowModel' funkcije
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	});

	return (
		<>
			{/* LEVEL 4: Step 2: Dodati Search komponentu */}
			<div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
				<Search placeholder='Search...' />
			</div>
			<div className='rounded-md border shadow-sm'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{/* LEVEL 3: Step 3: Prikaži Pagination komponentu */}
			<div>
				<Pagination totalPages={totalPages ?? 1} />
			</div>
		</>
	);
}
