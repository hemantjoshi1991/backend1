import { Injectable } from '@angular/core';
import { Menu } from './menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }
    
  menu : Menu[] =[ {
    title : 'Dashboard', path:'dashboard/default',icon : 'home',type : 'link',active : true},
    {
      title : 'Product', icon: 'box',type : 'menu',active:false, children : [
        {
          title :'Sub-Product',type:'menu',active:false ,children : [
            {
              title : 'Product List',path :'products/sub-product/add-product',type:'link'
            },
            {
              title : 'Add Product',path :'products/sub-product/product-list',type:'link'
            }
          ]
        }
      ]
    },
    {
      title : 'Sales',type : 'menu',icon: 'dollar-sign',active:false, children : [
        {
          title : 'Orders', type: 'link',path:'sales/orders'
        },
        {
          title : 'Transactions',type:'link',path : 'sales/transaction'
        }
      ]
    },
    {
      title : 'Masters', type: 'menu',icon: 'clipboard',active:false,children : [
        {
          title : 'Brand Logo ', type: 'link',path: 'masters/brandlogo'
        },
        {
          title : 'Category ', type: 'link',path: 'masters/category'
        },
        {
          title : 'Color ', type: 'link',path: 'masters/color'
        },
        {
          title : 'Size', type: 'link',path: 'masters/size'
        },
        {
          title : 'Tag', type: 'link',path: 'masters/tag'
        },
        {
          title : 'User Type', type: 'link',path: 'masters/usertype'
        },
      ]
    },
    {
      title : 'Users',type:'menu',active: false,icon : 'user-plus',children: [
        {
          title: 'User List', type: 'link', path:'users/add-user'
        },
        {
          title: 'Create User', type: 'link', path: 'users/list-user'
        }
      ]
    },
    {
      title: 'Settings',type: 'menu',icon: 'settings',active: false,children: [
        {
          title: 'Profile',type: 'link', path: 'settings/profile'
        }
      ]
    },
    {
      title: 'Reports',type: 'link',path: 'reports',icon: 'bar-chart',active: false
    },
    {
      title: 'Invoice',type: 'link',path : 'invoice',icon : 'archive',active: false
    },
    {
      title: 'Logout',type:'link',path : 'auth/login',icon: 'log-out',active: false
    }

]

    
  
}
