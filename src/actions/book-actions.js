'use server'
import { cookies } from 'next/headers'

export async function FetchCategories() {
    try {
        const res = await fetch(`${process.env.API_URL}categories`, {
            method: 'GET',
            cache: 'no-store',
        })
        const data = await res.json();
        if (!res.ok) {
            console.log("Error:", data);
            return { "success": false, "message": "Fail to Get Categories"};
        }

        console.log("category response -> ", data)
        return { "success": true, data }
    }
    catch(error){
        console.log(error)
        return { "success": false, "message": "Fail API" }
    }
} 

export async function FetchBooks(search, category, sort) {
    try {
        const res = await fetch(`${process.env.API_URL}resources/?sort=${sort?sort:""}&category=${category?category:""}&search=${search?search:""}`, {
            method: 'GET',
            cache: 'no-store',
        })
        const data = await res.json();
        if (!res.ok) {
            console.log("Error:", data);
            return { "success": false, "message": "Fail to Get Resoures"};
        }

        console.log("resource response -> ", data)
        return { "success": true, data }
    }
    catch(error){
        console.log(error)
        return { "success": false, "message": "Fail API" }
    }
} 