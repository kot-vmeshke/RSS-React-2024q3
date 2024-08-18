import { boolean, InferType, mixed, number, object, ref, string } from "yup";

import { countries } from "./constants";

const MAX_FILE_SIZE = 2097152;

const validFileExtensions: { [key: string]: string[] } = {
  image: ["jpg", "png", "jpeg"],
};

const isValidFileType = (fileName: string, fileType: string) => {
  const extension = fileName.split(".").pop();
  return (
    extension !== undefined &&
    validFileExtensions[fileType]?.indexOf(extension) > -1
  );
};

export const userSchema = object({
  name: string()
    .required()
    .matches(/^[A-Z]/, "Name must start with capital letter"),
  age: number().required().positive().integer().typeError("Age is required"),
  email: string()
    .required()
    .email()
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Enter valid email",
    ),
  gender: string()
    .required()
    .oneOf(["male", "female", "other"], "Choose your gender"),
  country: string().required().oneOf(countries, "the country must be real"),
  terms: boolean()
    .required()
    .oneOf([true], "You must accept the terms and conditions"),
  file: mixed()
    .required("Avatar required")
    .test("is-valid-type", "Not a valid image type", (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0) {
        return false;
      }
      return isValidFileType(value[0].name.toLowerCase(), "image");
    })
    .test("is-valid-size", "Max allowed size is 2MB", (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0) {
        return false;
      }
      return value[0].size <= MAX_FILE_SIZE;
    }),
  password: string()
    .required()
    .matches(/[A-Z]/g, "Password must have 1 uppercase letter")
    .matches(/[a-z]/g, "Password must have 1 lowercase letter")
    .matches(/[0-9]/g, "Password must have 1 number")
    .matches(/[!@#$%^&*]/g, "Password must have 1 special character")
    .min(8),
  passwordConfirm: string()
    .required("Be sure to confirm your password")
    .oneOf([ref("password")], "Passwords must match"),
});

export type FormData = InferType<typeof userSchema>;
