const express =  require('express')
const mongoose =  require('mongoose')
const cors = require('cors')

 const productRoutes =  require('./routes/product-routes')

const app =  express()


app.use(express.json())
app.use(cors())



app.use('/api' , productRoutes)



mongoose  
.connect('mongodb://127.0.0.1:27017/manafGrocery')  
.then(() => {  
    console.log("Connected to MongoDB");  
    app.listen(8000);  
})  
.catch((err) => {  
    console.log("MongoDB connection error: ", err);  
});

