<script setup>
// Imports
import {computed, onMounted, onUnmounted, reactive, ref} from "vue";
import InputNumber from "primevue/inputnumber";
import {onClickOutside} from '@vueuse/core'

// Models
const modelLoanObject = reactive({amount: 2700, months: 36});
const loanObject = reactive({amount: 2700, months: 36});

// Loan info edit mode visibility
const isEditModeActive = ref(false);

const activateEditMode = () => isEditModeActive.value = true;
const deactivateEditMode = () => isEditModeActive.value = false;

const loanInfoContainer = ref(null);
onClickOutside(loanInfoContainer, () => deactivateEditMode());

// Amount validation and range visibility
const amountInfoObject = reactive({isInvalid: false, isRangeVisible: false});
const showAmountRange = () => amountInfoObject.isRangeVisible = true;
const hideAmountRange = () => amountInfoObject.isRangeVisible = false;

const validateAmount = () => {
  if (modelLoanObject.amount > 10000) modelLoanObject.amount = 10000;
  if (modelLoanObject.amount < 200) modelLoanObject.amount = 200;

  amountInfoObject.isInvalid = modelLoanObject.amount === null;
};

const inputAmountClass = computed(() => {
  return amountInfoObject.isInvalid ? "amount-input error-state" : "amount-input";
});

// Edit loan info action
const editLoanInfo = () => {
  if (modelLoanObject.amount && modelLoanObject.months) {
    loanObject.amount = modelLoanObject.amount;
    loanObject.months = modelLoanObject.months;
    deactivateEditMode();
  }
}

// Amounts dropdown
const amountsDropdown = ref(null);
const isAmountsDropdownShown = ref(false);

const showAmountsDropdown = () => isAmountsDropdownShown.value = true;
const hideAmountsDropdown = () => isAmountsDropdownShown.value = false;

onClickOutside(amountsDropdown, () => hideAmountsDropdown());

const selectAmount = (amount) => {
  modelLoanObject.amount = amount;
  hideAmountsDropdown();
};

// Months dropdown
const monthsDropdown = ref(null);
const isMonthsDropdownShown = ref(false);

const showMonthsDropdown = () => isMonthsDropdownShown.value = true;
const hideMonthsDropdown = () => isMonthsDropdownShown.value = false;

onClickOutside(monthsDropdown, () => hideMonthsDropdown());

const selectMonth = (month) => {
  modelLoanObject.months = month;
  hideMonthsDropdown();
};

// Amounts dropdown list
const generateSelectAmounts = () => {
  let result = [];

  // From 200 to 1000 every 50
  for (let i = 200; i <= 1000; i += 50) {
    result.push(i);
  }

  // From 1000 to 3000 every 100
  for (let i = 1000; i <= 3000; i += 100) {
    result.push(i);
  }

  // From 3000 to 10000 every 500
  for (let i = 3000; i <= 10000; i += 500) {
    result.push(i);
  }

  return result;
};

const selectAmountsArray = generateSelectAmounts();
</script>

