export type Education = {
    fieldOfStudy: string;
    school: string;
    degree: string;
    endYear: number;
    startYear: number;
};

export type UserProfile = {
    [key: string]: any;
    displayName?: string | null | undefined;
    email?: string | null | undefined;
    gender: string | null | undefined;
    pronouns: string | null | undefined;
    ethnicity: string | null | undefined;
    photoURL?: string;
    bio: string;
    mentor: boolean;
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
    education: Education[] | any;
    skills: string[];
};

export const userProfile: UserProfile = {
    displayName: '',
    email: '',
    bio: '',
    gender: '',
    ethnicity: '',
    mentor: false,
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
    skills: [],
    hobbies: [],
};

export const checkProfileCompletion = (profile: UserProfile) => {
    let completedFields = 0

    if(profile.bio !== '') completedFields+=1;
    if(profile.occupation !== '') completedFields+=1;
    if(profile.interests && profile.interests.length > 0) completedFields+=1;
    if(profile.education && profile.education.length > 0)
        completedFields += 1;
    if(profile.skills && profile.skills.length > 0) completedFields+=1;
    if (profile.hobbies && profile.hobbies.length > 0) completedFields += 1;

    return {completedFields, fields: 6}
}