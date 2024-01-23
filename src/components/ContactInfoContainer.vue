<script setup>
// Imports
import {reactive, ref} from "vue";
import {onClickOutside} from '@vueuse/core'

// Models
const contactInfoObject = reactive({mail: "anna.tamm@gmail.com", phone: "+37252896572"});
const modelContactInfo = reactive({mail: "anna.tamm@gmail.com", phone: "+37252896572"});

// Contact info edit mode visibility
const isEditModeActive = ref(false);

const activateEditMode = () => isEditModeActive.value = true;
const deactivateEditMode = () => isEditModeActive.value = false;

const contactDataContainer = ref(null)
onClickOutside(contactDataContainer, () => deactivateEditMode())

// Phone number validation
const phoneErrorObject = reactive({message: '', isVisible: false})
const validatePhoneNumber = () => {
  const isPhoneNumberValid = modelContactInfo.phone.length === 12 && modelContactInfo.phone.startsWith("+372", 0);
  phoneErrorObject.message = isPhoneNumberValid ? "" : "Incorrect phone number";
  phoneErrorObject.isVisible = !isPhoneNumberValid;
};

// Contact info edit action
const editContactInfo = () => {
  if (!phoneErrorObject.isVisible && modelContactInfo.mail) {
    contactInfoObject.phone = modelContactInfo.phone;
    contactInfoObject.mail = modelContactInfo.mail;
    deactivateEditMode();
  }
}
</script>

<template>
  <div
      class="w-full flex flex-column contact-data__container"
      :class="{ active: isEditModeActive }"
      ref="contactDataContainer"
  >
    <div class="contact-data__header" :class="{active: isEditModeActive}">
      <Transition mode="out-in" name="slide-up">
        <div
            v-if="isEditModeActive"
            class="px-3 py-2 w-full flex justify-content-between align-items-center"
        >
          <div class="flex flex-column gap-1 font-light text-sm color-1-label">
            <TransitionGroup class="flex flex-column align-items-start" name="edit-mode-label" tag="div">
              <div key="label">Change your contact Info</div>
              <div v-if="phoneErrorObject.isVisible" key="error" class="error-message">
                {{ phoneErrorObject.message }}
              </div>
            </TransitionGroup>
          </div>
          <div class="flex justify-content-center align-items-center gap-3 color-2-label">
            <div class="flex flex-row-reverse align-items-center gap-2">
              <input
                  v-model="modelContactInfo.phone"
                  :class="{ 'error-state': phoneErrorObject.isVisible }"
                  class="contact-input"
                  maxlength="12"
                  type="text"
                  @blur="validatePhoneNumber"
              />
              <i class="pi pi-phone"/>
            </div>
            <div class="flex flex-row-reverse align-items-center gap-2">
              <input
                  v-model="modelContactInfo.mail"
                  class="contact-input"
                  type="text"
              />
              <i class="pi pi-envelope"/>
            </div>
          </div>
          <div class="active-edit-user-info__button" @click="editContactInfo">
            <i class="pi pi-chevron-right"/>
          </div>
        </div>
        <div v-else class="px-3 py-2 w-full flex justify-content-between align-items-center ">
          <div style="width: 31px"/>
          <div class="color-1-label text-lg">Anna Maria Tamm Rodriguez Espinosa</div>
          <div class="edit-user-info__button" @click="activateEditMode">
            <i class="pi pi-pencil"/>
          </div>
        </div>
      </Transition>
    </div>
    <Transition mode="out-in" name="slide-up">
      <div
          v-if="!isEditModeActive"
          class="p-2 w-full flex justify-content-center align-items-center gap-5"
      >
        <div class="flex align-items-center gap-1 color-1-label">
          <i class="pi pi-user color-2-label"/>
          <div>38912052254</div>
        </div>
        <div class="flex align-items-center gap-1 color-1-label">
          <i class="pi pi-phone color-2-label"/>
          <div>{{ contactInfoObject.phone }}</div>
        </div>
        <div class="flex align-items-center gap-1 color-1-label">
          <i class="pi pi-envelope color-2-label"/>
          <div>{{ contactInfoObject.mail }}</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.contact-data__container {
  border: 5px solid var(--color-4);
  border-radius: 30px;

  &.active {
    border-color: var(--color-5);
  }
}

.contact-data__header {
  width: 100%;
  background: var(--color-5);
  border-radius: 25px 25px 0 0;
  height: 48px;

  &.active {
    border-radius: 30px;
  }
}

.edit-user-info__button {
  margin: 0;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 31px;
  height: 31px;
  border-radius: 100%;
  background: var(--color-6);
  color: var(--color-3);

  &:hover {
    background: var(--color-3);
    color: var(--color-6);
    cursor: pointer;
  }
}

.active-edit-user-info__button {
  margin: 0;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 31px;
  height: 31px;
  border-radius: 100%;
  background: var(--color-3);
  color: var(--color-6);

  &:hover {
    background: var(--color-6);
    color: var(--color-3);
    cursor: pointer;
  }
}

.contact-input,
.contact-input:active,
.contact-input:focus {
  width: auto;
  min-width: 80px;
  padding: 5px;
  background: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid var(--color-2);
  color: var(--color-1);
  font-size: 14px;

  &:hover,
  &:active,
  &:focus {
    border-color: var(--color-3);

    + i {
      color: var(--color-3);
    }
  }

  &.error-state {
    border-color: var(--color-7);
  }
}

.edit-mode-label-move,
.edit-mode-label-enter-active,
.edit-mode-label-leave-active {
  transition: all 0.5s ease;
}

.edit-mode-label-enter-from,
.edit-mode-label-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.edit-mode-label-leave-active {
  position: absolute;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
