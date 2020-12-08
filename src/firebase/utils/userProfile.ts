export type UserProfile = {
    displayName?: string | null | undefined;
    email?: string | null | undefined;
    photoURL?: string
    mentor: boolean;
    displayEducation: boolean;
    displayLocation: boolean;
    occupation: string;
    connections: {
        followers: string[];
        following: string[];
        mentees: string[];
        mentors: string[]
    };
    interests: string[];
    location: {
        postalCode: string;
        state: string;
        province: string;
        country: string
    };
    education: object[];
    skills: string[];
}

export const userProfile: UserProfile = {
    mentor: false,
    displayEducation: false,
    displayLocation: false,
    occupation: '',
    connections: {
        followers: [],
        following: [],
        mentees: [],
        mentors: []
    },
    interests: [],
    location: {
        postalCode: '',
        state: '',
        province: '',
        country: ''
    },
    education: [],
    skills: []
}