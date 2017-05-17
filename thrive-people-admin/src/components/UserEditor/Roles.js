import React from 'react'

import Checkbox from 'material-ui/Checkbox'

const styles = {
  checkBox: {
    marginTop: 16,
  },

}

export default class Roles extends React.Component {
  render() {
    const { roles, superRoles } = this.props 
    return (
      <section>
        {
          superRoles.map(role =>
            <Checkbox
              key={role.id}
              label={role.title}
              style={styles.checkBox}
              disabled={role.disabled}
              checked={role.checked}
              onCheck={this.props.onSuperRoleChecked.bind(this, role.id)}
            />
            
          )
        }
        {
          roles.map(role =>
            <Checkbox
              key={role.id}
              label={role.title}
              style={styles.checkBox}
              disabled={role.disabled}
              checked={role.checked}
              onCheck={this.props.onRoleChecked.bind(this, role.id)}
            />
            
          )
        }
        
        
        
      </section>
    )
  }
}