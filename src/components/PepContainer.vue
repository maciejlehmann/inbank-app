<script setup lang="ts">
import Checkbox from "primevue/checkbox";
import Dropdown from "primevue/dropdown";
import {reactive, ref} from "vue";
import {useMainStore} from "@/stores/storeMain.js";

const storeMain = useMainStore();

const modelPepObject = reactive({
  relationship: null,
  position: null,
  duration: null,
  region: null,
});

const isPepChecked = ref(true);
</script>

<template>
  <div class="w-full flex justify-content-center align-items-center gap-3">
    <Checkbox v-model="isPepChecked" :binary="true"/>
    <div style="width: 300px">Neither I nor my family member is PEP</div>
    <i
        class="pi pi-info-circle text-2xl color-8-label"
        @click="storeMain.openModal"
    />
  </div>
  <Transition mode="out-in" name="slide-down">
    <div v-if="!isPepChecked" class="w-full flex flex-column gap-3">
      <div class="w-full flex gap-3">
        <div class="w-6">
          <div class="w-full p-float-label">
            <Dropdown
                v-model="modelPepObject.relationship"
                :options="storeMain.options"
                optionLabel="name"
                class="w-full"
            />
            <label>Relationship to the PEP</label>
          </div>
        </div>
        <div class="w-6">
          <div class="w-full p-float-label">
            <Dropdown
                v-model="modelPepObject.region"
                :options="storeMain.options"
                optionLabel="name"
                class="w-full"
            />
            <label>PEP region</label>
          </div>
        </div>
      </div>
      <div class="w-full flex gap-3">
        <div class="w-6">
          <div class="w-full p-float-label">
            <Dropdown
                v-model="modelPepObject.position"
                :options="storeMain.options"
                optionLabel="name"
                class="w-full"
            />
            <label>PEP position</label>
          </div>
        </div>
        <div class="w-6">
          <div class="w-full p-float-label">
            <Dropdown
                v-model="modelPepObject.duration"
                :options="storeMain.options"
                optionLabel="name"
                class="w-full"
            />
            <label>Duration as PEP or related to a PEP</label>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
i:hover {
  cursor: pointer;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease-out;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
