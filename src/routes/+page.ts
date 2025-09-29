import type { IProduct } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('https://dummyjson.com/products');
	const data = await res.json();
	const products = data.products as IProduct[];

	return { products };
};
