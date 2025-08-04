'use client';
import ContractsList from '@/components/ContractsList';

export default function ContractsPage() {
  return (
    <main className="max-w-4xl mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Sözleşmelerim</h1>
        <p className="text-gray-500">Tüm düzenlenmiş sözleşmeleriniz</p>
      </div>
      <ContractsList />
    </main>
  );
}