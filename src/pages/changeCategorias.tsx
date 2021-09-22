import React, { useEffect, useState } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonApp, IonPage, IonButtons, IonBackButton, IonCard, IonRow, IonCol, IonLabel, IonInput, IonButton, IonCheckbox, IonIcon } from '@ionic/react';
import axios from "axios"
import { RouteComponentProps, useHistory } from 'react-router';
import useRefresh from '../components/useRefresh';
import { arrowBack } from 'ionicons/icons';
interface UserDetailPageProps
    extends RouteComponentProps<{
        id: string;
    }> { }
export const Categoria: React.FC<UserDetailPageProps> = ({ match: match }) => {
    const history = useHistory();
    const refresh = useRefresh(history, "/categorias");
    const [estado, setEstado] = useState<boolean>(false)
    const [nombre, setNombre] = useState<string>("")
    const [tipo, setTipo] = useState<boolean>(false)
    useEffect(() => {

        async function fetchMyAPI() {
            let response: any = await fetch('https://inventario-machamfamily.herokuapp.com/api/categoria/' + match.params.id + "/")
            response = await response.json()
            console.log(response)
            setEstado(response.estado);
            setNombre(response.nombre);
        }
        if (match.params.id != "new") {
            setTipo(true)
            fetchMyAPI()
        }


    }, [])

    const Guardar = () => {

        let datos: any = {
            estado: estado,
            nombre: nombre
        }
        if (tipo === true) {
            fetch("https://inventario-machamfamily.herokuapp.com/api/categoria/" + match.params.id + "/", {
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
                console.log(history.location.pathname)
                if (history.location.pathname === "/categorias") {
                    refresh();
                } else {
                    history.push("/categorias/");
                    window.location.reload()
                }
            }).catch(function (ex) {
                console.log("parsing failed", ex);
            });
        } else {
            fetch("https://inventario-machamfamily.herokuapp.com/api/categoria/", {
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
                history.push("/categorias/");
                window.location.reload()
            }).catch(function (ex) {
                console.log("parsing failed", ex);
            });
        }

    }
    return <IonPage>
        <IonToolbar color="dark">
            <IonButtons slot="start">
                <IonCol onClick={() => history.push("/categorias")}>

                    <IonTitle>
                        <IonIcon icon={arrowBack}></IonIcon>
                    </IonTitle>
                </IonCol>
            </IonButtons>
            <IonTitle>Datos Categoria</IonTitle>
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
                            type="email"
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