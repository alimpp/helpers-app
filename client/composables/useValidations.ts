export const useValidations = () => {

  const validEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const validEmpty = (input: string): boolean => {
    const length = input.length;
    return length == 0 ? false : true
  }

  const validLength = (
    input: string,
    minLength: number,
    maxLength: number
  ): { isValid: boolean; message?: string } => {
    const length = input.length;
    if (length < minLength) {
      return {
        isValid: false,
        message: `The length must be at least ${minLength} characters.`,
      };
    }
    if (length > maxLength) {
      return {
        isValid: false,
        message: `The length cannot exceed ${maxLength} characters.`,
      };
    }
    return { isValid: true, message: '' };
  }

  const ValidationIranianPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.toString().replace(/\D/g, "");

    const patterns = [
      /^09[0-9]{9}$/,
      /^989[0-9]{9}$/,
      /^021[0-9]{8}$/,
      /^\+98[0-9]{10}$/,
      /^0098[0-9]{10}$/,
    ];

    if (patterns.some((pattern) => pattern.test(cleaned))) {
      return true
    } else {
      return false
    }
};

  return { validEmail, validEmpty, validLength, ValidationIranianPhoneNumber }

}