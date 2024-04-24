import {
    decrease,
    increase,
    selectCounter,
} from "../lib/features/counter/counteSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";

export default function Home() {
    const { count } = useAppSelector(selectCounter);
    const dispatch = useAppDispatch();

    return (
        <div>
            <h1>{count}</h1>
            <button type="button" onClick={() => dispatch(increase())}>
                increase
            </button>
            <button type="button" onClick={() => dispatch(decrease())}>
                decrease
            </button>
        </div>
    );
}
