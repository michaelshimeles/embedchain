"use client"

import { useGetStoredEmbeds } from "@/utils/hook/useGetStoredEmbeds";
import { useUser } from "@clerk/nextjs";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Link2 } from "lucide-react";
interface StorageProps {

}

const Storage: React.FC<StorageProps> = ({ }) => {
    const { user } = useUser()
    const { data, error, isLoading } = useGetStoredEmbeds(user?.id!)

    return (
        <div className="p-8">
            {!isLoading ? <Table>
                {/* <TableCaption>A table of embeds</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Created Time</TableHead>
                        <TableHead className="text-left">Embeddings</TableHead>
                        <TableHead className="text-center">Perma Link</TableHead>
                    </TableRow>
                </TableHeader>
                {[...data?.response]?.reverse()?.map((info: any) => (
                    <TableBody key={info?.id}>
                        <TableRow>
                            <TableCell className="font-medium">{info?.id}</TableCell>
                            <TableCell>{info?.name}</TableCell>
                            <TableCell>{(new Date(info?.created_at).toDateString() + ", " + new Date(info?.created_at).toLocaleTimeString())}</TableCell>
                            <TableCell className="text-right"><Textarea>{info?.embeddings}</Textarea></TableCell>
                            <TableCell><div className="flex justify-center items-center gap-2 hover:cursor-pointer hover:underline"><Link href={`${info?.perma_link}`} target="_blank">Arweave Link</Link><Link2 /></div></TableCell>
                        </TableRow>
                    </TableBody>
                ))}
            </Table> : <>Loading...</>}
        </div>
    );
}

export default Storage;