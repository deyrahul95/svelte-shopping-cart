<script lang="ts">
	import ShoppingCart from 'phosphor-svelte/lib/ShoppingCart';
	import CartModal from '../components/cart-modal.svelte';
	import {
		addItemToCart,
		isCartModalOpen,
		getCartStats,
		toggleCartModal
	} from '$lib/cart-store.svelte';

	const { data } = $props();
</script>

<div class="flex items-center bg-gray-300 p-4">
	<span class="text-lg font-bold">SvelteMart</span>
	<div class="relative ml-auto flex items-center">
		<button
			class="flex items-center rounded-full bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
			onclick={toggleCartModal}
		>
			{#if getCartStats().quantity > 0}
				<span
					class="absolute right-0.5 bottom-6 ml-1 inline-block rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-bold text-white"
					>{getCartStats().quantity}</span
				>
			{/if}
			<ShoppingCart class="mr-2 size-5" />
			<span>Cart</span>
		</button>
		{#if isCartModalOpen()}
			<CartModal />
		{/if}
	</div>
</div>

<div class="grid grid-cols-1 gap-6 bg-gray-100 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
	{#each data.products as product (product.id)}
		<div class="overflow-hidden rounded-xl bg-white shadow-lg">
			<img src={product.thumbnail} alt={product.title} class="h-48 w-full object-cover" />
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
	{/each}
</div>
