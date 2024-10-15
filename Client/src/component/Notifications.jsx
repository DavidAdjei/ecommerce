import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { useState } from 'react';
import { Badge, IconButton, Menu, MenuItem, List, ListItem, ListItemText, Card, CardContent, Typography, Divider } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Notifications = ({ notifications }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Badge with notification count */}
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* Styled Notification Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '300px',  // Set the width of the notification panel
            maxHeight: '400px', // Set max height with scrollable overflow
          },
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <Divider />
            <List dense>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="body2" fontWeight="bold">
                            {notification.type}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            {notification.content}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))
              ) : (
                <MenuItem>No new notifications</MenuItem>
              )}
            </List>
          </CardContent>
        </Card>
      </Menu>
    </>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    notifications: state.auth.notifications,
})


export default connect(mapStateToProps, {})(Notifications)