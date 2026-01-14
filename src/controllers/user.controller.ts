import type { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  const users = [
    { id: 1, name: "Dexter Morgan", job: "Blood Analyst" },
    { id: 2, name: "Debra Morgan", job: "Captian" },
  ];
  res.status(200).json(users);
};
