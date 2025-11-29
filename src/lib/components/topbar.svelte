<script>
    import Icon from '@iconify/svelte'
    import SidebarButton from './sidebar-button.svelte'
    import { appState } from '$lib/app-state.svelte'
	import Logo from './logo.svelte';
    import { resolve } from '$app/paths'

    const toggleSidebar = () => {
        appState.openSidebar = !appState.openSidebar
    }
</script>

<div class="fixed left-0 top-0 z-[99] flex h-16 w-full bg-base-100 px-3 py-2 shadow-md">
    <SidebarButton onclick={toggleSidebar} aria-label="사이드바 토글">
        <Icon icon="tabler:menu-2" class="size-7" />
    </SidebarButton>
    <a class="flex items-center gap-[0.4em] text-xl md:text-2xl ml-4" href={resolve('/')}>
        <Logo />
        <h1 class="font-extralight">Visual Portfolio</h1>
    </a>
</div>