import { FC } from "react";

import { useAppSelector } from "@/shared/store";

import type { formDataType } from "../model";

const SubmitCard: FC<formDataType> = ({
  id,
  name,
  file,
  age,
  country,
  gender,
  email,
  password,
}) => {
  const lastUpdated = useAppSelector((state) => state.forms.lastUpdated);

  return (
    <div className={`main__item ${id === lastUpdated ? "highlighted" : ""}`}>
      <div className="main__item-img">
        <img src={file} alt="" />
      </div>
      <div className="main__item-data">
        <h3 className="main__item-name">{name}</h3>
        <p className="main__item-text">
          <b>Age:</b> {age}
        </p>
        <p className="main__item-text">
          <b>Country:</b> {country}
        </p>
        <p className="main__item-text">
          <b>Gender:</b> {gender}
        </p>
        <p className="main__item-text">
          <b>Email:</b> {email}
        </p>
        <p className="main__item-text">
          <b>Password:</b> {password}
        </p>
      </div>
    </div>
  );
};

export { SubmitCard };
