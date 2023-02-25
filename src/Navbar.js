import React from 'react';

const Navbar = (props) => {
  console.log('props', props);
  return (
    <div style={styles.nav}>
      <div style={styles.cartIconContainer}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXjW2gKXSF3yxcXEKLndj3mwhjLcROiUtSrW6Lobk&s" style={styles.cartIcon} />
        <span style={styles.cartCount}>{props.count}</span>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    height: 70,
    background:  '#4267b2',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cartIcon: {
    height: 32,
    marginRight: 20
  },
  cartIconContainer: {
    position: 'relative'
  },
  cartCount:  {
    background: 'yellow',
    borderRadius: '50%',
    padding:  '4px 8px',
    position: 'absolute',
    right: 0,
    top: -9
  }
};

export default Navbar;