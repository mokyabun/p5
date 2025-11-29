<script lang="ts">
	import p5 from "p5";
    import { sketch } from "$lib/core/second";
	import { onDestroy, onMount } from "svelte";

    let p5Canvas: HTMLDivElement
    let p5Instance: p5

    onMount(() => {
        p5Instance = new p5(sketch, p5Canvas)
    })

    onDestroy(() => {
        p5Instance.remove()
    })
</script>

<div class="rounded-xl overflow-hidden" bind:this={p5Canvas}></div>
<p class="font-extralight text-2xl">과제 2</p>
<p class="font-extralight">초상화 그리기</p>