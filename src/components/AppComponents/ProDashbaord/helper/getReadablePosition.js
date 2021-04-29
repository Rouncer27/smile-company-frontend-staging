export default position => {
  const positionDisplay =
    position === "sterilizationAssistant"
      ? "Sterilization Assistant"
      : position === "admin"
      ? "Administration"
      : position === "rdh"
      ? "Registered Dental Hygienist"
      : position === "rda"
      ? "Registered Dental Assistant"
      : position === "orthoRda"
      ? "Ortho RDA"
      : ""

  return positionDisplay
}
