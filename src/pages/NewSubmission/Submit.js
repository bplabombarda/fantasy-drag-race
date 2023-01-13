import React from "react"

const Submit = ({validate}) => {
    return (
    <input
        id="new-submission"
        onChange={() => null}
        onClick={ validate}
        name="submit"
        type="submit"
        value="Submit"
        className="pink-button form-button"
      />
    );
}

export default Submit