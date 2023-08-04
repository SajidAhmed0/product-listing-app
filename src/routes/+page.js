import {paginationFilterStore} from '$lib/stores/search.js'
export async function load({ fetch}){
    

    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    let data = await res.json();

    const cat = await fetch(`https://dummyjson.com/products/categories`);
    const categories = await cat.json();
    
  return {data, categories};

}
