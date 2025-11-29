<script lang="ts">
    import Icon from "@iconify/svelte";
    import { goto } from '$app/navigation'
    import { page } from '$app/state'
    import { watch } from '$lib/utils'
    import { fade } from 'svelte/transition'
    import SidebarButton from './sidebar-button.svelte'
    import { appState } from '$lib/app-state.svelte'
    import { resolve } from '$app/paths'

    let showText = $state(false)

    let timeout: ReturnType<typeof setTimeout> | undefined

    interface MenuProp {
        title: string
        route: string
        icon: string
    }

    const menus: (MenuProp | 'divider')[] = [
        { title: '과제 1', route: '/first', icon: 'tabler:square-number-1' },
        { title: '과제 2', route: '/second', icon: 'tabler:square-number-2' },
        { title: '과제 3', route: '/third', icon: 'tabler:square-number-3' },
        { title: '과제 4', route: '/fourth', icon: 'tabler:square-number-4' },
    ]

    watch(
        () => appState.openSidebar,
        (value) => {
            clearTimeout(timeout)

            if (value === false) {
                showText = value
                return
            }

            timeout = setTimeout(() => {
                showText = value
            }, 250)
        },
    )
</script>

<aside
    class="hide-scroll bg-base-100 overflow-y-auto py-6 shadow-lg transition-[min-width] {appState.openSidebar
        ? 'min-w-52 duration-300'
        : 'min-w-0 duration-500'}"
>
    <ul class="mx-3">
        {#each menus as i}
            {#if i === 'divider'}
                <li class="divider mx-4 my-0.5"></li>
            {:else}
                <li class="my-0.5 w-full">
                    <SidebarButton
                        class="w-full {page.url.pathname === i.route ? 'bg-base-content/5' : ''}"
                        aria-label="{i.title} 설정으로 이동"
                        onclick={() => goto(resolve(i.route))}
                    >
                        <Icon icon={i.icon} class="size-7 w-7 h-7" />

                        {#if showText}
                            <span in:fade={{ duration: 50 }}>{i.title}</span>
                        {/if}
                    </SidebarButton>
                </li>
            {/if}
        {/each}
    </ul>
</aside>