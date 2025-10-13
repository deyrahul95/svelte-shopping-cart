<script lang="ts">
	import type { IProduct } from '$lib/types';
	import {
		addItemToCart,
		decreaseProductQuantity,
		getCartItem,
		getCartItemQuantity,
		increaseProductQuantity
	} from '$lib/cart-store.svelte';
	import { Minus, Plus } from 'phosphor-svelte';

	type IProps = {
		product: IProduct;
	};

	const { product }: IProps = $props();
</script>

<section>
	<div class="relative overflow-hidden rounded-xl bg-white shadow-lg">
		<img src={product.thumbnail} alt={product.title} class="h-48 w-full object-cover" />
		<span class="absolute top-2.5 right-2.5 rounded-full bg-slate-100 px-2 py-1 text-center"
			>{product.rating.toFixed(1)}⭐</span
		>
		<div class="p-4">
			<p class="mb-2 truncate overflow-hidden text-lg font-medium text-gray-800">
				{product.title}
			</p>
			<div class="flex items-center justify-between">
				<p class="text-xl font-bold">${product.price}</p>
				{#if getCartItem(product.id)}
					<div
						class="flex items-center rounded-full bg-sky-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-sky-700"
					>
						<button
							class="rounded p-1 hover:bg-sky-500"
							aria-label="Subtract 1 from quantity"
							onclick={() => decreaseProductQuantity(product.id)}
						>
							<Minus class="size-4" />
						</button>
						<span class="mx-2">{getCartItemQuantity(product.id)}</span>
						<button
							class="rounded p-1 hover:bg-sky-500"
							aria-label="Add 1 to quantity"
							onclick={() => increaseProductQuantity(product.id)}
						>
							<Plus class="size-4" />
						</button>
					</div>
				{:else}
					<button
						class="rounded-full bg-sky-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-sky-700"
						onclick={() => addItemToCart(product)}
					>
						Add to cart
					</button>
				{/if}
			</div>
		</div>
	</div>
</section>
