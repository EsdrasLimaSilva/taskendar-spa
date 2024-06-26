import { useAuth0 } from "@auth0/auth0-react";
import { FormEvent, useState } from "react";
import {
    CreateTaskType,
    UpdateTaskType,
    createTaskThunk,
    selectTasks,
    setEditModalHidden,
    updateTaskThunk,
} from "../lib/features/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { toStringTimeHHMM, toStringYYYMMDD } from "../utils/dateUtils";
import FormLabel from "./FormLabel";

export default function AdminEditTaskModal() {
    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useAppDispatch();

    const { targetEditTask, userRegistered } = useAppSelector(selectTasks);

    const [formState, setFormState] = useState({
        // initializing the state
        taskTitle: targetEditTask?.title ? targetEditTask.title : "",
        taskDescription: targetEditTask?.description
            ? targetEditTask.description
            : "",
        taskStartDate: targetEditTask?.startsAt
            ? toStringYYYMMDD(new Date(targetEditTask.startsAt))
            : toStringYYYMMDD(new Date()),
        taskStartTime: targetEditTask?.startsAt
            ? toStringTimeHHMM(new Date(targetEditTask.startsAt))
            : toStringTimeHHMM(new Date()),
        taskEndDate: targetEditTask?.endsAt
            ? toStringYYYMMDD(new Date(targetEditTask.endsAt))
            : toStringYYYMMDD(new Date()),
        taskEndTime: targetEditTask?.endsAt
            ? toStringTimeHHMM(new Date(targetEditTask.endsAt))
            : toStringTimeHHMM(new Date()),
        done: targetEditTask?.done ? targetEditTask.done : false,
    });

    /**
     * Gets the data in the form state and creates a new task calling the create/update task async thunk defined by the redux store
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (userRegistered) {
            const {
                taskStartDate,
                taskStartTime,
                taskEndDate,
                taskEndTime,
                taskDescription,
                taskTitle,
                done,
            } = formState;

            // converting to date
            const tskStartDate = new Date(`${taskStartDate}T${taskStartTime}`);
            const tskEndDate = new Date(`${taskEndDate}T${taskEndTime}`);

            // checking if interval is valid
            if (tskEndDate < tskStartDate) {
                alert(
                    "A Data de fim deve ser superior ou igual à data de início",
                );
                return;
            }

            const newTask: CreateTaskType = {
                description: taskDescription,
                title: taskTitle,
                startsAt: tskStartDate.toISOString(),
                endsAt: tskEndDate.toISOString(),
                done,
            };

            const token = await getAccessTokenSilently();

            if (targetEditTask?._id) {
                // it should update an existing task
                const upTask: UpdateTaskType = {
                    ...newTask,
                    _id: targetEditTask?._id,
                };
                dispatch(updateTaskThunk({ task: upTask, token }));
            } else {
                // it shoudl create a new task
                dispatch(createTaskThunk({ task: newTask, token }));
            }

            dispatch(setEditModalHidden());
        }
    };

    return (
        <article
            data-testid="admin-edit-task-modal"
            className="fixed  top-0  z-10  flex  h-screen  w-screen items-center  justify-center  bg-[#22222240] backdrop-blur-sm"
        >
            <div
                className="
            h-[90%] w-[90%] max-w-lg overflow-auto rounded-lg bg-neutral-50 px-8 py-16 pb-32
            "
            >
                <h2
                    className="
                mb-8
                text-center
                text-2xl
                "
                >
                    Editor de tarefas
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <FormLabel labelTitle="Titulo">
                        <input
                            data-testid="input-task-title"
                            type="text"
                            placeholder="Escrever um livro"
                            required
                            value={formState.taskTitle}
                            onChange={(e) =>
                                setFormState((prev) => ({
                                    ...prev,
                                    taskTitle: e.target.value,
                                }))
                            }
                        />
                    </FormLabel>

                    <FormLabel labelTitle="Descrição">
                        <textarea
                            data-testid="input-task-description"
                            placeholder="Escrever um livro que expresse toda a minha percepção da realidade"
                            required
                            value={formState.taskDescription}
                            onChange={(e) =>
                                setFormState((prev) => ({
                                    ...prev,
                                    taskDescription: e.target.value,
                                }))
                            }
                        />
                    </FormLabel>

                    <FormLabel
                        labelTitle="Concluída"
                        className={`rounded-full border-2 border-neutral-500 py-2  text-center transition-all ${formState.done && "border-transparent bg-success-500 font-bold text-neutral-50"}`}
                    >
                        <input
                            type="checkbox"
                            className="w-0"
                            checked={formState.done}
                            onChange={(e) =>
                                setFormState((prev) => ({
                                    ...prev,
                                    done: e.target.checked,
                                }))
                            }
                        />
                    </FormLabel>

                    <FormLabel labelTitle="Data de início">
                        <input
                            data-testid="input-task-start-date"
                            type="date"
                            value={formState.taskStartDate}
                            onChange={(e) => {
                                setFormState((prev) => ({
                                    ...prev,
                                    taskStartDate: e.target.value,
                                }));
                            }}
                        />
                        <input
                            data-testid="input-task-start-time"
                            type="time"
                            value={formState.taskStartTime}
                            onChange={(e) =>
                                setFormState((prev) => ({
                                    ...prev,
                                    taskStartTime: e.target.value,
                                }))
                            }
                        />
                    </FormLabel>

                    <FormLabel labelTitle="Data de Fim">
                        <input
                            data-testid="input-task-end-date"
                            type="date"
                            value={formState.taskEndDate}
                            onChange={(e) => {
                                setFormState((prev) => ({
                                    ...prev,
                                    taskEndDate: e.target.value,
                                }));
                            }}
                        />
                        <input
                            data-testid="input-task-end-time"
                            type="time"
                            value={formState.taskEndTime}
                            onChange={(e) =>
                                setFormState((prev) => ({
                                    ...prev,
                                    taskEndTime: e.target.value,
                                }))
                            }
                        />
                    </FormLabel>

                    <button
                        data-testid="edit-task-modal-submit-btn"
                        type="submit"
                        className=" rounded-full bg-action-500 py-4  text-xl  font-bold text-neutral-50"
                    >
                        Postar tarefa
                    </button>

                    <button
                        type="button"
                        className="rounded-full border-2 border-neutral-300 bg-neutral-200 py-4"
                        onClick={() => dispatch(setEditModalHidden())}
                    >
                        cancelar
                    </button>
                </form>
            </div>
        </article>
    );
}
