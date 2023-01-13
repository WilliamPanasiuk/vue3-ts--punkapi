<script setup lang="ts">
import { ref, reactive, watch } from "vue";
const emit = defineEmits(["searchBeer"]);

let searchParams = reactive({
  beerInput: "",
  ibuGtInput: null,
  ibuLtInput: null,
});
let isValid = ref(true);

// watch
// https://vuejs.org/guide/essentials/watchers.html#basic-example
// Do note that you can't watch a property of a reactive object like this:
// Instead, use a getter:
watch(
  () => searchParams.ibuGtInput,
  (ibuGtInput) => {
    const reg = new RegExp("^[0-9]+$");
    if (reg.test(`${ibuGtInput}`) || ibuGtInput == "" || ibuGtInput == null) {
      isValid.value = true;
    } else {
      isValid.value = false;
    }
  }
);
watch(
  () => searchParams.ibuLtInput,
  (ibuLtInput) => {
    const reg = new RegExp("^[0-9]+$");
    if (reg.test(`${ibuLtInput}`) || ibuLtInput == "" || ibuLtInput == null) {
      isValid.value = true;
    } else {
      isValid.value = false;
    }
  }
);

const validateNumber = () => {
  if (isValid.value) {
    handleSearch();
  }
};

const clearForm = () => {
  searchParams.beerInput = "";
  searchParams.ibuGtInput = null;
  searchParams.ibuLtInput = null;
  handleSearch();
};

const handleSearch = () => {
  emit("searchBeer", searchParams);
};
</script>

<template>
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-3/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="search-beer-name"
        >
          Beer name
        </label>
        <input
          id="search-beer-name"
          v-model="searchParams.beerInput"
          type="text"
          placeholder="search beer name"
          class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          @keyup="handleSearch"
        />
      </div>
      <div class="w-full md:w-1/2 px-3 mt-6 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="IBU-gt"
        >
          IBU From
        </label>
        <input
          id="IBU-gt"
          v-model="searchParams.ibuGtInput"
          type="text"
          placeholder="IBU greater than"
          class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          @keyup="validateNumber"
        />
      </div>
      <div class="w-full md:w-1/2 px-3 mt-6 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="IBU-lt"
        >
          IBU to
        </label>
        <input
          id="IBU-gt"
          v-model="searchParams.ibuLtInput"
          type="text"
          placeholder="IBU less than"
          class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          @keyup="validateNumber"
        />
      </div>
      <div class="w-full px-3 mt-2 mb-4 md:mb-0">
        <p
          v-if="!isValid"
          class="p-1 text-red-500"
        >Number is invalid</p>
      </div>
      <div class="w-full md:w-1/2 px-3 mt-2 mb-6 md:mb-0">
        <button
          class="flex-shrink-0 border-transparent border-4 text-sky-50 hover:bg-sky-600 text-sm py-1 px-2 rounded btn bg-sky-700"
          type="button"
          @click="clearForm"
        >
          Clear
        </button>
      </div>
    </div>
  </form>
</template>
