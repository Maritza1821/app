import React, { useState } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonApp, IonPage, IonButtons, IonBackButton, IonRow, IonCol, IonIcon, IonLabel, IonInput, IonButton, useIonAlert } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import axios from "axios";
import { useHistory } from 'react-router';
export const Login: React.FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();
    const handleLogin = async () => {


        let datos: any = {
            "username": email, "password": password
        }
        let resul = await fetch("https://inventario-machamfamily.herokuapp.com/api/login/login/", {
            method: "POST",
            credentials: "same-origin",
            headers: {

                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos),
        })

        if (resul.status === 401) {
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
            let mensajes = await resul.json()
            console.log(mensajes)
         
            if(mensajes.user.last_name==="cliente"){
                history.push("/userCliente/"+mensajes.user.username)
            }else{

                history.push("/inicio/")
            }
        }


    }
    const [present] = useIonAlert();
    return <IonPage>
        <IonToolbar mode="ios" color="dark">

            <IonTitle>Login</IonTitle>
        </IonToolbar>
        <IonContent>
            <IonRow>
                <IonCol style={{textAlign:"center"}}>
                    <img style={{borderRadius:"8px"}} width="200" src="https://inventario-machamfamily.herokuapp.com/static/imagenes/login1.jpg" />
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating"> Usuario</IonLabel>
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
                        <IonLabel position="floating"> Contraseña</IonLabel>
                        <IonInput
                            type="password"
                            value={password}
                            onIonChange={(e) => setPassword(e.detail.value!)}
                        >
                        </IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>


                    <IonButton expand="block" onClick={() => handleLogin()}>
                        Login
                    </IonButton>

                </IonCol>
            </IonRow>
        </IonContent>
    </IonPage>


};
