import React, { useReducer } from "react";
import getComponent from "../../componentResolver";
import styles from "./form.module.css";

const DEFAULT_STATE = {
  firstName: "",
  orgNo: "",
  mobileNo: "",
  email: "",
  consent: false,
  status: "IDLE",
  stage: 1,
  stageCount: 1
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateFieldValue":
      return { ...state, [action.field]: action.value };
    case "updateStatus":
      return {
        ...state,
        status: action.status
      };
    case "nextStage":
      return {
        ...state,
        stage: state.stage + 1
      };
    case "prevStage":
      return {
        ...state,
        stage: state.stage - 1
      };

    case "reset":
    default:
      return INITIAL_STATE;
  }
};

const Form = ({ location }) => {
  const config = new URLSearchParams(location.search);
  const queryData = JSON.parse(config.get("queryData"));

  const INITIAL_STATE = () => {
    if (!queryData) return DEFAULT_STATE;
    const obj = {};

    queryData.stages.forEach(stage => {
      stage.components.forEach(component => {
        obj[component.fieldName] = component.defaultValue;
      });
    });
    obj.stageCount = queryData.stages.length;
    obj.stage = 1;
    return obj;
  };
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE());
  queryData.stages[0].components.sort((a, b) => a - b);

  const onApply = event => {
    event.preventDefault();
    console.log("Submitted! State:", state);
  };

  const onSubmit = event => {
    event.preventDefault();
    if (state.stage < state.stageCount) {
      dispatch({ type: "nextStage" });
    } else {
      return;
    }
  };

  const setStatus = status => {
    dispatch({ type: "updateStatus", status });
  };

  const nextStage = () => {
    dispatch({ type: "nextStage" });
  };

  const prevStage = () => {
    dispatch({ type: "prevStage" });
  };

  const updateFieldValue = field => event => {
    if (field !== "consent") {
      dispatch({
        type: "updateFieldValue",
        field,
        value: event.target.value
      });
    } else {
      dispatch({
        type: "updateFieldValue",
        field,
        value: event.target.checked
      });
    }
  };
  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        {queryData.stages[state.stage - 1].components
          .sort((a, b) => a.sortNo - b.sortNo)
          .map(component => {
            component.handler = updateFieldValue;
            component.value = state[component.fieldName];
            return getComponent(component);
          })}
      </form>
      <div className={styles.buttons}>
        {state.stage > 1 && (
          <button className={styles.button} onClick={prevStage}>
            Back
          </button>
        )}
        {state.stage < state.stageCount && (
          <button className={`${styles.button} ${styles.primary}`} onClick={nextStage}>
            Next
          </button>
        )}
        {state.stage === state.stageCount && (
          <button type="submit" className={`${styles.button} ${styles.primary}`} onClick={onApply}>
            Apply
          </button>
        )}
      </div>
    </>
  );
};

export default Form;
