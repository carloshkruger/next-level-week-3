import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import deleteIcon from '../../images/delete-icon.svg';
import api from '../../services/api';

import '../../styles/pages/dashboard/delete-orphanage.css';
import { OrphanageProps } from '../Orphanage';

interface DeleteOrphanageParams {
  id: string;
}

const DeleteOrphanage: React.FC = () => {
  const { goBack } = useHistory();
  const [orphanage, setOrphanage] = useState<OrphanageProps>();

  const params = useParams();

  const { id } = params as DeleteOrphanageParams;

  useEffect(() => {
    api.get(`orphanages/${id}`).then((response) => setOrphanage(response.data));
  }, [id]);

  async function handleDeleteOrphanage() {
    try {
      await api.delete(`orphanages/${id}`);

      goBack();
    } catch {
      alert('Erro ao deletar registro.');
    }
  }

  if (!orphanage) {
    return <div>Carregando</div>;
  }

  return (
    <div id="page-delete-orphanage">
      <div>
        <h1>Excluir!</h1>

        <p>Você tem certeza que quer excluir {orphanage.name}?</p>

        <button className="confirm-button" onClick={handleDeleteOrphanage}>
          Confirmar
        </button>
        <button className="cancel-button" onClick={goBack}>
          Voltar para o mapa
        </button>
      </div>

      <img src={deleteIcon} alt="Deletar" />
    </div>
  );
};

export default DeleteOrphanage;
