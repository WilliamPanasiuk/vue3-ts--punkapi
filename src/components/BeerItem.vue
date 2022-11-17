<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import LoaderAnimation from "/src/components/LoaderAnimation.vue";

const route = useRoute();
let beer = ref();
let beerId = ref();
let isLoaded = ref(false);
let isLoading = ref(false);

const fetchBeer = async () => {
  isLoading.value = true;
  await axios
    .get(import.meta.env.VITE_API_PATH + "beers/" + beerId.value)
    .then((response) => {
      beer.value = response.data[0];
      isLoaded.value = true;
      isLoading.value = false;
    });
};
onMounted(() => {
  beerId.value = route.params.id;
  fetchBeer();
});
</script>

<template>
  <transition name="fade">
    <LoaderAnimation v-if="isLoading" />
  </transition>
  <div v-if="isLoaded" class="flex flex-wrap">
    <div class="w-3/4 order-2 md:order-1">
      <h1 class="text-4xl font-bold text-c-second">{{ beer.name }}</h1>
      <p class="bg-c-second text-white font-bold inline-block">
        {{ beer.tagline }}
      </p>
      <p
        class="ml-2 text-gray-400 font-bold mt-3 mb-3 font-size text-lg border-gray-600"
      >
        {{ beer.description }}
      </p>
      <p class="text-gray-400">
        <span class="text-gray-600 font-bold">First brewed:</span>
        {{ beer.first_brewed }}
      </p>
      <p class="text-gray-400">
        <span class="text-gray-600 font-bold">Contributed by:</span>
        {{ beer.contributed_by }}
      </p>
      <div class="px-2 mt-2 rounded text-gray-800 border border-gray-700">
        <ul class="text-gray-400">
          <li>
            <span class="text-gray-600 font-bold">abv:</span>
            <span class="font-bold">{{ beer.abv }}</span>
          </li>
          <li>
            <span class="text-gray-600 font-bold">ibu:</span>
            <span class="font-bold">{{ beer.ibu }}</span>
          </li>
          <li>
            <span class="text-gray-600 font-bold">target fg:</span>
            <span class="font-bold">{{ beer.target_fg }}</span>
          </li>
          <li>
            <span class="text-gray-600 font-bold">target og:</span>
            <span class="font-bold">{{ beer.target_og }}</span>
          </li>
          <li>
            <span class="text-gray-600 font-bold">ebc:</span>
            <span class="font-bold">{{ beer.ebc }}</span>
          </li>
          <li>
            <span class="text-gray-600 font-bold">srm:</span>
            <span class="font-bold">{{ beer.srm }}</span>
          </li>
          <li>
            <span class="text-gray-600 font-bold">attenuation level:</span>
            <span class="font-bold">{{ beer.attenuation_level }}</span>
          </li>
          <li>
            <span class="text-gray-600 font-bold">volume:</span>
            <span class="font-bold"
              >{{ beer.volume.value }} {{ beer.volume.unit }}</span
            >
          </li>
          <li>
            <span class="text-gray-600 font-bold">boil volume:</span>
            <span class="font-bold"
              >{{ beer.boil_volume.value }} {{ beer.boil_volume.unit }}</span
            >
          </li>
        </ul>
      </div>
      <div class="px-2 mt-2 rounded text-gray-800 border border-gray-700">
        <p class="text-c-second font-bold">Method:</p>
        <p class="text-c-second">Mash temp:</p>
        <ul class="text-gray-400">
          <li v-for="(mash_temp, index) in beer.method.mash_temp" :key="index">
            <span class="text-gray-600 font-bold">temp:</span>
            {{ mash_temp.temp.value }} {{ mash_temp.temp.unit }}
            <span v-if="mash_temp.duration"
              ><span class="text-gray-600 font-bold">duration:</span>
              {{ mash_temp.duration }}</span
            >
          </li>
        </ul>
        <p class="text-c-second">Fermentation:</p>
        <ul class="text-gray-400">
          <li
            v-for="(fermentation, index) in beer.method.fermentation"
            :key="index"
          >
            <span class="text-gray-600 font-bold">temp:</span>
            {{ fermentation.value }} {{ fermentation.unit }}
          </li>
        </ul>
        <template v-if="beer.method.twist">
          <p class="text-c-second">Twist:</p>
          <span class="text-gray-400">{{ beer.method.twist }}</span>
        </template>
      </div>
      <div class="px-2 mt-2 rounded text-gray-800 border border-gray-700">
        <p class="text-c-second font-bold">Ingredients:</p>
        <ul class="text-gray-400">
          <p class="text-c-second">Malt:</p>
          <ul class="text-gray-400">
            <li v-for="(malt, index) in beer.ingredients.malt" :key="index">
              {{ malt.name }} - {{ malt.amount.value }} {{ malt.amount.unit }}
            </li>
          </ul>
          <p class="text-c-second">Hops:</p>
          <ul class="text-gray-400">
            <li v-for="(hops, index) in beer.ingredients.hops" :key="index">
              {{ hops.name }} - {{ hops.amount.value }} {{ hops.amount.unit
              }}<br />
            </li>
          </ul>
          <p class="text-c-second">Yeast:</p>
          {{
            beer.ingredients.yeast
          }}
        </ul>
      </div>
      <div class="px-2 mt-2 rounded text-gray-800 border border-gray-700">
        <p class="text-c-second font-bold">Food pairing:</p>
        <ul class="text-gray-400">
          <li v-for="(food, index) in beer.food_pairing" :key="index">
            {{ food }}
          </li>
        </ul>
      </div>
      <p class="text-gray-400 mt-3">
        <span class="text-c-second font-bold">Brewers Tips:</span>
        {{ beer.brewers_tips }}
      </p>
    </div>
    <div class="w-1/4 order-1 md:order-2 md:pl-6">
      <img :src="beer.image_url" class="max-h-80 md:max-h-full" />
    </div>
  </div>
</template>
