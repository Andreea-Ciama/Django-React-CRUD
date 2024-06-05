import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
  const logged_out_nav = (
    <div className="login-signup container">
      <button className="btn-custom" onClick={() => props.display_form('login')}>Login</button>
      <button className="btn-custom" onClick={() => props.display_form('signup')}>Signup</button>
    </div>
  );

  const logged_in_nav = (
    <div className="logout-btn">
      <button className="btn-custom" onClick={props.handle_logout}>Logout</button>
    </div>
  );

  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};

export default Nav;
