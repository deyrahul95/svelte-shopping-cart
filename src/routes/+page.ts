import type { IProduct } from '$lib/types';
import type { PageLoad } from './$types';

type IRes = {
	products: IProduct[];
};

export const load: PageLoad = async ({ fetch }): Promise<IRes> => {
	const URL: string = 'https://dummyjson.com/products?limit=50';

	const res = await fetch(URL);
	const data = await res.json();
	const products = data.products as IProduct[];

	return { products };
};
