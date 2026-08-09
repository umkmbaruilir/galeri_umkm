import { z } from "zod";

export const umkmSchema =
  z.object({
    name: z.string(),
    owner: z.string(),
    description: z.string(),
    address: z.string(),
    whatsapp: z.string(),
  });