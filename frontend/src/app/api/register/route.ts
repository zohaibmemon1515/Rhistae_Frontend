import { NextResponse, NextRequest } from "next/server";
import client from "@/lib/sanity";

export async function POST(request: NextRequest) {
    try{
        const body = await request.json();
        const {name, age, gender, city, profession, education} = body;

        if (!name || !age || !gender || !city || !profession || !education) {
            return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
        }

        const doc = {
            _type: "profile",
            name,
            age: parseInt(age),
            gender,
            city,
            profession,
            education,
        }
        const result = await client.create(doc);

        return NextResponse.json({success: true , message: "Profile registered successfully!", data: result}, { status: 201 });
    } catch (error) {
        console.error("Error registering profile:", error);
        return NextResponse.json({ success: false, message: "Failed to register profile." }, { status: 500 });
    }
}