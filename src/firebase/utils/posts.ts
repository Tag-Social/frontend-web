export type Reaction = {
    id: string;
    uid: string;
    type: 0 | 1; // 0 = like, 1 = love
    date: string;
};

export type Comment = {
    id: string;
    uid: string;
    username: string;
    userAvatar: string;
    text: string;
    date: string;
};

export type Post = {
    id: string;
    uid: string;
    userName: string;
    userAvatar: string;
    text: string;
    media: string;
    date: string;
    reactions: Reaction[];
    comments: Comment[];
};
