import DurationCardItem from "./DurationCardItem";

export default function TaskCard() {
    return (
        <article className="flex flex-col gap-6">
            <header className="flex flex-row justify-between items-end">
                <h2 className="text-2xl">Titulo da Tarefa</h2>
                <h3 className="bg-neutral-400 text-neutral-50 text-lg font-bold px-4 py-2 rounded-md">
                    20:00h
                </h3>
            </header>
            <main>
                <p className="text-lg text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                    unde velit possimus, animi obcaecati temporibus, eveniet
                    nemo, ducimus ipsa sint aperiam eligendi? Saepe a ratione
                    tempora totam assumenda est voluptatum.
                </p>
            </main>
            <footer>
                <h3 className="text-xl mb-6 font-bold">Duração</h3>
                <ul className="flex flex-col gap-6">
                    <DurationCardItem measure="Dias" value={1} />
                    <DurationCardItem measure="Horas" value={1} />
                    <DurationCardItem measure="Minutos" value={1} />
                    <DurationCardItem measure="Segundos" value={1} />
                </ul>
            </footer>
        </article>
    );
}
