import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { boolean, mixed, number, object, string } from "yup";

import { useAppSelector } from "@/shared/store";
import { Eye, EyeOff } from "@/shared/ui/icons";

import { countries } from "../model/constants";

import "./Controlled.scss";

const MAX_FILE_SIZE = 2097152;

const validFileExtensions: { [key: string]: string[] } = {
  image: ["jpg", "png", "jpeg"],
};

function isValidFileType(fileName: string, fileType: string) {
  const extension = fileName.split(".").pop();
  console.log({ fileName, fileType });
  return (
    extension !== undefined &&
    validFileExtensions[fileType]?.indexOf(extension) > -1
  );
}

const userSchema = object({
  name: string()
    .matches(/^[A-Z]/, "Name must start with capital letter")
    .required(),
  age: number().required().positive().integer().typeError("Age is required"),
  email: string()
    .email()
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Enter valid email",
    )
    .required(),
  gender: string()
    .oneOf(["male", "female", "other"], "Choose your gender")
    .required(),
  country: string().oneOf(countries, "the country must be real").required(),
  terms: boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required(),
  file: mixed()
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
});

const Controlled = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const countries = useAppSelector((state) => state.countries);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(userSchema),
  });

  const onSubmit: SubmitHandler = (data) => {
    console.log(data);
    reset();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleVisiblePassword = () => {
    setIsVisible(!isVisible);
  };

  return (
    <main className="control">
      <div className="container control__container">
        <h1 className="control__title">React Hook Form</h1>
        <form
          action=""
          className="control__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={`input-wrapper ${errors.name ? "has-error" : ""}`}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="John"
              id="name"
              {...register("name")}
            />
            <span className="input-error">{errors.name?.message}</span>
          </div>
          <div className={`input-wrapper ${errors.age ? "has-error" : ""}`}>
            <label htmlFor="age">Age</label>
            <input
              type="number"
              placeholder="25"
              id="age"
              {...register("age")}
            />
            <span className="input-error">{errors.age?.message}</span>
          </div>
          <div className={`input-wrapper ${errors.email ? "has-error" : ""}`}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="john@gmail.com"
              id="email"
              {...register("email")}
            />
            <span className="input-error">{errors.email?.message}</span>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type={isVisible ? "text" : "password"}
              placeholder="*****"
              id="password"
              {...register("password")}
            />
            <button onClick={handleVisiblePassword} type="button">
              {isVisible ? <Eye /> : <EyeOff />}
            </button>
            <span className="input-error">Something went wrong...</span>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password-confirm">Confirm password</label>
            <input
              type={isVisible ? "text" : "password"}
              placeholder="*****"
              name="passwordConfirm"
              id="password-confirm"
            />
            <button onClick={handleVisiblePassword} type="button">
              {isVisible ? <Eye /> : <EyeOff />}
            </button>
            <span className="input-error">Something went wrong...</span>
          </div>

          <div className={`radio-wrapper ${errors.gender ? "has-error" : ""}`}>
            Gender
            <div>
              <label htmlFor="male" className="radio-label">
                <input
                  type="radio"
                  value="male"
                  id="male"
                  {...register("gender")}
                />
                Male
              </label>
              <label htmlFor="female" className="radio-label">
                <input
                  type="radio"
                  value="female"
                  id="female"
                  {...register("gender")}
                />
                Female
              </label>
              <label htmlFor="other" className="radio-label">
                <input
                  type="radio"
                  value="other"
                  id="other"
                  {...register("gender")}
                />
                Other
              </label>
            </div>
            <span className="input-error">{errors.gender?.message}</span>
          </div>

          <div className={`input-wrapper ${errors.country ? "has-error" : ""}`}>
            <label htmlFor="countries">Country</label>
            <input
              type="text"
              placeholder="USA"
              list="countries-list"
              id="countries"
              {...register("country")}
            />
            <datalist className="list" id="countries-list">
              {countries.map((country) => (
                <option className="list__option" value={country} key={country}>
                  {country}
                </option>
              ))}
            </datalist>
            <span className="input-error">{errors.country?.message}</span>
          </div>

          <div
            className={`input-wrapper input-wrapper_file ${errors.file ? "has-error" : ""}`}
          >
            Avatar
            <label htmlFor="file">
              {preview ? "Select another file" : "Select file (*.png or *.jpg)"}
              <input
                type="file"
                id="file"
                accept="image/png, image/jpeg, image/jpg"
                {...register("file", {
                  onChange: handleFileChange,
                })}
              />
            </label>
            {preview && (
              <div className="preview">
                <p>Selected:</p>
                <img src={preview} alt="Preview" />
              </div>
            )}
            <span className="input-error">{errors.file?.message}.</span>
          </div>

          <div
            className={`checkbox-wrapper ${errors.terms ? "has-error" : ""}`}
          >
            <label htmlFor="terms">
              <input type="checkbox" id="terms" {...register("terms")} />I agree
              to the Terms and Conditions
            </label>
            <span className="input-error">{errors.terms?.message}.</span>
          </div>

          <button className="send" type="submit">
            Send
          </button>
        </form>
      </div>
    </main>
  );
};

export { Controlled };
