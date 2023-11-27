"use client"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Loader2 } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from "react-hook-form";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

export const Icons = {
    spinner: Loader2,
};

const PdfToBase64: React.FC = () => {
    const [base64String, setBase64String] = useState<string>('');
    const [embeddings, setEmbeddings] = useState<any>(null)
    const [stored, setStored] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const { user } = useUser();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const createEmbedding = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/embeddings', {
                method: "POST",
                body: JSON.stringify({
                    input: `${embeddings}`
                })
            })

            const result = await response.json()
            setEmbeddings(result)

            setLoading(false)
            return result
        } catch (error) {
            setLoading(false)
            return error
        }
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64 = reader.result as string;
                setBase64String(base64);
            };
            reader.onerror = (error) => {
                console.log('Error: ', error);
            };
        }
    };

    const chunkBase64String = (base64String: string, chunkSize: number): string[] => {
        const chunks = [];
        for (let i = 0; i < base64String.length; i += chunkSize) {
            chunks.push(base64String.substring(i, i + chunkSize));
        }
        return chunks;
    };

    const chunkSize = 8192; // Set your desired chunk size
    const chunks = chunkBase64String(base64String, chunkSize);

    const onSubmit = async (data: any) => {
        const date = new Date().toLocaleTimeString()

        try {
            const response = await fetch("/api/storage", {
                method: "POST",
                body: JSON.stringify({
                    name: data?.name,
                    user_id: user?.id,
                    embeddings: embeddings?.embedding?.data?.[0]?.embedding
                })
            })

            const result = await response?.json()

            console.log("Result", result)
            toast({
                title: `Successfully stored`,
                description: `Embedding stored as ${data?.name} at ${JSON.stringify(date)}`,
            })

            setStored(true)
            return result
        } catch (error) {
            toast({
                title: `Failed storing`,
                description: `Embedding stored as ${data?.name} at ${JSON.stringify(date)}`,
                variant: "destructive"
            })
            return error
        }
    }

    return (
        <div className='flex flex-col justify-center w-[100%] gap-3'>
            <input className='border w-[30rem] p-4 rounded-md' type="file" onChange={handleFileChange} accept="application/pdf" />
            {base64String && (
                <div className='flex flex-col gap-3'>
                    <p>Base64 String</p>
                    <Textarea value={chunks?.[0]} readOnly />
                    {!loading ? <Button disabled={!!embeddings} onClick={createEmbedding} className='w-[8rem]'>
                        Generate
                    </Button> :
                        <Button disabled className='w-[8rem]'>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                        </Button>
                    }
                </div>
            )}
            {embeddings && <div className='flex flex-col gap-3'>
                <p>Embeddings</p>
                <Textarea value={embeddings?.embedding?.data?.[0]?.embedding} readOnly />
                <Dialog>
                    <DialogTrigger>
                        <Button className='flex w-[8rem]'>
                            Store
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Would you like to store these embeddings?</DialogTitle>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <DialogDescription>
                                    <div className='mt-4 flex flex-col gap-2'>
                                        <Label>Embedding Names</Label>
                                        <Input {...register("name", { required: true })} type="text" placeholder="name" />
                                    </div>
                                    <DialogFooter className='pt-4'>
                                        <DialogClose asChild>
                                            <Button type='submit'>Store</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogDescription>
                            </form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>}
        </div>
    );
};

export default PdfToBase64;
