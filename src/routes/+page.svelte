
<script>
    import ProductCard from './product-card.svelte';
    import "../app.css";
    import {paginationFilterStore} from '$lib/stores/search.js';
   
    export let data ;
    let categories = data.categories;
    let total = data.data.total; 
    data = data.data.products;

    let visibleItems = [];

    $: totalPages = total / $paginationFilterStore.itemsPerPage;
    var startIndex;

    // Subscribe to the store and update visibleItems whenever the store changes
    paginationFilterStore.subscribe(store => {
        startIndex = (store.currentPage - 1) * store.itemsPerPage;

        visibleItems = data
        .filter(item => {
            let currPrice = (item.price - (item.price * (item.discountPercentage/100)));
            if(store.minPrice < currPrice && store.maxPrice > currPrice){
                if(store.filterTerm == '') return true;
                else if(item.category.toLowerCase() == store.filterTerm.toLowerCase()) return true;
            }
        })
        .slice(startIndex, startIndex + store.itemsPerPage);
    });

</script>

<div class="head">
    <h1 class="text-7xl font-bold ">Products</h1>
</div>

<div class="flex flex-row">
    <div class="bg-gray-300 basis-1/4 w-25 text-center">
        <div class="m-5">
            <label for="categort" class=" mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">Category: </label>
            <select id="category" name="category" class="bg-gray-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500  p-2.5 dark:bg-gray-100 dark:border-gray-400"  bind:value={$paginationFilterStore.filterTerm}  on:change={()=> $paginationFilterStore.currentPage = 1}>
                <option value="">All</option>
                {#each categories as category}
                    <option value="{category}">{category}</option>
                {/each}
            </select>
        </div>
        <div class="m-5">
            <label for="min" class=" mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">Min Price: </label>
            <input id="min" class="bg-gray-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500  p-2.5 dark:bg-gray-100 dark:border-gray-400" type="number" bind:value={$paginationFilterStore.minPrice} on:input={() => $paginationFilterStore.currentPage = 1}/>
        </div>
        <div class="m-5">
            <label for="max" class=" mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">Max Price: </label>
            <input id="max" class="bg-gray-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500  p-2.5 dark:bg-gray-100 dark:border-gray-400" type="number" bind:value={$paginationFilterStore.maxPrice} on:input={() => $paginationFilterStore.currentPage = 1}/>
        </div>
    </div>
    
    <div class="products basis-3/4 bg-gray-100 ">
        <div class="flex w-75 flex-wrap items-center justify-center gap-5" style="padding-top: 10px; padding-bottom:10px;">
            {#each visibleItems as product}
                <ProductCard {product}/>
            {/each}
        </div>
        <div style="text-align: center;margin-bottom:10px;">
            <nav aria-label="Page navigation example">
                <ul class="inline-flex -space-x-px text-base h-10">
                    {#each Array(totalPages) as _, idx}
                        <li>
                            <a href="#" on:click={() => $paginationFilterStore.currentPage = idx +1} class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 {$paginationFilterStore.currentPage - 1 === idx ? 'text-red-500 bg-gray-500' : ''}">{idx + 1}</a>
                        </li>
                    {/each}
                </ul>
            </nav>
        </div>
    </div>
</div>

<style>
    .head{
        width: 100%;
        height: 100px;
        margin: 10px;
        padding: 10px;
        text-align: center;
        justify-content: center;
    }
    .products{
        width: 75%;
    }
</style>