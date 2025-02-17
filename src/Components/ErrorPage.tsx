import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error : any = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex justify-center h-screen " style={{alignItems : 'center'}}>
      <h1 className="text-center lh-lg">
        <h1 className="text-2xl">Oops!</h1>
      <br />
            EEEERRRRROOOOOOOORrrrr
      <br />
      <i>{error.statusText || error.message}</i>
     </h1>

     
      
      
    </div>
  );
}
