<script lang="ts">
	import X from 'phosphor-svelte/lib/X';
	import CartItem from './cart-item.svelte';
	import { getCartStats, closeCartModal, getCartItems } from '$lib/cart-store.svelte';

	const cartItems = getCartItems();
</script>

<modal>
	<div class="absolute top-8 right-0 z-10 mt-2 w-80 rounded-lg bg-slate-100 shadow-xl">
		<div class="relative p-4">
			<h2 class="mb-4 text-lg font-semibold">My Cart ({getCartStats().quantity})</h2>
			<button
				class="absolute top-4 right-4 cursor-pointer rounded-full p-1 hover:bg-slate-200"
				aria-label="close cart"
				onclick={() => closeCartModal()}
			>
				<X class="size-4" />
			</button>
			{#each cartItems as cartItem (cartItem.id)}
				<CartItem {cartItem} />
			{/each}
			<div class="mt-4 border-gray-200 pt-4">
				<p class="text-lg font-semibold">Total: ${getCartStats().total.toFixed(2)}</p>
			</div>
		</div>
	</div>
</modal>
