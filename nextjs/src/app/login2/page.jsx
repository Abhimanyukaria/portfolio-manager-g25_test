import { HeaderJs } from "../components/header";
import TSLAChart from "../components/MyChart";




export default async function Page(){

    
   

    return (
        <div>

            <HeaderJs/>
            <div className='text-black'>


            <TSLAChart/>
            </div>
            
        </div>
    )
}