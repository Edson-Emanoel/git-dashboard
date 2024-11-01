"use client"

import CadastroGestor from '@/components/Form';
// pages/post.js
import { createClient } from '@supabase/supabase-js';
import { log } from 'console';
import { useEffect, useState } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON;
const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);

type TypeGestor = {
  id: any
  nome: string
  sexo: string
  created_at: string
}

export default function Home() {
  const [gestor, setGestor] = useState<TypeGestor[]>([]);

  const fetchGestor = async () => {
    const { data, error } = await supabase
      .from('gestores')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setGestor(data);
    }
  };

  const deletarGestor = async (id: number) => {
    try {
        const { error } = await supabase
          .from('gestores')
          .delete()
          .eq('id', id);

        if (error) {
          console.log(`Erro ao deletar gestor: ${error.message}`);
        } else {
          alert(`Gestor deletado com sucesso!`);
          fetchGestor(); // Atualiza a lista de gestores
        }
    } catch (error) {
      console.log(`Ocorreu um erro :(`);
    }
};

  useEffect(() => {
    fetchGestor(); // Chama a função ao carregar o componente
  }, []);

  return (
    <main className='p-5 px-28'>
      <h1 className="font-medium text-3xl">Shadcn-UI</h1>

      <div className="listar mr-20">
      <CadastroGestor />

      <h2 className='text-center text-3xl font-bold mt-5 mb-5'>Lista de Gestores</h2>
      <div className='flex gap-2 flex-col '>
        {gestor.map( item => (
          <div key={item.id} className='bg-green-500 p-2 rounded-md text-white'>
            <h3>{item.nome}</h3>
            <p>{item.sexo}</p>
            <small>{new Date(item.created_at).toLocaleString()}</small>
            <button onClick={() => deletarGestor(item.id)} className='ml-28 bg-red-600 w-20 rounded-md'>Deletar</button>
          </div>
        ))}
      </div>

      </div>

    </main>
  );
}
