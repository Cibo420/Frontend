export interface University {
    id: number;
    name: string;
    location: Location;
    studyPrograms: StudyProgram[];
    description: string;
    logoUrl: string;
    url: string;
}

export interface Location {
    id: number;
    name: string;
}

export interface StudyProgram {
    id: number;
    name: string;
    url: string;
    criteriaValues: CriteriaValue[];
}

export interface CriteriaValue {
    criteria: Criteria;
    value: number;
}

export interface Criteria {
    id: number;
    question: string;
}