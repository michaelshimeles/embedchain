"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useGetStoredEmbeds } from "@/utils/hook/useGetStoredEmbeds";
import { Link2 } from "lucide-react";
import Link from "next/link";


const StorageComponent = ({ result, userId }: any) => {
    const { data, isFetched } = useGetStoredEmbeds(userId!, result?.response)

    const responseData = data?.response;
    const reversedData = Array.isArray(responseData) ? [...responseData].reverse() : [];
    return (
        <div className="p-8">
            {isFetched ? <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Created Time</TableHead>
                        <TableHead className="text-left">Embeddings</TableHead>
                        <TableHead className="text-center">Perma Link</TableHead>
                    </TableRow>
                </TableHeader>
                {reversedData?.map((info: any) => (
                    <TableBody key={info?.id}>
                        <TableRow>
                            <TableCell className="font-medium">{info?.id}</TableCell>
                            <TableCell>{info?.name}</TableCell>
                            <TableCell>{(new Date(info?.created_at).toDateString() + ", " + new Date(info?.created_at).toLocaleTimeString())}</TableCell>
                            <TableCell className="text-right"><Textarea defaultValue={info?.embeddings} /></TableCell>
                            <TableCell><div className="flex justify-center items-center gap-2 hover:cursor-pointer hover:underline"><Link href={`${info?.perma_link}`} target="_blank">Arweave Link</Link><Link2 /></div></TableCell>
                        </TableRow>
                    </TableBody>
                ))}
            </Table> : <>Loading...</>}
        </div>
    );
}

export default StorageComponent;