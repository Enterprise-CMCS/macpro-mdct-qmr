export interface IAmendmentInterface {
    email: string;
    firstName: string;
    lastName: string;
    territory: string;
    transmittalNumber?: string;
    urgent: boolean;
    comments: string;
    attachment: string;
    attachmentURL?: string;
}