'use client';

import { IoSearch } from 'react-icons/io5';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	function handleSearch(term: string) {
		// LEVEL 4: Step 1: Dopuniti funkciju da se u URL-u promijeni parametar `query` na `term`
		// const params = new URLSearchParams(searchParams);
		// params.set('page', '1');
		// if (term) {
		// 	params.set('query', term);
		// } else {
		// 	params.delete('query');
		// }
		// replace(`${pathname}?${params.toString()}`);
	}

	return (
		<div className='relative flex flex-1 flex-shrink-0 dark:text-gray-500 dark:bg-gray-900'>
			<label htmlFor='search' className='sr-only'>
				Search
			</label>
			<input
				className='peer block w-full rounded-md dark:text-gray-300 dark:bg-gray-900 border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
				placeholder={placeholder}
				onChange={(e) => {
					handleSearch(e.target.value);
				}}
				defaultValue={searchParams.get('query')?.toString()}
			/>
			<IoSearch className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:peer-focus:text-gray-300' />
		</div>
	);
}
