export default location => {
  const positionDisplay =
    location === "nwNeSwSeCalgary"
      ? "NW NE SW SE Calgary"
      : location === "innerCityCalgary"
      ? "Inner City Calagry"
      : location === "airdrie"
      ? "Airdrie"
      : location === "chestermere"
      ? "Chestermere"
      : location === "cochrane"
      ? "Cochrane"
      : location === "okotoks"
      ? "Okotoks"
      : location === "banff"
      ? "Banff"
      : ""

  return positionDisplay
}
