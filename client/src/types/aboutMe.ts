export type AboutMeContentProps = {
    title: string;
    content: string[];
    isUser: boolean;
}

export type GalleryImage = {
    name: string,
    imageUrl: string
}

export type SignupFormData = {
    gender: string,
    lookingFor: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}