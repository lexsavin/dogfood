import { forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function AlertModal({
  showSuccessfulRegistration,
  setShowSuccessfulRegistration,
  onClickLoginButton,
}) {
  const navigate = useNavigate();

  const handleClose = () => {
    setShowSuccessfulRegistration(false);
    navigate("/");
  };

  return (
    <div>
      <Dialog
        open={showSuccessfulRegistration}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Уведомление"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Вы успешно зарегистрировались!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              textTransform: "none",
              fontSize: "14px",
              lineHeight: "20px",
              cursor: "pointer",
              color: "#1a1a1a",
            }}
            onClick={onClickLoginButton}
          >
            Войти
          </Button>
          <Button
            sx={{
              textTransform: "none",
              fontSize: "14px",
              lineHeight: "20px",
              cursor: "pointer",
              color: "#1a1a1a",
            }}
            onClick={handleClose}
          >
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
