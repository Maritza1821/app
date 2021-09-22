import React, { useEffect, useState } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonApp, IonPage, IonButtons, IonBackButton, IonCard, IonFab, IonFabButton, IonIcon, IonRow, IonCol, IonRefresher, IonRefresherContent } from '@ionic/react';
import axios from "axios"
import { add, arrowBack, close, pencil } from 'ionicons/icons';
import { useHistory } from 'react-router';
import useRefresh from '../components/useRefresh';
import { RefresherEventDetail } from '@ionic/core';

function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log('Begin async operation');

    setTimeout(() => {
        console.log('Async operation has ended');
        event.detail.complete();
    }, 2000);
}


export const Categorias: React.FC = () => {
    const [listaCategorias, setListaCategorias] = useState<any>([]);
    const history = useHistory();

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch('https://inventario-machamfamily.herokuapp.com/api/categoria')
            response = await response.json()

            setListaCategorias(response)
        }


        fetchMyAPI()
        console.log("dsabjh")

    }, [])

    const eliminar = async (id: string) => {
        let deleteStatus = await fetch("https://inventario-machamfamily.herokuapp.com/api/categoria/" + id + "/", {
            method: "DELETE",
            credentials: "same-origin",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        });
        console.log(deleteStatus)

        let response = await fetch('https://inventario-machamfamily.herokuapp.com/api/categoria')
        response = await response.json()

        setListaCategorias(response)
    }

    return <IonPage>
        <IonToolbar color="dark">
            <IonButtons slot="start">
                <IonCol onClick={() => history.push("/inicio")}>

                    <IonTitle>
                        <IonIcon icon={arrowBack}></IonIcon>
                    </IonTitle>
                </IonCol>
            </IonButtons>
            <IonTitle>Categorias</IonTitle>
        </IonToolbar>
        <IonContent
            scrollEvents={true}
            onIonScrollStart={() => { }}
            onIonScroll={() => { }}
            onIonScrollEnd={() => { }}>


            {
                listaCategorias.map((item: any) => {

                    return <IonCard key={item.id} style={{ backgroundColor: "#121212", padding: "24px" }}>

                        <IonRow>
                            <IonCol onClick={() => history.push(`/categoria/${item.id}`)}>

                                <IonTitle>{item.nombre}</IonTitle>
                            </IonCol>




                            <IonFabButton style={{
                                width: "24px !important",
                                height: "24px !important"
                            }} onClick={() => {
                                eliminar(item.id);
                            }}>
                                <IonIcon icon={close} />
                            </IonFabButton>
                        </IonRow>

                    </IonCard>
                })
            }
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={() => {
                    history.push("/categoria/new/")
                }}>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>
        </IonContent>
    </IonPage>

};