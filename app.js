const express=require('express');
const PORT= process.env.PORT || 8080;
const app=express();

app.get("/", (req, res)=>{
    res.json('Home Route');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});