import ComplaintForm from "./components/ComplaintForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Civic Link - Grievance Redressal</h1>
      </header>
      <main className="p-6">
        {/* This calls your custom component from the other file */}
        <ComplaintForm />
      </main>
    </div>
  );
}

export default App;
