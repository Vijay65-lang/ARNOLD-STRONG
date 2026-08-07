import { motion } from "motion/react";
import { GymContentItem } from "../types";

export function GymDataDisplay({ data, showDelete, onDelete }: { data: GymContentItem[], showDelete: boolean, onDelete: (id: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {data.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ y: -10 }}
          className="bg-white/5 p-6 rounded-3xl shadow-sm border border-white/10 hover:shadow-lg transition-all relative"
        >
          {showDelete && (
            <button 
              onClick={() => onDelete(item.id)}
              className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full text-xs font-bold"
            >
              Delete
            </button>
          )}
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-slate-400 mb-4">{item.content}</p>
          {item.imageUrl && (
            <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover rounded-xl" />
          )}
          <span className="text-xs text-slate-500">{item.date}</span>
        </motion.div>
      ))}
    </div>
  );
}
