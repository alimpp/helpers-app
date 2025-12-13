import { useToast as vueToast } from 'vue-toastification'

export const useToast = () => {
  const toast = vueToast()

  const success = (message: string) => {
    toast.success(message)
  }

  const error = (message: string) => {
    toast.error(message)
  }

  const info = (message: string) => {
    toast.info(message)
  }

  const warning = (message: string) => {
    toast.warning(message)
  }

  const custom = (message: string, options = {}) => {
    toast(message, options)
  }

  return {
    success,
    error,
    info,
    warning,
    custom
  }
}