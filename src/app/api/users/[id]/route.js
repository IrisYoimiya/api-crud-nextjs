import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(request, {params}) {
    const id = parseInt(params.id)

    const user = await prisma.user.findUnique(
        {
            where:{
                id,
            }
        }
    )

    if(!user){
        return NextResponse.json(
            {
                success: false,
                message: "User tidak ditemukan",
                data : null
            },{status:404}
        )
    }

    return NextResponse.json(
        {
            success: true,
            message: "Detail data user",
            data : user
        },{status:200}
    )
}

export async function DELETE(request, {params}) {
    const id = parseInt(params.id)

    const {name, email, address} = await request.json()
    await prisma.user.delete(
        {
            where: {
                id,
            }
        }
    )

    return NextResponse.json(
        {
            success: true,
            message: "User telah dihapus"
        },{status: 200}
    )
}