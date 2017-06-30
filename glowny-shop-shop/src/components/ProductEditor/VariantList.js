import React from 'react'

import VariantItem from './VariantItem'

const styles = {
  row: {
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 12,
    width: '100%',
  },
  container: {
    width: '100%',
  },
}

class VariantList extends React.Component {

  render() {
    const { variants, onStartEdit } = this.props
    return(
      <section style={styles.container}>
        {variants && variants.map(variant => { 
          return (
            <div style={styles.row} >
              <VariantItem 
                variant={variant} 
                //readOnly={editIndex !== -1} 
                onStartEdit={onStartEdit}
                key={variant.index}
              />
            </div>)
        })}
      </section>
    )
  }

}

export default VariantList