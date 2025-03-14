import EmployeeList from '../components/EmployeeList';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Employee Task Management</h1>
      <EmployeeList />
    </main>
  );
} 