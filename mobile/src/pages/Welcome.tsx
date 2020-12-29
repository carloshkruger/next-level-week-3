import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Onboarding from 'react-native-onboarding-swiper';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import onboardingImg from '../images/onboarding1.png';
import onboarding2Img from '../images/onboarding2.png';
import { useNavigation } from '@react-navigation/native';

const NextButton: React.FC = ({ ...rest }) => {
  return (
    <RectButton
      {...rest}
      style={{
        width: 56,
        height: 56,
        backgroundColor: '#D1EDF2',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 16,
      }}
    >
      <Feather name="arrow-right" size={36} color="#15B6D6" />
    </RectButton>
  );
};

const Welcome: React.FC = () => {
  const { navigate } = useNavigation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isOnboardingViewed = false;

    AsyncStorage.getItem('onbordingViewed').then((response) => {
      if (response) {
        isOnboardingViewed = JSON.parse(response);
      }

      if (isOnboardingViewed) {
        navigate('OrphanagesMap');
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  async function handleDone() {
    navigate('OrphanagesMap');

    await AsyncStorage.setItem('onbordingViewed', JSON.stringify(true));
  }

  if (isLoading) {
    return <View />;
  }

  return (
    <Onboarding
      bottomBarColor="#fff"
      showSkip={false}
      NextButtonComponent={NextButton}
      DoneButtonComponent={NextButton}
      onDone={handleDone}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={onboardingImg} />,
          title: 'Leve felicidade para o mundo',
          subtitle: 'Visite orfanatos e mude o dia de muitas crianças.',
          titleStyles: {
            fontSize: 48,
            color: '#0089A5',
            fontFamily: 'Nunito_800ExtraBold',
          },
          subTitleStyles: {
            fontSize: 20,
            color: '#5C8599',
            fontFamily: 'Nunito_600SemiBold',
            marginTop: 16,
          },
        },
        {
          backgroundColor: '#fff',
          image: <Image source={onboarding2Img} />,
          title: 'Escolha um orfanato no mapa e faça uma visita',
          subtitle: '',
          titleStyles: {
            fontSize: 36,
            color: '#0089A5',
            fontFamily: 'Nunito_800ExtraBold',
          },
        },
      ]}
    />
  );
};

export default Welcome;
