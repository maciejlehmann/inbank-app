<script setup lang="ts">
import Button from "primevue/button";
import picture from "../assets/image.png";

const scrollToCalculator = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}
</script>

<template>
  <div class="p-3 w-full flex lg:hidden flex-column gap-3 mobile-text-picture__container">
    <div class="picture-wrapper">
      <img :src="picture" alt="picture">
    </div>
    <div class="w-full flex flex-column align-items-center gap-4 text-container">
      <div class="w-full flex flex-column justify-content-center align-items-center gap-3">
        <div class="text-inter weight-500">Mini loan</div>
        <div class="text-bitter size-32">Take charge of unexpected costs</div>
        <div class="text-inter">Finance unforeseen expenses with Inbank. A quick and easy application process with an
          instant credit decision
        </div>
      </div>
      <Button class="apply-now-btn white" @click="scrollToCalculator">Apply now</Button>
    </div>
  </div>
  <div class="w-full hidden lg:flex justify-content-center gap-4 text-picture__container">
    <div class="w-4 flex flex-column justify-content-center align-items-center gap-6 text-container">
      <div class="w-full flex flex-column justify-content-center align-items-center gap-3">
        <div class="text-inter weight-500">Mini loan</div>
        <div class="text-bitter size-68">Take charge of unexpected costs</div>
        <div class="text-inter">Finance unforeseen expenses with Inbank. A quick and easy application process with an
          instant credit
          decision
        </div>
        <Button class="apply-now-btn white" @click="scrollToCalculator">Apply now</Button>
      </div>
    </div>
    <div class="picture-wrapper">
      <img :src="picture" alt="pic">
    </div>
  </div>
</template>

<style scoped>

.mobile-text-picture__container {
  .picture-wrapper {
    width: 100%;

    img {
      width: 100%;
      height: auto;
      border-radius: 100px;
    }
  }

  .text-container {
    padding: 64px 24px 64px 24px;
    border-radius: 100px;
    background: #D9D4A7;
  }
}

.text-picture__container {
  padding: 16px 40px 80px 40px;

  .picture-wrapper {
    width: 60%;

    img {
      width: 100%;
      height: auto;
      border-radius: 200px;
    }
  }

  .text-container {
    padding: 80px 40px;
    border-radius: 200px;
    background: #D9D4A7;
  }
}
</style>
