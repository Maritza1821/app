import React, { useEffect, useState } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonApp, IonPage, IonButtons, IonBackButton, IonCard, IonRow, IonCol, IonLabel, IonInput, IonButton, IonCheckbox, useIonAlert, IonIcon } from '@ionic/react';
import axios from "axios"
import { RouteComponentProps, useHistory } from 'react-router';
import { arrowBack } from 'ionicons/icons';
interface UserDetailPageProps
    extends RouteComponentProps<{
        id: string;
    }> { }
export const Cliente: React.FC<UserDetailPageProps> = ({ match: match }) => {
    const history = useHistory();
    const [cedula, setCedula] = useState<string>("")
    const [nombre, setNombre] = useState<string>("")
    const [apellido, setApellido] = useState<string>("")
    const [direccion, setDireccion] = useState<string>("")
    const [celular, setCelular] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [estado, setEstado] = useState<boolean>(false)
    const [tipo, setTipo] = useState<boolean>(false)

    useEffect(() => {

        async function fetchMyAPI() {
            let response: any = await fetch('https://inventario-machamfamily.herokuapp.com/api/cliente/' + match.params.id + "/")
            response = await response.json()
            console.log(response)
            setEstado(response.estado);
            setNombre(response.nombre);
            setCedula(response.cedula)
            setApellido(response.apellido)
            setDireccion(response.direccion)
            setCelular(response.celular)
            setEmail(response.email)
        }
        if (match.params.id != "new") {
            setTipo(true)
            fetchMyAPI()
        }


    }, [])

    function validar() {
        var cad:any = cedula;
        var total:any = 0;
        var longitud:any = cad.length;
        var longcheck:any = longitud - 1;
        var i:any;
        if (cad !== "" && longitud === 10) {
            for (i = 0; i < longcheck; i++) {
                if (i % 2 === 0) {
                    var aux:any = cad.charAt(i) * 2;
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

    
    const Guardar = async () => {
        let datos: any = {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            direccion: direccion,
            celular: celular,
            email: email,
            estado: estado,
        }
        if(validar()){
            if (tipo === true) {
                fetch("https://inventario-machamfamily.herokuapp.com/api/cliente/" + match.params.id + "/", {
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
                    history.push("/clientes/");
                    window.location.reload()
                }).catch(function (ex) {
                    console.log("parsing failed", ex);
                });
            } else {
                let result = await fetch("https://inventario-machamfamily.herokuapp.com/api/cliente/", {
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
                } else if (result.status === 201) {
                    history.push("/clientes/")
                    window.location.reload()
                }
            }
        }else{
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
    const [present] = useIonAlert();
    return <IonPage>
        <IonHeader>
            <IonToolbar color="dark">
                <IonButtons slot="start">
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                </IonButtons>
                <IonTitle>Datos Cliente  </IonTitle>
            </IonToolbar>
        </IonHeader>
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
                        <IonLabel position="floating"> Apellido</IonLabel>
                        <IonInput
                            type="text"
                            value={apellido}
                            onIonChange={(e) => setApellido(e.detail.value!)}
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
                        <IonLabel position="floating"> Correo Electrónica</IonLabel>
                        <IonInput
                            type="email"
                            value={email}
                            onIonChange={(e) => setEmail(e.detail.value!)}
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
                            type="tel"
                            maxlength={10}
                            value={cedula}
                            onIonChange={(e) => setCedula(e.detail.value!)}
                        >
                        </IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating"> Celular</IonLabel>
                        <IonInput
                            type="tel"
                            size={10}
                            value={celular}
                            maxlength={10}
                            onIonChange={(e) => setCelular(e.detail.value!)}
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