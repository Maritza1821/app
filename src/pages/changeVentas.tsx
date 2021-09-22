import React, { useEffect, useState } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonApp, IonPage, IonButtons, IonBackButton, IonCard, IonRow, IonCol, IonLabel, IonInput, IonButton, IonCheckbox, IonSelect, IonSelectOption, IonDatetime, IonSearchbar, IonFabButton, IonIcon, useIonAlert } from '@ionic/react';
import axios from "axios"
import { RouteComponentProps, useHistory } from 'react-router';
import { add, arrowBack, close, settings, settingsOutline } from 'ionicons/icons';
interface UserDetailPageProps
    extends RouteComponentProps<{
        id: string;
    }> { }
export const Venta: React.FC<UserDetailPageProps> = ({ match: match }) => {
    const history = useHistory();
    const [n_venta, setNumeroVenta] = useState<string>("")
    const [searchText, setSearchText] = useState<string>("")
    const [fk_cliente, setCliente] = useState<string>("")
    const [fecha, setFecha] = useState<string>("")
    const [subtotal, setSubtotal] = useState<number>(0.0)
    const [iva, setIva] = useState<number>(0.0)
    const [total, setTotal] = useState<number>(0.0)
    const [cantidad, setCantida] = useState<any>(1)
    const [listaClientes, setListaClientes] = useState<any>([])
    const [listaProductos, setListaProductos] = useState<any>([])
    const [listaProductosVenta, setListaProductosVenta] = useState<any>([])

    const [tipo, setTipo] = useState<boolean>(false)
    useEffect(() => {

        async function fetchMyAPI() {
            let response: any = await fetch('https://inventario-machamfamily.herokuapp.com/api/venta/' + match.params.id + "/")
            response = await response.json()
            let responsePro: any = await fetch('https://inventario-machamfamily.herokuapp.com/api/detallesventaalter/?fk_venta=' + response.id)
            let responseClie: any = await fetch('https://inventario-machamfamily.herokuapp.com/api/cliente/?id=' + response.fk_cliente)
            responsePro = await responsePro.json()
            responseClie = await responseClie.json()
            setCliente(response.fk_cliente);
            setNumeroVenta(response.n_venta);
            setListaProductosVenta(responsePro)
            let sub=0;
            let ivas=0;
            let tota=0;
            for (const iterator of responsePro) {
                console.log(iterator)
                sub=sub+Number(iterator.subtotal)
                ivas=ivas+Number(iterator.iva)
                tota=tota+Number(iterator.total)
            }
            setSubtotal(sub)
            setIva(ivas)
            setTotal(tota)

        }
        if (match.params.id != "new") {
            setTipo(true)
            fetchMyAPI()
        }
        console.log()
        let fechaTem = new Date().toISOString()
        var dateFormat: any = fechaTem.split('T')[0];
        setFecha(dateFormat);
        getData();
        async function getData() {
            let responseP = await fetch('https://inventario-machamfamily.herokuapp.com/api/cliente')
            responseP = await responseP.json()

            setListaClientes(responseP)


        }


    }, [])


    const agegarItemVenta = async (id: string, precio: string, nombre_producto: string) => {
        console.log(nombre_producto)
        let valor = Number(precio) * Number(cantidad)
        let subttotal = (Number(precio) * Number(cantidad)) / 1.12;
        let ivaa = valor - subttotal;
        let totala = valor
        const producto = {
            fk_producto: id,
            nombre_producto: nombre_producto,
            cantidad: Number(cantidad),
            subtotal: Number(subttotal.toFixed(2)),
            iva: Number(ivaa.toFixed(2)),
            total: Number(totala.toFixed(2)),
            fk_venta: "",
        }
        setSubtotal(subtotal + subttotal)
        setIva(iva + ivaa)
        setTotal(total + totala)

        listaProductosVenta.push(producto)
        setListaProductosVenta(listaProductosVenta)
        setCantida(1)
        setListaProductos([])
        setSearchText("")
    }

    const Search = async (value: string) => {

        setSearchText(value);
        let responsePro = await fetch('https://inventario-machamfamily.herokuapp.com/api/producto/?nombre=' + value)
        responsePro = await responsePro.json()

        if (value.length === 0) {
            setListaProductos([])

        } else {

            setListaProductos(responsePro)
        }

    }

    const deleteProducto = (id: string, ivaI: number, subtI: number, totalI: number) => {
        console.log(id)
        setSubtotal(subtotal - subtI)
        setIva(iva - ivaI)
        setTotal(total - totalI)
        let lista = listaProductosVenta.filter((item: any) => item.fk_producto != id)
        setListaProductosVenta(lista)
    }


    const Guardar = async () => {
        if (fk_cliente.length === 0) {
            present({
                cssClass: 'my-css',
                header: 'Alert',
                message: "Debe escoger un cliente",
                buttons: [
                    'Cancel',
                    { text: 'Ok', handler: (d) => console.log('ok pressed') },
                ],
                onDidDismiss: (e) => console.log('did dismiss'),
            })
            return;
        }
        if (listaProductosVenta.length === 0) {
            present({
                cssClass: 'my-css',
                header: 'Alert',
                message: `Debe agregar productos a la venta`,
                buttons: [
                    'Cancel',
                    { text: 'Ok', handler: (d) => console.log('ok pressed') },
                ],
                onDidDismiss: (e) => console.log('did dismiss'),
            })
            return;
        } else {
            let fechaTem = fecha;
            if (fecha.length > 10) {
                fechaTem = fecha.split('T')[0];
            }
            let datos: any = {
                n_venta: n_venta,
                fk_cliente: fk_cliente,
                fecha: fechaTem,
                subtotal: Number(subtotal.toFixed(2)),
                iva: Number(iva.toFixed(2)),
                total: Number(total.toFixed(2)),
            }
            if (tipo === true) {
                fetch("https://inventario-machamfamily.herokuapp.com/api/venta/" + match.params.id + "/", {
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
                    history.push("/ventas/");
                    window.location.reload()
                }).catch(function (ex) {
                    console.log("parsing failed", ex);
                });
            } else {
                let resul = await fetch("https://inventario-machamfamily.herokuapp.com/api/venta/", {
                    method: "POST",
                    credentials: "same-origin",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos),
                })

                if (resul.status === 400) {
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
                    let data = await resul.json()
                    let id = data.id;
                    let lista = listaProductosVenta.filter((item: any) => {

                        item.fk_venta = id;
                        return item;
                    })
                    let resuls = await fetch("https://inventario-machamfamily.herokuapp.com/api/detallesventa/", {
                        method: "POST",
                        credentials: "same-origin",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(lista),
                    })

                    if (resuls.status === 400) {
                        console.log(resuls)
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
                    } else if (resuls.status === 201) {
                        let data = await resuls.json()
                        console.log(data)

                        history.push("/ventas/")
                        window.location.reload()
                    }
                    //  history.push("/compras/")
                }
            }
        }


    }
    const [present] = useIonAlert();
    return <IonPage>
        <IonToolbar color="dark">
        <IonButtons slot="start">
            <IonCol onClick={() => history.push("/ventas")}>

