import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {useRouter} from "vue-router";

export const useLoanStore = defineStore('loan', () => {
  const router = useRouter()

  const loanObject = ref({amount: 300, period: 2})

  const updateAmount = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target) loanObject.value.amount = +target.value
  }

  const updatePeriod = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target) loanObject.value.period = +target.value
  }

  const calculatedResult = computed(() => {
    return (loanObject.value.amount / loanObject.value.period).toFixed(2)
  })

  const isPersonalDetailsModalOpen = ref(false)

  const modelPersonalDetails = ref({
    mobileNumber: {data: '', isNotValid: false},
    firstName: {data: '', isNotValid: false},
    lastName: {data: '', isNotValid: false},
    income: {data: 0, isNotValid: false},
    email: {data: '', isNotValid: false},
    isFormValid: true
  })

  const submitForm = () => {
    isPersonalDetailsModalOpen.value = false
    const url = modelPersonalDetails.value.income.data < 1000 ? '/negative-decision' : '/positive-decision'
    router.replace(url)
  }

  const goBackToHomePage = () => {
    loanObject.value.amount = 300
    loanObject.value.period = 2

    modelPersonalDetails.value = {
      mobileNumber: {data: '', isNotValid: false},
      firstName: {data: '', isNotValid: false},
      lastName: {data: '', isNotValid: false},
      income: {data: 0, isNotValid: false},
      email: {data: '', isNotValid: false},
      isFormValid: true
    }

    router.replace('/')
  }

  return {
    loanObject,
    updateAmount,
    updatePeriod,
    calculatedResult,
    isPersonalDetailsModalOpen,
    modelPersonalDetails,
    submitForm,
    goBackToHomePage
  }
})
