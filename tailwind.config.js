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
        'gg' : '#ffffff' , 
        'gg-1' : '#1b2e35' ,
        'gg-2' : '#dca001' , 
        'gg-3' : '#f5f5ff'  , 
        'gg-3-dark' : '#d0d9ff' , 
        'gg-4' : '#6d75f4' , 
        'gg-5' : '#b8c0e2' , 
        'footer-1' : 'rgb(247 247 247)' ,
        'footer-2' : '#172934' ,
        'footer-3' : '#a39e9b' , 
      } ,
      screens : {
        xsss : '20px' , 
        sm : '700px'
      } , 
      height : {
        'h-100' : '100%' ,
        '6.5' : '6.5rem'
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
      } ,
      gridTemplateColumns : {
        '15' : 'repeat(15, minmax(0, 1fr))'
      } ,
      width : {
        '6.5' : '6.5rem'
      }
    },
  },
  plugins: [
    // برای استفاده از تنظیمات tailwind-scrollbar  می باشد 
    require('tailwind-scrollbar')({
      nocompatible: true,
      preferredStrategy: 'pseudoelements',
  }),
  ],
}



