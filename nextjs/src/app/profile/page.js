'use client'
// import { Layout, Breadcrumb, Card } from 'antd';
import { useUser } from '@auth0/nextjs-auth0/client';
import LogoutButton from '../components/LogoutButton';
import { HeaderJs } from '../components/header';
import MyLoader from '../components/loader';
import { useEffect, useState } from 'react';



export default function Profile() {


    const { user, error, isLoading } = useUser();



    const mydate  = user? user.updated_at.substring(0, 10): "Loading...";
    // const mydate = "hello";

    const [loading, setLoading] = useState(true);

    
    useEffect(()=> {
        // console.log("ok");
        if(user){
            // console.log("hi",user)
            setLoading(false);
        }
        else{
            console.log("error",error);
        }
    },[user,error])

    // console.log(user, error);

    if (loading) return <MyLoader/>

    return (

        
        <div>
            <HeaderJs/>
            <div >
        <div className="container2 flex flex-col justify-center items-center h-[100vh] text-black bg-slate-300">
            <div className="relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 drk:!bg-navy-800 drk:text-white drk:!shadow-none">
                <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover" >
                    <img src="/randomass.jpg" className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"/> 
                    <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 drk:!border-navy-700">
                        <img className="h-full w-full rounded-full" src={user.picture} alt="avatar"/>
                    </div>
                </div> 
                <div className="mt-16 flex flex-col items-center">
                    <h4 className="text-xl text-black font-bold text-navy-700 drk:text-white">
                    {user.nickname}
                    </h4>
                    <p className="text-base font-normal text-gray-800">{user.email}</p>
                    <div className='font-bold pt-3'> <span className=''> Joined at: </span> {mydate}</div>
                </div> 
                

                <div className='mt-2 text-white flex justify-end  w-full'>
                <LogoutButton/>                   
                </div>           


            </div>  
            
        </div>
    </div>
               
              
        </div>
    )
}