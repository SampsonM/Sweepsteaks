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
    if (e.preventDefault) {
      e.preventDefault();
      if (e.target.innerHTML === "Login") this.setState({ login: true });
      if (e.target.innerHTML === "Create Account")
        this.setState({ createAccount: true });

      if (e.target.id === "x")
        this.setState({
          login: false,
          createAccount: false
        });
    }
  };

  closeForm = e => {
    e.preventDefault();
  };
}

const Form = ({ props, handleFormBtnClick }) => {
  const open = props.login || props.createAccount;

  return (
    <div id="main-form">
      <LoginForm props={props} handleFormBtnClick={handleFormBtnClick} />
      <button
        className="main-form-button"
        id="login"
        onClick={handleFormBtnClick}
      >
        Login
      </button>
      <button
        className="main-form-button"
        id="createAcc"
        onClick={handleFormBtnClick}
      >
        Create Account
      </button>
      <CreateForm props={props} handleFormBtnClick={handleFormBtnClick} />
    </div>
  );
};

const LoginForm = ({ props, handleFormBtnClick }) => {
  const open = props.login;
  return (
    <div className={open ? "login-open" : "login-hide"}>
      <button onClick={handleFormBtnClick} id="x">
        &times;
      </button>
      <form>
        <input type="text" />
      </form>
    </div>
  );
};

const CreateForm = ({ props, handleFormBtnClick }) => {
  const open = props.createAccount;
  return (
    <div className={open ? "create-open" : "create-hide"}>
      <button onClick={handleFormBtnClick} id="x">
        &times;
      </button>

      <form id="create-page-form">
        <input type="text" />
      </form>
    </div>
  );
};

export default Welcome;
