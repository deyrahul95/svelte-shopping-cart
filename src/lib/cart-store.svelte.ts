import type { ICartItem, ICartStats, IProduct } from './types';

type ICartStore = {
	items: ICartItem[];
	modalOpen: boolean;
};

const cartStore: ICartStore = $state<ICartStore>({ items: [], modalOpen: false });

const cartStats: ICartStats = $derived.by(() => {
	let total: number = 0;
	let quantity: number = 0;

	for (const item of cartStore.items) {
		quantity += item.quantity;
		total += item.product.price * item.quantity;
	}

	return {
		total,
		quantity
	};
});

const cartModalOpen = $derived(cartStore.modalOpen);

export const getCartStats = (): ICartStats => {
	return cartStats;
};

export const isCartModalOpen = (): boolean => {
	return cartModalOpen;
};

export const getCartItems = (): ICartItem[] => {
	return cartStore.items;
};

export const addItemToCart = (product: IProduct) => {
	cartStore.items.push({
		id: crypto.randomUUID(),
		product: product,
		quantity: 1
	});
};

export const removeItemFromCart = (itemId: string) => {
	const index = cartStore.items.findIndex((item) => item.id === itemId);

	if (index !== -1) {
		cartStore.items.splice(index, 1);
	}
};

export const increaseItemQuantity = (cartItem: ICartItem) => {
	cartItem.quantity++;
};

export const decreaseItemQuantity = (cartItem: ICartItem) => {
	if (cartItem.quantity > 1) {
		cartItem.quantity--;
	} else {
		removeItemFromCart(cartItem.id);
	}
};

export const closeCartModal = () => {
	cartStore.modalOpen = false;
};

export const toggleCartModal = () => {
	cartStore.modalOpen = !cartStore.modalOpen;
};
