export type Education = {
    fieldOfStudy: string;
    school: string;
    degree: string | undefined | null;
    endYear: string | number | undefined | null;
    startYear: string | number | undefined | null;
};

export type Experience = {
    title: string;
    employmentType: string;
    organization: string;
    location: string;
    description: string;
    current: boolean;
    startDate: string | undefined | null;
    endDate: string | undefined | null;
};

export type Social = {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
};

export type UserProfile = {
    [key: string]: any;
    id?: string;
    displayName?: string | null | undefined;
    email?: string | null | undefined;
    gender: string | null | undefined;
    pronouns: string | null | undefined;
    ethnicity: string | null | undefined;
    photoURL?: string;
    bio: string;
    accountType: null | 0 | 1 | 2; // mentee = 0, mentor = 1, pending mentor = 2
    onboarded: boolean;
    displayEducation: boolean;
    displayLocation: boolean;
    disability: string | null | undefined;
    occupation: string | null | undefined;
    organization: string | null | undefined;
    connections: {
        followers: string[];
        following: string[];
        mentees: string[];
        mentors: string[];
    };
    interests: string[];
    hobbies: string[];
    location: {
        postalCode: string;
        state: string;
        province: string;
        country: string;
    };
    education: Education[];
    experience: Experience[];
    skills: string[];
    social?: Social;
};

export const userProfile: UserProfile = {
    displayName: '',
    email: '',
    bio: '',
    gender: '',
    ethnicity: '',
    accountType: null,
    onboarded: false,
    displayEducation: false,
    displayLocation: false,
    disability: null,
    pronouns: '',
    occupation: '',
    organization: '',
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
    experience: [],
    skills: [],
    hobbies: [],
    social: {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
    },
};

export const checkProfileCompletion = (profile: UserProfile) => {
    let completedFields = 0

    if(profile.bio !== '') completedFields+=1;
    if(profile.occupation !== '') completedFields+=1;
    if(profile.interests && profile.interests.length > 0) completedFields+=1;
    if(profile.education && profile.education.length > 0)
        completedFields += 1;
    if (profile.experience && profile.experience.length > 0)
        completedFields += 1;
    if(profile.skills && profile.skills.length > 0) completedFields+=1;
    if (profile.hobbies && profile.hobbies.length > 0) completedFields += 1;

    return { completedFields, fields: 7 };
}