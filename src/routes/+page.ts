import type { Product } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('https://dummyjson.com/products?limit=10');
	const data = await res.json();
	const products = data.products as Product[];

	return { products };
};
