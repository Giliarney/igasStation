"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import '@/styles/inputPhone.css';


// Definindo o schema de validação com Zod
const formSchema = z.object({
  username: z.string().min(3, {
    message: "O nome tem que ter no mínimo 3 caracteres.",
  }),
  lastname: z.string().min(3, {
    message: "O sobrenome tem que ter no mínimo 3 caracteres.",
  }),
  email: z.string().email({
    message: "E-mail inválido.",
  }),
  phone: z.string().min(11, {
    message: "O telefone deve ter no mínimo 11 caracteres.",
  }),
  text: z.string().min(50, {
    message: "A mensagem deve ter no mínimo 50 caracteres.",
  }),
})

export function ContactForm() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      lastname: "",
      email: "",
      phone: "",
      text: "",
    },
  })

  // Função de submissão
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values) // Aqui você pode enviar os dados ou fazer outra ação

    toast({
      description: "Registro efetuado com sucesso.",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center pb-2 bg-white rounded-lg border"
      >
        <div className="w-full flex flex-col p-10 gap-4">

          <div className="w-full grid grid-cols-2 gap-6">
            {/* Campo de Nome */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className=" text-slate-500">
                  <FormLabel className="text-slate-700">Nome:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        form.formState.errors.username
                          ? form.formState.errors.username.message
                          : "Insira seu nome"
                      }
                      {...field}
                      className={`${
                        form.formState.errors.username
                          ? "border-red-500 placeholder-red-500"
                          : "focus:border-emerald-400"
                      }`}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Campo de Sobrenome */}
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className=" text-slate-500">
                  <FormLabel className="text-slate-700">Sobrenome:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        form.formState.errors.lastname
                          ? form.formState.errors.lastname.message
                          : "Insira seu sobrenome"
                      }
                      {...field}
                      className={`${
                        form.formState.errors.lastname
                          ? "border-red-500 placeholder-red-500"
                          : "focus:border-emerald-400"
                      }`}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="w-full grid grid-cols-2 gap-6">
            {/* Campo de E-mail */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className=" text-slate-500">
                  <FormLabel className="text-slate-700">E-mail:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        form.formState.errors.email
                          ? form.formState.errors.email.message
                          : "Insira seu e-mail"
                      }
                      {...field}
                      className={`${
                        form.formState.errors.email
                          ? "border-red-500 placeholder-red-500"
                          : "focus:border-emerald-400"
                      }`}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Campo de Telefone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="text-slate-500">
                  <FormLabel className="text-slate-700">Telefone:</FormLabel>
                  <FormControl>
                    <Controller
                      {...field}
                      name="phone"
                      control={form.control}
                      render={({ field }) => (
                        <PhoneInput
                          international
                          defaultCountry="BR"
                          placeholder="Digite seu telefone"
                          value={field.value}
                          onChange={field.onChange}
                          className={`${
                            form.formState.errors.phone
                              ? "border rounded-lg h-10 p-3 border-red-500 placeholder-red-500"
                              : "border rounded-lg h-10 p-3 checked:border-emerald-400;"
                          }`}
                        />
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="w-full">
            {/* Campo de Mensagem */}
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className=" text-slate-500">
                  <FormLabel className="text-slate-700">Mensagem:</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={
                        form.formState.errors.text
                          ? form.formState.errors.text.message
                          : "Digite sua mensagem aqui"
                      }
                      {...field}
                      className={`${
                        form.formState.errors.text
                          ? "border-red-500 placeholder-red-500"
                          : "focus:border-emerald-400"
                      }`}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        
          <FormDescription className="text-muted-foreground text-center">
            Envie uma mensagem sobre dúvida, sugestão para melhorias ou para propostas comerciais.
          </FormDescription>
        </div>
        
        {/* Botão de Envio */}
        <Button
          type="submit"
          className="w-72 flex gap-2 justify-center items-center hover:bg-slate-600 bg-slate-700"
        >
          <Send />
          Enviar
        </Button>
      </form>
    </Form>
  )
}
