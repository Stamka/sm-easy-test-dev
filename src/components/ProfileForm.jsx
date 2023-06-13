import React, { useEffect, useState } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';
import PostService from './API/PostService';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import TextArea from './UI/TextArea/TextArea';


const ProfileForm = ({ userId, previousProfile, positions }) => {

  const [profile, setProfile] = useState(previousProfile);

  useEffect(() => {
    setProfile(previousProfile);
  }, [previousProfile]);

  

  const createOrUpdateProfile = async () => {

    let response = '';

    if (Object.keys(previousProfile).length === 0){
      try {
        setProfile({...profile, "user_id":userId})
        console.log('All is OK:', profile);
        response = await PostService.createProfile(profile);
        console.log('Response=', response.data);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }else{
        try {
          setProfile({...profile, "user_id":userId})
          console.log('All is OK:', profile);
          response = await PostService.updateProfile(userId, profile);
          console.log('Response=', response.data);
        } catch (error) {
          console.error('Error updating profile:', error);
        }
      };

      if (!response.data || response.data.length <= 0) {
        // If the response is empty, refetch the projects after a certain delay
        setTimeout(() => {
          createOrUpdateProfile();
        }, 1000); // You can adjust the delay (in milliseconds) as needed
      }
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

  const handleDescriptionChange = (e) => {
    setProfile({ ...profile, description: e.target.value });
  };

  const createSkillLabels = (skills) => {
    let labelsArray = skills.map((skill) => (
      {"value":skill, "label":skill}
    ))

    return labelsArray;
  }

  const createPostionsLabels = (userPositions) => {
    console.log(userPositions)
    let positionsLabels = positions.filter( pos => userPositions.includes(pos.value))

    let labelsArray = positionsLabels.map((pos) => (
      {"value":pos.value, "label":pos.label}
    ))
    return labelsArray
  }


  

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
      <TextArea 
        value={profile.description}
        onChange={handleDescriptionChange}
        placeholder="Описание"
      />
      <div>
        <div>Выбери позиции для поиска вакансий </div>
        {console.log("Pos", positions)}
        <Select onChange={handlePositionChange} value={createPostionsLabels(profile.user_positions || [])}isMulti isSearchable isClearable name="positions" options={positions} />
      </div>
      <div>
        <div>Укажите свои навыки </div>
        <CreatableSelect onChange={handleSkillsChange} value={createSkillLabels(profile.user_skills || [])} isMulti isSearchable isClearable name="skills"/>
      </div>
      <MyButton onClick={createOrUpdateProfile}>Изменить профиль</MyButton>
    </form>
  );
};

export default ProfileForm;