<template>
  <div class="loan-info__container" ref="loanInfoContainer">
    <Transition mode="out-in" name="slide-down">
      <div v-if="isEditModeActive" class="p-2 w-full flex justify-content-between align-items-center">
        <div style="width: 34px; height: 34px"/>
        <div class="flex justify-content-center gap-3">
          <div class="flex align-items-center gap-2">
            <div class="text-sm font-light color-9-label" style="width: 63px">
              <TransitionGroup
                  class="flex flex-column align-items-end gap-1"
                  name="amount-labels"
                  tag="div"
              >
                <div key="label">Amount</div>
                <div
                    v-if="amountInfoObject.isRangeVisible && !amountInfoObject.isInvalid"
                    style="font-size: 10px"
                    key="range"
                >
                  200 - 10000 €
                </div>
                <div v-if="amountInfoObject.isInvalid" class="error-message" key="error">Out of range</div>
              </TransitionGroup>
            </div>
            <InputNumber
                v-model="modelLoanObject.amount"
                :input-class="inputAmountClass"
                suffix=" €"
                unstyled
                @update:model-value="validateAmount"
                @keyup.enter="validateAmount"
                @focus="showAmountRange"
                @blur="hideAmountRange"
            />
            <div id="amounts-dropdown" class="dropdown">
              <div class="dropdown-icon" @click="showAmountsDropdown">
                <i :class="isAmountsDropdownShown ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"/>
              </div>
              <div :class="{ show: isAmountsDropdownShown }" class="dropdown-content" ref="amountsDropdown">
                <div class="p-3 w-full flex">
                  <div class="pb-1 w-full flex justify-content-between align-items-end min-info__wrapper">
                    <div class="flex justify-content-center align-items-start text-base color-1-label">
                      <div>200</div>
                      <div class="text-xs">€</div>
                    </div>
                    <div class="font-light color-1-label text-sm">Min. allowed</div>
                  </div>
                </div>
                <div
                    v-for="amount in selectAmountsArray"
                    :key="amount"
                    class="p-2 w-full flex justify-content-center align-items-start text-base color-1-label dropdown-element"
                    @click="selectAmount(amount)"
                >
                  <div>{{ amount }}</div>
                  <div class="text-xs">€</div>
                </div>
                <div class="p-3 w-full flex">
                  <div class="pb-1 w-full flex justify-content-between align-items-end min-info__wrapper">
                    <div class="flex justify-content-center align-items-start text-base color-1-label">
                      <div>10000</div>
                      <div class="text-xs">€</div>
                    </div>
                    <div class="font-light color-1-label text-sm">Max. allowed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex align-items-center gap-2">
            <div class="text-sm font-light color-9-label">Duration</div>
            <InputNumber
                v-model="modelLoanObject.months"
                :suffix="modelLoanObject.months === 1 ? ' month' : ' months'"
                input-class="months-input"
                unstyled
            />
            <div id="months-dropdown" class="dropdown">
              <div class="dropdown-icon" @click="showMonthsDropdown">
                <i :class="isMonthsDropdownShown ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"/>
              </div>
              <div class="dropdown-content months" :class="{ show: isMonthsDropdownShown }">
                <div class="p-3 w-full flex">
                  <div class="pb-1 w-full flex justify-content-between align-items-end min-info__wrapper">
                    <div class="flex justify-content-center align-items-end text-base color-1-label">
                      <div>1</div>
                      <div class="text-sm">month</div>
                    </div>
                    <div class="font-light color-1-label text-sm">Min. allowed</div>
                  </div>
                </div>
                <div
                    v-for="number in 60"
                    :key="number"
                    class="p-2 w-full flex justify-content-center align-items-start text-base color-1-label dropdown-element"
                    @click="selectMonth(number)"
                >
                  <div class="flex align-items-end gap-1">
                    <div>{{ number }}</div>
                    <div class="text-sm">{{ number === 1 ? "month" : "months" }}</div>
                  </div>
                </div>
                <div class="p-3 w-full flex">
                  <div class="pb-1 w-full flex justify-content-between align-items-end min-info__wrapper">
                    <div class="flex justify-content-center align-items-end text-base color-1-label">
                      <div>60</div>
                      <div class="text-sm">months</div>
                    </div>
                    <div class="font-light color-1-label text-sm">Max. allowed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="px-3 flex justify-content-center align-items-center gap-2 monthly-payment__wrapper">
            <div class="text-sm font-light color-9-label">Monthly Payment</div>
            <div class="flex align-items-start text-xl color-6-label">
              <div>95,27</div>
              <div class="text-sm">€</div>
            </div>
          </div>
        </div>
        <div class="update-loan-info__button" @click="editLoanInfo">
          <i class="pi pi-chevron-right"/>
        </div>
      </div>
      <div v-else class="p-2 w-full flex justify-content-between align-items-center">
        <div class="active-loan__button" @click="activateEditMode">
          <i class="pi pi-chevron-left"/>
        </div>
        <div class="flex justify-content-center align-items-center gap-3 color-6-label" style="height: 40px">
          <div class="text-xl">Your loan application</div>
          <div class="flex align-items-start text-base font-light gap-2">
            <div class="flex align-items-start">
              <div>{{ loanObject.amount }}</div>
              <div class="text-xs">€</div>
            </div>
            <div>/</div>
            <div class="flex align-items-end gap-1">
              <div>{{ loanObject.months }}</div>
              <div class="text-sm">months</div>
            </div>
          </div>
        </div>
        <div style="width: 34px"/>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.loan-info__container {
  width: 100%;
  border-radius: 30px;
  background: var(--color-3);
  color: var(--color-6);
}

.monthly-payment__wrapper {
  background: var(--color-10);
  border-radius: 30px;
  height: 40px;
}

.dropdown-icon {
  padding: 4px;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: var(--color-6);

  &:hover {
    background: var(--color-10);
    cursor: pointer;
  }
}

.active-loan__button {
  padding: 4px;
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: var(--color-6);

  &:hover {
    background: var(--color-10);
    cursor: pointer;
  }
}

.update-loan-info__button {
  margin: 0;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--color-6);
  color: var(--color-3);

  &:hover {
    box-shadow: 0 1px 25px 4px var(--color-8);
    cursor: pointer;
  }
}

#months-suffix,
#amount-suffix {
  position: absolute;
  left: 0;
  top: 2px;
  padding-left: 5px;
  font-size: 16px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  width: 200px;
  height: 300px;
  display: none;
  position: absolute;
  background-color: var(--color-6);
  min-width: 160px;
  overflow: auto;
  box-shadow: 0 10px 30px 0 #00000005;
  z-index: 1;
  border-radius: 6px;

  &.months {
    width: 250px;
  }

  &.show {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .dropdown-element {
    border-radius: 4px;

    &:hover {
      background: var(--color-9);
      cursor: pointer;
    }
  }
}

.min-info__wrapper {
  border-bottom: 1px solid var(--color-1);
}

.amount-labels-move,
.amount-labels-enter-active,
.amount-labels-leave-active {
  transition: all 0.5s ease;
}

.amount-labels-enter-from,
.amount-labels-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.amount-labels-leave-active {
  position: absolute;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease-out;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
