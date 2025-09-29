<script lang="ts">
	import X from 'phosphor-svelte/lib/X';
	import CartItem from './cart-item.svelte';
	import { getCartStats, closeCartModal, getCartItems } from '$lib/cart-store.svelte';

	const cartItems = getCartItems();
</script>

<modal>
	<div class="absolute top-8 right-0 z-10 mt-2 w-80 rounded-lg bg-slate-200 shadow-xl">
		<div class="relative">
			<div class="px-4 pt-4">
				<h2 class="mb-2 text-xl font-semibold text-slate-800">My Cart</h2>
				{#if getCartStats().quantity > 0}
					<span
						class="absolute left-21 top-2.5 inline-block rounded-full bg-blue-500 px-2.5 py-0.5 text-xs font-bold text-white"
						>{getCartStats().quantity}</span
					>
				{/if}
				<button
					class="absolute top-4 right-4 cursor-pointer rounded-full p-1 hover:bg-slate-200"
					aria-label="close cart"
					onclick={() => closeCartModal()}
				>
					<X class="size-5 text-slate-700" />
				</button>
			</div>
			<div class="rounded-t-4xl rounded-b-lg bg-slate-100">
				<div class="px-4 pt-1 pb-4">
					{#if cartItems.length > 0}
						{#each cartItems as cartItem (cartItem.id)}
							<CartItem {cartItem} />
						{/each}
						<div class="mt-4 border-gray-200 pt-4">
							<p class="text-lg font-semibold">Total: ${getCartStats().total.toFixed(2)}</p>
						</div>
					{:else}
						<div class="my-20 text-center">
							<p class="text-gray-600">Cart is empty 🛒</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</modal>
