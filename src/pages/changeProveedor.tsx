import React, { useEffect, useState } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonApp, IonPage, IonButtons, IonBackButton, IonCard, IonRow, IonCol, IonLabel, IonInput, IonButton, IonCheckbox, IonSelect, IonSelectOption, IonIcon, useIonAlert } from '@ionic/react';
import axios from "axios"
import { RouteComponentProps, useHistory } from 'react-router';
import { arrowBack } from 'ionicons/icons';
interface UserDetailPageProps
    extends RouteComponentProps<{
        id: string;
    }> { }
export const Proveedor: React.FC<UserDetailPageProps> = ({ match: match }) => {
    const history = useHistory();
    const [cedula, setCedula] = useState<string>("")
    const [nombre, setNombre] = useState<string>("")

    const [direccion, setDireccion] = useState<string>("")
    const [entidad, setEntidad] = useState<string>("")

    const [estado, setEstado] = useState<boolean>(false)
    const [tipo, setTipo] = useState<boolean>(false)

    useEffect(() => {
        setEstado(false);
        setNombre("");
        setCedula("")
        setEntidad("")
        setDireccion("")
        async function fetchMyAPI() {
            let response: any = await fetch('https://inventario-machamfamily.herokuapp.com/api/proveedor/' + match.params.id + "/")
            response = await response.json()
            setEstado(response.estado);
            setNombre(response.nombre);
            setCedula(response.cedula)
            setEntidad(response.entidad)

            setDireccion(response.direccion)



        }
        if (match.params.id != "new") {
            setTipo(true)
            fetchMyAPI()
        } else {
            setEstado(false);
            setNombre("");
            setCedula("")
            setEntidad("")
            setDireccion("")
        }


    }, [])

    const Guardar = () => {

        let datos: any = {
            cedula: cedula,
            nombre: nombre,

            direccion: direccion,
            entidad: entidad,
            estado: estado,
        }
        if (validar()) {
            if (tipo === true) {
                fetch("https://inventario-machamfamily.herokuapp.com/api/proveedor/" + match.params.id + "/", {
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
                    history.push("/proveedores/");
                    window.location.reload()
                }).catch(function (ex) {
                    console.log("parsing failed", ex);
                });
            } else {
                fetch("https://inventario-machamfamily.herokuapp.com/api/proveedor/", {
                    method: "POST",
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
                    history.push("/proveedores/");
                    window.location.reload()
                }).catch(function (ex) {
                    console.log("parsing failed", ex);
                });
            }

        } else {
            present({
                cssClass: 'my-css',
                header: 'Alert',
                message: `Cedula invalida`,
                buttons: [
                    'Cancel',
                    { text: 'Ok', handler: (d) => console.log('ok pressed') },
                ],
                onDidDismiss: (e) => console.log('did dismiss'),
            })
        }
    }

    function validar() {
        var cad: any = cedula;
        var total: any = 0;
        var longitud: any = cad.length;
        var longcheck: any = longitud - 1;
        var i: any;
        if (cad !== "" && longitud === 10) {
            for (i = 0; i < longcheck; i++) {
                if (i % 2 === 0) {
                    var aux: any = cad.charAt(i) * 2;
                    if (aux > 9) aux -= 9;
                    total += aux;
                } else {
                    total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
                }
            }

            total = total % 10 ? 10 - total % 10 : 0;

            if (cad.charAt(longitud - 1) == total) {
                return true;
            } else {
                return false;
            }
        }
    }



    const [present] = useIonAlert();
    return <IonPage>
        <IonToolbar color="dark">
            <IonButtons slot="start">
                <IonCol onClick={() => history.push("/proveedores")}>

                    <IonTitle>
                        <IonIcon icon={arrowBack}></IonIcon>
                    </IonTitle>
                </IonCol>
            </IonButtons>
            <IonTitle>Datos Proveedor</IonTitle>
        </IonToolbar>
        <IonContent
            scrollEvents={true}
            onIonScrollStart={() => { }}
            onIonScroll={() => { }}
            onIonScrollEnd={() => { }}>
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
                        <IonLabel position="floating"> Direccion</IonLabel>
                        <IonInput
                            type="text"
                            value={direccion}
                            onIonChange={(e) => setDireccion(e.detail.value!)}
                        >
                        </IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>


            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating"> Cedula</IonLabel>
                        <IonInput
                            type="text"
                            value={cedula}
                            onIonChange={(e) => setCedula(e.detail.value!)}
                        >
                        </IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>

            <IonItem>
                <IonLabel>Entidad</IonLabel>
                <IonSelect value={entidad} placeholder="Select One" onIonChange={e => setEntidad(e.detail.value)}>
                    <IonSelectOption value="Propietario">Propietario</IonSelectOption>
                    <IonSelectOption value="Empresa">Empresa</IonSelectOption>
                </IonSelect>
            </IonItem>

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