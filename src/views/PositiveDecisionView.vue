<script setup lang="ts">

import Button from "primevue/button";
import {useLoanStore} from "@/stores/storeLoan";
import Image from '../assets/loan.png';


const storeCalculator = useLoanStore();
</script>

<template>
  <div class="w-full flex lg:hidden flex-column gap-4 mobile-decision-wrapper">
    <div class="m-auto flex justify-content-center align-items-center mobile-image-wrapper">
      <img :src="Image" alt="image" class="h-full">
    </div>
    <div class="w-full flex flex-column align-items-center gap-2">
      <div class="header-main">Good news!</div>
      <div class="header-secondary">Your loan has been approved.</div>
    </div>
    <table class="w-full">
      <tr>
        <td class="table-label">Loan amount</td>
        <td>{{ storeCalculator.loanObject.amount }} €</td>
      </tr>
      <tr>
        <td class="table-label">Loan period</td>
        <td>{{ storeCalculator.loanObject.period }} months</td>
      </tr>
      <tr>
        <td class="table-label">Monthly payment</td>
        <td>{{ storeCalculator.calculatedResult }} €</td>
      </tr>
    </table>
    <Button class="w-full apply-now-btn purple" @click="storeCalculator.goBackToHomePage">Back to home page</Button>
  </div>

  <div class="m-auto w-9 hidden lg:flex decision-container">
    <div class="w-6 flex justify-content-end align-items-center image-wrapper">
      <img :src="Image" alt="image" class="image-content">
    </div>
    <div class="w-6 flex flex-column justify-content-center align-items-center table-wrapper">
      <div class="w-8 flex flex-column align-items-center gap-2">
        <div class="header-main">Good news!</div>
        <div class="header-secondary">Your loan has been approved.</div>
      </div>
      <table class="w-8">
        <tr>
          <td class="table-label">Loan amount</td>
          <td>{{ storeCalculator.loanObject.amount }} €</td>
        </tr>
        <tr>
          <td class="table-label">Loan period</td>
          <td>{{ storeCalculator.loanObject.period }} months</td>
        </tr>
        <tr>
          <td class="table-label">Monthly payment</td>
          <td>{{ storeCalculator.calculatedResult }} €</td>
        </tr>
      </table>
      <Button class="w-8 apply-now-btn purple" @click="storeCalculator.goBackToHomePage">Back to home page</Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mobile-decision-wrapper {
  padding: 16px;
  background: #FFF;

  .header-main {
    font-family: Bitter;
    font-size: 32px;
    font-style: italic;
    font-weight: 400;
    line-height: 36px;
    text-align: center;
  }

  .header-secondary {
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
  }
}

.decision-container {
  box-shadow: 0 0 40px 0 #0000000A;
  border-radius: 20px;
  background: #FFF;
}

.mobile-image-wrapper {
  padding: 40px;
  width: 240px;
  height: 240px;
  background: #F0F0EA;
  border-radius: 100px;
}

.image-wrapper {
  height: 680px;
  border-radius: 20px 0 0 20px;
  background: #F0F0EA;
  border: 4px solid #FFFFFF;

  .image-content {
    height: 75%;
    position: relative;
    left: 48px;
  }
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

.table-wrapper {
  gap: 40px;
}

table {
  border-collapse: collapse;

  td {
    width: 50%;
    padding: 12px 0;
    border-top: 1px solid rgba(33, 9, 58, 0.15);
    border-bottom: 1px solid rgba(33, 9, 58, 0.15);

    &:first-child {
      font-family: Inter;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      text-align: left;
      color: #21093A;
    }

    &:last-child {
      font-family: Inter;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      text-align: left;
      color: #21093A;
    }
  }
}
</style>
