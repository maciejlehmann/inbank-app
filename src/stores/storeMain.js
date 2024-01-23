import {ref} from "vue";
import {defineStore} from "pinia";

export const useMainStore = defineStore("mainStore", () => {
    const isModalOpen = ref(false);
    const openModal = () => (isModalOpen.value = true);

    const options = [
        {name: "Option 1", value: "Option 1"},
        {name: "Option 2", value: "Option 2"},
        {name: "Option 3", value: "Option 3"},
    ];

    return {isModalOpen, openModal, options};
});
