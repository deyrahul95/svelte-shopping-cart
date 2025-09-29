<script lang="ts">
	import type { ICartItem, Product } from '$lib/types';
	import CartItem from './cart-item.svelte';
	import ShoppingCart from 'phosphor-svelte/lib/ShoppingCart';
	import X from 'phosphor-svelte/lib/X';

	type ICartStats = {
		quantity: number;
		total: number;
	};

	const { data } = $props();
	let cartOpen: boolean = $state<boolean>(false);
	const cartItems: ICartItem[] = $state<ICartItem[]>([]);

	const cartStats: ICartStats = $derived.by(() => {
		let total: number = 0;
		let quantity: number = 0;

		for (const item of cartItems) {
			quantity += item.quantity;
			total += item.product.price * item.quantity;
		}

		return {
			total,
			quantity
		};
	});

	const addItemToCart = (product: Product) => {
		cartItems.push({
			id: crypto.randomUUID(),
			product: product,
			quantity: 1
		});
	};

	const removeItemFromCart = (itemId: string) => {
		const index = cartItems.findIndex((item) => item.id === itemId);

		if (index !== -1) {
			cartItems.splice(index, 1);
		}
	};

	const increaseItemQuantity = (cartItem: ICartItem) => {
		cartItem.quantity++;
	};

	const decreaseItemQuantity = (cartItem: ICartItem) => {
		if (cartItem.quantity > 1) {
			cartItem.quantity--;
		} else {
			removeItemFromCart(cartItem.id);
		}
	};
</script>

<div class="flex items-center bg-gray-300 p-4">
	<span class="text-lg font-bold">SvelteMart</span>
	<div class="relative ml-auto flex items-center">
		<button
			class="flex items-center rounded-full bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
			onclick={() => (cartOpen = !cartOpen)}
		>
			<ShoppingCart class="mr-2 size-5" />
			<span>Cart ({cartStats.quantity})</span>
		</button>
		{#if cartOpen}
			<div class="absolute top-8 right-0 z-10 mt-2 w-80 rounded-lg bg-white shadow-xl">
				<div class="relative p-4">
					<h2 class="mb-4 text-lg font-semibold">Your Cart</h2>
					<button
						class="absolute top-4 right-4 rounded-full p-1 hover:bg-gray-100"
						aria-label="close cart"
						onclick={() => (cartOpen = false)}
					>
						<X class="size-4" />
					</button>
					{#each cartItems as cartItem (cartItem.id)}
						<CartItem
							{cartItem}
							{removeItemFromCart}
							{increaseItemQuantity}
							{decreaseItemQuantity}
						/>
					{/each}
					<div class="mt-4 border-gray-200 pt-4">
						<p class="text-lg font-semibold">Total: ${cartStats.total.toFixed(2)}</p>
					</div>
				</div>
			</div>
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
