<script setup lang="ts">
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import {useLoanStore} from "@/stores/storeLoan";
import {ref} from "vue";

const storeCalculator = useLoanStore();

const mobileNumberErrorMsg = ref('');
const validateMobileNumber = () => {
  if (!storeCalculator.modelPersonalDetails.mobileNumber.data) {
    storeCalculator.modelPersonalDetails.mobileNumber.isNotValid = true;
    mobileNumberErrorMsg.value = 'This field is required';
    return;
  }

  if (!storeCalculator.modelPersonalDetails.mobileNumber.data.startsWith("55")) {
    storeCalculator.modelPersonalDetails.mobileNumber.isNotValid = true;
    mobileNumberErrorMsg.value = 'Mobile number must start with 55';
    return;
  }

  if (storeCalculator.modelPersonalDetails.mobileNumber.data.length < 7) {
    storeCalculator.modelPersonalDetails.mobileNumber.isNotValid = true;
    mobileNumberErrorMsg.value = 'Mobile number must be 7 or 8 digits long';
    return;
  }

  storeCalculator.modelPersonalDetails.mobileNumber.isNotValid = false;
  mobileNumberErrorMsg.value = '';
}

const emailErrorMsg = ref('');
const validateEmail = () => {
  if (!storeCalculator.modelPersonalDetails.email.data) {
    storeCalculator.modelPersonalDetails.email.isNotValid = true;
    emailErrorMsg.value = 'This field is required';
    return;
  }

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (!regex.test(storeCalculator.modelPersonalDetails.email.data)) {
    storeCalculator.modelPersonalDetails.email.isNotValid = true;
    emailErrorMsg.value = 'E-mail field must contains a valid e-mail';
    return;
  }

  storeCalculator.modelPersonalDetails.email.isNotValid = false;
  emailErrorMsg.value = '';
}

const incomeErrorMsg = ref('');
const validateForm = (field: 'firstName' | 'lastName' | 'mobileNumber' | 'email' | 'income') => {
  if (field === 'firstName') storeCalculator.modelPersonalDetails.firstName.isNotValid = !storeCalculator.modelPersonalDetails.firstName.data;
  if (field === 'lastName') storeCalculator.modelPersonalDetails.lastName.isNotValid = !storeCalculator.modelPersonalDetails.lastName.data;

  if (field === 'mobileNumber') validateMobileNumber();
  if (field === 'email') validateEmail();

  if (field === 'income') {
    if (!storeCalculator.modelPersonalDetails.income.data) {
      storeCalculator.modelPersonalDetails.income.isNotValid = true;
      incomeErrorMsg.value = 'This field is required';
    } else {
      storeCalculator.modelPersonalDetails.income.isNotValid = false;
      incomeErrorMsg.value = '';
    }

    if (storeCalculator.modelPersonalDetails.income.data < 100) {
      storeCalculator.modelPersonalDetails.income.isNotValid = true;
      incomeErrorMsg.value = 'Income must be at least 100';
    } else {
      storeCalculator.modelPersonalDetails.income.isNotValid = false;
      incomeErrorMsg.value = '';
    }
  }

  storeCalculator.modelPersonalDetails.isFormValid = !storeCalculator.modelPersonalDetails.firstName.isNotValid
      && !storeCalculator.modelPersonalDetails.lastName.isNotValid
      && !storeCalculator.modelPersonalDetails.mobileNumber.isNotValid
      && !storeCalculator.modelPersonalDetails.email.isNotValid
      && !storeCalculator.modelPersonalDetails.income.isNotValid;
}

const submitForm = () => {
  validateForm('firstName');
  validateForm('lastName');
  validateForm('mobileNumber');
  validateForm('email');
  validateForm('income');

  if (storeCalculator.modelPersonalDetails.isFormValid) storeCalculator.submitForm();
}
</script>

<template>
  <Dialog v-model:visible="storeCalculator.isPersonalDetailsModalOpen" modal :draggable="false"
          class="lg:w-4 w-12">
    <template #header>
      <div class="text-inter size-20 text-left">Personal details</div>
    </template>
    <div class="w-full flex flex-column gap-4">
      <div class="w-full flex flex-column gap-3">
        <div class="w-full flex flex-column gap-1">
          <FloatLabel class="w-full">
            <InputText v-model="storeCalculator.modelPersonalDetails.firstName.data" class="w-full" type="text"
                       :class="{'input-invalid': storeCalculator.modelPersonalDetails.firstName.isNotValid}"
                       @blur="validateForm('firstName')"/>
            <label :class="{'p-error': storeCalculator.modelPersonalDetails.firstName.isNotValid}">
              First name
            </label>
          </FloatLabel>
          <div v-if="storeCalculator.modelPersonalDetails.firstName.isNotValid" class="p-error">
            This field is required
          </div>
        </div>
        <div class="w-full flex flex-column gap-1">
          <FloatLabel class="w-full">
            <InputText v-model="storeCalculator.modelPersonalDetails.lastName.data" class="w-full" type="text"
                       :class="{'input-invalid': storeCalculator.modelPersonalDetails.lastName.isNotValid}"
                       @blur="validateForm('lastName')"/>
            <label>Last name</label>
          </FloatLabel>
          <div v-if="storeCalculator.modelPersonalDetails.lastName.isNotValid" class="p-error">
            This field is required
          </div>
        </div>
        <div class="w-full flex flex-column gap-1">
          <FloatLabel class="w-full">
            <InputText v-model="storeCalculator.modelPersonalDetails.mobileNumber.data" class="w-full" type="text"
                       :class="{'input-invalid': storeCalculator.modelPersonalDetails.mobileNumber.isNotValid}"
                       maxlength="8" @blur="validateForm('mobileNumber')"/>
            <label>Mobile number</label>
          </FloatLabel>
          <div v-if="storeCalculator.modelPersonalDetails.mobileNumber.isNotValid" class="p-error">
            {{ mobileNumberErrorMsg }}
          </div>
        </div>
        <div class="w-full flex flex-column gap-1">
          <FloatLabel class="w-full">
            <InputText v-model="storeCalculator.modelPersonalDetails.email.data" class="w-full" type="email"
                       :class="{'input-invalid': storeCalculator.modelPersonalDetails.email.isNotValid}"
                       @blur="validateForm('email')"/>
            <label>E-mail</label>
          </FloatLabel>
          <div v-if="storeCalculator.modelPersonalDetails.email.isNotValid" class="p-error">
            {{ emailErrorMsg }}
          </div>
        </div>
        <div class="w-full flex flex-column gap-1">
          <FloatLabel class="w-full">
            <InputText v-model="storeCalculator.modelPersonalDetails.income.data" class="w-full" type="number"
                       :class="{'input-invalid': storeCalculator.modelPersonalDetails.income.isNotValid}"
                       @blur="validateForm('income')"/>
            <label>Monthly income</label>
          </FloatLabel>
          <div v-if="storeCalculator.modelPersonalDetails.income.isNotValid" class="p-error">
            {{ incomeErrorMsg }}
          </div>
        </div>
      </div>
      <Button class="w-full apply-now-btn purple" @click="submitForm">Submit</Button>
    </div>
  </Dialog>
</template>
