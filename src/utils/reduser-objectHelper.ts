import {UsersType} from "../Types/types";

export const updateObjectInArray= (item: Array<UsersType>,
                                   itemId: number,
                                   objPropName: string,
                                   newObjProps: { followed: boolean }) => {
    return item.map((el: any) => {
        if (el[objPropName] === itemId) {
            return {
                ...el,
                ...newObjProps,
            };
        }
        return el;
    });
};