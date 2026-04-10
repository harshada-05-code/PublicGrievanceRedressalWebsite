import { useForm } from 'react-hook-form';

export default function ComplaintForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/grievances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Complaint submitted successfully!');
        console.log(result);
      } else {
        alert(result.message || 'Failed to submit complaint');
      }
    } catch (error) {
      console.error(error);
      alert('Server error while submitting complaint');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Submit a New Grievance</h2>
      
      <div>
        <label className="block text-sm font-medium">Issue Category</label>
        <select {...register('category')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          <option value="Roads">Road Infrastructure</option>
          <option value="Water">Water Service</option>
          <option value="Electricity">Electricity Service</option>
          <option value="Waste">Garbage Collection</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Describe the Problem</label>
        <textarea {...register('description')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" rows="4"></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium">Address / Location</label>
        <input {...register('address')} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
        Submit Complaint
      </button>
    </form>
  );
}
