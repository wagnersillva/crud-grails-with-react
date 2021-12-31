export const headers = {
    "Content-Type":"application/json",
    "Accept":"application/json",
    "Authorization":`Bearer ${localStorage.auth ? JSON.parse(localStorage.auth).access_token : null}`
}