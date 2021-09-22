import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonRouterOutlet,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { Categorias } from './pages/categorias';
import { Home } from './pages/home';
import { Productos } from './pages/productos';
import { Clientes } from './pages/clientes';
import { Compras } from './pages/compras';
import { Ventas } from './pages/ventas';
import { Proveedores } from './pages/proveedores';
import { Login } from './pages/login';
import { Categoria } from './pages/changeCategorias';
import { Cliente } from './pages/changeClientes';
import { Proveedor } from './pages/changeProveedor';
import { Producto } from './pages/changeProductos';
import { Compra } from './pages/changeCompras';
import { Venta } from './pages/changeVentas';
import { UserCliente } from './pages/userCliente';
import { ProductosClientes } from './pages/productos_cliente';

const App: React.FC = () => (
  <IonApp>
    
    <IonContent>
      <IonReactRouter>
        <IonRouterOutlet>          
          <Route exact path="/" component={Login} />
          <Route path="/inicio" component={Home} />
          <Route path="/categorias" component={Categorias} />
          <Route path="/productos" component={Productos} />
          <Route path="/productosClientes" component={ProductosClientes} />
          <Route path="/clientes" component={Clientes} />
          <Route path="/compras" component={Compras} />
          <Route path="/ventas" component={Ventas} />
          <Route path="/proveedores" component={Proveedores} />
          <Route path="/categoria/:id" component={Categoria} />
          <Route path="/cliente/:id" component={Cliente} />
          <Route path="/proveedor/:id" component={Proveedor} />
          <Route path="/producto/:id" component={Producto} />
          <Route path="/compra/:id" component={Compra} />
          <Route path="/venta/:id" component={Venta} />
          <Route path="/userCliente/:id" component={UserCliente} />
        </IonRouterOutlet>
        </IonReactRouter>
     
    </IonContent>


  </IonApp>
);

export default App;
