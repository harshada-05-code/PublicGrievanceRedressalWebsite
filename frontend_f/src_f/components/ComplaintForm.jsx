// Simplified example of your Complaint Form
import { useForm } from "react-hook-form";

export default function ComplaintForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Submit a New Grievance</h2>
      
      {/* Category Dropdown */}
      <div>
        <label className="block text-sm font-medium">Issue Category</label>
        <select {...register("category")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          <option value="roads">Road Infrastructure</option>
          <option value="water">Water Service</option>
          <option value="garbage">Garbage Collection</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium">Describe the Problem</label>
        <textarea {...register("description")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" rows="4"></textarea>
      </div>

      {/* File Upload (Optional) */}
      <div>
        <label className="block text-sm font-medium">Upload Proof (Images/PDF)</label>
        <input type="file" {...register("proof")} className="mt-1 block w-full text-sm text-gray-500" />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
        Submit Complaint
      </button>
    </form>
  );
}
