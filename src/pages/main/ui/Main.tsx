import { useEffect, useRef } from "react";

import {
  addLastUpdated,
  formDataType,
  SubmitCard,
} from "@/features/submitHistory";
import { useAppDispatch, useAppSelector } from "@/shared/store";

import "./Main.scss";

const Main = () => {
  const formsResults = useAppSelector((state) => state.forms.forms);
  const lastUpdated = useAppSelector((state) => state.forms.lastUpdated);
  const dispatch = useAppDispatch();

  const lastUpdatedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      lastUpdatedRef.current
        ?.querySelector(".main__item")
        ?.classList.remove("highlighted");
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
            <span
              key={item.id}
              ref={item.id === lastUpdated ? lastUpdatedRef : null}
            >
              <SubmitCard {...item} />
            </span>
          ))
        ) : (
          <span style={{ gridColumn: "span 2" }}>
            There are no saved results eat, please go to one of forms (use
            navigation in header)
          </span>
        )}
      </div>
    </main>
  );
};

export { Main };
