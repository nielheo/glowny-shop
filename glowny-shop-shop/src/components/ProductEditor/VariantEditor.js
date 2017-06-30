import React from 'react'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  row: {
    width: '100%',
  },
  rowVariants: {
    width: '100%',
    marginTop: 12,
  },
  container: {
    width: '100%',
  },
  rowButton: {
    width: '100%',
    marginTop: 12,
  },
  variantButton: {
    marginLeft: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  variTextField: {
    marginLeft: 12,
    width: 160,
  },
}

class VariantEditor extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      index: props.variant.index,
      name: props.variant.name,
      variants: props.variant.variants,
      newVari: '',
    }
  }

  _handleAddVari = () => {
    this.setState({
      variants: [...this.state.variants, this.state.newVari],
    })
  }

  _handleVariChanged = (_, value) => {
    this.setState({
      newVari: value,
    })
  }

  render() {
    //const { variant } = this.props
    return(
      <section style={styles.container}>
        <div style={styles.row} >
          <TextField 
            id={'variantName'}
            hintText='Variant Name'
            floatingLabelText='Name'
            defaultValue={this.state.name}
          />
        </div>
        <div style={styles.rowVariants} >
          Variants 
          {
            this.state.variants.map(vari => {
              return (<RaisedButton 
                label={vari}
                primary={true}
                style={styles.variantButton}
              />)
            })
          }
          <TextField 
            id='vari'
            style={styles.variTextField}
            
            value={this.state.newVari}
            onChange={this._handleVariChanged.bind(this)}
            //hintText='Variant Name'
            //floatingLabelText='Name'
            //defaultValue={variant.name}
          />
          <FlatButton 
            label='Add'
            onTouchTap={this._handleAddVari}
          />
        </div>
      </section>
    )
  }
}

export default VariantEditor