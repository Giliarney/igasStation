"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Fuel, Calendar as CalendarIcon, Droplet, DollarSign, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast"
import React from "react";
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ToastAction } from "@/components/ui/toast"

export interface Gas {
  tipo: string;
}

export interface Postos {
  nome: string;
}

const formSchema = z.object({
  nome_posto: z.string().min(1, {
    message: "Selecione o posto.",
  }),

  data: z.string().min(1, {
    message: "Selecione a data da coleta.",
  }),

  preco: z.string().min(1, {
    message: "Insira o preço.",
  }),

  tipo_combustivel: z.string().min(1, {
    message: "Selecione o tipo de combustível.",
  }),
});

export function FormGasRegister() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome_posto: "",
      data: "",
      preco: "",
      tipo_combustivel: "",
    },
  });

  const { data: gasStation } = useQuery<Postos[]>({
    queryKey: ["get-gas_station"],
    queryFn: async () => {
      const response = await fetch(`https://api-igas.onrender.com/gas_station`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  const { data: gas } = useQuery<Gas[]>({
    queryKey: ["get-gas"],
    queryFn: async () => {
      const response = await fetch(`https://api-igas.onrender.com/gas`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  const [startDate, setStartDate] = React.useState<Date>();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(`https://api-igas.onrender.com/coleta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome_posto: values.nome_posto,
          data: values.data,
          preco: values.preco,
          tipo_combustivel: values.tipo_combustivel,
        }),
      });
  
      const result = await response.text(); // Aqui capturamos o texto da resposta da API
  
  
      if (!response.ok) {
        throw new Error("Erro ao enviar coleta: " + result); // Exibe o erro específico
      }
  
      // Caso a requisição seja bem-sucedida, mostramos o toast de sucesso
      toast({
        title: "Sucesso!",
        description: "A coleta foi registrada.",
        variant: "default",
      });
  
      // Limpa os campos do formulário após o envio
      form.reset();
      setStartDate(undefined);
  
    } catch (error) {
  
      // Exibe o toast de erro, caso algo falhe
      toast({
        title: "Uh! algo de errado.",
        description: "Erro ao registrar, tente novamente.",
        variant: "destructive",
        action: <ToastAction altText="Try again">Tentar Novamente</ToastAction>
      });
    }
  };

  React.useEffect(() => {
    if (startDate) {
      form.setValue("data", format(startDate, "yyyy-MM-dd")); // Converte para string
    }
  }, [startDate, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4 text-muted-foreground">
        <div className="pt-4 md:p-8 flex flex-col md:gap-4">
          <div className="grid md:grid-cols-2 md:gap-6">
            {/* Campo Data */}
            <FormField
              control={form.control}
              name="data"
              render={({ field }) => (
                <FormItem className="text-slate-500">
                  <FormLabel className="text-slate-700">Data:</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild className="w-full">
                          <Button
                            variant={"outline"}
                            {...field}
                            className={cn(
                              "justify-between text-left font-normal hover:bg-transparent hover:text-muted-foreground",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            {startDate ? format(startDate, "dd/MM/yyyy") : <span>Data da coleta</span>}
                            <CalendarIcon className=" h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus 
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Preço */}
            <FormField
              control={form.control}
              name="preco"
              render={({ field }) => (
                <FormItem className="text-slate-500">
                  <FormLabel className="text-slate-700">Preço:</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder={form.formState.errors.preco ? form.formState.errors.preco.message : "Insira o preço"}
                        {...field}
                        className={`${
                          form.formState.errors.preco ? "border-red-500 placeholder-red-500" : "focus:border-emerald-400"
                        }`}
                      />
                      <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            {/* Campo Posto */}
            <FormField
              control={form.control}
              name="nome_posto"
              render={({ field }) => (
                <FormItem className="text-slate-500">
                  <FormLabel className="text-slate-700">Posto:</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder={form.formState.errors.nome_posto ? form.formState.errors.nome_posto.message : "Selecione o posto"} />
                        <Fuel className="h-4 w-4 opacity-50" />
                      </SelectTrigger>
                      <SelectContent>
                        {gasStation?.map((item, index) => (
                          <SelectItem key={index} value={item.nome}>
                            {item.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Combustível */}
            <FormField
              control={form.control}
              name="tipo_combustivel"
              render={({ field }) => (
                <FormItem className="text-slate-500">
                  <FormLabel className="text-slate-700">Combustível:</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder={form.formState.errors.tipo_combustivel ? form.formState.errors.tipo_combustivel.message : "Selecione o combustível"} />
                        <Droplet className="h-4 w-4 opacity-50" />
                      </SelectTrigger>
                      <SelectContent>
                        {gas?.map((item, index) => (
                          <SelectItem key={index} value={item.tipo}>
                            {item.tipo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormDescription className="text-muted-foreground text-center p-3">
            Registre aqui uma coleta de um posto.
          </FormDescription>
        </div>

        {/* Botão Enviar */}
        <Button
          type="submit"
          className="w-72 flex gap-2 justify-center items-center hover:bg-slate-600 bg-slate-700 self-center"
        >
          <Send />
          Enviar Coleta
        </Button>

      </form>
    </Form>
  );
}
