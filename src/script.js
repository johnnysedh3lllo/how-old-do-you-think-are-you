"use strict";

const form = document.querySelector(".form");
const fieldSet = document.querySelector(".form__fieldset");
const formInputContainer = document.querySelectorAll(".form__input--container");

// FORM INPUTS FIELDS
const inputFields = document.querySelectorAll(".form__input");
const inputDay = document.querySelector("#day.form__input");
const inputMonth = document.querySelector("#month.form__input");
const inputYear = document.querySelector("#year.form__input");
const errorMessage = document.querySelectorAll(".error");

// AGE DISPLAY ELEMENTS
const yearElement = document.querySelector(
  ".age-calc__main__section__heading__span.years"
);
const monthElement = document.querySelector(
  ".age-calc__main__section__heading__span.months"
);
const daysElement = document.querySelector(
  ".age-calc__main__section__heading__span.days"
);

const currentDate = new Date();
let errorElement;

// Helper functions

function showError(siblingEl, errorMessage) {
  errorElement = siblingEl.nextElementSibling;
  errorElement.textContent = errorMessage;
}

function clearError(siblingEl, emptyString) {
  errorElement = siblingEl.nextElementSibling;
  errorElement.textContent = emptyString;
}

const calculateAge = function (day, month, year) {
  const DaysInMilliSecs = 24 * 60 * 60 * 1000;

  const dateOfBirth = new Date(year, month, day);
  const ageInMilliSecs = currentDate.getTime() - dateOfBirth.getTime();
  const ageInDays = Math.floor(ageInMilliSecs / DaysInMilliSecs);

  const totalYears = Math.floor(ageInDays / 365.25);
  const totalMonths = Math.floor((ageInDays % 365.25) / 30.4167);
  const totalDays = Math.round((ageInDays % 365.25) % 30.4167);

  console.log(totalYears, totalMonths, totalDays);

  return [totalYears, totalMonths, totalDays];
};

const displayAge = function (year, month, day) {
  const [totalYears, totalMonths, totalDays] = calculateAge(day, month, year);

  yearElement.textContent = `${totalYears}`;
  monthElement.textContent = `${totalMonths}`;
  daysElement.textContent = `${totalDays}`;
};

fieldSet.addEventListener("input", function (event) {
  const curInputEl = event.target;

  if (curInputEl.validity.valid) {
    clearError(curInputEl, "");
  } else {
    showError(curInputEl, `Must be a valid ${curInputEl.id}`);
  }

  if (
    curInputEl.id === "year" &&
    curInputEl.value > currentDate.getFullYear()
  ) {
    showError(curInputEl, "Must be a valid year");
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  inputFields.forEach((input) => {
    if (input.validity.valueMissing) {
      showError(input, "This field is required");
    }
  });

  const day = inputDay.value;
  const month = +inputMonth.value - 1;
  const year = inputYear.value;

  if (day >= 31) {
    switch (month) {
      case 3:
        errorMessage[0].textContent = "Must be a valid date";
        break;
      case 5:
        errorMessage[0].textContent = "Must be a valid date";
        break;
      case 8:
        errorMessage[0].textContent = "Must be a valid date";
        break;
      case 10:
        errorMessage[0].textContent = "Must be a valid date";
        break;

      default:
        break;
    }
  } else {
    displayAge(year, month, day);
  }
});

document.body.addEventListener("click", function (event) {
  if (event) {
    inputFields.forEach((input) => {
      clearError(input, "");
    });
  }
});
