import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Nav1Lavender, colors } from "../../styles/helpers"

const Textarea = ({
  label,
  name,
  placeholder,
  required,
  value,
  onChange,
  error,
  size,
}) => {
  const [currentFieldVal, setCurrentFieldVal] = useState({
    valid: true,
    message: "",
  })

  useEffect(() => {
    if (error !== "") {
      setCurrentFieldVal({ valid: false, message: error })
    }
  }, [error])

  const handleOnFocus = () => {
    setCurrentFieldVal({
      valid: true,
      message: "",
    })
  }
  return (
    <TextareaStyled size={size} fieldvalid={currentFieldVal.valid}>
      <label id={`label-${name}`} htmlFor={name}>
        {label}
        {required && (
          <>
            &#42;<span> required field</span>
          </>
        )}
        {!currentFieldVal.valid && (
          <p className="errorMessage">{currentFieldVal.message}</p>
        )}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        rows="5"
        required={required}
        value={value}
        onChange={onChange}
        onFocus={handleOnFocus}
      />
    </TextareaStyled>
  )
}

const TextareaStyled = styled.div`
  position: relative;
  width: 100%;
  padding-top: 3rem;

  @media (min-width: 768px) {
    width: ${props =>
      props.size === "full" ? " calc(100% - 1.5rem)" : " calc(50% - 1.5rem)"};
  }

  label {
    ${Nav1Lavender};
    display: block;
    width: 100%;
  }

  .errorMessage {
    ${Nav1Lavender};
    position: absolute;
    top: 1.5rem;
    left: 0;
    margin: 0;
    color: rgba(255, 0, 0, 1);

    @media (min-width: 768px) {
      top: 1rem;
    }
  }

  textarea {
    width: 100%;
    padding: 1rem 2rem;
    border: 0.2rem solid ${colors.colorSecondary};
    border-color: ${props =>
      props.fieldvalid ? colors.colorSecondary : "#f00"};
    border-radius: 1rem;
    box-shadow: ${props =>
      props.fieldvalid
        ? "0 0 0 0 rgba(1, 0, 0, 0.5)"
        : "0 3px 6px 0 rgba(255, 0, 0, 0.5)"};
    background-color: rgba(208, 204, 202, 0.25);

    &:focus {
      outline: none;
      border-color: ${colors.colorTertiary};
    }

    &::placeholder {
      color: ${colors.colorAccent};
    }
  }
`

export default Textarea
