import React, { Component } from 'react';
import '../styles/welcome.css';

class Welcome extends Component {
  render () {
    return (
      <div className="background">
        <main>
          <img src="https://ecommerceinsiders.com/wp-content/uploads/2015/06/sweepstakes.jpg" 
            alt="Sweepstakes Logo" className="logo"/>
          
          <Form props={this.state} />
        </main>
      </div>
    )
  }
}

const Form = (props) => {
  this.setState = props;

  return (
    <form>
      <button>Login</button>
      <button>Create Account</button>
      {/* {this.state.login && <LoginForm />}
      {this.state.createAccount && <CreateForm />} */}
    </form>
  )
}

const LoginForm = () => {
  return (
    <div>Login form</div>
  )
}

const CreateForm = () => {
  return (
    <div>create account form</div>
  )
}

export default Welcome;