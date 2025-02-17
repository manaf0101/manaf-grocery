import { useLocalStorage } from "../../Hooks/useLocalStorage";
import { useParams } from 'react-router-dom';

export function getUserName() {
    const { userId } = useParams();
    const [userNamesValus] = useLocalStorage<any>('userNames', '');

    const res = userNamesValus.filter((item: any) => {
        return item.userId === userId;
    });

    let theUser = 'guest';
    if (res) {
        res.forEach((item: any) => {
            theUser = item.userName;
        });
    }
    return theUser;
}