import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/shared/store";
import { Eye, EyeOff } from "@/shared/ui/icons";

import { addToSubmitHistory } from "../model";

import "./Uncontrolled.scss";

const Uncontrolled = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const countries = useAppSelector((state) => state.countries);
  const [isVisible, setIsVisible] = useState(false);

  const form = useRef<HTMLFormElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formSubmitted = form.current;
    if (formSubmitted) {
      const formData = new FormData(formSubmitted);

      if (fileInputRef.current?.files?.[0]) {
        const file = fileInputRef.current.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result as string;
          formData.set("file", base64String);

          const object: Record<string, FormDataEntryValue> = {};
          for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
            object[pair[0]] = pair[1];
          }

          dispatch(addToSubmitHistory(object));
          navigate("/");
        };

        reader.readAsDataURL(file);
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
          <div className="input-wrapper">
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="John" name="name" id="name" />
            <span className="input-error">Something went wrong...</span>
          </div>
          <div className="input-wrapper">
            <label htmlFor="age">Age</label>
            <input type="number" placeholder="25" name="age" id="age" />
            <span className="input-error">Something went wrong...</span>
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="john@gmail.com"
              name="email"
              id="email"
            />
            <span className="input-error">Something went wrong...</span>
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type={isVisible ? "text" : "password"}
              placeholder="*****"
              name="password"
              id="password"
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

          <div className="radio-wrapper">
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
            <span className="input-error">Something went wrong...</span>
          </div>

          <div className="input-wrapper">
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
            <span className="input-error">Something went wrong...</span>
          </div>

          <div className="input-wrapper input-wrapper_file">
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
            <span className="input-error">Something went wrong...</span>
          </div>

          <div className="checkbox-wrapper">
            <label htmlFor="terms">
              <input type="checkbox" id="terms" name="terms" />I agree to the
              Terms and Conditions
            </label>
            <span className="input-error">Something went wrong...</span>
          </div>

          <button className="send">Send</button>
        </form>
      </div>
    </main>
  );
};

export { Uncontrolled };
