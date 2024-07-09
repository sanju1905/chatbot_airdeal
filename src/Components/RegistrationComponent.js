import React from "react";
import { useState } from "react";
import axios from "axios";
const RegistrationComponent = ({ steps, triggerNextStep }) => {


    const {
      WaitingForFirstName,
      WaitingForLastName,
      WaitingForPhone,
      WaitingForEmail,
      WaitingForPassword,
    } = steps;

    const handleRegistration = async () => {
      const result = await RegisterUser({
        firstname: WaitingForFirstName.value,
        lastname: WaitingForLastName.value,
        phone: WaitingForPhone.value,
        email: WaitingForEmail.value,
        password: WaitingForPassword.value,
      });
      triggerNextStep({ trigger: result });
    };

    React.useEffect(() => {
      handleRegistration();
    }, []);

    return <div>Registering user...</div>;
  };

  const RegisterUser = async ({ firstname, lastname, phone, email, password }) => {
    const [user, setUser] = useState(null);
    try {
      const response = await axios.post("http://localhost:5001/register", {
        firstname,
        lastname,
        phone,
        email,
        password,
      });
      setUser(response.data.user);
      console.log("Registration successful", response.data.message);
      return "RegistrationSuccess";
    } catch (error) {
      console.error("Registration failed", error);
      return "RegistrationFailed";
    }
  };

  export default RegistrationComponent;