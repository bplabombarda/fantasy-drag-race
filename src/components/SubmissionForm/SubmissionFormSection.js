import React  from 'react';
import { array, func, number, object } from 'prop-types';

import FormSelect from './SubmissionFormSelect';
import './SubmissionFormSection.scss';

function FormSection ({ formState, options, sectionIndex, setSelections }) {

  const getInputOptions = inputName => {
    const currentWeek = formState[sectionIndex]  || {};
    const slots = Object.keys(currentWeek);
    const selectedThisWeek = slots.reduce((names, slot) => {
      const queen = currentWeek[slot] && currentWeek[slot].name;
      if (queen && slot !== inputName) names.push(queen);

      return names;
    }, []);

    return options.filter(({ name }) => !selectedThisWeek.includes(name));
  }

  const selectOption = (type, selectedOptionName) => {
    const selectedOption = options.find(name => {
      return name === selectedOptionName;
    });

    const sectionKey = `week${sectionIndex}`;

    const newSelections = {
      ...formState.selections,
      [sectionKey]: {
        ...formState.selections[sectionKey],
        [type]: selectedOption,
      },
    };

    setSelections(newSelections);
  }

  return (
    <section>
      <FormSelect
        labelText='Choose the winning queen:'
        name='winner'
        options={ getInputOptions('winner') }
        selectOption={ selectOption }
        />
      <FormSelect
        labelText='Choose the second top queen:'
        name='eliminated'
        options={ getInputOptions('eliminated') }
        selectOption={ selectOption }
        />
      <FormSelect
        labelText='Choose the second bottom queen:'
        name='bottom'
        options={ getInputOptions('bottom') }
        selectOption={ selectOption }
        />
      <FormSelect
        labelText='Choose the eliminated queen :'
        name='eliminated'
        options={ getInputOptions('eliminated') }
        selectOption={ selectOption }
        />
    </section>
  )
}

FormSection.propTypes = {
  formState: object,
  options: array,
  sectionIndex: number,
  setSelections: func,
};

export default FormSection;
