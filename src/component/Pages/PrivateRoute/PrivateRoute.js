import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import ConfigRoute from '../../../config/route'
function PrivateRoute(props) {
    const role = props.role || 'guest'
    const allowedRoutes = ConfigRoute[role].allowedRoutes;
    const redirectRoute = ConfigRoute[role].redirectRoutes;
    return (
            <Switch>
                {allowedRoutes.map(route=>
                    <Route 
                    path = {route.url}
                    key={route.url}
                    exact             
                    >
                    <route.component  setRole={props.setRole} role ={role}/>
                    </Route>
                )}
                <Redirect  to={redirectRoute}/>
            </Switch>
        
    )
}

export default PrivateRoute
