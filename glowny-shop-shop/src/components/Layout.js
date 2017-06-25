import React from 'react'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'

import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import Header from './Header'
import { withRouter } from 'react-router'
import { getUserToken } from './Common/Cookies'

const styles = {
  container: {
    padding: 15,
    paddingTop: 20,
  },
  /*drawer: {
    backgroundColor: '#FFD600',
  },
  AppBar: {
    backgroundColor: fullBlack,
  },*/
};

class LayoutPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  _navigationClickHandler = () => this.setState({ open: !this.state.open })
  _handleClose = () => this.setState({ open: false })

  render() {
    return (
      <div>
        <Header onNavigationClick={this._navigationClickHandler} />
        <Drawer
          docked={false}
          width={250}
          open={this.state.open}
          containerStyle={styles.drawer}
          onRequestChange={(open) => this.setState({ open })}
        >
          <AppBar iconElementLeft={<span></span>} title='Glowny Clothing' style={styles.AppBar} />
          <Menu>
            <MenuItem href='/' primaryText='Home' />
            <MenuItem href='/product' primaryText='Products' />
            { getUserToken() 
              ? <MenuItem href='/logout' primaryText='Log Out' />
              : <MenuItem href='/login' primaryText='Login' />
            }
          </Menu>
        </Drawer>
        <div style={styles.container}>{this.props.children}</div>
        <Snackbar
            open={this.props.snackbarOpen}
            message={this.props.snackbarMessage}
            autoHideDuration={2500}
            onRequestClose={this.handleRequestClose}
          />
      </div>
    );
  }
}

const stateToProps = (state) => ({
  snackbarOpen: state.homeReducer.snackbarOpen,
  snackbarMessage: state.homeReducer.snackbarMessage,
})

const layoutPageRedux = withRouter(connect(
  stateToProps,
)(LayoutPage))

export default layoutPageRedux
