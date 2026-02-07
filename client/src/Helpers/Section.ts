import type { ReactNode } from "react";

export interface Section{
    id: string;
    title: string;
    color:string;
    date?: string;
    innnerContent: ReactNode;
}
export interface SectionProps{
    section: Section
}