<IonTitle>
    <IonIcon icon={arrowBack}></IonIcon>
</IonTitle>
    </IonCol>
            </IonButtons>
            <IonTitle>Datos Venta</IonTitle>
        </IonToolbar>
        <IonContent
            scrollEvents={true}
            onIonScrollStart={() => { }}
            onIonScroll={() => { }}
            onIonScrollEnd={() => { }}>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating"> Numero de venta</IonLabel>
                        <IonInput
                        disabled={tipo?true:false}
                            type="number"
                            value={n_venta}
                            onIonChange={(e) => setNumeroVenta(e.detail.value!)}
                        >
                        </IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>

                    <IonLabel>Seleccione la fecha</IonLabel>
                    <IonDatetime  disabled={tipo?true:false} displayFormat="YYYY-MM-DD" placeholder="Select Date" value={fecha} onIonChange={e => setFecha(e.detail.value!)}></IonDatetime>
                </IonCol>


            </IonRow>
            <IonItem>
                <IonLabel>Cliente</IonLabel>
                <IonSelect     disabled={tipo?true:false} value={fk_cliente} placeholder="Seleccione el cliente" onIonChange={e => setCliente(e.detail.value)}>
                    {
                        listaClientes.map((item: any) => {
                            return <IonSelectOption key={item.id} value={item.id}>{item.nombre}</IonSelectOption>
                        })
                    }

                </IonSelect>
            </IonItem>
            {

                tipo === false && <>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel>Buscar los Productos</IonLabel>

                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonSearchbar value={searchText} placeholder="Buscar productos" onIonChange={e => Search(e.detail.value!)} showCancelButton="always" onIonClear={() => setListaProductos([])}></IonSearchbar>
                            {
                                listaProductos.map((item: any) => {
                                    return <IonCard key={item.id} style={{ backgroundColor: "#123456", padding: "8px", color: "white" }}>
                                        <IonRow>
                                            <IonItem>
                                                <IonLabel position="floating"> Cantidad</IonLabel>
                                                <IonInput style={{ width: 40 }} value={cantidad} type="number" onIonChange={(e) => setCantida(e.detail.value!)} />
                                            </IonItem>
                                            <IonCol>
                                                <IonTitle >{item.nombre}  </IonTitle>
                                            </IonCol>
                                            <IonFabButton onClick={() => {
                                                agegarItemVenta(item.id, item.precio, item.nombre)
                                            }}>
                                                <IonIcon size="small" icon={add} />

                                            </IonFabButton>
                                        </IonRow>

                                    </IonCard>
                                })
                            }
                        </IonCol>
                    </IonRow>
                </>

            }
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel>Lista de Productos</IonLabel>
                    </IonItem>
                    <IonRow style={{ justifyContent: "space-around", padding: 8 }}>
                        <IonLabel>Cant</IonLabel> <IonLabel>Descripción</IonLabel> <IonLabel>Valor total</IonLabel>{
                            tipo ===false && <IonLabel><IonIcon size="small" icon={settingsOutline} /></IonLabel>
                        }
                    </IonRow>
                    {
                        listaProductosVenta.map((item: any) => {
                            return <IonRow style={{ justifyContent: "space-around", padding: 8 }}>
                                <IonLabel>{item.cantidad} </IonLabel> <IonLabel>
                                    {
                                        tipo === true ? item.fk_producto : item.nombre_producto
                                    }
                                </IonLabel> <IonLabel>{item.total} </IonLabel>
                                {
                                        tipo === false &&  <IonLabel style={{ background: "red" }} onClick={() => {
                                            deleteProducto(item.fk_producto, item.iva, item.subtotal, item.total);
                                        }}>
                                            <IonIcon size="small" icon={close} />
        
                                        </IonLabel>
                                    }
                               
                            </IonRow>
                        })
                    }
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel style={{ textAlign: "right" }}>Subtotal {`-->`} {subtotal.toFixed(2)} </IonLabel>
                    </IonItem>
                    <IonItem>

                        <IonLabel style={{ textAlign: "right" }}>IVA {`-->`} {iva.toFixed(2)} </IonLabel>
                    </IonItem>
                    <IonItem>

                        <IonLabel style={{ textAlign: "right" }}>Total {`-->`} {total.toFixed(2)} </IonLabel>
                    </IonItem>

                </IonCol>
            </IonRow>
            {
                tipo === false && <IonRow>
                    <IonCol>


                        <IonButton expand="block" onClick={() => Guardar()}>
                            Guardar
                        </IonButton>

                    </IonCol>
                </IonRow>
            }

        </IonContent>
    </IonPage>

};