import React, {useState} from 'react'
import MyInput from './UI/input/MyInput'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import MyButton from './UI/button/MyButton';

const ProjectForm = ({action, PrevProject = {}, userId}) => {

  const [value, onChange] = useState(new Date());
  const [checkboxValue, setCheckboxValue] = useState(true);

  const handleCheckBox = () => {
    setCheckboxValue(!checkboxValue);
  }
  console.log(value);
  console.log(checkboxValue);
  return (
    <form>
        <MyInput
        type="text"
        placeholder="Название проекта"
        value={PrevProject?.name}
        />
        <MyInput
        type="text"
        placeholder="Описание проекта"
        value={PrevProject?.description}
        />
        <MyInput
        type="number"
        placeholder="Введите бюджет проекта"
        value={PrevProject?.budget}
        />
        <div>
          Дедлайн проекта <input type="checkbox" checked={checkboxValue} onChange={handleCheckBox} />
          { checkboxValue
           ? <DatePicker onChange={onChange} value={value} />
           : <div></div>
          }
        </div>

        {action === "add"
        ? <MyButton>Добавить проект</MyButton>
        : <MyButton>Изменить проект</MyButton> 
        }

    </form>
  )
}

export default ProjectForm