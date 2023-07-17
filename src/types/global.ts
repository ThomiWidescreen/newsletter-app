export interface CreateCategory{
    name: string;
}

export interface CreateCampaign{
    name: string;
    file: string;
    subject: string;
    body: string;
    category: number
}

export interface CreateSubscriber{
    mail: string;
    categories: Array<number|string>;
}

export interface Campaign extends CreateCampaign {
    id: number;
    count: number;
    lastSended: Date;
}

export interface Category extends CreateCategory{
    id: number;
    active: boolean;
}

export interface Subscriber extends CreateSubscriber{
    id: number;
    unsubscribeToken: string;
    active: boolean;
}

export interface Statistic {
    id: number;
    date: Date;
    mailsSended: number;
}

export interface CreationType extends CreateCampaign, CreateCategory, CreateSubscriber {
    category: number
}

