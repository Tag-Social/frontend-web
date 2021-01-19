export type Relationship = {
    uid1: string;
    uid2: string;
    type: 0 | 1; // 0 = following, 1 = mentorship
    status?: 0 | 1 | 2 | 3; // 0 = pending, 1 = accepted, 2 = blocked, 3 = terminated
};
