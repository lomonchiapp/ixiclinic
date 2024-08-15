// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import MasksIcon from '@mui/icons-material/Masks';
import TodayIcon from '@mui/icons-material/Today';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import CogOutline from 'mdi-material-ui/CogOutline'

const navigation = () => {
  return [
    {title: 'Dashboard', icon: HomeOutline, path: '/'},
    {sectionTitle: 'Centro'},
    {title: 'Citas', icon: TodayIcon, path: '/appointments'},
    {title: 'Pacientes',icon: GroupOutlinedIcon, path: '/patients'},
    {title: 'Expedientes', icon: MedicalInformationIcon, path: '/records'},
    {title: 'Servicios', icon: WidgetsOutlinedIcon, path: '/services'},
    {title: 'Productos', icon: InventoryIcon, path: '/products'},
    {title: 'Recetas Medicas', icon: ReceiptOutlinedIcon, path: '/prescriptions'},
    {sectionTitle: 'Configuración'},
    {title: 'Doctores', icon: MasksIcon, path: '/doctors'},
    {title: 'Medicamentos', icon: MedicationOutlinedIcon, path: '/medicines'},
    {icon: CogOutline, title: 'Configuración', path: '/form-layouts'}
  ]
}

export default navigation
