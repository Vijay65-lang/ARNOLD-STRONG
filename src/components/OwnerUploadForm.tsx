import { useState, FormEvent, ChangeEvent } from 'react';
import { GymContentItem } from '../types';

export function OwnerUploadForm({ onUpload }: { onUpload: (item: Omit<GymContentItem, 'id' | 'date'>) => void }) {
  const [type, setType] = useState<'photo' | 'news'>('news');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpload({ type, title, content, imageUrl: type === 'photo' ? image : undefined });
    setTitle('');
    setContent('');
    setImage(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white/5 border border-white/10 rounded-3xl shadow-sm">
      <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">Upload New Data</h2>
      <select value={type} onChange={(e) => setType(e.target.value as 'photo' | 'news')} className="w-full p-3 mb-4 bg-[#0a0a0b] border border-white/10 rounded-xl">
        <option value="news">News/Announcement</option>
        <option value="photo">Photo Gallery</option>
      </select>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-3 mb-2 bg-[#0a0a0b] border border-white/10 rounded-xl" required />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" className="w-full p-3 mb-2 bg-[#0a0a0b] border border-white/10 rounded-xl" required />
      {type === 'photo' && (
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-3 mb-2 bg-[#0a0a0b] border border-white/10 rounded-xl text-slate-400" required />
      )}
      <button type="submit" className="w-full bg-orange-600 text-white p-3 rounded-xl font-bold uppercase tracking-widest mt-4">Upload</button>
    </form>
  );
}
