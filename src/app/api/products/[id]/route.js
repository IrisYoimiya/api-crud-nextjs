import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(request, {params}) {
    const id = parseInt(params.id)

    const product = await prisma.product.findUnique({
        where:{
            id
        }
    })

    if (!product){
        return NextResponse.json(
            {
                success: false,
                message: "Product not found",
                data: null
            },{status: 404}
        )
    }

    return NextResponse.json(
        {
            success: true,
            message: "Data found",
            data: product
        },{status: 400}
    )
}

export async function  DELETE(request,{params}) {
    const id = parseInt(params.id)
    try {
        await prisma.product.delete({
            where: {
                id,
            }
        })
    
        return NextResponse.json(
            {
                success: true,
                message: "Data deleted succed"
            },{status: 200}
        )
    } catch (error) {
        if(error.code === 'P2025'){
            return NextResponse.json(
                {
                    success: false,
                    message: "Data not found"
                },{status : 400}
            )
        }
        return NextResponse.json(
            {
                success: false,
                message: error.message
            },{status : 404}
        )
    }
}

export async function PATCH(request, {params}) {
    const id = parseInt(params.id)

    try {
        const {name, price, stock} = await request.json()
        const product = await prisma.product.update(
            {
                where:{
                    id,
                }, data: {
                    name : name,
                    price : price,
                    stock : stock
                }
            }
        )
    
        return NextResponse.json(
            {
                success : true,
                message : "Product succes update",
                data : product
            },{status: 200}
        )
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
                data: null
            },{status:404}
        )
    }
}