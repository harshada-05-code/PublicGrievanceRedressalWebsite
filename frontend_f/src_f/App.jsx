import { useState } from "react";
import { useForm } from "react-hook-form";

// 1. COMPLAINT FORM COMPONENT
// We define this separately to keep our code organized.
function ComplaintForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setSubmitted(true); // This triggers the "Success" view
  };

  // If the user has submitted, show the success message instead of the form
  if (submitted) {
    return (
      <div className="text-center p-8 bg-green-100 rounded-lg border border-green-300">
        <h3 className="text-2xl font-bold text-green-800">✅ Submission Received</h3>
        <p className="text-green-700 mt-2">Your Tracking ID: #CL-{Math.floor(Math.random() * 90000) + 10000}</p>
        <button 
          onClick={() => setSubmitted(false)} 
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Another Issue
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-lg space-y-4">
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Report a Problem</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select {...register("category")} className="w-full mt-1 p-2 border rounded-md bg-gray-50">
          <option value="roads">Road Infrastructure</option>
          <option value="water">Water Service</option>
          <option value="garbage">Garbage/Sanitation</option>
          <option value="electrcity">Electrcity</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea 
          {...register("description", { required: true, minLength: 5 })} 
          className="w-full mt-1 p-2 border rounded-md bg-gray-50"
          placeholder="Please describe the issue."
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">Please provide more detail.</p>}
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700">
        Submit Complaint
      </button>
    </form>
  );
}

// 2. MAIN APP COMPONENT (The Default Export)
export default function App() {
  return (
    <div className="min-h-screen w-full bg-gray-200 flex flex-col">
      <header className="w-full bg-blue-800 text-white py-6 text-center shadow-md">
        <h1 className="text-3xl font-bold tracking-tight">CivicLink</h1>
        <p className="text-blue-100 text-sm">Public Grievance Redressal Portal</p>
      </header>

      <main className="flex-1 w-full py-10 px-4 flex justify-center items-start">
        <div className="w-full max-w-lg">
          <ComplaintForm />
        </div>
      </main>

      <footer className="w-full text-center text-gray-500 text-xs py-4 bg-gray-200">
        © 2026 CivicLink • Student Project • IIIT Pune
      </footer>
    </div>
  );
}