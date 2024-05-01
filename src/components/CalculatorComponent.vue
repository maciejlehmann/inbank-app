<script setup lang="ts">
import InputNumber from "primevue/inputnumber"
import FloatLabel from "primevue/floatlabel"
import Dropdown from "primevue/dropdown"
import Divider from "primevue/divider"
import Slider from 'primevue/slider'
import Button from "primevue/button"
import {computed} from "vue"
import {useLoanStore} from "@/stores/storeLoan"

const storeCalculator = useLoanStore()

const months = computed(() => {
  const months = []
  for (let i = 2; i <= 72; i++) {
    months.push({label: `${i} months`, value: i})
  }
  return months
})
</script>

<template>
  <div class="w-full flex lg:hidden flex-column align-items-center gap-6 mobile-calculator-container">
    <div class="w-full flex flex-column gap-2">
      <div class="text-bitter size-32">Calculate your monthly payment</div>
      <div class="text-inter text-left">
        Estimate your monthly payments based on the chosen loan amount and time period.
      </div>
    </div>
    <div class="w-full flex flex-column gap-4">
      <FloatLabel class="w-full">
        <InputNumber v-model.number="storeCalculator.loanObject.amount" :min="300" :max="7200" class="w-full"/>
        <label>Amount</label>
      </FloatLabel>
      <Slider v-model.number="storeCalculator.loanObject.amount" class="w-full" :max="7200" :min="300" :step="100"
              @change="storeCalculator.updateAmount"/>
      <div class="w-full flex justify-content-between align-items-center">
        <div class="text-inter size-14 opacity-60 text-left">300 €</div>
        <div class="text-inter size-14 opacity-60 text-left">7,200 €</div>
      </div>
    </div>
    <div class="w-full flex flex-column gap-4">
      <FloatLabel class="w-full">
        <Dropdown v-model.number="storeCalculator.loanObject.period" :options="months" option-label="label"
                  option-value="value" class="w-full"/>
        <label>Period</label>
      </FloatLabel>
      <Slider v-model.number="storeCalculator.loanObject.period" class="w-full" :max="72" :min="2" :step="1"
              @input="storeCalculator.updatePeriod"/>
      <div class="w-full flex justify-content-between align-items-center">
        <div class="text-inter size-14 opacity-60 text-left">2 months</div>
        <div class="text-inter size-14 opacity-60 text-left">72 months</div>
      </div>
    </div>
    <div class="w-full flex flex-column align-items-center gap-2">
      <div class="text-inter text-left">Monthly payment</div>
      <div class="flex text-bitter size-32 gap-1">
        <div>{{ storeCalculator.calculatedResult }}</div>
        <div class="euro">€</div>
      </div>
    </div>
    <Button class="apply-now-btn purple" @click="storeCalculator.isPersonalDetailsModalOpen = true">
      Apply now
    </Button>
    <div class="text-inter size-12 opacity-60 text-left">
      The calculation is approximate and may differ from the conditions offered to you. Please submit a loan
      application to receive a personal offer. Financial services are provided by AS Inbank Finance.
    </div>
  </div>
  <div class="w-full hidden lg:flex gap-6 calculator-container">
    <div class="w-6 flex flex-column justify-content-center gap-4 calculator-header-wrapper">
      <div class="text-bitter size-68">Calculate your monthly payment</div>
      <div class="text-inter opacity-90">Estimate your monthly payments based on the chosen loan amount and time
        period.
      </div>
    </div>
    <Divider layout="vertical"/>
    <div class="w-6 flex flex-column gap-6">
      <div class="w-full flex gap-4">
        <div class="w-8 flex flex-column gap-4">
          <Slider v-model.number="storeCalculator.loanObject.amount" class="w-full" :max="7200" :min="300" :step="100"
                  @change="storeCalculator.updateAmount"/>
          <div class="w-full flex justify-content-between align-items-center">
            <div class="text-inter size-14 opacity-60 text-left">300 €</div>
            <div class="text-inter size-14 opacity-60 text-left">7,200 €</div>
          </div>
        </div>
        <div class="w-4">
          <FloatLabel class="w-full">
            <InputNumber v-model.number="storeCalculator.loanObject.amount" :min="300" :max="7200" class="w-full"/>
            <label>Amount</label>
          </FloatLabel>
        </div>
      </div>
      <div class="w-full flex gap-4">
        <div class="w-8 flex flex-column gap-4">
          <Slider v-model.number="storeCalculator.loanObject.period" class="w-full" :max="72" :min="2" :step="1"
                  @input="storeCalculator.updatePeriod"/>
          <div class="w-full flex justify-content-between align-items-center">
            <div class="text-inter size-14 opacity-60 text-left">2 months</div>
            <div class="text-inter size-14 opacity-60 text-left">72 months</div>
          </div>
        </div>
        <div class="w-4">
          <FloatLabel class="w-full">
            <Dropdown v-model.number="storeCalculator.loanObject.period" :options="months" option-label="label"
                      option-value="value" class="w-full"/>
            <label>Period</label>
          </FloatLabel>
        </div>
      </div>
      <div class="w-full flex flex-column align-items-center gap-4">
        <div class="flex flex-column align-items-center gap-2">
          <div class="text-inter text-left">Monthly payment</div>
          <div class="flex text-bitter size-68 gap-1">
            <div>{{ storeCalculator.calculatedResult }}</div>
            <div class="euro">€</div>
          </div>
        </div>
        <Button class="m-auto apply-now-btn purple" @click="storeCalculator.isPersonalDetailsModalOpen = true">
          Apply now
        </Button>
        <div class="text-inter size-12 opacity-60 text-left">
          The calculation is approximate and may differ from the conditions offered to you. Please submit a loan
          application to receive a personal offer. Financial services are provided by AS Inbank Finance.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mobile-calculator-container {
  background: #E3D2FF;
  padding: 40px 16px;
}

.calculator-container {
  padding: 80px 40px;
  background: #E3D2FF;

  .calculator-header-wrapper {
    padding: 0 40px;
  }
}
</style>
