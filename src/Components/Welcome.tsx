 
import { useState, useEffect } from 'react';  
import {  Container } from "react-bootstrap";
import { Link } from "react-router-dom";


function Welcome() {  
  const [bounceCount, setBounceCount] = useState(0);  


  useEffect(() => {  
    const bounceInterval = setInterval(() => {  
      if (bounceCount < 3) {  
        setBounceCount(bounceCount + 1);  
      } else {  
        clearInterval(bounceInterval);  
      }  
    }, 1000); // تنظیم فاصله زمانی بین هر پرش  

    return () => clearInterval(bounceInterval);  
  }, [bounceCount]);  


// برای زمانی که صفحه را رفرش می کنیم  و مجدد بالا می آید ، بداند که حالت دارک مود است یا غیره 
useEffect(() => {
  document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
} , [])
// برای زمانی که صفحه را رفرش می کنیم  و مجدد بالا می آید ، بداند که حالت دارک مود است یا غیره 


  return (  
    <>  
    <div className=" h-screen bg-slate-50 dark:bg-slate-900 ">
    <Container  className="p-2">
       <div className="mt-10">  
        <h1  className={` animate-bounce  fw-bold text-slate-600 text-center ${bounceCount === 3 ? 'animate-none' : ''}`} style={{ fontFamily: 'cursive', fontSize: '50px' }}>  
          Welcome 
          <br />  
          to 
          <br />  
          grocery shop  
        </h1>  
       </div> 
      </Container>

      <div style={{fontFamily : 'cursive'}} className=" flex justify-center  mt-16">
        <Link to= '/theme-mood-third-page'>
        <button type="button" className="rounded-pill btn btn-primary btn-lg" >Let's gooo</button>
        </Link>
          
      </div>
     </div>


    </>  
  );  
}  

export default Welcome