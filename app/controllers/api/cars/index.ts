import { Request, Response } from 'express';
import CarsService from '../../../services/carService';

async function getCars (req:Request, res:Response){
   try {
      const result = await CarsService.list(req.query);

      res.status(200).json(result);
  } catch (error:any) {
      res.status(500).json({ message: error.message });
  }
}

async function addCar (req:any, res:Response){
    if(!req.body){
        return res.status(400).send("Invalid Request")
    }
    try {
        const fileUpload = await CarsService.upload(req.file);
        const car = await CarsService.create({
            ...req.body,
            image: fileUpload.public_id
        });
        return res.status(201).json(car);
    }catch(e){
        return res.status(400).send("Gagal upload file")
    }
}

async function deleteCar (req:any, res:Response){
    const { id } = req.query;
    if (!id) {
        return res.status(400).send("ID tidak boleh kosong");
    }
    try{
        const imageDelete = await CarsService.deleteImg(id);
        const car = await CarsService.delete(id);
        res.status(200).send("Data berhasil di hapus")
    }
    catch(e){
        return res.status(404).send("Data tidak ditemukan!")
    }

}


export default {
    getCars,
    addCar,
    deleteCar
}