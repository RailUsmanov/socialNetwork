import {ContactsType} from "../../Types/types";
import React from "react";

type Contacts = {
    contacts: ContactsType
}
export const Contacts: React.FC<Contacts> = (props) => {
    return (
        <ul>
            {Object.keys(props.contacts).map((key, index) => {
                return (
                    <li key={index}>
                        <a href={props.contacts[key as keyof ContactsType]}>{key}</a>
                    </li>
                );
            })}
        </ul>
    );
};