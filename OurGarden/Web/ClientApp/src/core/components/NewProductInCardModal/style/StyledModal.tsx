import { withStyles } from "@material-ui/core/styles";
import Modal, {
  DialogActions,
  DialogContentText,
} from "@core/materialUI/modal";

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

const StyledDialogContentText = withStyles({
  root: {
    marginBottom: 0,
  },
})(DialogContentText);

export { StyledModal, StyledDialogActions, StyledDialogContentText };
