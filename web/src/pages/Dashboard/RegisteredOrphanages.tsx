import React, { useEffect, useState } from 'react';
import OrphanageCardList from '../../components/OrphanageCardList';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';

import { OrphanageProps } from '../Orphanage';

import '../../styles/pages/dashboard/registered-orphanages.css';

const RegisteredOrphanages: React.FC = () => {
  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([]);

  useEffect(() => {
    api
      .get('orphanages', {
        params: {
          approved: true,
        },
      })
      .then((response) => setOrphanages(response.data));
  }, []);

  return (
    <div id="page-registered-orphanages">
      <Sidebar isDashboardPage />

      <main>
        <header>
          <h1>Orfanatos cadastrados</h1>
          <span>{orphanages.length} orfanatos</span>
        </header>

        <OrphanageCardList orphanages={orphanages} />
      </main>
    </div>
  );
};

export default RegisteredOrphanages;
