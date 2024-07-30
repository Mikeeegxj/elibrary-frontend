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

export async function FetchBookDetail(id) {
    try {
        const res = await fetch(`${process.env.API_URL}resources/${id}`, {
            method: 'GET',
            cache: 'no-store',
        })
        const data = await res.json();
        if (!res.ok) {
            console.log("Error:", data);
            return { "success": false, "message": "Fail to Get Resource"};
        }

        console.log("resource response -> ", data)
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


export async function FetchComments(id) {
	try {
        const access_token = cookies().get('_access')?.value
		const res = await fetch(`${process.env.API_URL}comments/?resource_id=${id}`, {
			method: 'GET',
			cache: 'no-store',
		})
        console.log("comment res",res)
		const data = await res.json();
		if (!res.ok) {
			return { "success": false, "message": "Fail to Fetch Comment"};
		}

		// console.log("Blog resposne:", data)
		return { "success": true, data}
	}
	catch(error){
        console.log("We go inside Error")
		return { "success": false, "message": "Fail API" }
	}
}

export async function SubmitComment(id,text) {
	try {
        const access_token = cookies().get('_access')?.value
		const res = await fetch(`${process.env.API_URL}comments/`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${access_token}`
			},
			cache: 'no-store',
			body: JSON.stringify({
				text: text,
				resource_id: id
			}),
		})
        console.log("comment submit res",res)
		const data = await res.json();
		if (!res.ok) {
			return { "success": false, "message": "Fail to Submit Comment"};
		}

		// console.log("Blog resposne:", data)
		return { "success": true, data}
	}
	catch(error){
        console.log("We go inside Error")
		return { "success": false, "message": "Fail API" }
	}
}