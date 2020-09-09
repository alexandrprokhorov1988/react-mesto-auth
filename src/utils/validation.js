class FormValidator {
  constructor({inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, formElement) {
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._formElement = formElement;
  }

  _showInputError(inputElement, message) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = message;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasValidInput(inputs) {
    return inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputs, submitButton) {
    if (this._hasValidInput(inputs)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.disabled = '';
    }
  }

  _setEventListeners(inputs, submitButton, formActivationButton) {
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputs, submitButton);
      });
    });
    if (formActivationButton) {
      formActivationButton.addEventListener('click', () => {
        inputs.forEach((inputElement) => {
          if (inputElement.value !== '') {
            this._checkInputValidity(inputElement);
          } else {
            this._hideInputError(inputElement);
          }
        });
        this._toggleButtonState(inputs, submitButton);
      });
    }
  }

  enableValidation() {
    const formData = this._formElement.dataset.form;
    const formActivationButton = document.querySelector(`button[data-button=${formData}]`);
    const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._setEventListeners(inputs, submitButton, formActivationButton);
  }
}

export default FormValidator;