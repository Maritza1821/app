import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonApp, IonPage, IonGrid, IonRow, IonCard, IonCardContent, IonCol, IonRouterLink, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router';
import { add, cartOutline, happy, home, logoAndroid, personCircle, pricetags, pricetagsOutline, qrCode, shapesOutline } from 'ionicons/icons';

export const Home: React.FC = () => {
    const history = useHistory();
    return <IonPage>
        <IonToolbar color="dark">

            <IonRow>

                <IonTitle>Macham Inventario</IonTitle>
                <IonRouterLink routerLink="/" >

                    <IonCol>Cerrar Sesión</IonCol>

                </IonRouterLink>
            </IonRow>

        </IonToolbar>
        <IonContent>

            <IonGrid>
                <IonRow>
                    <IonCard style={{ backgroundColor: "#232629", color: "white !important", width: "40%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <IonRouterLink style={{ color: "white" }} routerLink="/categorias/" >
                            <IonCardContent >
                                <IonRow>
                                    <IonIcon
                                        style={{ fontSize: "36px" }}
                                        icon={pricetagsOutline}
                                    />
                                    <IonCol style={{ fontSize: "18px" }}>Categorias</IonCol>
                                </IonRow>
                            </IonCardContent>

                        </IonRouterLink>
                    </IonCard>


                    <IonCard style={{ backgroundColor: "#232629", width: "40%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <IonRouterLink style={{ color: "white" }} routerLink="/clientes/" >
                            <IonCardContent style={{ textAlign: "center" }}>
                            <IonRow>
                                    <IonIcon
                                        style={{ fontSize: "36px" }}
                                        icon={personCircle}
                                    />
        
                                <IonCol style={{ fontSize: "18px" }}>Clientes</IonCol>
                                </IonRow>
                            </IonCardContent>
                        </IonRouterLink>
                    </IonCard>

                </IonRow>
                <IonRow>
                    <IonCard style={{ backgroundColor: "#232629", width: "40%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <IonRouterLink style={{ color: "white" }} routerLink="/proveedores/" >
                            <IonCardContent style={{ textAlign: "center" }}>
                            <IonRow>
                                    <IonIcon
                                        style={{ fontSize: "36px" }}
                                        icon={personCircle}
                                    />
        
                                
                                <IonCol style={{ fontSize: "18px" }}>Proveedores</IonCol>
                                </IonRow>
                            </IonCardContent>
                        </IonRouterLink>
                    </IonCard>
                    <IonCard style={{ backgroundColor: "#232629", width: "40%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <IonRouterLink style={{ color: "white" }} routerLink="/productos/" >
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

                </IonRow>
                <IonRow>
                    <IonCard style={{ backgroundColor: "#232629", width: "40%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <IonRouterLink style={{ color: "white" }} routerLink="/compras/" >
                            <IonCardContent style={{ textAlign: "center" }}>
                            <IonRow>
                                    <IonIcon
                                        style={{ fontSize: "36px" }}
                                        icon={cartOutline}
                                    />
        
                                
                                <IonCol style={{ fontSize: "18px" }}>Compras</IonCol>
                                </IonRow>
                            </IonCardContent>
                        </IonRouterLink>
                    </IonCard>
                    <IonCard style={{ backgroundColor: "#232629", width: "40%", height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <IonRouterLink style={{ color: "white" }} routerLink="/ventas/" >
                            <IonCardContent style={{ textAlign: "center" }}>
                            <IonRow>
                                    <IonIcon
                                        style={{ fontSize: "36px" }}
                                        icon={cartOutline}
                                    />
        
                                
                                
                                <IonCol style={{ fontSize: "18px" }}>Ventas</IonCol>
                                </IonRow>
                            </IonCardContent>
                        </IonRouterLink>
                    </IonCard>

                </IonRow>


            </IonGrid>


        </IonContent>
    </IonPage>

};