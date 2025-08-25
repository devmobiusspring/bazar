// ** MUI Imports
import { Theme } from "@mui/material/styles";

// ** Overrides Imports
import MuiButton from "./button";
import MuiList from "./list";
import MuiInput from "./input";
import MuiTextField from "./textField";
import MuiCard from "./card";
import MuiAppBar from "./appBar";
import MuiChip from "./chip";
import MuiMisc from "./misc";

const Overrides = (theme: Theme) => {
  const button = MuiButton(theme);
  const list = MuiList(theme);
  const input = MuiInput(theme);
  const textField = MuiTextField(theme);
  const card = MuiCard(theme);
  const appBar = MuiAppBar(theme);
  const chip = MuiChip(theme);
  const misc = MuiMisc(theme);

  return Object.assign(
    button,
    list,
    input,
    textField,
    card,
    appBar,
    chip,
    misc
  );
};

export default Overrides;
