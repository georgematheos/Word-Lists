// the type of the object used to carry information about a word list
export interface WordListData {
    username: string;
    title: string;
    words: string[];
    dateTimeCreated?: Date;
    dateTimeLastModified?: Date;
}
