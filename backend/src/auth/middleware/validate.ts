import { NextFunction,Response,Request } from "express";

export const validate = (schema: any) => 
  (req: Request, res: Response, next: NextFunction): Response | void => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };