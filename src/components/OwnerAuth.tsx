import { useState, FormEvent } from 'react';

export function OwnerAuth({ onAuthSuccess }: { onAuthSuccess: () => void }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (code === 'fit@12gym$') {
      onAuthSuccess();
    } else {
      setError(true);
      setCode('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white/5 border border-white/10 rounded-3xl">
      <h3 className="text-lg font-bold mb-4 uppercase tracking-widest">Owner Access</h3>
      <input
        type="password"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter secret code"
        className="w-full p-3 mb-2 bg-[#0a0a0b] border border-white/10 rounded-xl"
      />
      <button type="submit" className="w-full bg-orange-600 text-white p-3 rounded-xl font-bold uppercase tracking-widest">Submit</button>
      {error && <p className="text-red-500 text-sm mt-2">Invalid code</p>}
    </form>
  );
}
