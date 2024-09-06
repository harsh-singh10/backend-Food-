import multer from "multer";

import fs from "fs"

// image storage function 

const storage = multer.diskStorage({
    destination:"upload",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

export const upload = multer(
    {
        storage:storage

    }
)

