import React, { useEffect, useRef, useState } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonApp, IonPage, IonButtons, IonBackButton, IonCard, IonRow, IonCol, IonLabel, IonInput, IonButton, IonCheckbox, IonSelect, IonSelectOption, useIonAlert, IonIcon } from '@ionic/react';
import axios from "axios"
import { RouteComponentProps, useHistory } from 'react-router';
import { arrowBack } from 'ionicons/icons';
interface UserDetailPageProps
    extends RouteComponentProps<{
        id: string;
    }> { }
export const Producto: React.FC<UserDetailPageProps> = ({ match: match }) => {
    const history = useHistory();
    const [codigo, setCodigo] = useState<string>("")
    const [nombre, setNombre] = useState<string>("")
    const [descripcion, setDeswcripcion] = useState<string>("")
    const [existencia, setExistencia] = useState<string>("")
    const [foto_producto, setFoto] = useState<any>()
    const [precio, setPrecio] = useState<string>("")
    const [fk_categoria, setCategoria] = useState<string>("")
    const [fk_proveedor, setProveedor] = useState<string>("")
    const [estado, setEstado] = useState<boolean>(false)
    const [tipo, setTipo] = useState<boolean>(false)
    const [listaProveedor, setListaProveedor] = useState<any>([]);
    const [listaCategorias, setListaCategorias] = useState<any>([]);
    const fileInput = useRef(null);
    useEffect(() => {
        async function fetchMyAPI() {
            let response: any = await fetch('https://inventario-machamfamily.herokuapp.com/api/producto/' + match.params.id + "/")
            response = await response.json()
            console.log(response)
            setCodigo(response.codigo);
            setNombre(response.nombre);
            setDeswcripcion(response.descripcion)
            setExistencia(response.existencia)
            setFoto(response.foto_producto)
            setPrecio(response.precio)
            setCategoria(response.fk_categoria)
            setProveedor(response.fk_proveedor)
            setEstado(response.estado)

        }

        async function getData() {
            let responseP = await fetch('https://inventario-machamfamily.herokuapp.com/api/proveedor')
            responseP = await responseP.json()
            let responseC = await fetch('https://inventario-machamfamily.herokuapp.com/api/categoria')
            responseC = await responseC.json()

            setListaProveedor(responseP)
            setListaCategorias(responseC)
        }
        getData()
        if (match.params.id != "new") {
            setTipo(true)
            fetchMyAPI()
        }


    }, [])

    const Guardar = async () => {
        
        let datos: any = {
            codigo: codigo,
            nombre: nombre,
            descripcion: descripcion,
            existencia: existencia,
            foto_producto: foto_producto,
            precio: precio,
            fk_categoria: fk_categoria,
            fk_proveedor: fk_proveedor,
            estado: estado,
        }
        if (tipo === true) {
            fetch("https://inventario-machamfamily.herokuapp.com/api/producto/" + match.params.id + "/", {
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
                history.push("/productos/");
                window.location.reload()
            }).catch(function (ex) {
                console.log("parsing failed", ex);
            });
        } else {
            let result = await fetch("https://inventario-machamfamily.herokuapp.com/api/producto/", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos),
            })
            if (result.status === 400) {
                let mensajes = await result.json()
                let values = Object.values(mensajes);
                let listaMensajes = values.filter((item: any) => {

                    return item[0] + "\n";
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
            } else if (result.status === 201) {
                history.push("/productos/")
                window.location.reload()
            }
        }

    }

    const [present] = useIonAlert();
    return <IonPage>
        <IonToolbar color="dark">
            <IonButtons slot="start">
                <IonCol onClick={() => history.push("/productos")}>

                    <IonTitle>
                        <IonIcon icon={arrowBack}></IonIcon>
                    </IonTitle>
                </IonCol>
            </IonButtons>
            <IonTitle>Datos Producto  </IonTitle>
        </IonToolbar>
        <IonContent
            scrollEvents={true}
            onIonScrollStart={() => { }}
            onIonScroll={() => { }}
            onIonScrollEnd={() => { }}>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating"> Codigo</IonLabel>
                        <IonInput
                            type="text"
                            value={codigo}
                            onIonChange={(e) => setCodigo(e.detail.value!)}
                        >
                        </IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>

            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating"> Nombre</IonLabel>
                        <IonInput
                            type="text"
                            value={nombre}
                            onIonChange={(e) => setNombre(e.detail.value!)}
                        >
                        </IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating"> Descripcion</IonLabel>
                        <IonInput
                            type="text"
                            value={descripcion}
                            onIonChange={(e) => setDeswcripcion(e.detail.value!)}
                        >
                        </IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>

            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating"> Existencia</IonLabel>
                        <IonInput
                            type="email"
                            value={existencia}
                            onIonChange={(e) => setExistencia(e.detail.value!)}
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
                            required
                            type="number"
                            value={precio}
                            onIonChange={(e) => setPrecio(e.detail.value!)}
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
                <IonLabel>Categoria</IonLabel>
                <IonSelect value={fk_categoria} placeholder="Select One" onIonChange={e => setCategoria(e.detail.value)}>
                    {
                        listaCategorias.map((item: any) => {
                            return <IonSelectOption key={item.id} value={item.id}>{item.nombre}</IonSelectOption>
                        })
                    }

                </IonSelect>
            </IonItem>
           {/*  <>
            <IonLabel>{foto_producto?foto_producto.name:""}</IonLabel>
                <input
                    ref={fileInput}
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e)=>{
                       setFoto(e.target.files![0])
                    }}
                    onClick={() => {
                        console.log('onClick');
                    }}
                />
                <IonButton
                    color="primary"
                    onClick={() => {
                        // @ts-ignore
                        fileInput?.current?.click();
                        // setBackgroundOption(BackgroundOptionType.Gradient);
                    }}>
                    Image
                </IonButton>
            </> */}
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