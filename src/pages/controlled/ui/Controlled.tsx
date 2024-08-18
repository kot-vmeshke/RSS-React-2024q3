import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { nanoid } from "nanoid";

import { addLastUpdated, addToSubmitHistory } from "@/pages/uncontrolled/model";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { Eye, EyeOff } from "@/shared/ui/icons";

import type { FormData } from "../model";
import { userSchema } from "../model";

import "./Controlled.scss";

const Controlled = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const countries = useAppSelector((state) => state.countries);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(userSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data: FieldValues) => {
    const file = data.file[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      data.file = base64String;
      data.id = nanoid();

      dispatch(addLastUpdated(data.id));
      dispatch(addToSubmitHistory(data));
      navigate("/");
    };

    reader.readAsDataURL(file);
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
          <div
            className={`input-wrapper ${errors.password ? "has-error" : ""}`}
          >
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
            <span className="input-error">{errors.password?.message}.</span>
          </div>
          <div
            className={`input-wrapper ${errors.passwordConfirm ? "has-error" : ""}`}
          >
            <label htmlFor="password-confirm">Confirm password</label>
            <input
              type={isVisible ? "text" : "password"}
              placeholder="*****"
              id="password-confirm"
              {...register("passwordConfirm")}
            />
            <button onClick={handleVisiblePassword} type="button">
              {isVisible ? <Eye /> : <EyeOff />}
            </button>
            <span className="input-error">
              {errors.passwordConfirm?.message}
            </span>
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

          <button
            className="send"
            type="submit"
            disabled={Boolean(Object.keys(errors).length)}
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
};

export { Controlled };
