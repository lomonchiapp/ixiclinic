// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

const navigation = () => {
  return [
    {title: 'Dashboard', icon: HomeOutline, path: '/'},
    {title: 'Productos', icon: InventoryIcon, path: '/products'},
    {sectionTitle: 'Ventas'},
    {title: 'Clientes',icon: GroupIcon, path: '/clients'},
    {title: 'Cotizaciones', icon: ReceiptOutlinedIcon, path: '/estimates'},
    {title: 'Facturas', icon: ReceiptIcon, path: '/invoices'},
    {title: 'Pagos ', icon: LocalAtmIcon, path: '/payments'},
    {sectionTitle: 'Compras'},
    {title: 'Typography', icon: FormatLetterCase, path: '/typography'},
    {title: 'Icons', path: '/icons', icon: GoogleCirclesExtended},
    {title: 'Cards', icon: CreditCardOutline, path: '/cards'},
    {title: 'Tables', icon: Table, path: '/tables'},
    {icon: CubeOutline, title: 'Form Layouts', path: '/form-layouts'}
  ]
}

export default navigation
