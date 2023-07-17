import { Campaign, Category, CreateCampaign, CreateCategory, CreateSubscriber, CreationType, Statistic, Subscriber } from "./global";

export interface StoreCategory {
  categories: Category[];
  fetchCategories: () => void;
  createCategory: (category: CreateCategory) => void;
}

export interface StoreSubscribers {
  subscribers: Subscriber[];
  fetchSubscribers: () => void;
  createSubscriber: (subscriber: CreateSubscriber) => void;
}

export interface StoreCampaign {
  campaigns: Campaign[];
  fetchCampaigns: () => void;
  createCampaign: (campaign: CreationType) => void;
}

export interface StoreStatistics{
  statistics: Statistic[];
  fetchStatistics: () => void;
}

interface StoreAppVariables {
  status: string,
  type: string,
  state?: {
    [key: string]: any
  }
}

export interface StoreAppContext extends StoreAppVariables {
  setAppContext: (context: StoreAppVariables) => void
}
