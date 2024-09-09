import React, { useState,useContext,useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs,addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Dashboard = () => {

    const [listCommand,setListCommand] = useState([]);

    useEffect(()=>{
        const fetchOrders = async ()=>{
            const querySnapshot = await getDocs(query(collection(db, 'orders'),where('mail', '==', sessionStorage.getItem('token'))));

            const orders = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000 + data.createdAt.nanoseconds / 1000000) : null
                };
            });

            const sortedOrders  = orders.sort((a, b) => a.createdAt - b.createdAt);
            
            setListCommand(sortedOrders)
            console.log(listCommand);
            
        }
        fetchOrders()

    },[])

    // if (!listCommand) return <div>Loading...</div>;

  return (
    <div>
        {listCommand.length <= 0? 
        (<div>Pas de commande effectué</div>)
        :
        (
            <div>
                {/* {listCommand.} */}
                {listCommand.map((commands,index)=>(
                <div key={commands.id}>
                    <div>Command n° : {index+1}</div>
                    <div>Réalisé le {commands.createdAt.toLocaleString()}</div>
                    {commands.cart.map((command,index2)=>(
                    <div key={command.id}>
                        <div>Acticle n° : {index2+1}</div>
                        <div>{command.name}</div>
                    </div>))}
                </div>))}
            </div>
        )
        }
        
    </div>
  )
}

export default Dashboard