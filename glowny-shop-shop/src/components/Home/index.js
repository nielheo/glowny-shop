import React from 'react'

import Radium from 'radium'

const styles = {
  container: {
    backgroundColor: '#F0F0F0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'stretch',
    '@media (max-width: 640px)': {
      flexDirection: 'column',
    },
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  //  justifyContent: 'space-around',
    flexGrow: 6,
  },
  item: {
    backgroundColor: '#FFF0F0',
    padding: 10,
    margin: 5,
  },
}

class IndexPage extends React.Component {
  render() {
    return (
      <section style={styles.container}>
        <div style={styles.row}>
          <div style={styles.column}>
            <div style={styles.item}>Item 1.1</div>
            <div style={styles.item}>Item 1.2</div>
            <div style={styles.item}>Item 1.3</div>
            <div style={styles.item}>Item 1.4</div>
          </div>
          <div style={styles.column}>
            <div style={styles.item}>Item 2.1</div>
            <div style={styles.item}>Item 2.2</div>
            <div style={styles.item}>Item 2.3</div>
            <div style={styles.item}>Item 2.4</div>
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.column}>
            <div style={styles.item}>F o o t e r</div>
          </div>
        </div>
      </section>
    );
  }
}

export default Radium(IndexPage)
