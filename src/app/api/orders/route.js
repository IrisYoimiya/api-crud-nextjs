import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET() {
    const orders = await prisma.order.findMany()

    return NextResponse.json(
        {
            success: true,
            message: "List Orders",
            data: orders
        },{status:200}
    )
}

export async function POST(request) {
    const {userId, productId, quantity} = await request.json()

    const product = await prisma.product.findUnique({
        where: {id : productId}
    })

    if(!product){
        return NextResponse.json(
            {
                success: false,
                message: "Produk tidak ditemukan",
            },{status:505}
        )
    }

    if(product.stock < quantity){
        return NextResponse.json(
            {
                success: false,
                message: "Produk tidak cukup"
            },{status: 400}
        )
    }

    const totalBayar = product.price * quantity

    const newOrder = await prisma.order.create(
        {
            data: {
                quantity: quantity,
                totalPrice: totalBayar,

                userId: userId,
                productId: productId
            }
        }
    )

    await prisma.product.update({
        where:{id: productId},
        data : {
            stock : product.stock - quantity
        }
    })

    return NextResponse.json(
        {
            success: true,
            message: "Order berhasil ditambahkan",
            data: newOrder
        },{status:201}
    )
}