import React, { useState } from "react";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { ContentCopy, MoreVert } from "@mui/icons-material";
import CopyToClipboard from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";

const VideoOptions = ({
  showControls,
  setOptionsOpened,
}: {
  showControls: boolean;
  setOptionsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
    setOptionsOpened(false);
  };

  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      {showControls && (
        <>
          <IconButton
            style={{ color: "white" }}
            aria-label="more"
            aria-controls={open ? "menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
              setOptionsOpened(true);
            }}
          >
            <MoreVert style={{ fontSize: "30px" }} />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>
              <CopyToClipboard text={window.location.href.replace("/call", "")}>
                <ListItemIcon
                  onClick={() =>
                    enqueueSnackbar("Room Link copied to clipboard")
                  }
                  aria-label="Copy Room Link"
                >
                  <ContentCopy fontSize="large" />
                  <Typography>Copy Link</Typography>
                </ListItemIcon>
              </CopyToClipboard>
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  );
};

export default VideoOptions;
