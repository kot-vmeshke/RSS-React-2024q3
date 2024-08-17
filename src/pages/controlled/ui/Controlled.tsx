import { useState } from "react";

import { useAppSelector } from "@/shared/store";
import { Eye, EyeOff } from "@/shared/ui/icons";

import "./Controlled.scss";

const Controlled = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const countries = useAppSelector((state) => state.countries);

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
        <form action="" className="control__form">
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
            <label htmlFor="countries">Country</label>
            <input
              type="text"
              placeholder="USA"
              name="country"
              list="countries-list"
              id="countries"
            />
            <datalist className="list" id="countries-list">
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
              <input type="checkbox" id="terms" />I agree to the Terms and
              Conditions
            </label>
            <span className="input-error">Something went wrong...</span>
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
