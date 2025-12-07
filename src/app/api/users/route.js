import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET() {
    const users = await prisma.user.findMany()

    return NextResponse.json(
        {
            sucess : true,
            message : "List data Users",
            data: users
        },
        {
            status: 200,
        }
    )
}

export async function POST(request) {
    const {name, email, address} = await request.json()
    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            address: address
        }
    })

    return NextResponse.json(
        {
            sucess: true,
            message: "Data berhasil dimasukan",
            data: newUser
        },
        {
            status: 201
        }
    )
}