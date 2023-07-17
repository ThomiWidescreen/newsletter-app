import { createCampaign, getStatistics } from './../lib/api';
import { create } from "zustand";
import { createCategory, createSubscriber, getCampaigns, getCategories, getSubscribers } from "../lib/api";
import { CreateCategory } from "../types/global";
import { StoreAppContext, StoreCampaign, StoreCategory, StoreStatistics, StoreSubscribers } from "../types/store";

export const useAppContext = create<StoreAppContext>((set) => ({
    status: "",
    type: "",
    state: {},
    setAppContext: (context) => set(context)
}))

const closeMidAction = () => {
    useAppContext.setState({status: "", type: "", state: {}})
}

export const useCategories = create<StoreCategory>((set) => ({
    categories: [],
    fetchCategories: async() => {
        const categories = await getCategories()
        set({categories})
    },
    createCategory: async(category) => {
        const newCategory = await createCategory(category)
        set((store) => ({categories: [...store.categories, newCategory]}))
        closeMidAction()
    }

}));

export const useSubscribers = create<StoreSubscribers>((set) => ({
    subscribers: [],
    fetchSubscribers: async() => {
        const subscribers = await getSubscribers()
        set({subscribers})
    },
    createSubscriber: async(subscriber) => {
        const newSuscriber = await createSubscriber(subscriber)
        set((store) => ({subscribers: [...store.subscribers, newSuscriber]}))
        closeMidAction()
    }
}))

export const useCampaigns = create<StoreCampaign>((set) => ({
    campaigns: [],
    fetchCampaigns: async() => {
        const campaigns = await getCampaigns()
        set({campaigns})
    },
    createCampaign: async(campaign) => {
        const newCampaign = await createCampaign(campaign)
        set((store) => ({campaigns: [...store.campaigns, newCampaign]}))
        closeMidAction()
    }
}))

export const useStatistics = create<StoreStatistics>((set) => ({
    statistics: [],
    fetchStatistics: async() => {
        const statistics = await getStatistics()
        set({statistics})
    }
}))