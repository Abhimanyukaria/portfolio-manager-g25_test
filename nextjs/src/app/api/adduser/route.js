import mongoose from "mongoose";
import User from "@/helpers/models/user";

import { NextResponse } from "next/server";

import { getSession } from '@auth0/nextjs-auth0';



export async function POST(req,res){
    const { user } = await getSession();

    console.log(user);


    return NextResponse.json(user);

}