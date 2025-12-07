import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET() {
    const products = await prisma.product.findMany()

    return NextResponse.json(
        {
            sucess : true,
            message : "List Products",
            data : products
        },
        {status: 200,}
    )
}

export async function POST(request) {
    const {name, price, stock} = await request.json()
    const newProducts = await prisma.product.create({
        data: {
            name: name,
            price: price,
            stock: stock
        }
    })
    return NextResponse.json(
        {
            sucess: true,
            message: "Data berhasil dimasukan",
            data: newProducts
        },
        {status: 201,}
    )
}