<template>
    <div role="button" class="pb-11 bg-white rounded-lg" @click="navToProduct">
        <img src="../assets/test-product.png" alt="" role="presentation">
        <div class="px-4 pt-8 space-y-4 text-gray-1">
            <p class="font-bold text-[20px]">Автомагнитола </p>
            <p class="text-opacity-80 text-lg font-semibold">Цена: 76 000тг</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Product',
    methods: {
        navToProduct() {
            this.$router.push({
                name: 'ProductPage',
                params: {
                    id: 123
                }
            })
        }
    }
}
</script>