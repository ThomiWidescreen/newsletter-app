import { CreateCategory, CreateSubscriber, CreateCampaign, Statistic } from './../types/global';
import axios from "axios"
import { Campaign, Category, Subscriber } from "../types/global"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getCategories = async (): Promise<Category[]> => {
    try {
        const {data} = await axios.get<{data: Category[]}>(`${API_URL}/categories`)
        return data.data
    } catch (error) {
        return [] 
    }
}

export const getSubscribers = async (): Promise<Subscriber[]> => {
    try {
        const {data} = await axios.get<{data: Subscriber[]}>(`${API_URL}/subscriber`)
        return data.data
    } catch (error) {
        return [] 
    }
}

export const getCampaigns = async (): Promise<Campaign[]> => {
    try {
        const {data} = await axios.get<{data: Campaign[]}>(`${API_URL}/campaigns`)
        return data.data
    } catch (error) {
        return []
    }
}

export const getStatistics = async (): Promise<Statistic[]> => {
    try {
        const {data} = await axios.get<{data: Statistic[]}>(`${API_URL}/statistics`)
        return data.data
    } catch (error) {
        return []
    }
}

export const createCategory = async (category: CreateCategory): Promise<Category> => {
    try {
        const {data} = await axios.post<{data: Category, ok: boolean}>(`${API_URL}/categories`, category)
        return data.data
    } catch (error) {
        return {} as Category
    }
}

export const createSubscriber = async (subscriber: CreateSubscriber): Promise<Subscriber> => {
    try {
        const {data} = await axios.post<{data: Subscriber, ok: boolean}>(`${API_URL}/subscriber`, subscriber)
        return data.data
    } catch (error) {
        return {} as Subscriber
    }
}

export const createCampaign = async (campaign: CreateCampaign): Promise<Campaign> => {
    try {
        const {data} = await axios.post<{data: Campaign, ok: boolean}>(`${API_URL}/campaigns`, campaign)
        return data.data
    } catch (error) {
        return {} as Campaign
    }
}

export const dispatchCampaign = async (campaignId: number) => {
    return axios.post(`${API_URL}/mailing/startCampaign/${campaignId}`)
}

export const unsuscribeSubscriber = async (unsuscribeToken: string) => {
    return axios.post(`${API_URL}/unsuscribe/${unsuscribeToken}`)
}