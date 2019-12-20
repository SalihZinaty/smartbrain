import React from 'react';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            email:'',
            password:'',
            name:''
        }
    }
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }
    onSubmitRegister = () => {
        //fetch usually passes a get request.
        //in the signin form, we want a post request.
        //the way to send it is to add a second parameter to the fetch method.
        // describes the connection method.
        fetch('http://localhost:3000/register',{
            method: 'post',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then ( data => {
            console.log(data);
            if (data.success === 'success'){
                this.props.userInfoChange(data);
                this.props.onRouteChange('home');
            }
            else {
                document.getElementById("name").value='';
                document.getElementById("password").value='';
                document.getElementById("email-address").value='';
                alert('Invalid Credintioals','Try to login again');
            }
        })
    }
    render(){
    
    return (
        <article className="br2 ba shadow-5 dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <div className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className=" fw6 ph0 mh0 f2">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="name"  
                            id="name"
                            onChange = {this.onNameChange}
                            />
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                             type="email"
                              name="email-address" 
                               id="email-address"
                                onChange = {this.onEmailChange}
                               />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange = {this.onPasswordChange}
                            />
                </div>
                </fieldset>
                <div className="">
                <input 
                    onClick={this.onSubmitRegister}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Register"/>
                </div>
            </div>
            </div>
            </article>
    );
}
}
export default Register