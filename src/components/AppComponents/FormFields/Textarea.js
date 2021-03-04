import React from "react"
import styled from "styled-components"
import { Nav1Lavender, colors } from "../../../styles/helpers"

const Textarea = ({
  label,
  name,
  placeholder,
  required,
  value,
  onChange,
  fieldvalid,
  size,
}) => {
  return (
    <TextareaStyled size={size} fieldvalid={true}>
      <label id={`label-${name}`} htmlFor={name}>
        {label}
        {required && (
          <>
            &#42;<span> required field</span>
          </>
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
