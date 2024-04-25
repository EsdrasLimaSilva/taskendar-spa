import TaskCard from "./TaskCard";

export default function TaskDayContent() {
    return (
        <main className="py-12">
            <h2 className="text-3xl font-bold mb-16 text-center">
                Tarefas de hoje
            </h2>
            <TaskCard />
        </main>
    );
}
