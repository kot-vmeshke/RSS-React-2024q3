import { useEffect, useRef } from "react";

import { addLastUpdated } from "@/pages/uncontrolled/model";
import { formDataType } from "@/pages/uncontrolled/model/types";
import { useAppDispatch, useAppSelector } from "@/shared/store";

import "./Main.scss";

const Main = () => {
  const formsResults = useAppSelector((state) => state.forms.forms);
  const lastUpdated = useAppSelector((state) => state.forms.lastUpdated);
  const dispatch = useAppDispatch();

  const lastUpdatedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      lastUpdatedRef.current?.classList.remove("highlighted");
      dispatch(addLastUpdated(""));
    }, 1000);
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="main">
      <div className="container main__container">
        {formsResults.length ? (
          formsResults.map((item: formDataType) => (
            <div
              className={`main__item ${item.id === lastUpdated ? "highlighted" : ""}`}
              key={item.name}
              ref={item.id === lastUpdated ? lastUpdatedRef : null}
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
