import React, { useEffect } from 'react';
import SQLite from "react-native-sqlite-storage";
import AppNavigator from './navigation/AppNavigator';



const App = () => {

    useEffect(function() {
        SQLite.DEBUG(true);
        SQLite.enablePromise(true);
    
        SQLite.openDatabase({
            name: "TestDatabase",
            location: "default"
        }).then((db) => {
            console.log("Database open!");
        });
    }, []);

    return (
        <AppNavigator />
    )
}




export default App;