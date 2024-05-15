import * as fs from "fs";
import { parse } from 'csv-parse';

const data: any = (csvFilePath: string) => {
  const fileContent: string = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

  parse(fileContent, {
    delimiter: ',',
    columns: true,
  }, (error, result) => {
    if (error) {
      console.error(error);
    }
    return result;
  });
};

export default data