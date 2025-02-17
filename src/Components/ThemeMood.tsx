import { useState , useEffect } from "react";  
import { Row, Stack, Col } from "react-bootstrap";  
import { Form } from "react-bootstrap"; 
import { Link } from "react-router-dom";





type Mood = "light" | "dark" | "system" & string 






function ThemeMood() { 
  const [currentMood, setCurrentMood] = useState<Mood>(('system'));   
  const [theme , setTheme]  = useState (() => {

    // بررسی مقدار تم ذخیره‌شده در localStorage 
    const savedTheme = localStorage.getItem('theme');  
    if (savedTheme) return savedTheme ;

    //  اگر مقداری ذخیره نشده باشد پس مقدار پیشفرض سیستم را بررسی می کنیم

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; 

  })


  useEffect(() => {  
      // تغییر کلاس 'dark' بر روی <html> 
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);  
  }, [currentMood , theme]);  

  const toggleThemeToDark = () => {  
    setTheme(theme === 'light' ? 'dark' : 'dark');  
  };  


  const toggleThemeToLight = () => {  
    setTheme(theme === 'dark' ? 'light' : 'light');  
  };  


  const toggleThemeToSystem = () => {
    if (currentMood !== 'system') {
      setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    }
  }
  
  


  

  function toggleMood(mood: Mood) {  
    if (currentMood === mood) {  
      setCurrentMood("system"); // Default to system mode if the same mood is selected  
    } else {  
      setCurrentMood(mood); 
    }  
  }  

  type ToggleButtonProps = {
    mood : Mood ;
  }


 function ToggleButton({mood} : ToggleButtonProps) {  
  const sys = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (currentMood === mood) {
    setTheme(currentMood ==='system' && sys  || currentMood === 'dark' ? 'dark' :  'light')
  }
 
    return (  
      <>
       <Form>  
        <Form.Check 
          type="switch"  
          name="custom-switch"  
          label=""  
          checked={currentMood === mood}  
          onChange={() => toggleMood(mood)
          }  
        />  
      </Form>  

      </>
     
    );  
  }  

  return (  
    <div  
      style={{ fontFamily: "cursive" }}  
      className=" flex flex-col justify-center items-center h-screen dark:bg-gray-800 "
    >  
      <div className="rounded-3xl  bg-slate-200 dark:bg-gray-900  dark:text-white w-1/3 h-1/2 p-3 flex justify-center items-center">  
        <Stack gap={5}>  
          <Row className="flex justify-center">Choose mood</Row>  
          <Row className="flex justify-start">  
            <Col>  
              <p>Dark</p>  
            </Col>  
            <Col className="flex justify-end"> 
            
            <button onClick={toggleThemeToDark}>
               <ToggleButton  mood="dark" /> 
            </button>
            
             
            </Col>  
          </Row>  
          <Row className="flex justify-start">  
            <Col>  
              <p>Light</p>  
            </Col>  
            <Col className="flex justify-end"> 
            <button onClick={toggleThemeToLight}>
            <ToggleButton  mood="light" /> 
            </button>
            
             
               
            </Col>  
          </Row>  
          <Row className="flex justify-start">  
            <Col>  
              <p>System</p>  
            </Col>  
            <Col className="flex justify-end">  

            <button onClick={toggleThemeToSystem}>
            <ToggleButton mood="system" /> 
            </button>
            
          
               
            </Col>  
          </Row>  
        </Stack>  
      </div>  
      <Link to={'/MyInput'}>
      <button className="btn btn-outline-secondary mt-2 " type="button">next</button>
      </Link>
      
      </div>
       
  );  
}  

export default ThemeMood;