export type Education = {
    fieldOfStudy: string;
    school: string;
    degree: string;
    endYear: number;
    startYear: number;
};

export type UserProfile = {
    displayName?: string | null | undefined;
    email?: string | null | undefined;
    photoURL?: string;
    bio: string;
    mentor: boolean;
    displayEducation: boolean;
    displayLocation: boolean;
    occupation: string;
    connections: {
        followers: string[];
        following: string[];
        mentees: string[];
        mentors: string[];
    };
    interests: string[];
    location: {
        postalCode: string;
        state: string;
        province: string;
        country: string;
    };
    education: Education[] | any;
    skills: string[];
};

export const userProfile: UserProfile = {
    bio: '',
    mentor: false,
    displayEducation: false,
    displayLocation: false,
    occupation: '',
    connections: {
        followers: [],
        following: [],
        mentees: [],
        mentors: [],
    },
    interests: [],
    location: {
        postalCode: '',
        state: '',
        province: '',
        country: '',
    },
    education: [],
    skills: [],
};