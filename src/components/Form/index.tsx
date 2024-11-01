import './gestor.css';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Configure suas credenciais do Supabase
const supabaseUrl = 'https://tqvkkwmqtyyzajeqnkwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ5OTY4NCwiZXhwIjoxOTU5MDc1Njg0fQ.J1C20mhPGJqoCbhY_oEACEDd7Rdv2gvTVR98j7OBF6Y';
const supabase = createClient(supabaseUrl, supabaseKey);

interface EditarGestorProps {
    gestorId: string; // ID do gestor que será editado
}

const CadastroGestor: React.FC<EditarGestorProps> = ({gestorId}) => {
    // const [id, setId] = useState<string>('')
    // setId(gestorId);

    

    // useEffect(() => {
    //     const editarGestor = async ({ gestorId }: EditarGestorProps) => {
    //         const { data, error } = await supabase
    //             .from('gestores')
    //             .select('nome, sexo')
    //             .eq('id', gestorId)
    //             .single();

    //         if (error) {
    //             console.log('Erro ao carregar gestor');
    //             console.error(error);
    //         } else {
    //             setNome(data.nome);
    //             setSexo(data.sexo);
    //         }
    //     };

    //     editarGestor(id);
    // }, [gestorId]);    

    return (
        <div className='container'>
            
        </div>
    );
};

export default CadastroGestor;