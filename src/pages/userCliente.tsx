import React, { useEffect, useState } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonApp, IonPage, IonGrid, IonRow, IonCard, IonCardContent, IonCol, IonRouterLink, IonIcon } from '@ionic/react';
import { RouteComponentProps, useHistory } from 'react-router';
import { qrCode } from 'ionicons/icons';
interface UserDetailPageProps
    extends RouteComponentProps<{
        id: string;
    }> { }
export const UserCliente: React.FC<UserDetailPageProps> = ({ match: match }) => {
    const [cliente, setCliente] = useState<any>("")
    const history = useHistory();

    useEffect(() => {
        async function fetchMyAPI() {
         
            let responseClie: any = await fetch('https://inventario-machamfamily.herokuapp.com/api/cliente/?cedula=' + match.params.id)
            responseClie = await responseClie.json()
            console.log(responseClie[0].id)
            setCliente(responseClie[0])

        }


        fetchMyAPI()
        console.log("dsabjh")

    }, [])
    return <IonPage>
        <IonToolbar color="dark">
            <IonRow>

                <IonTitle>Home</IonTitle>
                <IonRouterLink routerLink="/" >
                    <IonCardContent style={{ textAlign: "center" }}>
                        <IonCol>Cerrar Sesión</IonCol>
                    </IonCardContent>
                </IonRouterLink>
            </IonRow>
        </IonToolbar>
        <IonContent
            scrollEvents={true}
            onIonScrollStart={() => { }}
            onIonScroll={() => { }}
            onIonScrollEnd={() => { }}>
                <IonGrid>
                <IonRow>
      <IonCard style={{ backgroundColor: "#31383e", width: "40%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <IonRouterLink style={{ color: "white" }} routerLink="/productosClientes/" >
                <IonCardContent style={{ textAlign: "center" }}>
                    <IonRow>
                        <IonIcon
                            style={{ fontSize: "36px" }}
                            icon={qrCode}
                        />


                        <IonCol style={{ fontSize: "18px" }}>Productos</IonCol>
                    </IonRow>
                </IonCardContent>
            </IonRouterLink>
        </IonCard>
      <IonCard style={{ backgroundColor: "#31383e", width: "40%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <IonRouterLink style={{ color: "white" }} routerLink={`/cliente/${cliente.id}`}>
                <IonCardContent style={{ textAlign: "center" }}>
                    <IonRow>
                        <IonIcon
                            style={{ fontSize: "36px" }}
                            icon={qrCode}
                        />


                        <IonCol style={{ fontSize: "18px" }}>Perfil</IonCol>
                    </IonRow>
                </IonCardContent>
            </IonRouterLink>
        </IonCard>
        </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>

};