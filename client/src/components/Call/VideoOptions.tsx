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

const VideoOptions = ({ showControls }: { showControls: boolean }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      {showControls && (
        <>
          <IconButton
            style={{ color: "white" }}
            aria-label="more"
            id="long-button"
            aria-controls={open ? "menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>
              <CopyToClipboard
                text={`${window.location.href.replace("/call", "")}`}
              >
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
