"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { Aktualnosc } from "@/components/AktualnosciSlider";

type FormData = Omit<Aktualnosc, "id">;

const emptyForm = (): FormData => ({
  tytul: "",
  opis: "",
  data: new Date().toISOString().split("T")[0],
  zdjecie: "",
});

export default function AdminPage() {
  const [items, setItems] = useState<Aktualnosc[]>([]);
  const [form, setForm] = useState<FormData>(emptyForm());
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await fetch("/api/aktualnosci");
    setItems(await res.json());
  }

  useEffect(() => { load(); }, []);

  async function submit() {
    if (!form.tytul.trim() || !form.opis.trim()) {
      setMsg("Wypełnij tytuł i opis.");
      return;
    }
    setLoading(true);
    if (editId) {
      await fetch(`/api/aktualnosci/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEditId(null);
      setMsg("Zaktualizowano.");
    } else {
      await fetch("/api/aktualnosci", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setMsg("Dodano.");
    }
    setForm(emptyForm());
    await load();
    setLoading(false);
    setTimeout(() => setMsg(""), 3000);
  }

  async function remove(id: string) {
    if (!confirm("Usunąć tę aktualność?")) return;
    await fetch(`/api/aktualnosci/${id}`, { method: "DELETE" });
    await load();
  }

  function startEdit(item: Aktualnosc) {
    setEditId(item.id);
    setForm({ tytul: item.tytul, opis: item.opis, data: item.data, zdjecie: item.zdjecie });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditId(null);
    setForm(emptyForm());
    setMsg("");
  }

  const field = "w-full bg-dark border border-gold/20 text-cream font-jost text-sm px-4 py-3 focus:outline-none focus:border-gold/50 placeholder:text-cream/20";

  return (
    <main className="pt-24 pb-20 px-6 min-h-screen bg-dark">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-3">
            Panel zarządzania
          </p>
          <h1 className="font-cormorant text-4xl font-light text-cream">Aktualności</h1>
          <div className="w-12 h-px bg-gold mt-4" />
        </div>

        {/* Form */}
        <div className="bg-dark-800 border border-gold/15 p-8 mb-10">
          <h2 className="font-cormorant text-2xl text-cream mb-6">
            {editId ? "Edytuj aktualność" : "Nowa aktualność"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="font-jost text-xs tracking-widest uppercase text-cream/40 block mb-2">
                Tytuł *
              </label>
              <input
                value={form.tytul}
                onChange={(e) => setForm((f) => ({ ...f, tytul: e.target.value }))}
                className={field}
                placeholder="Tytuł aktualności"
              />
            </div>

            <div>
              <label className="font-jost text-xs tracking-widest uppercase text-cream/40 block mb-2">
                Opis *
              </label>
              <textarea
                value={form.opis}
                onChange={(e) => setForm((f) => ({ ...f, opis: e.target.value }))}
                rows={3}
                className={`${field} resize-none`}
                placeholder="Treść aktualności"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-jost text-xs tracking-widest uppercase text-cream/40 block mb-2">
                  Data
                </label>
                <input
                  type="date"
                  value={form.data}
                  onChange={(e) => setForm((f) => ({ ...f, data: e.target.value }))}
                  className={field}
                />
              </div>
              <div>
                <label className="font-jost text-xs tracking-widest uppercase text-cream/40 block mb-2">
                  Zdjęcie (ścieżka)
                </label>
                <input
                  value={form.zdjecie}
                  onChange={(e) => setForm((f) => ({ ...f, zdjecie: e.target.value }))}
                  className={field}
                  placeholder="/images/kwiaciarnia/..."
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <button
              onClick={submit}
              disabled={loading}
              className="flex items-center gap-2 bg-gold text-dark font-jost text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold-light transition-colors disabled:opacity-50"
            >
              {editId ? <><Check size={13} /> Zapisz zmiany</> : <><Plus size={13} /> Dodaj</>}
            </button>

            {editId && (
              <button
                onClick={cancelEdit}
                className="flex items-center gap-2 border border-gold/30 text-cream/70 font-jost text-xs tracking-widest uppercase px-6 py-3 hover:border-gold/60 transition-colors"
              >
                <X size={13} /> Anuluj
              </button>
            )}

            {msg && (
              <p className="font-jost text-xs text-gold">{msg}</p>
            )}
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {items.length === 0 && (
            <p className="font-jost text-sm text-cream/25 text-center py-10">
              Brak aktualności
            </p>
          )}
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-start gap-4 bg-dark-800 border p-5 transition-colors ${
                editId === item.id ? "border-gold/50" : "border-gold/10 hover:border-gold/20"
              }`}
            >
              {item.zdjecie && (
                <img
                  src={item.zdjecie}
                  alt={item.tytul}
                  className="w-14 h-14 object-cover shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-jost text-xs text-gold mb-1">{item.data}</p>
                <p className="font-cormorant text-lg text-cream leading-tight">{item.tytul}</p>
                <p className="font-jost text-xs text-cream/35 mt-1 line-clamp-1">{item.opis}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(item)}
                  className="w-8 h-8 flex items-center justify-center border border-gold/20 text-cream/50 hover:border-gold hover:text-gold transition-all"
                  aria-label="Edytuj"
                >
                  <Pencil size={12} />
                </button>
                <button
                  onClick={() => remove(item.id)}
                  className="w-8 h-8 flex items-center justify-center border border-gold/20 text-cream/50 hover:border-red-400 hover:text-red-400 transition-all"
                  aria-label="Usuń"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
