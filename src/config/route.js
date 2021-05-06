import Login from '../component/Pages/Auth/Login'
import Register from '../component/Pages/Auth/Register'
import Condo from '../component/Pages/Condo/Condo'
import CustomerPage from '../component/Pages/Customer/CustomerPage'
import EditCustomer from '../component/Pages/Customer/EditCustomer'
import EditEmployee from '../component/Pages/Employee/EditEmployee'
import Tax from '../component/Pages/Tax/Tax'
import Land from '../component/Pages/Land/Land'
import Build from '../component/Pages/Build/Build'
import FirstPage from '../component/Pages/FirstPage'
import Manage from '../component/Pages/Manage/Manage'
import EditTax from '../component/Pages/Tax/EditTax'
import DetialLand from '../component/Pages/Land/DetialLand'
import RateBuild from '../component/Pages/Build/RateBuild'
import EditCondo from '../component/Pages/Condo/EditCondo'
import Document from '../component/Pages/Document/Document'
import CheckDoc from '../component/Pages/Document/CheckDoc/CheckDoc';
import EditCheckDoc from '../component/Pages/Document/CheckDoc/EditCheckDoc';
import CostDoc from '../component/Pages/Document/CostDoc/CostDoc';
import EditCostDoc from '../component/Pages/Document/CostDoc/EditCostDoc';
import OverView from '../component/Pages/OverView/OverView'
import ListWarningDoc from '../component/Pages/Document/CostDoc/WarnningDoc/ListWarningDoc'
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
        component:CustomerPage
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
        url:'/document',
        component:Document
    },
    
    manage:{
        url:'/manage',
        component:Manage
    },
    editTax:{
        url:'/tax/:id',
        component:EditTax
    },
    detialLand:{
        url:'/land/detial/:id',
        component:DetialLand
    },
    rate:{
        url:'/rate/build',
        component:RateBuild
    },
    editCondo:{
        url:'/condo/:id',
        component:EditCondo
    },
    CheckDoc:{
        url:'/checkdocument/:year',
        component:CheckDoc
    },
    EditCheckDoc:{
        url:'/edit/checkdocument/:id',
        component:EditCheckDoc
    },
    CostDoc:{
        url:'/costdocument/:year',
        component:CostDoc
    },
    EditCostDoc:{
        url:'/edit/costdocument/:id',
        component:EditCostDoc
    },
    OverView:{
        url:`/overview`,
        component:OverView
    },
    WarningDoc : {
        url:'/warning/:year',
        component:ListWarningDoc
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
            components.customer,
            components.manage,
            components.editCustomer,
            components.editTax,
            components.detialLand,
            components.rate,
            components.editCondo,
            components.CheckDoc,
            components.CostDoc,
            components.EditCheckDoc,
            components.EditCostDoc,
            components.OverView,
            components.WarningDoc
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
            components.customer,
            components.editCustomer,
            components.editTax,
            components.detialLand,
            components.rate,
            components.editCondo,
            components.CheckDoc,
            components.CostDoc,
            components.EditCheckDoc,
            components.EditCostDoc,
            components.OverView,
            components.WarningDoc
        ],
        redirectRoutes:"/main"
     }
}
export default userRole