import OtherTasksContent from "./OtherTasksContent";
import OtherTasksControllerContainer from "./OtherTasksControllerContainer";

export default function OtherTasksContainer() {
    return (
        <article className="w-full py-8 px-4 md:h-full md:overflow-auto">
            <h2 className="text-2xl font-bold text-center mb-16 ">
                Todas As Tarefas
            </h2>
            <OtherTasksControllerContainer />
            <OtherTasksContent />
        </article>
    );
}
