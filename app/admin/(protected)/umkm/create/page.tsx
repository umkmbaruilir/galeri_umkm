import CreateUmkmForm from "../../../../../components/forms/CreateUmkmForm";

export default function CreateUmkmPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Tambah UMKM
        </h1>

        <p className="text-slate-500">
          Tambahkan data UMKM baru
        </p>
      </div>

      <CreateUmkmForm />
    </div>
  );
}