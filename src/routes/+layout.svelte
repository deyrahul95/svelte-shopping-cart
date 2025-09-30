<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { getCartItems, isCartModalOpen, updateCartState } from '$lib/cart-store.svelte';

	let { children } = $props();

	const KEY = 'svelte5-cart';

	onMount(() => {
		const raw = localStorage.getItem(KEY);
		if (raw !== null) {
			updateCartState(raw);
		}
	});

	$effect(() => {
		try {
			localStorage.setItem(
				KEY,
				JSON.stringify({ items: getCartItems(), modalOpen: isCartModalOpen() })
			);
		} catch (err) {
			console.error(err);
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
