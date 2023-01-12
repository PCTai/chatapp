
import { collection, getDocs, query } from 'firebase/firestore';

import React, { useEffect, useState } from 'react'
import {  db } from '../firebase/config';

const useUsers = ( room ) => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const getUsers = async () => {
            setUsers([])
            const q = query(collection(db, "users"));
            const data = [];
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if (doc.data()) {
                    if(room){
                        if (room.members && room.members.includes(doc.data().uid)) {
                            data.push(doc.data());
                        }
                    }else{
                        data.push(doc.data());
                    }
                }
            });
            setUsers(data);
        }
        getUsers();

        return () => {
            getUsers();
        }

    }, [room])
    return {
        users
    }
}

export default useUsers