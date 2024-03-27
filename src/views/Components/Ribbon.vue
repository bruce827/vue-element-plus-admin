<template>
    <div>
        <section class="ribbon-container">
            <article v-for="(i) in 7" :key="i" class="box">
                <RibbonTag :tag="'ribbon'+i">
                    <div class="">
                        这里是标题内容
                    </div>
                </RibbonTag>
            </article>
        </section>

    </div>
</template>

<script setup lang="ts">
import {RibbonTag} from "@/components/RibbonTag"
</script>

<style scoped>
.box {
     margin: 2rem;
    position: relative;
    background: #e1e1e1;
    place-self: initial;
}
.ribbon-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
    gap: 5px;
    grid-auto-rows: minmax(300px, auto);
    margin: 1rem 3rem;
    counter-reset: num;
}

</style>