import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useAppTranslation } from "@/hooks";
import { TransitionProps } from "@mui/material/transitions";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Grow from "@mui/material/Grow";

export type ReusableModalProps = {
  /**
   * This property will allow us to overwrite the dialog in case we need to use it
   * for other purposes.
   */
  dialogHeader?: React.ReactNode;
  /**
   * With this property, we'll be able to set a title
   */
  title?: string;
  /**
   * This property will allow us to set a subtitle, if needed, this property is optional
   */
  subtitle?: string;
  /**
   * This property will be used to pass a the state to the dialog, whether we need to open it or close it.
   */
  open: boolean;
  /**
   * This property will allow us to pass the action that we want to execute whenever we click the "Save" button
   */
  handleSave?: () => void;
  /**
   * This property will allow us to pass the action that we want to execute whenever we click the "Cancel" button
   */
  handleCancel?: () => void;
  /**
   * This property will allow us to pass the action that we want to execute whenever we are closing the Modal
   */
  handleClose?: () => void;

  /**
   * Boolean that will allow us to choose whether we want to render the button or not
   */
  disableSaveButton?: boolean;

  /**
   * If we pass this variable, the text in the main action button (the button in the right side) will be overwritten.
   */
  overwriteActionButtonText?: string;
  /**
   * This property will allow us to render the content within our Modal
   */
  children: React.ReactNode;

  optionsList?: OptionsListProps[];
};

export type DefaultDialogPropsTexts = {
  /**
   * This property will allow us to pass the text to our save button
   */
  save?: string;
  /**
   * This property will allow us to pass the text to our cancel button
   */
  cancel: string;
};

export type OptionsListProps = {
  key: string;
  option: JSX.Element;
  optionAction: (metadata: any) => void;
};

export type DefaultDialogProps = {
  /**
   * This property will alow us to pass the text to our subtitle, which is optional
   */
  subtitle?: string;
  /**
   * This property will allow us to pass the action that we want to execute whenever we click the "Cancel" button
   */
  handleCancel?: () => void;
  /**
   * This property will allow us to pass the action that we want to execute whenever we click the "Save" button
   */
  handleSave?: () => void;

  /**
   * Boolean that will allow us to choose whether we want to render the button or not
   */
  disableSaveButton?: boolean;

  /**
   * If we pass this variable, the text in the main action button (the button in the right side) will be overwritten.
   */
  overwriteActionButtonText?: string;
  /**
   * This property is meant to be to pass the translation properly to the default dialog header
   */
  texts: DefaultDialogPropsTexts;

  optionsList?: OptionsListProps[];
};

