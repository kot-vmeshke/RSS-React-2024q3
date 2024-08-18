import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { ValidationError } from "yup";

import { addLastUpdated, addToSubmitHistory } from "@/features/submitHistory";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { Eye, EyeOff } from "@/shared/ui/icons";

import { userSchema } from "../model";

interface ErrorsObject {
  [key: string]: string;
}

const emptyErrors: ErrorsObject = {
  name: "",
  age: "",
  email: "",
  gender: "",
  password: "",
  passwordConfirm: "",
  country: "",
  terms: "",
  file: "",
};

const Uncontrolled = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const countries = useAppSelector((state) => state.countries);
  const [isVisible, setIsVisible] = useState(false);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [errors, setErrors] = useState<ErrorsObject>(emptyErrors);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useRef<HTMLFormElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInput = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

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

  const handlePasswordStraight = () => {
    if (passwordInput.current) {
      const pass = passwordInput.current.value;
      const isLength = pass.length >= 8;
      const hasUppercaseLetter = /[A-Z]/g.test(pass);
      const hasLowerLetter = /[a-z]/g.test(pass);
      const hasNumber = /[0-9]/g.test(pass);
      const hasCharacter = /[!@#$%^&*]/g.test(pass);

      const conditions = [
        isLength,
        hasUppercaseLetter,
        hasLowerLetter,
        hasNumber,
        hasCharacter,
      ];

      const width = conditions.filter(Boolean).length * 20;

      setIndicatorWidth(width);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formSubmitted = form.current;
    if (formSubmitted) {
      const formData = new FormData(formSubmitted);

      const temp: Record<string, FormDataEntryValue> = {};

      for (const pair of formData.entries()) {
        temp[pair[0]] = pair[1];
      }

      try {
        const isValid = await userSchema.validate(temp, { abortEarly: false });
        if (isValid) {
          temp.id = nanoid();

          const file = temp.file as Blob;
          const reader = new FileReader();

          reader.onloadend = () => {
            const base64String = reader.result as string;
            temp.file = base64String;

            dispatch(addLastUpdated(temp.id));
            dispatch(addToSubmitHistory(temp));

            setIsSuccess(true);

            setTimeout(() => {
              navigate("/");
            }, 1000);
          };

          reader.readAsDataURL(file);
        }
      } catch (error) {
        if (error instanceof ValidationError) {
          const eTemp: ErrorsObject = {
            ...emptyErrors,
          };

          error.inner.forEach((item: ValidationError) => {
            if (item.path) {
              eTemp[item.path] = item.errors[0];
            }
          });
          setErrors({ ...eTemp });
        }
      }
    }
  };

  return (
    <main className="control">
      <div className="container control__container">
        <h1 className="control__title">Uncontrolled Form</h1>
        <form
          action=""
          className="control__form"
          onSubmit={handleSubmit}
          ref={form}
        >
          <div
            className={`input-wrapper ${errors.name.length ? "has-error" : ""}`}
          >
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="John" name="name" id="name" />
            <span className="input-error">{errors.name}.</span>
          </div>
          <div
            className={`input-wrapper ${errors.age.length ? "has-error" : ""}`}
          >
            <label htmlFor="age">Age</label>
            <input type="number" placeholder="25" name="age" id="age" />
            <span className="input-error">{errors.age}</span>
          </div>
          <div
            className={`input-wrapper ${errors.email.length ? "has-error" : ""}`}
          >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="john@gmail.com"
              name="email"
              id="email"
            />
            <span className="input-error">{errors.email}</span>
          </div>
          <div
            className={`input-wrapper ${errors.password.length ? "has-error" : ""}`}
          >
            <div className="password-straight-wrapper">
              <span
                className="password-straight"
                style={{ width: `${indicatorWidth}%` }}
              ></span>
            </div>
            <label htmlFor="password">Password</label>
            <input
              type={isVisible ? "text" : "password"}
              placeholder="*****"
              name="password"
              id="password"
              ref={passwordInput}
              onInput={handlePasswordStraight}
            />
            <button onClick={handleVisiblePassword} type="button">
              {isVisible ? <Eye /> : <EyeOff />}
            </button>
            <span className="input-error">{errors.password}.</span>
          </div>
          <div
            className={`input-wrapper ${errors.passwordConfirm.length ? "has-error" : ""}`}
          >
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
            <span className="input-error">{errors.passwordConfirm}</span>
          </div>

          <div
            className={`radio-wrapper ${errors.gender.length ? "has-error" : ""}`}
          >
            Gender
            <div>
              <label htmlFor="male" className="radio-label">
                <input type="radio" name="gender" value="male" id="male" />
                Male
              </label>
              <label htmlFor="female" className="radio-label">
                <input type="radio" name="gender" value="female" id="female" />
                Female
              </label>
              <label htmlFor="other" className="radio-label">
                <input type="radio" name="gender" value="other" id="other" />
                Other
              </label>
            </div>
            <span className="input-error">{errors.gender}</span>
          </div>

          <div
            className={`input-wrapper ${errors.country.length ? "has-error" : ""}`}
          >
            <label htmlFor="country">Country</label>
            <input
              type="text"
              placeholder="USA"
              name="country"
              id="country"
              list="countries"
            />
            <datalist className="list" id="countries">
              {countries.map((country) => (
                <option className="list__option" value={country} key={country}>
                  {country}
                </option>
              ))}
            </datalist>
            <span className="input-error">{errors.country}</span>
          </div>

          <div
            className={`input-wrapper input-wrapper_file ${errors.file.length ? "has-error" : ""}`}
          >
            Avatar
            <label htmlFor="file">
              {preview ? "Select another file" : "Select file (*.png or *.jpg)"}
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
                name="file"
                ref={fileInputRef}
              />
            </label>
            {preview && (
              <div className="preview">
                <p>Selected:</p>
                <img src={preview} alt="Preview" />
              </div>
            )}
            <span className="input-error">{errors.file}.</span>
          </div>

          <div
            className={`checkbox-wrapper ${errors.terms.length ? "has-error" : ""}`}
          >
            <label htmlFor="terms">
              <input type="checkbox" id="terms" name="terms" />I agree to the
              Terms and Conditions
            </label>
            <span className="input-error">{errors.terms}</span>
          </div>

          <button
            className={`send ${isSuccess ? "success" : ""}`}
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
};

export { Uncontrolled };
