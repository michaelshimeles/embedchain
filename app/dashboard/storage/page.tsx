import React from 'react'
import StorageComponent from './StorageComponent';
import { auth } from '@clerk/nextjs/server';

export default async function Page({ }) {
    const { userId }: { userId: string | null } = auth();

    try {
        const response = await fetch("https://embed.michaelshimeles.com/api/storage/read", {
            method: "POST",
            body: JSON.stringify({
                userId
            })
        });

        if (!response.ok) {
            // Optionally, you can read the response body even in the case of an error
            const errorBody = await response.text();
            console.error("Error response body:", errorBody);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json(); // Assuming the response is JSON

        return <StorageComponent result={result} userId={userId}/>;

    } catch (error: any) {
        console.error("Failed to fetch data:", error);
        return <div>Error loading data: {error.message}</div>;
    }
}
