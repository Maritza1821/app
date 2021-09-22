import React, { useEffect, useState } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonApp, IonPage, IonButtons, IonBackButton, IonCard, IonFab, IonFabButton, IonIcon, IonRow, IonCol, IonMenuButton } from '@ionic/react';
import axios from "axios"
import { add, arrowBack, close, pencil } from 'ionicons/icons';
import { useHistory } from 'react-router';
export const ProductosClientes: React.FC = () => {
    const [listaProductos, setListaProductos] = useState<any>([]);
    const history = useHistory();

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch('https://inventario-machamfamily.herokuapp.com/api/producto/')
            response = await response.json()
            
            console.log(response)
            setListaProductos(response)
        }

        


        fetchMyAPI()

    }, [])

    const eliminar = async (id: string) => {
        let deleteStatus = await fetch("https://inventario-machamfamily.herokuapp.com/api/producto/" + id + "/", {
            method: "DELETE",
            credentials: "same-origin",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        });
        console.log(deleteStatus)

        let response = await fetch('https://inventario-machamfamily.herokuapp.com/api/producto')
        response = await response.json()

        setListaProductos(response)
    }

    return <IonPage>
      <IonHeader>
      <IonToolbar>
      <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle>Productos</IonTitle>
      </IonToolbar>
    </IonHeader>
        <IonContent
            scrollEvents={true}
            onIonScrollStart={() => { }}
            onIonScroll={() => { }}
            onIonScrollEnd={() => { }}>
            {
                listaProductos.map((item: any) => {

                    return <IonCard key={item.id} style={{ backgroundColor: "#121212", padding: "24px" }}>

                        <IonRow>
                            <IonCol >

                                <IonTitle >{item.nombre} {item.apellido} </IonTitle>

                            </IonCol>



                           
                        </IonRow>

                    </IonCard>
                })
            }
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={() => {
                    history.push("/producto/new")
                }}>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>
        </IonContent>
    </IonPage>

};