<script lang="ts">
    import { resolve } from '$app/paths';
    import FirstImage from '$lib/assets/1.webp';
    import SecondImage from '$lib/assets/2.webp';
    import ThirdImage from '$lib/assets/3.webp';
    import FourthImage from '$lib/assets/4.webp';
</script>

<div class="flex flex-col gap-4 p-12 font-extralight">
    <div class="flex gap-2">
        <a href={resolve('/first')}>
            <img class="rounded-2xl" src={FirstImage} alt="" />
            <p class="text-center">첫번째 과제</p>
        </a>
        <a href={resolve('/second')}>
            <img class="rounded-2xl" src={SecondImage} alt="" />
            <p class="text-center">두번째 과제</p>
        </a>
    </div>
    <div class="flex gap-2">
        <a href={resolve('/third')}>
            <img class="rounded-2xl" src={ThirdImage} alt="" />
            <p class="text-center">세번째 과제</p>
        </a>
        <a href={resolve('/fourth')}>
            <img class="rounded-2xl" src={FourthImage} alt="" />
            <p class="text-center">네번째 과제</p>
        </a>
    </div>
</div>