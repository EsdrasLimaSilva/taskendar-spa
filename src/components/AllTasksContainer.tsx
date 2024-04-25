import AllTasksVisualContent from "./AllTasksVisualContent";
import AllTasksVisualizationController from "./AllTasksVisualizationController";

export default function AllTasksContainer() {
    return (
        <article className="py-8 px-4">
            <h2 className="text-2xl font-bold text-center mb-16">
                Todas As Tarefas
            </h2>
            <AllTasksVisualizationController />
            <AllTasksVisualContent />
        </article>
    );
}
