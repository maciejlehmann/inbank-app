<script setup lang="ts">
import Divider from "primevue/divider";
import InputSwitch from "primevue/inputswitch";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { reactive, ref } from "vue";
import {useMainStore} from "@/stores/storeMain.js";

const storeMain = useMainStore();

const modelPersonalInformation = reactive({
  country: "Estonia",
  street: null,
  house: null,
  apartment: null,
  postalCode: null,
  county: null,
  village: null,
  city: null,
});

const manualAddress = ref(false);
</script>

<template>
  <div class="w-full flex flex-column gap-3">
    <div class="w-full color-1-label text-base">Personal data</div>
    <div class="w-full flex gap-3">
      <div class="w-6">
        <div class="w-full p-float-label">
          <InputText
            v-model="modelPersonalInformation.country"
            class="w-full"
            disabled
          />
          <label>Country</label>
        </div>
      </div>
      <div class="w-6">
        <div
          class="w-full p-float-label"
          :class="{
            'form-is-active': manualAddress && !modelPersonalInformation.county,
          }"
        >
          <Dropdown
            v-model="modelPersonalInformation.county"
            :options="storeMain.options"
            optionLabel="name"
            class="w-full"
          />
          <label>County</label>
        </div>
      </div>
    </div>
    <div class="w-full flex gap-3">
      <div class="w-6">
        <div
          class="w-full p-float-label"
          :class="{
            'form-is-active': manualAddress && !modelPersonalInformation.city,
          }"
        >
          <Dropdown
            v-model="modelPersonalInformation.city"
            :options="storeMain.options"
            optionLabel="name"
            class="w-full"
          />
          <label>City / Parish</label>
        </div>
      </div>
      <div class="w-6">
        <div
          class="w-full p-float-label"
          :class="{
            'form-is-active':
              manualAddress && !modelPersonalInformation.village,
          }"
        >
          <Dropdown
            v-model="modelPersonalInformation.village"
            :options="storeMain.options"
            optionLabel="name"
            placeholder="Select a City"
            class="w-full"
          />
          <label>Village / Township</label>
        </div>
      </div>
    </div>
    <div class="w-full flex gap-3">
      <div class="w-6">
        <div
          class="w-full p-float-label"
          :class="{
            'form-is-active': manualAddress && !modelPersonalInformation.street,
          }"
        >
          <InputText v-model="modelPersonalInformation.street" class="w-full" />
          <label>Street</label>
        </div>
      </div>
      <div class="w-6 flex gap-3">
        <div class="w-4">
          <div
            class="w-full p-float-label"
            :class="{
              'form-is-active':
                manualAddress && !modelPersonalInformation.house,
            }"
          >
            <InputText
              v-model="modelPersonalInformation.house"
              class="w-full"
            />
            <label>House</label>
          </div>
        </div>
        <div class="w-4">
          <div
            class="w-full p-float-label"
            :class="{
              'form-is-active':
                manualAddress && !modelPersonalInformation.apartment,
            }"
          >
            <InputText
              v-model="modelPersonalInformation.apartment"
              class="w-full"
            />
            <label>Apartment</label>
          </div>
        </div>
        <div class="w-4">
          <div
            class="w-full p-float-label"
            :class="{
              'form-is-active':
                manualAddress && !modelPersonalInformation.postalCode,
            }"
          >
            <InputText
              v-model="modelPersonalInformation.postalCode"
              class="w-full"
            />
            <label>Postal code</label>
          </div>
        </div>
      </div>
    </div>
    <Divider align="center" type="solid">
      <div class="font-italic color-9-label">Or</div>
    </Divider>
    <div class="w-full flex justify-content-center gap-3">
      <InputSwitch v-model="manualAddress" />
      Add address manually
    </div>
    <Divider type="solid" />
  </div>
</template>

<style scoped lang="scss"></style>
