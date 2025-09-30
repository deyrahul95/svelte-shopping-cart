<script lang="ts">
	import ShoppingCart from 'phosphor-svelte/lib/ShoppingCart';
	import CartModal from '../components/cart-modal.svelte';
	import { isCartModalOpen, getCartStats, toggleCartModal } from '$lib/cart-store.svelte';
	import ProductCard from '../components/product-card.svelte';

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
		<ProductCard {product} />
	{/each}
</div>
