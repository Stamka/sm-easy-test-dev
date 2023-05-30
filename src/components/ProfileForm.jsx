import React, { useEffect, useState } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';
import PostService from './API/PostService';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';


const ProfileForm = ({ userId, previousProfile, positions }) => {

  const [profile, setProfile] = useState(previousProfile);

  useEffect(() => {
    setProfile(previousProfile);
  }, [previousProfile]);

  

  const updateProfile = async () => {

    if (Object.keys(previousProfile).length === 0){
      try {
        setProfile({...profile, "user_id":userId})
        console.log('All is OK:', profile);
        const response = await PostService.createProfile(profile);
        console.log('Response=', response.data);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }else{
        try {
          setProfile({...profile, "user_id":userId})
          console.log('All is OK:', profile);
          const response = await PostService.updateProfile(userId, profile);
          console.log('Response=', response.data);
        } catch (error) {
          console.error('Error updating profile:', error);
        }
      };
    }

  console.log('NEW_profile', profile);
  console.log('prev_profile', previousProfile);

  const handlePositionChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    console.log("SEL VAL", selectedValues);
    const tempProfile = { ...profile, user_positions: selectedValues, "user_id":userId };
    console.log("tempProfi", tempProfile);
    setProfile(tempProfile);
  };
  const handleSkillsChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    console.log("SEL VAL", selectedValues);
    const tempProfile = { ...profile, user_skills: selectedValues, "user_id":userId };
    console.log("tempProfi", tempProfile);
    setProfile(tempProfile);
  };
  

  return (
    <form>
      <div>Имя </div>
      <MyInput
        value={profile.first_name}
        onChange={(e) => setProfile({ ...profile, first_name: e.target.value, "user_id":userId })}
        type="text"
        placeholder="Имя"
      />
      <div>Фамилия </div>
      <MyInput
        value={profile.last_name}
        onChange={(e) => setProfile({ ...profile, last_name: e.target.value, "user_id":userId })}
        type="text"
        placeholder="Фамилия"
      />
      <div>Описание </div>
      <MyInput
        value={profile.description}
        onChange={(e) => setProfile({ ...profile, description: e.target.value, "user_id":userId })}
        type="text"
        placeholder="Описание"
      />
      <div>
        <div>Выбери позиции для поиска вакансий </div>
        <Select onChange={handlePositionChange} isMulti isSearchable isClearable name="positions" options={positions} />
      </div>
      <div>
        <div>Укажите свои навыки </div>
        <CreatableSelect onChange={handleSkillsChange} isMulti isSearchable isClearable name="skills"/>
      </div>
      <MyButton onClick={updateProfile}>Изменить профиль</MyButton>
    </form>
  );
};

export default ProfileForm;
