import { Injectable } from "@angular/core";
import { LoginResponse } from "../interfaces/models/login-response.interface";
// import { User } from "../interfaces/models/user.interface";

@Injectable({
    providedIn: 'root'
})

export class LocalStorageService {
    add = (data: LoginResponse) => {
        this.setId(data.id)
        this.setToken(data.token)
        this.setRefreshToken(data.refresh)
    }
    clean = () => {
        this.removeId()
        this.removeToken()
        this.removeRefreshToken()
    }
    //Métodos para manejar el id
    setId = (id: string) => {
        localStorage.setItem('id', id)
    }
    getId = () => {
        return localStorage.getItem('id')
    }
    private removeId = () => {
        localStorage.removeItem('id')
    }
    // Métodos para manejar el token
    setToken = (token: string) => {
        localStorage.setItem('token', token)
    }
    getToken = () => {
        return localStorage.getItem('token')
    }
    private removeToken = () => {
        localStorage.removeItem('token')
    }
    // Métodos para manejar el refreshToken
    setRefreshToken = (refresh: string) => {
        localStorage.setItem('refresh', refresh)
    }
    getRefreshToken = () => {
        return localStorage.getItem('refresh')
    }
    private removeRefreshToken = () => {
        localStorage.removeItem('refresh')
    }
}