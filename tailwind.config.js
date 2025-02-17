/** @type {import('tailwindcss').Config} */
export default {
  darkMode : 'selector' ,
  darkMode: 'class'  ,  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'regal-blue' : 'rgb(4 42 101)' , 
        'regal-purple' : 'rgb(71 30 72)' , 
        'search-box' : 'rgb(227 227 227)' ,
        'search-box-dark' : 'rgb(51 58 69)' ,
        'gg' : '#ffffff'
      } ,
      screens : {
        xsss : '20px' , 
        sm : '700px'
      } , 
      height : {
        'h-100' : '100%'
      } ,
      gridTemplateColumns : {
        'ddf' : 'repeat(29, minmax(0, 1fr));'
      } ,
      gridColumn : {
        'ddd' : 'span 27 / span 27;' ,
        'ddk' : 'span 28 / span 28;'
      } ,
      gridColumnStart : {
        'ddg' : 'grid-column-start:29;'
      }
    },
  },
  plugins: [
    // برای استفاده از تنظیمات tailwind-scrollbar  می باشد 
    require('tailwind-scrollbar')({
      nocompatible: true,
      preferredStrategy: 'pseudoelements',
    // برای استفاده از تنظیمات tailwind-scrollbar  می باشد 
  }),
  ],
}



