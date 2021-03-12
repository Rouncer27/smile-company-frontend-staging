export default expereince => {
  const expereinceDisplay =
    expereince === "oneYear"
      ? "Less than one year"
      : expereince === "twoFiveYear"
      ? "1 to 5 years"
      : expereince === "sixNineYear"
      ? "6 to 9 years"
      : expereince === "tenPlus"
      ? "10 years +"
      : ""

  return expereinceDisplay
}
