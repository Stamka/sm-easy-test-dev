import React, { useEffect, useParams, useState } from 'react'
import PostService from '../API/PostService' 
import { useFetching } from "../hooks/useFetching";
import ProfileForm from '../ProfileForm';
import MyModal from '../UI/MyModal/MyModal';
import MyButton from '../UI/button/MyButton';
import Loader from '../UI/Loader/Loader'
import { BackButton } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from 'react-router';

const tg = window.Telegram.WebApp;


const Profile = () => {

    const navigate = useNavigate();

      const onClose = () => {
        tg.close();
      }
    const [userId, setUserId] = useState();
    const [profile, setProfile] = useState({});

    const [modal, setModal] = useState(false);

    const [fetchProfile, isProfileLoading, profileError] = useFetching( async () => {
        console.log("id=", userId)
        const response = await PostService.getProfile(userId);
        
        console.log("Profile=", response.data)
        if (response.date === {} || response.data === null || response.data === undefined){
            setProfile({})
        } else{
        setProfile(response.data)
        }
        })

    
    useEffect(()=> {
        tg.ready();
        setUserId(tg.initDataUnsafe?.user?.id || 231279140)
        fetchProfile();
    }, [userId])

    const [positions, setPositions] = useState([{id:"", name:""}]);

    const [getPositions, isPositionsLoading, positionsError] = useFetching(async () => {
        try {
          const response = await PostService.getPositions();
    
          const positionsList = response.data.map(item => ({
            value: item.id,
            label: item.name
          }));
          setPositions(positionsList);
          console.log("posis", positionsList)
        } catch (error) {
          console.error('Error fetching positions:', error);
        }
      });
    
      useEffect(() => {
        getPositions();
      }, []);

    const getNamesOfUserPositions = (userPositions, positions) => {
        const names = userPositions.map(positionId => {
            const position = positions.find(pos => pos.value === positionId);
            return position ? position.label : "";
          });
        return names;
    }

  return (

    <div>
            <div>
                {
                
                isProfileLoading
                ? <Loader/>
                
                : profile.id
                    ? <div>
                        Profile
                        <br/>
                        Имя = {profile.first_name}
                        <br/>
                        Фамилия = {profile.last_name}
                        <br/>
                        Описание = {profile.description}
                        <br/>
                        Позиции = {getNamesOfUserPositions(profile.user_positions, positions).join(" ")}
                        <br/>
                        Skills = {profile.user_skills.join(" ")}
                        <br/>
                        <MyButton style={{marginTop: '50px'}} onClick ={() => {setModal(true)}}> 
                            Изменить анкету
                        </MyButton>
                    </div>
                    : <div>
                        <br/>
                        <MyButton style={{marginTop: '50px'}} onClick ={() => {setModal(true)}}> 
                            Создать анкету!
                        </MyButton>
                    </div>

                
                }
            </div>
        <MyModal visible={modal} setVisible={setModal}>
            <ProfileForm userId={userId} previousProfile={profile} positions={positions}/>
        </MyModal>
        <BackButton onClick={ () => navigate(`/`)}></BackButton>
    </div>
  )
}

export default Profile