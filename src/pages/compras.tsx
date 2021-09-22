import React, { useEffect, useState } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonApp, IonPage, IonButtons, IonBackButton, IonCard, IonFab, IonFabButton, IonIcon, IonRow, IonCol } from '@ionic/react';
import axios from "axios"
import { add, arrowBack, close, pencil } from 'ionicons/icons';
import { useHistory } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
export const Compras: React.FC = () => {
    const [listaCompras, setListaCompras] = useState<any>([]);
    const history = useHistory();

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch('https://inventario-machamfamily.herokuapp.com/api/compra')
            response = await response.json()
            console.log(response)
            setListaCompras(response)
        }


        fetchMyAPI()

    }, [])

    const eliminar = async (id: string) => {
        let deleteStatus = await fetch("https://inventario-machamfamily.herokuapp.com/api/compra/" + id + "/", {
            method: "DELETE",
            credentials: "same-origin",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        });
        console.log(deleteStatus)

        let response = await fetch('https://inventario-machamfamily.herokuapp.com/api/compra')
        response = await response.json()

        setListaCompras(response)
    }

    return <IonPage >
        <IonToolbar color="dark">
            <IonButtons slot="start">
                <IonCol onClick={() => history.push("/inicio")}>

                    <IonTitle>
                        <IonIcon icon={arrowBack}></IonIcon>
                    </IonTitle>
                </IonCol>
            </IonButtons>
            <IonRow>

                <IonTitle>Compras</IonTitle>
            </IonRow>
        </IonToolbar>
        <IonContent

            scrollEvents={true}
            onIonScrollStart={() => { }}
            onIonScroll={() => { }}
            onIonScrollEnd={() => { }}>
            {
                listaCompras.map((item: any) => {

                    return <IonCard key={item.id} style={{ backgroundColor: "#121212", padding: "24px" }}>

                        <IonRow>
                            <IonCol onClick={() => history.push(`/compra/${item.id}`)} >

                                <IonTitle >{item.nombre} {item.n_compra} </IonTitle>
                                <ExploreContainer id={item.fk_proveedor} id_clientes="null" />
                            </IonCol>



                            <IonFabButton onClick={() => {
                                eliminar(item.id);
                            }}>
                                <IonIcon size="small" icon={close} />
                            </IonFabButton>
                        </IonRow>

                    </IonCard>
                })
            }
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={() => {
                    history.push("/compra/new")
                }}>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>
        </IonContent>
    </IonPage>

};