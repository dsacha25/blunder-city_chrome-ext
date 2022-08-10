import React from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = (queryName: string) => {
	const { search } = useLocation();

	return React.useMemo(
		() => new URLSearchParams(search).get(queryName),
		// eslint-disable-next-line
		[search]
	);
};

export default useQuery;
