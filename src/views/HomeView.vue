<script setup lang="ts">
import {useLoanStore} from "@/stores/storeLoan";
import PersonalDetailsModal from "@/components/PersonalDetailsModal.vue";
import CalculatorComponent from "@/components/CalculatorComponent.vue";
import ImageAndText from "@/components/ImageAndText.vue";

const storeCalculator = useLoanStore();
</script>

<template>
  <div class="w-full flex flex-column">
    <ImageAndText/>
    <CalculatorComponent/>
  </div>

  <PersonalDetailsModal v-if="storeCalculator.isPersonalDetailsModalOpen"/>
</template>
