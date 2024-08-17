import { useState } from "react";

import "./Controlled.scss";

const Controlled = () => {
  const [preview, setPreview] = useState<string | null>(null);

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

  return (
    <main className="control">
      <div className="container control__container">
        <form action="" className="control__form">
          <div className="input-wrapper">
            <label htmlFor="">Name</label>
            <input type="text" placeholder="John" name="name" />
            <span className="input-error">Something went wrong...</span>
          </div>
          <div className="input-wrapper">
            <label htmlFor="">Age</label>
            <input type="number" placeholder="25" name="age" />
            <span className="input-error">Something went wrong...</span>
          </div>
          <div className="input-wrapper">
            <label htmlFor="">Email</label>
            <input type="email" placeholder="john@gmail.com" name="email" />
            <span className="input-error">Something went wrong...</span>
          </div>
          <div className="input-wrapper">
            <label htmlFor="">Password</label>
            <input type="password" placeholder="*****" name="password" />
            <span className="input-error">Something went wrong...</span>
          </div>
          <div className="input-wrapper">
            <label htmlFor="">Confirm password</label>
            <input type="password" placeholder="*****" name="passwordConfirm" />
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
            <label htmlFor="">Country</label>
            <input type="text" placeholder="USA" name="country" />
            <div className="list">
              <div className="list__option">Poland</div>
              <div className="list__option">Ukraine</div>
            </div>
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

          <button className="send">Send</button>
        </form>
      </div>
    </main>
  );
};

export { Controlled };
