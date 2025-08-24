// ** MUI Imports
import { Theme } from "@mui/material/styles";

// ** Overrides Imports
import MuiButton from "./button";
import MuiList from "./list";
import MuiInput from "./input";
import MuiTextField from "./textField";

const Overrides = (theme: Theme) => {
  const button = MuiButton(theme);
  const list = MuiList(theme);
  const input = MuiInput(theme);
  const textField = MuiTextField(theme);

  return Object.assign(
    list,
    button,
    input,
    textField
  );
};

export default Overrides;
