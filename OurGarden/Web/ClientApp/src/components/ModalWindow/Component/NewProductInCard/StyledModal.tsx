import { withStyles } from "@material-ui/core/styles";
import Modal, { DialogActions } from "@core/materialUI/modal";

const StyledModal = withStyles({
  root: {
    pointerEvents: "none",
  },
  paper: {
    pointerEvents: "auto",
  },
  container: {
    alignItems: "flex-start",
  },
})(Modal);

const StyledDialogActions = withStyles({
  root: {
    padding: 18,
    flexWrap: "wrap",
  },
})(DialogActions);

export { StyledModal, StyledDialogActions };
