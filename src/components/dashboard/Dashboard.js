import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Dashboard.css'

const Dashboard = () => {

    const [listCommand,setListCommand] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchOrders = async ()=>{
            const querySnapshot = await getDocs(query(collection(db, 'orders'),where('mail', '==', sessionStorage.getItem('token'))));
            const orders = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000 + data.createdAt.nanoseconds / 1000000) : null // converti date en format compréhensible
                };
            });

            const sortedOrders  = orders.sort((a, b) => a.createdAt - b.createdAt);
            setListCommand(sortedOrders)
        }
        fetchOrders()
    },[])

    const returnBtn =()=>{
        navigate('/');
    }

    const goToBook = (id)=>{
        navigate('/products/'+id);
    }

    return (
        <div className="dashboard">
        <button onClick={returnBtn}>Retour</button>
          {listCommand.length <= 0 ? (
            <div className="no-orders">Aucune commande trouvée</div>
          ) : (
            <div className="orders">
              {listCommand.map((command, index) => (
                <div key={command.id} className="order-card">
                  <h3 className="order-number">Commande #{index + 1} : </h3>
                  <p className="order-date">Réalisée le {command.createdAt.toLocaleString()}</p>
                  <div className="order-items">
                    {command.cart.map((item, index2) => (
                      <div key={item.id} className="item">
                        <p className="item-number">Article #{index2 + 1} : </p>
                        <p className="item-name" onClick={()=>goToBook(item.id)}>{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };

export default Dashboard