import React from "react";
import { object } from "prop-types";

import SubmissionWeekPositions from "Components/SubmissionWeekPositions";

export default function SubmissionWeeks({ submission, isShown }) {
  const weekKeys = Object.keys(submission);
  console.log("isShown", isShown);
  return (
    <ul className={`submission-weeks ${isShown ? "active" : "inactive"}`}>
      {weekKeys.map((week, index) => (
        <li key={week} className="submissionWeek">
          <SubmissionWeekPositions week={submission[week]} weekIndex={index} />
        </li>
      ))}
    </ul>
  );
}

SubmissionWeeks.propTypes = {
  submission: object
};
