"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Send} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(3, {
    message: "O nome tem que ter no mínimo 3 caracteres.",
  }),

  lastname: z.string().min(3, {
    message: "O sobrenome tem que ter no mínimo 3 caracteres.",
  }),

  email: z.string().min(10, {
    message: "Username must be at least 2 characters.",
  }),

  phone: z.string().min(11, {
    message: "Username must be at least 2 characters.",
  }),

  text: z.string().min(50, {
    message: "A messagem deve ter no mínimo 50 caracteres.",
  }),
})

export function ContactForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          lastname: "",
          email: "",
          phone: "",
          text: ""
        },
      })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col justify-center items-center">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (

            <FormItem className="p-8">
              <FormLabel className="text-slate-700">Nome:</FormLabel>
              <FormControl>
                <Input placeholder="Insira seu nome" {...field} />
              </FormControl>

              <FormLabel className="text-slate-700">Sobrenome:</FormLabel>
              <FormControl>
                <Input placeholder="Insira seu sobrenome" {...field} />
              </FormControl>

              <FormLabel className="text-slate-700">E-mail:</FormLabel>
              <FormControl>
                <Input placeholder="Insira seu e-mail" {...field} />
              </FormControl>

              <FormLabel className="text-slate-700">Telefone:</FormLabel>
              <FormControl>
                <Input placeholder="Insira seu telefone" {...field} />
              </FormControl>

              <FormLabel className="text-slate-700">Messagem:</FormLabel>
              <Textarea placeholder="Digite sua mensagem aqui"></Textarea>

              <FormDescription className="text-muted-foreground">
                Envia uma mensagem sobre dúvida, sugestão para melhorias ou para propostas comerciais.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-72 flex gap-2 justify-center items-center hover:bg-slate-600 bg-slate-700">
          <Send/>
          Enviar
        </Button>
      </form>
    </Form>
  )
}
