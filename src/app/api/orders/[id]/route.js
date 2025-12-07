import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(request, {params}) {
    const id = parseInt(params.id)

    const order = await prisma.product.findUnique({
        where:{
            id,
        }
    })

    if(!order){
        return NextResponse.json(
            {
                success: false,
                message: "order not found",
                data: null
            },{status:404}
        )
    }
    return NextResponse.json(
        {success: true, message: "Order has found", data: order},
        {status:200}
    )
}

export async function DELETE(request, {params}) {
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
                message: "Order deleted",
            },{status:200}
        )
        
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },{status:404}
        )
    }
}

export async function PATCH(request, {paramas}) {
    const id = parseInt(params.id)
    try {
        const {quantity} = await request.json()
    
        const oldOrder = await prisma.order.findUnique({
            where: {
                id
            }, include: {
                product : true
            }
        })
    
        if(!oldOrder){
            return NextResponse.json({success : false, message : "Data not found"})
        }
    
        const currentStock = oldOrder.product.stock + oldOrder.quantity
    
        if (currentStock < quantity){
            return NextResponse.json({success : false, message : "stok not available"})
        }
    
        const newTotalPrice = oldOrder.product.price * quantity
    
        const result = await prisma.$transaction([
            prisma.product.update({
                where: {
                    id : oldOrder.product.id
                },data : {
                    stock : currentStock - quantity
                }
            }),
    
            prisma.order.update({
                where:{
                    id
                },data : {
                    quantity : quantity,
                    totalPrice : newTotalPrice
                }
            })
        ])
    
        return NextResponse.json(
            {
                success: true,
                message: "Order berhasil diupdate!",
                data: result[1] 
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Gagal update order", error: error.message },
            { status: 500 }
        );
    }
}