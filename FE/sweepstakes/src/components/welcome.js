import React, { Component } from "react";
import "../styles/welcome.css";

class Welcome extends Component {
  state = {
    login: false,
    createAccount: false
  };

  render() {
    return (
      <div className="background">
        <main>
          <img
            src="https://ecommerceinsiders.com/wp-content/uploads/2015/06/sweepstakes.jpg"
            alt="Sweepstakes Logo"
            className="logo"
          />

          {Form({
            props: this.state,
            handleFormBtnClick: this.handleFormBtnClick,
            closeForm: this.closeForm
          })}
        </main>
      </div>
    );
  }

  handleFormBtnClick = e => {
    e.preventDefault();
    if (e.target.innerHTML === "Login") this.setState({ login: true });
    if (e.target.innerHTML === "Create Account")
      this.setState({ createAccount: true });

    if (e.target.id === "x") this.setState({
      login: false,
      createAccount: false
    });
  };

  closeForm = e => {
    e.preventDefault();
  };
}

const Form = ({ props, handleFormBtnClick }) => {
  function isFormOpen() {
    if (props.login || props.createAccount) return false;
    else return true;
  }

  return (
    <div id="main-form">
      <LoginForm props={props} handleFormBtnClick={handleFormBtnClick}/>
      {isFormOpen() && (
        <button className="main-form-button" id="login" onClick={handleFormBtnClick}>
          Login
        </button>
      )}
      {isFormOpen() && (
        <button className="main-form-button" id="createAcc" onClick={handleFormBtnClick}>
          Create Account
        </button>
      )}
      <CreateForm props={props} handleFormBtnClick={handleFormBtnClick} />
    </div>
  );
};

const LoginForm = ({ props, handleFormBtnClick }) => {
  const open = props.login;
  return (
    <form className={`login-Form ${open && "log-open"}`}>
      <button onClick={handleFormBtnClick} id="x" >&times;</button>
      <h2>login form</h2>
    </form>
  );
};

const CreateForm = ({ props, handleFormBtnClick }) => {
  const open = props.createAccount;
  return (
    <form className={`create-Form ${open && "create-open"}`}>
      <button onClick={handleFormBtnClick} id="x" >&times;</button>
      <h2>create account</h2>
    </form>
  );
};

export default Welcome;
