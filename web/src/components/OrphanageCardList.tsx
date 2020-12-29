import React from 'react';
import { Marker } from 'react-leaflet';
import { Link } from 'react-router-dom';

import mapIcon from '../utils/mapIcon';
import Map from './Map';
import editIcon from '../images/edit.svg';
import trashIcon from '../images/trash.svg';

import '../styles/components/orphanage-card.css';
import { OrphanageProps } from '../pages/Orphanage';

interface OrphanageCardListProps {
  orphanages: OrphanageProps[];
}

const OrphanageCardList: React.FC<OrphanageCardListProps> = ({
  orphanages,
}) => {
  return (
    <div className="orphanage-card-list">
      {orphanages.map((orphanage) => (
        <div className="orphanage-card">
          <div className="map-container">
            <Map style={{ width: '100%', height: 200 }}>
              <Marker
                interactive={false}
                icon={mapIcon}
                position={[orphanage.latitude, orphanage.longitude]}
              />
            </Map>
          </div>

          <div className="footer">
            <strong>{orphanage.name}</strong>

            <div className="buttons-container">
              <Link to={`/edit-orphanage/${orphanage.id}`}>
                <img src={editIcon} alt="Editar" />
              </Link>
              <Link to={`/delete-orphanage/${orphanage.id}`}>
                <img src={trashIcon} alt="Excluir" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrphanageCardList;
