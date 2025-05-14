"use client";
import {
  userRegisterSchema,
  companyRegisterSchema,
  CompanyRegisterFormInputs,
  UserRegisterFormInputs,
} from "@/schemas/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useAuth from "./use-auth";
import { RegisterApiRequestType } from "@/types/api.type";

const useRegister = () => {
  const { registerMutate, isRegisterPending: isLoading } = useAuth();

  const userRegisterForm = useForm<UserRegisterFormInputs>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
      email: "",
      name: "",
    },
  });

  const companyRegisterForm = useForm<CompanyRegisterFormInputs>({
    resolver: zodResolver(companyRegisterSchema),
    defaultValues: {
      entity: "",
      industry: "",
      name: "",
      telephone: "",
      termsAccepted: false,
      uen: "",
    },
  });

  const onSubmitUser = (
    data: UserRegisterFormInputs,
    onValidForm: () => void
  ) => {
    console.log("onSubmit called");
    console.log("user data:", data);
    onValidForm();

    // handle login logic here
  };

  const onSubmitCompany = (data: CompanyRegisterFormInputs) => {
    console.log("onSubmit called");
    console.log("company data:", data);

    const { confirmPassword, ...user } = userRegisterForm.getValues();
    const { termsAccepted, ...company } = companyRegisterForm.getValues();

    onSubmit({
      user,
      company,
    });
  };

  const onSubmit = (data: RegisterApiRequestType) => {
    registerMutate(data);
  };

  return {
    userRegisterForm,
    companyRegisterForm,
    onSubmitCompany,
    onSubmitUser,
    isLoading,
  };
};

export default useRegister;
