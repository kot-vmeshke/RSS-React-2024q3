import { useEffect, useRef } from "react";

import { formDataType } from "@/pages/uncontrolled/model/types";
import { useAppSelector } from "@/shared/store";

import "./Main.scss";

const Main = () => {
  const formsResults = useAppSelector((state) => state.forms);

  const lastAddedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      lastAddedRef.current?.classList.remove("highlighted");
    }, 1000);
  }, []);

  return (
    <main className="main">
      <div className="container main__container">
        {formsResults.length ? (
          formsResults.map((item: formDataType, index: number) => (
            <div
              className={`main__item ${index === 0 ? "highlighted" : ""}`}
              key={item.name}
              ref={index === 0 ? lastAddedRef : null}
            >
              <div className="main__item-img">
                <img src={item.file} alt="" />
              </div>
              <div className="main__item-data">
                <h3 className="main__item-name">{item.name}</h3>
                <p className="main__item-text">
                  <b>Age:</b> {item.age}
                </p>
                <p className="main__item-text">
                  <b>Country:</b> {item.country}
                </p>
                <p className="main__item-text">
                  <b>Gender:</b> {item.gender}
                </p>
                <p className="main__item-text">
                  <b>Email:</b> {item.email}
                </p>
                <p className="main__item-text">
                  <b>Password:</b> {item.password}
                </p>
              </div>
            </div>
          ))
        ) : (
          <span style={{ gridColumn: "span 2" }}>
            There is no saved results eat, please go to one of forms (use
            navigation in header)
          </span>
        )}
      </div>
    </main>
  );
};

export { Main };
