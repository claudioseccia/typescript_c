//Validation
//Validator decorator
//? optional operator ---> ex. required?: boolean <-- means required must be a boolean or undefined
export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
export function validate(validatableInput: Validatable) {
  // check for all the properties to exeist and do the proper validatiion
  let isValid = true; //basic flag, set to true ->goes to false as soon as one of the checks fails
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  //minLength check
  if (validatableInput.minLength) {
    //!= null -->this check includes null and undefined --> we're checking even if minLenght is zero
    if (
      validatableInput.minLength != null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid && validatableInput.value.length >= validatableInput.minLength;
    }
  }
  //maxLength check
  if (validatableInput.maxLength) {
    if (
      validatableInput.maxLength != null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
  }
  //min check
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  //max check
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }

  return isValid;
}
