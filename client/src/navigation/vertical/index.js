import Table from 'mdi-material-ui/Table';
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'

const navigation = () => {
  return [
    {
      title: 'Home',
      icon: HomeOutline,
      path: '/',
    },
    {
      title: 'Users',
      
      icon: AccountCogOutline,
      path: '/users'
    },
    {
      title: 'Orders',
      icon: CreditCardOutline,
      path: '/Order'
    },
    {
      title: 'Products',
      icon: FormatLetterCase,
      path: '/products'
    },
   
    {
      title: 'Suppliers',
      icon: Table,
      path: '/suppliers'
    },
    
  ]
}

export default navigation
