import './gestor.css';
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Configure suas credenciais do Supabase
const supabaseUrl = 'https://tqvkkwmqtyyzajeqnkwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ5OTY4NCwiZXhwIjoxOTU5MDc1Njg0fQ.J1C20mhPGJqoCbhY_oEACEDd7Rdv2gvTVR98j7OBF6Y';
const supabase = createClient(supabaseUrl, supabaseKey);

const CadastroGestor: React.FC = () => {
    const [nome, setNome] = useState<string>('');
    const [sexo, setSexo] = useState<string>('');
    const [mensagem, setMensagem] = useState<string>('');

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

    return (
        <div className='container'>
            <h1 className='text-center text-3xl font-bold mb-5'>Cadastro de Gestores</h1>
            <form onSubmit={cadastrarGestor} className='flex flex-col items-center justify-center gap-3'>
                <div className='flex flex-col'>
                    <label className='text-xl font-medium'>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className='px-2 border-none outline-none bg-zinc-800 text-white w-80 h-8 rounded-md text-base font-normal'
                        required
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='text-xl font-medium'>Sexo:</label>
                    <select
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
                        className='px-2 border-none outline-none bg-zinc-800 text-white w-80 h-8 rounded-md text-base font-normal'
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                    </select>
                </div>
                <button type="submit" className='bg-blue-700 text-white text-lg font-medium rounded-md w-52 h-8'>Cadastrar</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
};

export default CadastroGestor;