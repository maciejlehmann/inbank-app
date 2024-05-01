<script setup lang="ts">
import {useLoanStore} from "@/stores/storeLoan";
import Button from "primevue/button";

const storeCalculator = useLoanStore();
</script>

<template>
  <div class="p-3 w-full flex lg:hidden flex-column gap-6">
    <div class="w-full flex flex-column align-items-center gap-2">
      <div class="header-main">Dear {{ storeCalculator.modelPersonalDetails.firstName.data }}</div>
      <div class="header-secondary">Unfortunately, your loan was denied.</div>
    </div>
    <div class="w-full decision-text-wrapper">
      In addition to your income and expenses, a number of other factors play a role in loan decisions.
    </div>
    <Button class="w-full apply-now-btn purple" @click="storeCalculator.goBackToHomePage">Exit</Button>
  </div>

  <div class="m-auto w-6 hidden lg:flex flex-column align-items-center negative-decision-container">
    <div class="w-9 flex flex-column align-items-center gap-2">
      <div class="header-main">Dear {{ storeCalculator.modelPersonalDetails.firstName.data }}</div>
      <div class="header-secondary">Unfortunately, your loan was denied.</div>
    </div>
    <div class="w-9 decision-text-wrapper">
      In addition to your income and expenses, a number of other factors play a role in loan decisions.
    </div>
    <Button class="w-full apply-now-btn purple" @click="storeCalculator.goBackToHomePage">Exit</Button>
  </div>
</template>

<style scoped>
.negative-decision-container {
  padding: 80px 204px;
  border-radius: 20px;
  background: #FFF;
  gap: 40px;
}

.header-main {
  margin: 0;
  font-family: Bitter;
  font-style: italic;
  text-align: center;
  line-height: 56px;
  font-weight: 400;
  font-size: 48px;
  color: #21093A;
}

.header-secondary {
  font-family: Inter;
  text-align: center;
  line-height: 24px;
  font-weight: 400;
  font-size: 16px;
  color: #21093A;
}

.decision-text-wrapper {
  padding: 16px 0;
  border: 1px solid rgba(33, 9, 58, 0.15);
  border-right: 0;
  border-left: 0;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  color: #21093A;
}
</style>
