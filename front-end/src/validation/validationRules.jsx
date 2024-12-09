export const isStepValid = (watch,step) => {
  const stepData = watch(); // Get all field values
  switch (step) {
    case 1:
      return (
        stepData.firstName.trim() &&
        stepData.lastName.trim() &&
        stepData.email.trim() &&
        stepData.contactNo.trim() &&
        stepData.password.trim() &&
        stepData.confirmPassword.trim()
      );
    case 2:
      return (
        stepData.address1.trim() &&
        stepData.address2.trim() &&
        stepData.city.trim() &&
        stepData.state.trim() &&
        stepData.zipcode.trim()
      );
    case 3:
      return stepData.education.every(
        (edu) =>
          edu.type.trim() &&
          edu.passingYear.trim() &&
          edu.schoolCollege.trim() &&
          edu.percentage.trim()
      );
    default:
      return false;
  }
};

export const INITIAL_USER_DATA = {
  firstName: "",
  lastName: "",
  email: "",
  contactNo: "",
  password: "",
  confirmPassword: "",
  gender: "male",
  hobbies: [],
  country: "",
  state: "",
  city: "",
  address1: "",
  address2: "",
  nearbyLocation: "",
  zipcode: "",
  education: [
    {
      type: "10th",
      passingYear: "",
      schoolCollege: "",
      percentage: "",
    },
  ],
};
