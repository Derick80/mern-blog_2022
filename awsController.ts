import {S3,  AbortMultipartUploadCommand } from "@aws-sdk/client-s3";
import { Observable, of } from 'rxjs';
import post from "./src/pages/api/post";

class FileUpload {
  name: string;
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
  result: any[];
}

const bucketName = 'arn:aws:s3:::mys3bucketblog'
const accessKeyId= process.env.AWS_ACCESS_KEY_ID,
const secretAccessKey= process.env.AWS_SECRET_KEY,
const   region = 'us-east-2'


const s3 = new S3({ 

    region,

})


export async function generateUploadURL(){
    const imageName = "random image name"
    const params =({ 

        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

    const avatar_url = await s3.getSignedUrlPromise('putObject', params)
    return avatar_url
}


