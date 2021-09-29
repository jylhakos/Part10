// useRepositories

import { useState, useEffect } from 'react';

// http://192.168.31.179:5000/api/repositories

const useRepositories = () => {

	// 10.11
	const [repositories, setRepositories] = useState();

	const [loading, setLoading] = useState(false);

	const uri = 'http://192.168.31.179:5000/api/repositories';

	const fetchRepositories = async () => {

		setLoading(true);

	    const response = await fetch(uri);
	    
	    const json = await response.json();

	    console.log(json);

	    setLoading(false);

	    console.log(data);

	    setRepositories(data);
	};

useEffect(() => {
	fetchRepositories();
}, []);

return { repositories, loading, refetch: fetchRepositories };

};

export default useRepositories;