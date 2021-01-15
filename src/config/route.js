import Login from '../component/Pages/Auth/Login'
import Register from '../component/Pages/Auth/Register'
import Condo from '../component/Pages/Condo/Condo'
import EditCustomer from '../component/Pages/Customer/EditCustomer'
import EditEmployee from '../component/Pages/Employee/EditEmployee'
import Tax from '../component/Pages/Tax/Tax'
import Land from '../component/Pages/Land/Land'
import Build from '../component/Pages/Build/Build'
import FirstPage from '../component/Pages/FirstPage'
import Folder from '../component/Pages/Folder/Folder'
const components ={
    login:{
        url:"/login",
        component:Login
    },
    register:{
        url:"/register",
        component:Register
    },
    main:{
        url:"/main",
        component:FirstPage
    },
    customer:{
        url:'/customer',
        component:EditCustomer
    }
    ,
    editCustomer:{
        url:'/customer/:id',
        component:EditCustomer

    },
    employee:{
        url:'/employee/:id',
        component:EditEmployee
    },
    land:{
        url:'/land',
        component:Land
    },
    condo:{
        url:'/condo',
        component:Condo
    },
    tax:{
        url:'/tax',
        component:Tax
    },
    building:{
        url:'/building',
        component:Build
    },
    folder:{
        url:'/folder',
        component:Folder
    }
    
}
//defind role give user
const userRole ={
    guest:{
        allowedRoutes:[
            components.login,
            components.register
         ],
         redirectRoutes:"/login"
    },
    admin:{
        allowedRoutes:[
           components.main,
            components.register,
            components.employee
        ],
        redirectRoutes:"/main"
    },
    leader:{
        allowedRoutes:[
            components.main,
            components.register,
            components.employee,
            components.folder,
            components.land,
            components.condo,
            components.building,
            components.tax,
            components.customer
        ],
        redirectRoutes:"/main"
     },
     employee:{
        allowedRoutes:[
            components.main,
            components.register,
            components.employee,
            components.folder,
            components.land,
            components.condo,
            components.building,
            components.tax,
            components.customer

        ],
        redirectRoutes:"/main"
     }
}
export default userRole