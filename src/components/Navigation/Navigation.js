import React from 'react';

const Navigation = ({onRouteChange,isSignedin}) => {
        if(isSignedin){
            return(
                <div style={{display:'flex',justifyContent:'flex-end'}}>
                <p 
                    onClick= {() => onRouteChange('signin')}
                    className="f3 link dim black underline pa3 pointer">
                    Sign Out
                    </p>
                </div>
                )
        } else {
            return(
            <div style={{display:'flex',justifyContent:'flex-end'}}>
            <p 
                onClick= {() => onRouteChange('signin')}
                className="f3 link dim black underline pa3 pointer">
                Sign in
                </p>
            <p 
                onClick= {() => onRouteChange('register')}
                className="f3 link dim black underline pa3 pointer">
                Register
                </p>
            </div>
            )
        }
}

export default Navigation;