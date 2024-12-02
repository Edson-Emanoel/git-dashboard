"use client"
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON;
const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);

type TypeGestor = {
  id: any
  nome: string
  sexo: string
  created_at: string
}

interface IGestor {
  id: any
  nome: string
  sexo: string
}

export default function Home() {
  const [id, setId] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [sexo, setSexo] = useState<string>('');
  const [mensagem, setMensagem] = useState<string>('');

  const [editar, setEditar] = useState('sumir');
  const [cadastrar, setCadastrar] = useState('');
  
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

  const cadastrarGestor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from('gestores')
        .insert([{ nome, sexo }]);

      if (error) {
        setMensagem(`Erro ao cadastrar gestor: ${error.message}`);
      } else {
        setMensagem(`Gestor ${nome} cadastrado com sucesso!`);
        setNome('');
        setSexo('');
      }
    } catch (error) {
      setMensagem(`Ocorreu um erro: ${error}`);
    }
  };

  const carregarCampos = (id: any, nome: string, sexo: string) => {
    setId(id)
    setNome(nome)
    setSexo(sexo)

    setCadastrar('sumir')
    setEditar('')
  }

  const handleEditar = async () => {
    const { error } = await supabase
      .from('gestores')
      .update({ nome, sexo })
      .match({ id: id });

    if (error) {
      // setError('Erro ao atualizar gestor');
      console.error(error);
    } else {
      alert('Gestor atualizado com sucesso!');

      setId('')
      setNome('')
      setSexo('')

      setCadastrar('')
      setEditar('sumir')
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
  }, [gestor, setGestor]);

  return (
    <main className='w-[100%] h-[100vh] flex items-center justify-center'>
      <div className="listar mr-20">
        <h1 className='text-center text-3xl font-bold mb-5 text-white'>Cadastro de Gestores</h1>

        <form onSubmit={cadastrarGestor} className='flex flex-col items-center justify-center gap-3'>
          <div className='flex flex-col'>
            <label className='text-xl font-medium text-white'>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className='px-2 border-none outline-none bg-zinc-800 text-white w-80 h-10 rounded-md text-base font-normal'
              required
            />
          </div>
          <div className='flex flex-col'>
              <label className='text-xl font-medium text-white'>Sexo:</label>
              <select
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                className='px-2 border-none outline-none bg-zinc-800 text-white w-80 h-10 rounded-md text-base font-normal'
                required
              >
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
          </div>
          <div className="flex items-center justify-center gap-2">
            <button type="submit" className={`bg-blue-700 text-white font-medium rounded-md w-[110px] h-8 ${cadastrar}`}>Cadastrar</button>
            <button type="button" className={`bg-yellow-500 text-white font-medium rounded-md w-[110px] h-8 ${editar}`} onClick={() => handleEditar()}>Salvar</button>
          </div>
        </form>
        {mensagem && <p>{mensagem}</p>}

          <h2 className='text-center text-3xl font-bold mt-10 mb-5 text-white'>Lista de Gestores</h2>

          <div className='gap-2 flex flex-col items-center'>
            {gestor.map((item) => (
              <div key={item.id} className='w-[500px] pb-5 pt-5 bg-zinc-900 p-2 rounded-md text-white'>
                <div className="container flex items-center justify-center">
                  <div className="gap-2 flex flex-col">
                    <div className="gap-4 flex items-center">
                      <h2 className='text-2xl'>{item.nome}</h2>
                      
                      <p className='text-lg'>{item.sexo}</p>
                    </div>
                    
                    <small>{new Date(item.created_at).toLocaleDateString()}</small>
                  </div>

                  <div className="w-[100%] flex items-center">
                    <button onClick={() => deletarGestor(item.id)} className='ml-28 bg-red-600 w-20 rounded-md'>Deletar</button>
                    <button onClick={() => carregarCampos(item.id, item.nome, item.sexo)} className='ml-5 bg-yellow-500 w-20 rounded-md'>Editar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </main>
  );
}