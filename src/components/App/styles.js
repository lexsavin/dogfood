export const stylesMain = ({ isPathNotFound }) => ({
  padding: "20px 0",
  flexGrow: "1",
  maxWidth: "1024px",
  paddingLeft: "16px",
  paddingRight: "16px",
  width: "95%",
  margin: "0 auto",
  display: isPathNotFound ? "flex" : "block",
  justifyContent: "center",
  alignItems: "center",
});
