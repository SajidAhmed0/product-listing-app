import { writable } from "svelte/store"

export const paginationFilterStore = writable({
    itemsPerPage: 10,
    currentPage: 1,
    filterTerm: '',
    minPrice: 0,
    maxPrice: 100000
});

