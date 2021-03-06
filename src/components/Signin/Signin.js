import React from 'react';
// signin is its own closed component. 
//using its own state is totally acceptable.
class Signin extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            signInEmail:'',
            signInPassword:''
        }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }
    onSubmitSignin = () => {
        //fetch usually passes a get request.
        //in the signin form, we want a post request.
        //the way to send it is to add a second parameter to the fetch method.
        // describes the connection method.
        fetch('https://secure-beach-08930.herokuapp.com/signin',{
            method: 'post',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then ( data => {
            if (data.success === 'success'){
                this.props.userInfoChange(data);
                this.props.onRouteChange('home');
            }
            else {
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
                <legend className=" fw6 ph0 mh0 f2">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input 
                        onChange= {this.onEmailChange}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" name="email-address" 
                        id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input
                        onChange = {this.onPasswordChange} 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="password" 
                        name="password"  
                        id="password"/>
                </div>
                </fieldset>
                <div className="">
                <input 
                    onClick={this.onSubmitSignin}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Sign in"/>
                </div>
                <div className="lh-copy mt3 pointer">
                <p onClick={() => this.props.onRouteChange('register')} className="f6 link dim black db">Register</p>
                </div>
            </div>
            </div>
            </article>
        );
    }
}
export default Signin