import React, { useState,useContext,useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs,addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Dashboard = () => {

    const [listCommand,setListCommand] = useState(['ggggg']);

    useEffect(()=>{
        const fetchOrders = async ()=>{
            const querySnapshot = await getDocs(query(collection(db, 'orders'),where('mail', '==', sessionStorage.getItem('token'))));
            console.log(querySnapshot.docs);

            const test = querySnapshot.docs.map(doc => ([...doc.data().cart]))
            console.log(test);
            
            setListCommand(test)
            // console.log(listCommand);
            
        }
        fetchOrders()

    },[])

    // if (!listCommand) return <div>Loading...</div>;

  return (
    <div>
        {listCommand.length <= 0? 
        (<div>oui</div>)
        :
        (
            <div>
                {listCommand.map((commands,index)=>(
                <div key={index}>
                    <div>Command n° : {index+1}</div>
                    {commands.map((command,index2)=>(
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