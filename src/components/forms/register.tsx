"use client";
import React, { useState } from "react";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import useRegister from "@/hooks/use-register";
import ControlledInput from "../controlled-input";
import {
  CompanyRegisterFormInputs,
  UserRegisterFormInputs,
} from "@/schemas/register-schema";
import ControlledSelect from "../controlled-select";
import { companyEntitiesList } from "@/enums/company-entities.enum";
import { industriesList } from "@/enums/industries.enum";
import ControlledCheckbox from "../controlled-checkbox";
import Link from "next/link";
import ActivityIndicator from "../activity-indicatior";
import AppButton from "../app-button";

const RegisterForm = () => {
  const {
    userRegisterForm,
    companyRegisterForm,
    onSubmitCompany,
    onSubmitUser,
    isLoading,
  } = useRegister();
  const [stepper, setStepper] = useState<number>(0);

  const { control: userControl } = userRegisterForm;
  const { control: companyControl } = companyRegisterForm;

  const handleCompanyRegister = () => {
    companyRegisterForm.handleSubmit(onSubmitCompany)();
  };

  const handleUserRegister = () => {
    userRegisterForm.handleSubmit((data) =>
      onSubmitUser(data, () => handleStepper(1))
    )();
  };

  const handleStepper = (direction: number) => {
    setStepper((prev) => prev + direction);
  };

  const getCurrentForm = () => {
    if (stepper === 0) {
      return (
        <>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">
              Register your account to start.
            </h1>
            <p
              className={cn("text-sm text-muted-foreground", "md:text-balance")}
            >
              Enter your personal details down below.
            </p>
          </div>

          <ControlledInput<UserRegisterFormInputs>
            control={userControl}
            label="Full Name"
            name="name"
            placeholder="Enter your name"
          />
          <ControlledInput<UserRegisterFormInputs>
            control={userControl}
            label="Email"
            name="email"
            placeholder="Enter your email"
            type={"email"}
          />

          <ControlledInput<UserRegisterFormInputs>
            control={userControl}
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={"password"}
          />
          <ControlledInput<UserRegisterFormInputs>
            control={userControl}
            label="Re-Enter Password"
            name="confirmPassword"
            placeholder="Re enter your password"
          />

          <Button className={cn("bg-dark")} onClick={handleUserRegister}>
            Edit Company Details
          </Button>
        </>
      );
    } else if (stepper === 1) {
      return (
        <>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">
              Register your account to start.
            </h1>
            <p
              className={cn("text-sm text-muted-foreground", "md:text-balance")}
            >
              Enter your company details down below.
            </p>
          </div>

          <ControlledInput<CompanyRegisterFormInputs>
            control={companyControl}
            label="Company name"
            name="name"
            placeholder="Enter your company name"
          />

          <ControlledInput<CompanyRegisterFormInputs>
            control={companyControl}
            label="Telephone"
            name="telephone"
            placeholder="Enter your company telephone number"
          />

          <ControlledInput<CompanyRegisterFormInputs>
            control={companyControl}
            label="Registration Number (UEN)"
            name="uen"
            placeholder="Enter your company registration number"
          />

          <ControlledSelect<CompanyRegisterFormInputs>
            control={companyControl}
            list={companyEntitiesList}
            name="entity"
            label="Company Entity"
            placeholder="Select your company entity"
          />

          <ControlledSelect<CompanyRegisterFormInputs>
            control={companyControl}
            list={industriesList}
            name="industry"
            label="Industry"
            placeholder="Select your company industry"
          />

          <ControlledCheckbox<CompanyRegisterFormInputs>
            control={companyControl}
            name="termsAccepted"
          >
            <p className={cn("text-xs")}>
              By registering on our platform (Gecko) you agree to abidy by our
              <span className={cn("ml-1")}>
                <Link href="#" className={cn("text-accent hover:underline")}>
                  terms and conditions
                </Link>
              </span>
            </p>
          </ControlledCheckbox>

          <AppButton
            buttonOptions={{
              className: "bg-dark",
              onClick: () => handleStepper(-1),
            }}
            title="Edit Personal Details"
          />

          <AppButton
            buttonOptions={{
              className: "bg-dark",
              onClick: handleCompanyRegister,
            }}
            title="Register"
            isLoading={isLoading}
          />
        </>
      );
    }
  };

  return (
    <div
      className={cn("w-full flex flex-col gap-8", "md:w-[70%] md:p-8 md:py-4")}
    >
      <ActivityIndicator steps={2} currentStep={stepper} />
      {stepper === 0 ? (
        <Form {...userRegisterForm} key={"userForm"}>
          {getCurrentForm()}
        </Form>
      ) : (
        <Form {...companyRegisterForm} key={"companyForm"}>
          {getCurrentForm()}
        </Form>
      )}
    </div>
  );
};

export default RegisterForm;
