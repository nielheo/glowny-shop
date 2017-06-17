import React from 'react';

import AppBar from 'material-ui/AppBar'
import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'
import Badge from 'material-ui/Badge'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'


const dataSource1 = [
  {
    text: 'text-value1',
    value: (
      <MenuItem
        primaryText="text-value1"
        secondaryText="&#9786;"
      />
    ),
  },
  {
    text: 'text-value2',
    value: (
      <MenuItem
        primaryText="text-value2"
        secondaryText="&#9786;"
      />
    ),
  },
];

const style = {
  divider: {
    marginTop: 20,
  },
}

export default class IndexPage extends React.Component {
  render() {
    return (
      <section>
        <div style={style.divider}>AppBar</div>
        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />

        <div style={style.divider}>AutoComplete</div>
        <AutoComplete
          hintText="Type anything"
          dataSource={dataSource1}
        />


        <div style={style.divider}>Badge</div>
        <div>
          <Badge
            badgeContent={4}
            primary={true}
          >
            <NotificationsIcon />
          </Badge>
          <Badge
            badgeContent={10}
            secondary={true}
            badgeStyle={{top: 12, right: 12}}
          >
            <IconButton tooltip="Notifications">
              <NotificationsIcon />
            </IconButton>
          </Badge>
        </div>

        <div style={style.divider}>FlatButton</div>
        <div>
          <FlatButton label="Default" />
          <FlatButton label="Primary" primary={true} />
          <FlatButton label="Secondary" secondary={true} />
          <FlatButton label="Disabled" disabled={true} />
          <br />
          <br />
          <FlatButton label="Full width" fullWidth={true} />
        </div>
      </section>
    );
  }
}
