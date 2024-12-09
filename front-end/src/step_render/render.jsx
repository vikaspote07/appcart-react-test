

import { UserInfoStep } from "../componants/steps/UserInfo";
import { AddressStep } from "../componants/steps/AddressStep"; 
import { EducationStep } from "../componants/steps/EducationStep";

export const renderStep = ({ step, ...props }) => {
  switch (step) {
    case 1:
      return <UserInfoStep {...props} />;
    case 2:
      return <AddressStep {...props} />;
    case 3:
      return <EducationStep {...props} />;
    default:
      return null;
  }
};
