import React from 'react';

import SubmissionForm from 'Components/SubmissionForm';
import { object, string, func } from 'prop-types';

export default function SubmissionNew ({ addSubmission, path, seasonId, seasonObject }) {
  const { queens, queensInFinale } = seasonObject;

  const getTitle = (path) => {
    const isEdit = path.endsWith('/edit');
    const isNew = path.endsWith('/new');

    if (isEdit) {
      return 'Edit Submission';
    }

    if (isNew) {
      return 'New Submission';
    }

    return 'Submission';
  }

  return (
    <>
      <h3>{ getTitle(path) }</h3>
      <SubmissionForm
        addSubmission={ addSubmission }
        numberInFinal={ queensInFinale }
        options={ queens || [] }
        seasonId={ seasonId }
      />
    </>
  );
}

SubmissionNew.propTypes = {
  addSubmission: func,
  path: string,
  seasonId: string,
  seasonObject: object,
};