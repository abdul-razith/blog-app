
import { ConnectDB } from "../../../../lib/config/db";
import {writeFile} from "fs/promises"
import BlogModel from "../../../../lib/models/blogModel";

const { NextResponse } = require("next/server");


const LoadDB = async () => {
    await ConnectDB();
}




export async function GET(request) {
    LoadDB();
    console.log("BLOG GET HIT");
    return NextResponse.json({msg : "API WORKING"});
}


export async function POST(request) {
    LoadDB();

    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get('image');

    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    const path = `./public/${timestamp}_${image.name}`;

    await writeFile(path, buffer);

    const imgUrl = `/${timestamp}_${image.name}`;



    const blogData = {
        thumbnail : `${imgUrl}`,
        /* tags : `${formData.get('tags')}`, */
        tags: formData.get('tags').split(","),
        title : `${formData.get('title')}`,
        description : `${formData.get('description')}`,
        author : `${formData.get('author')}`,
        /* createdAt : `${formData.get('createdat')}`, */
        createdAt: new Date(formData.get('createdat')),
        blogContent : `${formData.get('blogcontent')}`,
    }

    await BlogModel.create(blogData);
    console.log("BLOG SAVED");

    return NextResponse.json({success : true , msg : "blog added"});
}