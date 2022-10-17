import React, { useState, Fragment } from "react";
import { array, func, object, number, string } from "prop-types";
import { navigate } from "@reach/router";
import FormInput from "./FormInput.js";
import SubmissionFormSection from "./SubmissionFormSection.js";
import SubmissionFormFinalSection from "./SubmissionFormFinalSection.js";

export function getEliminatedQueens(selections, sectionIndex) {
  createEliminatedDetailsObject(selections, sectionIndex)
  const weeks = Object.keys(selections);

  if (weeks.length > 0) {
    return weeks.map((week, index) => {
      return selections[week].eliminated;
    }, []);
  }

  return [];
}

export function createEliminatedDetailsObject(selections){
  return Object.keys(selections).reduce((obj, key) => {
    obj[selections[key].eliminated] = parseInt(key.replace('top', ""));
    return obj;
  }, {});
}

export function getNumberOfSections(numberInFinal, options) {
  const delta = options.length - numberInFinal;
  const numOfSections = delta > 0 ? delta : 0;
  return [...Array(numOfSections).keys()];
}

export function getSectionOptions(options, selections, sectionIndex) {
  return options.map((option) => {
    return option;
  });
}

export default function SubmissionForm({
  addSubmission,
  numberInFinal,
  options,
  seasonId,
  name,
  extraOptions,
  colors,
}) {
  const [formState, setFormState] = useState({ name: "", selections: {} });
  const numberOfSections = getNumberOfSections(numberInFinal, options);

  const handleSubmit = async (event) => {
    event.preventDefault();
    addSubmission(seasonId, formState);
    navigate(`/seasons/${seasonId}`);
  };

  const setName = (event) => {
    const { value: name } = event.target;

    setFormState({
      ...formState,
      name,
    });
  };

   const setEmail = (event) => {
    const { value: email } = event.target;

    formState.selections = {...formState.selections, email}
  };

  const setSelections = (selections) => {
    setFormState({
      ...formState,
      selections,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        handleOnChange={setName}
        labelText="Full Name"
        name="name"
        type="text"
        value={formState.name}
        colors={colors}
        required
      />
      <FormInput
        handleOnChange={setEmail}
        labelText="Email"
        name="name"
        type="text"
        value={formState.email}
        colors={colors}
      />
      {numberOfSections.reverse().map((num) => {
        // If it is the last week, render the Final section.
        return (
          <Fragment key={`section_${num}`}>
            <SubmissionFormSection
              formState={formState}
              options={getSectionOptions(options, formState.selections, num)}
              sectionIndex={num + 1 + numberInFinal}
              setSelections={setSelections}
              name={name}
              eliminated={getEliminatedQueens(formState.selections, num)}
              colors={colors}
              eliminatedWeeks={createEliminatedDetailsObject(formState.selections)}
            />

            {num === 0 && (
              <SubmissionFormFinalSection
                key={`section_${num}_finale`}
                formState={formState}
                extraOptions={extraOptions}
                options={getSectionOptions(options, formState.selections, num)}
                sectionIndex={num}
                setSelections={setSelections}
                name={name}
                eliminated={getEliminatedQueens(formState.selections, num)}
                colors={colors}
                eliminatedWeeks={createEliminatedDetailsObject(formState.selections)}
              />
            )}
          </Fragment>
        );
      })}
      <FormInput
        handleOnChange={() => null}
        labelText=""
        name="submit"
        type="submit"
        value="Submit"
        colors={colors}
      />
    </form>
  );
}

SubmissionForm.propTypes = {
  addSubmission: func,
  name: string,
  numberInFinal: number,
  extraOptions: array,
  options: array,
  seasonId: string,
  selections: object,
  setSelections: func,
};