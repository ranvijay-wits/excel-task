import * as path from "path";
import * as fs from 'fs'
import { parse } from 'csv-parse';
import { JsonObject } from "@prisma/client/runtime/library";
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
import { Request, Response } from 'express';



export const uploadFile: any = (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send('No files were uploaded.');
    }

    const fileExtension = req.file.originalname.split('.').pop();

    if (fileExtension === 'csv') {
      const file: Express.Multer.File = req.file;
      const csvFilePath: string = path.resolve(__dirname, '../..', file.path);

      const fileContent: string = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

      parse(fileContent, {
        delimiter: ',',
        columns: true,
      }, async (error, result) => {
        if (error) {
          console.error(error);
        }
        const batchSize = 150;

        for (let i = 0; i < result.length; i += batchSize) {
          const chunk = result.slice(i, i + batchSize);
          try {
            await prisma.$transaction(async (prisma: any) => {
              const upsertPromises = chunk.map((ele: JsonObject) => {

                if (!!ele.sku) {
                  return prisma.data.upsert({
                    where: { sku: ele.sku },
                    update: { info: ele },
                    create: { sku: ele.sku, info: ele }
                  });
                }
              });
              await Promise.all(upsertPromises);
            });
            console.log(`Batch ${i / batchSize + 1} processed successfully.`);
          } catch (error) {
            console.error(`Error processing batch ${i / batchSize + 1}:`, error);
          }
        }
      });
      res.send('File uploaded successfully.');
    } else {
      res.status(500).json("File is unsupportable!!!, Please upload correct file");
    }
  } catch (error) {
    console.log(error);
  }

}



export const fetchAllData: any = async (req: Request, res: Response) => {
  const page: string = req.params.page
  const allData: JsonObject = await prisma.data.findMany({
    skip: (+page - 1) * 150,
    take: 150
  });
  res.status(200).json(allData)
}

