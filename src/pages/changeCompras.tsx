import React, { useEffect, useState } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonApp, IonPage, IonButtons, IonBackButton, IonCard, IonRow, IonCol, IonLabel, IonInput, IonButton, IonCheckbox, IonSelect, IonSelectOption, IonDatetime, useIonAlert, IonIcon } from '@ionic/react';
import axios from "axios"
import { RouteComponentProps, useHistory } from 'react-router';
import { arrowBack } from 'ionicons/icons';
interface UserDetailPageProps
    extends RouteComponentProps<{
        id: string;
    }> { }
export const Compra: React.FC<UserDetailPageProps> = ({ match: match }) => {
    const history = useHistory();
    const [n_compra, setNumero] = useState<string>("")
    const [fk_producto, setProducto] = useState<string>("")
    const [fk_proveedor, setProveedor] = useState<string>("")
    const [fecha, setFecha] = useState<string>("")
    const [cantidad, setcantidad] = useState<string>("")
    const [precio, setPrecio] = useState<string>("")


    const [estado, setEstado] = useState<boolean>(false)
    const [tipo, setTipo] = useState<boolean>(false)
    const [listaProveedor, setListaProveedor] = useState<any>([]);
    const [listaProductos, setListaProductos] = useState<any>([]);
    useEffect(() => {
        async function fetchMyAPI() {
            let response: any = await fetch('https://inventario-machamfamily.herokuapp.com/api/compra/' + match.params.id + "/")
            response = await response.json()
            
         
            setNumero(response.n_compra);
            setProducto(response.fk_producto);
            setProveedor(response.fk_proveedor)
            setFecha(response.fecha)
            setcantidad(response.cantidad)
            setPrecio(response.precio)
            setEstado(response.estado)


        }

        async function getData() {
            let responseP = await fetch('https://inventario-machamfamily.herokuapp.com/api/producto')
            responseP = await responseP.json()
            let responseC = await fetch('https://inventario-machamfamily.herokuapp.com/api/proveedor')
            responseC = await responseC.json()

            setListaProveedor(responseC)
            setListaProductos(responseP)
        }
        getData()
        if (match.params.id != "new") {
            setTipo(true)
            fetchMyAPI()
        }


    }, [])

    const Guardar = async () => {
        var dateFormat: any = fecha.split('T')[0];

        let datos: any = {
            n_compra: n_compra,
            fk_producto: fk_producto,
            fk_proveedor: fk_proveedor,
            fecha: dateFormat,
            cantidad: cantidad,
            precio: precio,
            estado: estado,
        }
        if (tipo === true) {
            fetch("https://inventario-machamfamily.herokuapp.com/api/compra/" + match.params.id + "/", {
                method: "PUT",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos),
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log("Data is ok", data);
                history.push("/compras/");
                window.location.reload()
            }).catch(function (ex) {
                console.log("parsing failed", ex);
            });
        } else {
            let resul = await fetch("https://inventario-machamfamily.herokuapp.com/api/compra/", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos),
            })
            console.log(resul.status)
            if (resul.status === 400) {
                let mensajes = await resul.json()
                let values = Object.values(mensajes);
                let listaMensajes = values.filter((item: any) => {

                    return item[0];
                })
                present({
                    cssClass: 'my-css',
                    header: 'Alert',
                    message: `${listaMensajes}`,
                    buttons: [
                        'Cancel',
                        { text: 'Ok', handler: (d) => console.log('ok pressed') },
                    ],
                    onDidDismiss: (e) => console.log('did dismiss'),
                })
            } else if (resul.status === 201) {
                history.push("/compras/")
                window.location.reload()
            }

        }

    }

    const provvedorNombre=()=>{
        
    }


    const [present] = useIonAlert();
    return <IonPage>
        <IonToolbar color="dark">
            <IonButtons slot="start">
                <IonCol onClick={() => history.push("/compras")}>

                    <IonTitle>
                        <IonIcon icon={arrowBack}></IonIcon>
                    </IonTitle>
                </IonCol>
            </IonButtons>
            <IonTitle>Datos  Compra </IonTitle>
        </IonToolbar>
        <IonContent
            scrollEvents={true}
            onIonScrollStart={() => { }}
            onIonScroll={() => { }}
            onIonScrollEnd={() => { }}>

            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating"># compra</IonLabel>
                        <IonInput
                            type="text"
                            value={n_compra}
                            onIonChange={(e) => setNumero(e.detail.value!)}
                        >
                        </IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonItem>
                <IonLabel>Proveedor</IonLabel>
                <IonSelect value={fk_proveedor} placeholder="Select One" onIonChange={e => setProveedor(e.detail.value)}>
                    {
                        listaProveedor.map((item: any) => {
                            return <IonSelectOption key={item.id} value={item.id}>{item.nombre}</IonSelectOption>
                        })
                    }
                </IonSelect>
            </IonItem>
            <IonItem>
                <IonLabel>Producto</IonLabel>
                <IonSelect value={fk_producto} placeholder="Select One" onIonChange={e => setProducto(e.detail.value)}>
                    {
                        listaProductos.map((item: any) => {
                            return <IonSelectOption key={item.id} value={item.id}>{item.nombre}</IonSelectOption>
                        })
                    }

                </IonSelect>
            </IonItem>
            <IonRow>
                <IonLabel>Seleccione la fecha</IonLabel>
                <IonDatetime displayFormat="YYYY-MM-DD" placeholder="Select Date" value={fecha} onIonChange={e => setFecha(e.detail.value!)}></IonDatetime>


            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating"> numero de productos</IonLabel>
                        <IonInput
                            type="number"
                            value={cantidad}
                            onIonChange={(e) => setcantidad(e.detail.value!)}
                        >
                        </IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>

            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating"> Precio</IonLabel>
                        <IonInput
                            type="number"
                            value={precio}
                            onIonChange={(e) => setPrecio(e.detail.value!)}
                        >
                        </IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>


            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating"> Estado</IonLabel>
                        <IonCheckbox
                            onIonChange={(e) => {
                                setEstado(e.detail.checked!)
                            }}
                            checked={estado}

                        >

                        </IonCheckbox>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>


                    <IonButton expand="block" onClick={() => Guardar()}>
                        Guardar
                    </IonButton>

                </IonCol>
            </IonRow>

        </IonContent>
    </IonPage>

};