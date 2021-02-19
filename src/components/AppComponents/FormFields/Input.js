import React, { useEffect, useState } from "react"
import styled from "styled-components"

import { fontSizer, colors, Nav1Lavender } from "../../../styles/helpers"

const Input = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  fieldvalid,
  size,
  required,
}) => {
  const [currentFieldVal, setCurrentFieldVal] = useState({
    fieldName: name,
    valid: true,
    message: "",
  })
  // useEffect(() => {
  //   const currentField = fieldvalid.find(field => field.fieldName === name)
  //   if (currentField) {
  //     setCurrentFieldVal({ ...currentField })
  //   }
  // }, [fieldvalid])

  const handleOnFocus = () => {
    // setCurrentFieldVal({
    //   fieldName: name,
    //   valid: true,
    //   message: "",
    // })
  }

  const handleOnBlur = () => {
    // const currentField = fieldvalid.find(field => field.fieldName === name)
    // if (currentField && currentFieldVal.valid !== currentField.valid) {
    //   setCurrentFieldVal({ ...currentField })
    // }
  }

  return (
    <InputFieldStyled size={size} fieldvalid={currentFieldVal.valid}>
      <label id="input-fields-label" htmlFor={name}>
        {label}
        {required && (
          <>
            &#42;<span> required field</span>
          </>
        )}
      </label>
      {!currentFieldVal.valid && (
        <p className="errorMessage">{currentFieldVal.message}</p>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </InputFieldStyled>
  )
}

const InputFieldStyled = styled.div`
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
    ${fontSizer(1.2, 1.4, 76.8, 150, 1.2)};
    position: absolute;
    top: 1.5rem;
    left: 0;
    margin: 0;
    color: ${colors.strongRed};

    @media (min-width: 768px) {
      top: 1rem;
    }
  }

  input {
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

export default Input
