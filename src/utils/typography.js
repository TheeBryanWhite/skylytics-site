import Typography from "typography"

let bodyFontFamily = ["Raleway", "Helvetica", "Arial", "sans-serif"]; // Update with your real font stack
let headerFontFamily = bodyFontFamily;

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1,
  omitGoogleFont: true,
  headerFontFamily: headerFontFamily,
  bodyFontFamily: bodyFontFamily,
})
export default typography