import React, { useState, ChangeEvent } from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { ReloadIcon } from "@radix-ui/react-icons"

export const Icons = {
    spinner: Loader2,
};

const PdfToBase64: React.FC = () => {
    const [base64String, setBase64String] = useState<string>('');
    const [embeddings, setEmbeddings] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)

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
                <Button className='w-[8rem]'>
                    Store
                </Button>
            </div>}
        </div>
    );
};

export default PdfToBase64;
