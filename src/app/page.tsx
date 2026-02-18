import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <h1 className="text-5xl font-bold text-blue-600 dark:text-blue-400">
        Shopping Planner 🛒📋
      </h1>
      <Button className="mt-8 px-8 py-6 text-lg">Explorar Produtos</Button>
      </main>
  );
}