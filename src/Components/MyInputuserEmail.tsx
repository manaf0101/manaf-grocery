import { Stack , Row , Col } from "react-bootstrap"
import { forwardRef } from "react"



 


type PropsType = {
    inputStyle : string
    buttonstyle : string
    warningStyele : string
    VscArrowSmallRight : any
    warningText : string
}

const MyInputuserEmail = forwardRef<HTMLInputElement , PropsType>(function MyInputuserEmail(props , ref) {

    const {inputStyle , buttonstyle,warningText,warningStyele , VscArrowSmallRight} : any = props

    return (
        <Stack gap={2}>
        <Row>
            <Col> <p className="dark:text-teal-400  text-slate-950 ml-2"style={{fontFamily : 'cursive'}}>Enter your email <span className="text-red-600">*</span></p> </Col>
        </Row>

   {/* مربوط به پر کردن ایمیل و دکمه ی continue */}
        <div className="grid grid-cols-3 md:grid-cols-12 gap-1">
            <div className="flex justify-center col-start-1 col-span-1 md:col-start-1 md:col-span-1 mt-2">
                {VscArrowSmallRight}
            </div>
        
            <div className="col-start-2 col-span-2 md:col-start-2 md:col-span-9">
                <input type="text" name="input" ref={ref} className={`${inputStyle}`}/>
            </div>

            <div className="col-start-2 col-span-2 md:col-start-11 md:col-span-2 flex justify-center "> 
            <button name="bt" className={`${buttonstyle}`} >continue</button>
            </div>
        </div>
   {/* مربوط به پر کردن ایمیل و دکمه ی continue */}

          <div className="grid grid-cols-3">
            <div className="col-start-2 col-span-2">
                <div className="flex justify-center">
                    <p dir="rtl" className={`${warningStyele}`} style={{fontFamily : 'VAZIR'}}>{warningText}</p>
                </div>
            </div>
          </div>
              
    </Stack>       
    )


})

export default MyInputuserEmail


