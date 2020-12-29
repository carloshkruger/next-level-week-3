import React, { useEffect, useState } from 'react';
import OrphanageCardList from '../../components/OrphanageCardList';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';

import { OrphanageProps } from '../Orphanage';

import '../../styles/pages/dashboard/pending-entries.css';

const PendingEntries: React.FC = () => {
  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([]);

  useEffect(() => {
    api
      .get('orphanages', {
        params: {
          approved: false,
        },
      })
      .then((response) => setOrphanages(response.data));
  }, []);

  return (
    <div id="page-pending-entries">
      <Sidebar isDashboardPage />

      <main>
        <header>
          <h1>Cadastros pendentes</h1>
          <span>{orphanages.length} orfanatos</span>
        </header>

        <OrphanageCardList orphanages={orphanages} />
      </main>
    </div>
  );
};

export default PendingEntries;
