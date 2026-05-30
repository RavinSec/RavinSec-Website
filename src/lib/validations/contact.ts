import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد").max(100),
  email: z.string().email("یک آدرس ایمیل معتبر وارد کنید"),
  company: z.string().max(120).optional().or(z.literal("")),
  subject: z.string().max(160).optional().or(z.literal("")),
  message: z.string().min(10, "پیام باید حداقل ۱۰ کاراکتر باشد").max(5000),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
