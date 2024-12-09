import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    password: "",
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
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
