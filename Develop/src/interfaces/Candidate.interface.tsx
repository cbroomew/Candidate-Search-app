// TODO: Create an interface for the Candidate objects returned by the API

export interface Candidate {
    login: string,
    name: string,
    email: string,
    bio: string,
    company: string,
    location: string,
    avatar_url: string,
}
