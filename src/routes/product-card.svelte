<script>
    export let product;

    $: currPrice = (product.price - (product.price * (product.discountPercentage/100))).toFixed(2);
</script>

<div class="card">
    <img class="w-full h-full object-cover" style="height: 193px; width:288;" src="{product.thumbnail}" alt="{product.title}">
    <div class="p-5 flex flex-col gap-3">
        <!-- badge -->
        <div class="flex items-center gap-2">
            <span class="badge">{product.brand}</span>
            <span class="badge">{product.category}</span>
        </div>
        <!-- product title -->
         <h2 class="product-title" title="Best Headphone">{product.title}</h2>

        <!-- product price -->
        <div>
            <span class="text-xl font-bold">{currPrice}$</span>
            <div class="flex items-center gap-2 mt-1">
                <span class="text-sm line-through opacity-50">{product.price}$</span>
                <span class="discount-percent">save {product.discountPercentage}%</span>
            </div>
        </div>

        <!-- product rating -->
        <span class="flex items-center mt-1">
            {#each Array(Math.floor(product.rating)) as _}
                <img src="/images/star.svg">
            {/each}
            {#if product.rating > Math.floor(product.rating)}
                <img src="/images/star-half-fill.svg">
            {/if}
            {#each Array(5 - Math.ceil(product.rating)) as _}
            <img src="/images/star-no-fill.svg">
            {/each}
            <span class="text-xs ml-2 text-gray-500">{product.stock} available</span>
        </span>

        <!-- product action button -->
        <div class="mt-5 flex gap-2">
            <button class="button-primary bg-gray-500/80 hover:bg-gray-500/90">
                Add to Cart
            </button>
            <button class="button-icon">
                <img class="opacity-50" src="../images/love.svg" alt="add to wishlist">
            </button>
            <button class="button-icon">
                <img class="opacity-50" src="../images/eye.svg" alt="add to wishlist">
            </button>
        </div>

    </div>
</div>