const DefaultDialogHeader = ({
  props,
  optionsProps,
}: {
  props: DefaultDialogProps;
  optionsProps: {
    openOptions: boolean;
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
    anchorEl: null | HTMLElement;
    handleOptionsClose: () => void;
  };
}) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignSelf="stretch"
      alignItems="center"
      height={"52px"}
      paddingTop={"8px"}
      paddingBottom={"8px"}
      paddingLeft={"4px"}
      paddingRight={"4px"}
    >
      <Button
        size="large"
        color="secondary"
        variant="text"
        onClick={props.handleCancel}
        sx={{
          textTransform: "capitalize",
        }}
      >
        {props.texts.cancel}
      </Button>
      {props.subtitle && (
        <Typography
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            margin: "auto",
            width: "fit-content",
          }}
          variant="body1"
          color="text.secondary"
        >
          {props.subtitle}
        </Typography>
      )}
      <Box>
        {props.optionsList && (
          <>
            <IconButton
              id="button"
              aria-controls={
                optionsProps.openOptions ? "basic-menu" : undefined
              }
              aria-expanded={optionsProps.openOptions ? "true" : undefined}
              aria-haspopup="true"
              onClick={optionsProps.handleClick}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id="options"
              MenuListProps={{
                "aria-labelledby": "options",
              }}
              anchorEl={optionsProps.anchorEl}
              open={optionsProps.openOptions}
              onClose={optionsProps.handleOptionsClose}
            >
              {(props?.optionsList || [])?.map((option) => (
                <MenuItem key={option.key} onClick={option.optionAction}>
                  {option.option}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
        {!props.disableSaveButton && (
          <Button
            size="large"
            color="primary"
            variant="text"
            onClick={props.handleSave}
            sx={{
              textTransform: "capitalize",
            }}
          >
            {props?.overwriteActionButtonText
              ? props?.overwriteActionButtonText
              : props.texts.save}
          </Button>
        )}
      </Box>
    </Box>
  );
};

const DefaultDialogHeaderContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return children;
};

/**
 * @example
 <LocalModal
  title="Example"
  open={open}
  handleClose={() => setOpen(false)}
  handleCancel={() => setOpen(false)}
  handleSave={() => setOpen(false)}
  disableSaveButton={false}
  overwriteActionButtonText="Texto Largo"
  subtitle="Optional Subtitle"
  >
    <>
    </>
  </LocalModal>
 * @returns {React.FC<ReusableModalProps>} Returns Functional Component
 */

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LocalModal: React.FC<ReusableModalProps> = ({
  title,
  subtitle,
  open,
  handleSave,
  handleCancel,
  handleClose,
  dialogHeader,
  children,
  disableSaveButton,
  overwriteActionButtonText,
  optionsList,
  ...props
}) => {
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const { t } = useAppTranslation();

  // ---- FOR OPTIONS (...) ----
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openOptions = Boolean(anchorEl);
  const handleOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOptionsClose = () => {
    setAnchorEl(null);
  };
  // ---- FOR OPTIONS (...) ----

  const fullScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="scroll-dialog-header"
      aria-describedby="scroll-dialog-content"
      fullWidth={true}
      fullScreen={fullScreen}
      TransitionComponent={Transition}
      sx={
        fullScreen
          ? {
              ".MuiDialog-container": {
                paddingTop: "16px",
              },
              ".MuiDialog-paper": (theme) => ({
                borderRadius: "12px 12px 0 0",
                backgroundColor: theme.palette.common.white,
              }),
            }
          : {
              ".MuiDialog-paper": (theme) => ({
                backgroundColor: theme.palette.common.white,
                //maxWidth: "712px",
              }),
            }
      }
      TransitionProps={{
        onEntered: () => {
          const div = descriptionElementRef.current;
          const handleScroll = (e: any) => {
            setIsScrollingUp(e.target.scrollTop > 0);
          };
          div?.addEventListener("scroll", handleScroll);
        },
        onExited: () => {
          setIsScrollingUp(false); // Reset scrolling state when modal exits
        },
      }}
    >
      {dialogHeader ? (
        <DialogTitle id="scroll-dialog-header" sx={{ padding: 0 }}>
          {dialogHeader}
        </DialogTitle>
      ) : (
        <DialogTitle id="scroll-dialog-header" sx={{ padding: 0 }}>
          <DefaultDialogHeaderContainer>
            <DefaultDialogHeader
              props={{
                subtitle: subtitle,
                handleCancel: handleCancel,
                handleSave: handleSave,
                disableSaveButton: disableSaveButton,
                overwriteActionButtonText: overwriteActionButtonText,
                texts: {
                  cancel: t("components.modals.localModal.cancel"),
                  save: t("components.modals.localModal.save"),
                },
                optionsList: optionsList,
              }}
              optionsProps={{
                openOptions: openOptions,
                handleClick: handleOptionsClick,
                anchorEl: anchorEl,
                handleOptionsClose: handleOptionsClose,
              }}
            />
          </DefaultDialogHeaderContainer>
        </DialogTitle>
      )}
      <DialogContent
        id="scroll-dialog-content"
        dividers={isScrollingUp}
        ref={descriptionElementRef}
        tabIndex={-1}
        sx={{
          padding: "16px",
          "&.MuiDialogContent-dividers": {
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        {title && (
          <Typography
            variant="h4"
            sx={{ paddingTop: "8px", paddingBottom: "16px" }}
          >
            {title}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            gap: "8px",
            paddingTop: "16px",
          }}
        >
          {children}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LocalModal;
