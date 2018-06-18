import React, { Component } from 'react';
import '../styles/welcome.css';

class Welcome extends Component {
  state = {
    login: false,
    createAccount: false
  };

  render () {
    return (
      <div className="background">
        <main>
          <img src="https://ecommerceinsiders.com/wp-content/uploads/2015/06/sweepstakes.jpg" 
            alt="Sweepstakes Logo" className="logo"/>
          
          {Form({
            props: this.state,
            handleFormChange: this.handleFormChange,
            closeForm: this.closeForm })}
        </main>
      </div>
    )
  }

  handleFormChange = (e) => {
    e.preventDefault();
    if (e.target.innerHTML === 'Login') this.setState({login: true});
    if (e.target.innerHTML === 'Create Account') this.setState({createAccount: true});
  }

  closeForm = (e) => {
    e.preventDefault();
  }
}

const Form = ({props, handleFormChange}) => {
  function isFormOpen () {
    if (props.login || props.createAccount) return false;
    else return true;
  }

  return (
    <form>
      {isFormOpen() &&
        <button id="login"
          onClick={handleFormChange}>Login</button>}
      {isFormOpen() &&
        <button id="createAcc"
          onClick={handleFormChange}>Create Account</button>}
      {props.login && <LoginForm />}
      {props.createAccount && <CreateForm />}
    </form>
  )
  
}

const LoginForm = () => {
  return (
    <div id="logAccForm" >Login form</div>
  )
}

const CreateForm = () => {
  return (
    <div id="logAccForm" >create account form</div>
  )
}

export default Welcome;