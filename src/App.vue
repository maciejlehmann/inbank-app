<script setup>
import Dialog from "primevue/dialog";
import HeaderMain from "@/components/HeaderMain.vue";
import LoanInfoContainer from "@/components/LoanInfoContainer.vue";
import ContactInfoContainer from "@/components/ContactInfoContainer.vue";
import PersonalInformationContainer from "@/components/PersonalInformationContainer.vue";
import PepContainer from "@/components/PepContainer.vue";
import BeneficientContainer from "@/components/BeneficientContainer.vue";
import {useMainStore} from "@/stores/storeMain.js";

const storeMain = useMainStore();
</script>

<template>
  <div class="p-5 w-full flex flex-column align-items-center">
    <HeaderMain/>
    <div class="w-full flex justify-content-center">
      <div class="flex flex-column gap-4" style="width: 764px">
        <LoanInfoContainer/>
        <ContactInfoContainer/>
        <PersonalInformationContainer/>
        <PepContainer/>
        <BeneficientContainer/>
        <div class="w-full flex justify-content-center">
          <div class="continue-button">Continue</div>
        </div>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="storeMain.isModalOpen" class="w-6" modal>
    <h2>PEP</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </Dialog>
</template>

<style scoped>
.continue-button {
  margin: 20px 0;
  padding: 0;
  width: 372px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-6);
  background: var(--color-3);
}
</style>
