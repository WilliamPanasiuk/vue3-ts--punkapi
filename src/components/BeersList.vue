<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import SearchForm from "/src/components/SearchForm.vue";
import Pagination from "/src/components/Pagination.vue";
import LoaderAnimation from "/src/components/LoaderAnimation.vue";

let fetchParams = ref({
  beerInput: "",
  ibuGtInput: null,
  ibuLtInput: null,
});
let isLoading = ref(false);
let beersList = ref([]);
const route = useRoute();
const router = useRouter();
let page = ref(1);
const perPage = 4;

const fetchBeers = async () => {
  isLoading.value = true;
  await axios
    .get(
      import.meta.env.VITE_API_PATH +
      "beers?page=" +
      page.value +
      "&per_page=" +
      perPage +
      (fetchParams.value.beerInput
        ? "&beer_name=" + fetchParams.value.beerInput
        : "") +
      (fetchParams.value.ibuGtInput
        ? "&ibu_gt=" + fetchParams.value.ibuGtInput
        : "") +
      (fetchParams.value.ibuLtInput
        ? "&ibu_lt=" + fetchParams.value.ibuLtInput
        : "")
    )
    .then((response) => {
      beersList.value = response.data;
      isLoading.value = false;
    });
};

const searchBeer = (searchParams<any>) => {
  fetchParams.value = searchParams;
  page.value = 1;
  changePage();
  fetchBeers();
};

const calculatePage = (n: any) => {
  if (
    (n == -1 && page.value > 1) ||
    (n == 1 && beersList.value.length == perPage)
  ) {
    page.value += n;
  }
  changePage();
};

const changePage = () => {
  router.push({ query: { page: page.value } });
  fetchBeers();
};

const isFirstPaginationPage = computed(() => page.value == 1);
const isLastPaginnationPage = computed(() => beersList.value.length == perPage);

onMounted(() => {
  route.query.page ? (page.value = Number(route.query.page)) : (page.value = 1);
  fetchBeers();
});
</script>

<template>
  <transition name="fade">
    <LoaderAnimation v-if="isLoading" />
  </transition>

  <SearchForm @search-beer="searchBeer" />

  <div class="px-6 pt-2 pb-8 mb-4 relative beers-list">
    <h3 class="text-lg text-c-second font-bold px-4 mb-3">Beers list</h3>
    <TransitionGroup
      name="list"
      tag="ul"
    >
      <li
        v-for="beer in beersList"
        :key="beer['id']"
        class="w-full border-b border-gray-700"
      >
        <router-link
          :to="{ path: '/beer/' + beer['id'] }"
          class="flex justify-between py-2 px-4 w-full text-gray-300 hover:text-c-second font-bold"
        >
          <span>{{ beer["name"] }}</span>
          <span
            v-if="beer['ibu']"
            class="text-gray-700"
          >
            <span class="text-xs">IBU:</span>
            {{ beer["ibu"] }}
          </span>
        </router-link>
      </li>
    </TransitionGroup>
    <div
      v-if="!beersList.length"
      class="item error w-full px-4 text-white font-bold"
    >
      <p>No results found!</p>
    </div>
  </div>
  <Pagination
    :page="page"
    :is-prev="isFirstPaginationPage"
    :is-next="isLastPaginnationPage"
    @calculate-page="calculatePage"
  />
</template>
