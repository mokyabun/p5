<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/sidebar.svelte';
	import Topbar from '$lib/components/topbar.svelte';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Topbar />
<div class="fixed top-0 flex h-screen w-full bg-base-200 pt-16">
	<div class="flex divide-base-content/20 flex-1">
		<Sidebar />
		<div class="mt-16 flex flex-col items-center flex-1">
			<div class="flex flex-col gap-1 items-center">
				{@render children()}
			</div>
		</div>
	</div>
</div>
