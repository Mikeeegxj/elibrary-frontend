'use server'
import { cookies } from 'next/headers'

export async function RegisterAccount(email, first_name, last_name, password) {
	
	try {
		console.log("sign up")
		const res = await fetch(`${process.env.API_URL}auth/register/`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			cache: 'no-store',
			body: JSON.stringify({
				email: email,
				first_name: first_name,
				last_name: last_name,
				password: password
			}),
		})
		console.log("res",res)
		const data = await res.json();
		console.log(data)
		if (res.status === 201) {
			console.log("Account created successfully");
			return { "success": true };
		} else if (!res.ok) {
			console.log("Error:", data);
			return { "success": false, "message": data?.detail || data?.email || (data.password ? "Password must be at least 6" :  "Unexpected Error Occur") };
		}

		console.log("register resposne:", data)
		return { "success": true }
	}
	catch {
		return { "success": false, "message": "Invalid Credential" }
	}
}


export async function ChangeProfileImage(formData) {
	try {
        const access_token = cookies().get('_access')?.value
		const res = await fetch(`${process.env.API_URL}auth/profile/image`, {
			method: 'PUT',
			headers: {
				"Authorization": `Bearer ${access_token}`
			},
			cache: 'no-store',
			body: formData,
		})
        console.log("image res",res)
		const data = await res.json();
		if (!res.ok) {
			console.log("Error:", data);
			return { "success": false, "message": "Fail to Change Image"};
		}

		console.log("imagechange resposne:", data)
		return { "success": true, data }
	}
	catch(error){
        console.log(error)
		return { "success": false, "message": "Fail API" }
	}
}

export async function LoginAccount(email, password) {
	try {
		const oneDay = 24 * 60 * 60 * 1000 * 1
		const fiveHour = 5 * 60 * 60 * 1000
		console.log("login here")
		console.log(email,password)
		const res = await fetch(`${process.env.API_URL}auth/login/`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			cache: 'no-store',
			body: JSON.stringify({
				email: email,
				password: password
			}),
		})
		const data = await res.json();
		console.log(data)
		if (!res.ok) {
			return { "success": false, "message": data?.detail || data?.email || "Invalid Username or Password" }
		}

		console.log("login resposne:", data)
		cookies().set({
			name: '_access',
			value: data.access_token,
			expires: Date.now() + fiveHour,
			httpOnly: true,
			path: '/',
		})
		cookies().set({
			name: '_refresh',
			value: data.refresh_token,
			expires: Date.now() + oneDay,
			httpOnly: true,
			path: '/',
		})
		return { "success": true, data }
	}
	catch(error) {
		console.log(error)
		return { "success": false, "message": "Invalid Credential"}
	}
}

export async function GetProfile() {
	try {
        const access_token = cookies().get('_access')?.value
		const res = await fetch(`${process.env.API_URL}auth/profile/`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
			},
			cache: 'no-store',
		})
		const data = await res.json();
		console.log(data)
	    if (!res.ok) {
			console.log("Error:", data);
			return { "success": false, "message":  "Unexpected Error Occur" };
		}

		console.log("register resposne:", data)
		return { "success": true, data }
	}
	catch {
        console.log("error")
		return { "success": false, "message": "Invalid Credential" }
	}
}

export async function LogoutAccount() {
	try {
		const refresh_token = cookies().get('_refresh')?.value
		const access_token = cookies().get('_access')?.value
		const res = await fetch(`${process.env.API_URL}auth/logout/`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${access_token}`
			},
			body: JSON.stringify({
				refresh_token: refresh_token,
			}),
		})
		const data = await res.json();
		// if (!res.ok) {
		// 	return false
		// }
		cookies().delete('_refresh')
		cookies().delete('_access')
		return true
	}
	catch {
		return false
	}

}

export const VerifyEmail = async (otp) => {
    try {
        const res = await fetch(`${process.env.API_URL}auth/verify-email/`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          cache:'no-store',
          body: JSON.stringify({
            otp: otp
          }),
        })
        if (!res.ok){
          return false
        }
        const data = await res.json();
        console.log("verify resposne:",data)
        return true
      }
      catch {
        return false
      }
}

export const GetCookie = async () => {
	const cookie = cookies()
	const accessToken = cookie.get('_access')?.value
	const refreshToken = cookie.get('_refresh')?.value
	return {accessToken,refreshToken}
}