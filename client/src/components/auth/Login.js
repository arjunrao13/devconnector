import React, { Component } from 'react'
import classnames from 'classnames';
import {loginUser} from '../../actions/authActions';
import {connect} from 'react-redux';

class Login extends Component {

    constructor(){
        super()
        this.state = {
            
            email: '',
            password: '',
            
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onSubmit(e){
        e.preventDefault();

        const newUser = {
            
            email: this.state.email,
            password: this.state.password,
            

        };

        this.props.loginUser(newUser); //hooks up ui to reducers
        
    }


    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidMount(){
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/dashboard');
      }
    }
    componentWillReceiveProps(nextProps){
      if(nextProps.auth.isAuthenticated){
        this.props.history.push('/dashboard');
      }
    }




    render() {

        const {errors} = this.state;

        return (
            <div className="login">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">Sign in to your DevConnector account</p>
                  <form onSubmit = {this.onSubmit}action="dashboard.html">
                    <div className="form-group">
                      <input type="email" className= {classnames('form-control form-control-lg', {'is-invalid': errors.email})} placeholder="Email Address" name="email" value = {this.state.email} onChange = {this.onChange}/>
                      {errors.email && <div className = "invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="form-group">
                      <input type="password" className= {classnames('form-control form-control-lg', {'is-invalid': errors.password})} placeholder="Password" name="password" value = {this.state.paswword} onChange = {this.onChange}/>
                      {errors.password && <div className = "invalid-feedback">{errors.password}</div>}
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
    }
}


const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(Login);