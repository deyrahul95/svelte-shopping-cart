<script lang="ts">
	import type { IProduct } from '$lib/types';
	import { addItemToCart } from '$lib/cart-store.svelte';

	type IProps = {
		product: IProduct;
	};

	const { product }: IProps = $props();
</script>

<section>
	<div class="overflow-hidden rounded-xl bg-white shadow-lg relative">
		<img src={product.thumbnail} alt={product.title} class="h-48 w-full object-cover" />
        <span class="text-center bg-slate-100 px-2 py-1 rounded-full absolute top-2.5 right-2.5">{product.rating.toFixed(1)}⭐</span>
		<div class="p-4">
			<p class="mb-2 truncate overflow-hidden text-lg font-medium text-gray-800">
				{product.title}
			</p>
			<div class="flex items-center justify-between">
				<p class="text-xl font-bold">${product.price}</p>
				<button
					class="rounded-full bg-sky-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-sky-700"
					onclick={() => addItemToCart(product)}
				>
					Add to cart
				</button>
			</div>
		</div>
	</div>
</section>
