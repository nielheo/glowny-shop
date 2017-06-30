import React from 'react'

import FlatButton from 'material-ui/FlatButton'

const styles= {
  editButton: {
    width: 40,
  },
}

class VariantItem extends React.Component {
  render() {
    const { variant, onStartEdit } = this.props 
    return (
      <section>
        { variant.name }
        <FlatButton 
          label={'...'}
          onClick={onStartEdit.bind(this, variant.index)}
          //disabled={readOnly}
          style={styles.editButton}
        />
      </section>
    )
  }
}

export default VariantItem