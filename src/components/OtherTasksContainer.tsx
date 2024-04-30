import OtherTasksContent from "./OtherTasksContent";
import OtherTasksControllerContainer from "./OtherTasksControllerContainer";

export default function OtherTasksContainer() {
    return (
        <article className="w-full px-4 py-8 md:h-full md:overflow-auto">
            <h2 className="mb-16 text-center text-2xl font-bold ">
                Tarefas do mês
            </h2>
            <OtherTasksControllerContainer />
            <OtherTasksContent />
        </article>
    );
}
