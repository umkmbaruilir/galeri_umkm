import CreateNewsForm from "../../../../../components/forms/CreateNewsForm";

export default function CreateNewsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Tambah Berita KKN
      </h1>

      <CreateNewsForm />
    </div>
  );
}